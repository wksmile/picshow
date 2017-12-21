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
          <span class="nickname">{{information.nickname}}</span>
          <span>
            <img src="../../public/images/address.png">
            {{information.address}}
          </span>
          <span v-if="information.sex">
            <img :src="sexPic">
          </span>
          <span v-if="information.age">
            年龄：{{information.age}}
          </span>
          <span>
            <router-link to="/editUser">
              编辑个人信息
              <img src="../../public/images/setting.png">
            </router-link>
          </span>
        </div>
        <div class="user-choose">
          <span @click="changeComponent('Attention')">关注</span>
          <span @click="changeComponent('Fans')">粉丝</span>
          <span @click="changeComponent('Launched')">已发布</span>
          <span @click="changeComponent('Collect')">收藏</span>
          <span @click="changeComponent('Collect')">赞</span>
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
        view: 'Attention'
      }
    },
    computed: {
      ...mapState(['information']),
      sexPic () {
        if (this.information.sex == 1) return man;
        if (this.information.sex == 2) return women;
        return null;
      }
    },
    created () {
      if(Cookies.get('token')) {
        console.log('token:---',Cookies.get('token'));
        var that = this;
        $.post("http://192.168.1.104:8083/user/token",{
          token: Cookies.get('token')
        })
        .done(function(res){
          if(res.status == 200 && res.data.id == that.information.id) {
            that.SET_INFORMATION(res.data);
          } else {
              return;
          }
          console.log('getToken:',res);
        });
      } else {
        console.log('has not logined');
      }
    },
    methods: {
      ...mapMutations(['SET_INFORMATION']),
      changeComponent (cpt) {
        this.view = cpt;
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

  .middle {
    height: 100px;
    width: 100%;
    text-align: left;
  }

  .detail {
    margin-left: 17%;
  }

  .detail span {
    display: inline-block;
    padding: 5px;
  }

  .detail img {
    width: 20px;
    height: 20px;
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
