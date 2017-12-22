<template>
  <div class="wrapepr">
    <div class="content">
      <div class="top">
        <span class="photo">
          <img :src="information.photo">
        </span>
      </div>
      <div class="middle">
        <div class="detail">
          <span class="nickname">{{information.nickname}}</span><span v-if="information.sex"><img :src="sexPic"></span>
          <span>
            {{information.address}} <img src="../../public/images/address.png">
          </span>
          <span v-if="information.age">
            年龄：{{information.age}}
          </span>
          <span class="set">
            <router-link to="/editUser">
              编辑个人信息
              <img src="../../public/images/setting.png">
            </router-link>
          </span>
        </div>
        <div class="user-choose">
          <span @click="changeComponent('Launched')">已发布
            <span>{{publichNum.contentNum}}</span>
          </span>
          <span @click="changeComponent('Attention')">关注
            <span>{{publichNum.followNum}}</span>
          </span>
          <span @click="changeComponent('Fans')">粉丝
            <span>{{publichNum.fanNum}}</span>
          </span>
          <span @click="changeComponent('Launched')">收藏
            <span>{{publichNum.favoriteNum}}</span>
          </span>
          <span @click="changeComponent('Launched')">赞
            <span>{{publichNum.thumbupNum}}</span>
          </span>
        </div>
      </div>
      <div class="bottom">
        <transition name="component-fade" mode="out-in">
          <component v-bind:is="view"></component>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex';
  import $ from 'jquery';
  import Cookies from 'js-cookie';
  import Attention from './Attention';   // 已关注
  import Collect from './Collect';       // 已收藏
  import Launched from './Launched';     // 已发布
  import Comment from '../Comment';
  import Fans from './Fans';              //  粉丝
  import man from '../../public/images/man.png';
  import women from '../../public/images/women.png';

  export default {
    data () {
      return {
        view: 'Launched',
        publichNum: null      // 已发布，关注、、、个数
      }
    },
    beforeMount () {
      this.isLogined();
    },
    computed: {
      ...mapState(['information']),
      sexPic () {
        if (this.information.sex == 1) return man;
        if (this.information.sex == 2) return women;
        return null;
      }
    },
    methods: {
      ...mapMutations(['SET_INFORMATION','SET_SHOW_LOGIN']),
      // 判断是否登录从而请求
      isLogined () {
        if(Cookies.get('token')) {
          console.log('token:---',Cookies.get('token'));
          var that = this;
          $.post("http://192.168.1.104:8083/user/token",{
            token: Cookies.get('token')
          })
          .done(function(res){
            if(res.status == 200) {
              console.log('-------90909999');
              that.SET_INFORMATION(res.data);
              // 请求个数
              that.reqNumbers();
              that.setHeader();
            } else {
              // 应该加一个弹框提示未登录
              return;
            }
            console.log('getToken:',res);
          });
        } else {
          console.log('has not logined');
        }
      },
      changeComponent (cpt) {
        this.view = cpt;
      },
      setHeader () {
        this.SET_SHOW_LOGIN(false);
      },
      reqNumbers () {
        var that = this;
        $.post("http://192.168.1.104:8081/user/info/number",{
          userId: that.information.id
        })
        .done(function(res){
          console.log('已赞个数',res);
          if(res.status == 200) {
            that.publichNum = res.data;
          }
        });
      }
    },
    components: {
      Comment,
      Attention,
      Launched,
      Collect,
      Fans
    }
  }
</script>

<style scoped>
  .wrapepr {
    width: 100%;
    height: 100%;
    padding-top: 108px;
    display: flex;
    justify-content: center;
    background-color: #eee;
  }

  .content {
    width: 70%;
  }

  .middle, .top, .bottom {
    width: 100%;
    background-color: #fff;
  }

  .top {
    width: 100%;
    height: 200px;
    background-image: url("../../public/pic/img1.jpg");
    position: relative;
  }

  .photo {
    display: inline-block;
    position: absolute;
    overflow: hidden;
    left: 5%;
    top: 160px;
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }

  .photo img {
    width: 80px;
    height: 80px;
  }

  .middle {
    height: 100px;
    width: 100%;
    text-align: left;
  }

  .detail {
    margin-left: 17%;
    display: flex;
    align-items: center;
  }

  .detail span {
    display: inline-block;
    padding: 5px;
  }

  .detail img {
    width: 15px;
    height: 15px;
  }

  .set a {
    text-decoration: none;
  }

  .nickname {
    font: bold 1.2pc "Helvetica Neue", Helvetica, Arial, sans-serif;
  }

  .user-choose {
    margin: 30px 20px 0;
  }

  .user-choose span {
    display: inline-block;
    padding: 5px 7px;
  }

  .user-choose span:hover {
    color: burlywood;
    cursor: pointer;
  }

  .bottom {
    margin-top: 10px;
    box-sizing: border-box;
    padding: 5px;
    width: 100%;
    text-align: left;
  }
</style>
