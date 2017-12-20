<template>
  <div class="header">
    <nav>
      <div class="header-wrapepr">
        <div class="block pic">
          <span class="logoPic">
            <router-link to="/">
              <img src="../../public/images/instagram.png" width="35" height="35">
            </router-link>
          </span>
          <span class="logo">
            PicShow
          </span>
        </div>
        <div class="block search">
          <input placeholder=" 搜 索" />
        </div>
        <div class="block user">
          <span class="blockop">
            <img src="../../public/images/change.png" width="25">
          </span>
          <span class="blockop">
            <img src="../../public/images/heart_line.png" width="25">
          </span>
          <template v-if="isShowTxt">
            <router-link to="/login">
              <span class="login">登录</span>
            </router-link>
            <router-link to="/reg">
              <span class="reg">注册</span>
            </router-link>
          </template>
          <template v-else>
              <span class="borphoto" v-bind:class="[isshowUserDetail ? user-background : '']" @mouseover="toggleShowUserDetail" @mouseout="toggleShowUserDetail">
                <img :src="information.photo" class="photo" @click="linkToUser">
              </span>
            <span>{{information.nickname}}</span>
              <div class="portrait" v-show="isshowUserDetail" @mouseover="toggleShowUserDetail" @mouseout="toggleShowUserDetail">
                <img :src="information.photo" class="photo userphoto">
                <div class="useri">
                  <p class="name">{{information.nickname}}</p>
                  <p class="userInf">个人信息</p>
                </div>
                <span class="logout">退出</span>
              </div>
          </template>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  import {mapState} from 'vuex';

    export default {
      data () {
          return {
            "isshowUserDetail": false
          }
      },
      props: {
        isShowTxt: {
          type: Boolean,
          default: true
        }
      },
      computed: {
        ...mapState(['information'])
      },
      methods: {
        toggleShowUserDetail () {
          this.isshowUserDetail = !this.isshowUserDetail;
        },
        linkToUser () {
          this.$router.push('/user');
        }
      }
    }
</script>

<style scoped>
  nav {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 77px;
    background-color: rgba(255,255,255,0.37);
    border-bottom: 1px solid #ddd;
  }

  .header-wrapepr {
    width: 100%;
    height: 77px;
    display: flex;
    align-items: center;
  }

  .block {
    display: inline-block;
    width: 33.3%;
  }

  .block.pic span {
    display: inline-block;
    padding: 0 10px;
  }

  .logoPic {
    border-right: 1px solid #999;
  }

  .block.search input {
    border: 1px solid #ddd;
    height: 30px;
    border-radius: 3px;
  }

  .block.user .blockop {
    margin-right: 20px;
  }

  .login, .reg {
    float: right;
    color: #333;
  }

  .logo {
    font: bold 32px 'huawen';
    color: rgba(0,0,0,0.37);
  }

   .borphoto {
     float: right;
     margin-right: 150px;
    }

  .photo {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    padding: 10px;
  }

  .portrait {
    position: absolute;
    right: 25px;
    top: 66px;
    padding: 10px 18px;
    width: 140px;
    background-color: rgba(200,200,200,0.8);
  }

  .user-background {
    background-color: rgba(200,200,200,0.8);
  }

  .userInf {
    font: 0.8pc "Arial Unicode MS";
  }

  .logout {
    width: 120px;
    background-color: rgba(255,110,22,0.36);
    padding: 3px 0px;
    font-size: 0.8pc;
    display: inline-block;
    margin-top: 15px;
  }

  .useri {
    margin-left: 70px;
  }

  .useri p {
    line-height: 10px;
  }

  .userphoto {
    position: absolute;
    left: 10px;
    top: 15px;
    width: 50px;
    height: 50px;
  }
</style>
