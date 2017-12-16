<template>
  <div class="wrapper">
      <div class="content">
        <div class="head">PicShow</div>
        <ul class="loginInfor" @blur.capture="check">
          <li>
            <input v-bind:class="[isFocuse?focuse:'']" v-on:focus="addFocuse" v-on:blur="removeFocuse" type="text" name="username" placeholder="用户名或注册邮箱" v-model="username"/>
          </li>
          <li>
            <input placeholder="密码" v-model="password"/>
          </li>
          <li>
            <input type="button" value="登录"></input>
          </li>
        </ul>
        <div class="tip">尚未拥有账户？
          <router-link to="/reg"><span>注册</span></router-link>
        </div>
      </div>
  </div>
</template>

<script>
  import axios from 'axios';

    export default {
      data () {
          return {
            "isFocuse": false,
            "username": null,
            "password": null,
            "alertText": ["用户名或密码错误"]
          }
        },
      methods: {
        addFocuse () {
          this.isFocuse = true
        },
        removeFocuse () {
          this.isFocuse = false
        },
        // 根据索引显示提示文字
        showAlert (index) {
          if(!this.isShowAlert) {
            this.isShowAlert = true;
          }
          this.alertMessage = this.alertText[index];
        },
        login () {
            var typenum;
            var regex = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
            if(regex.test(this.username)) {
              typenum = 0   // 邮箱
            } else {
              typenum = 1  // 用户名
            }
          axios.post('/user', {
            username: this.username,
            password: this.password,
            type: typenum
          })
          .then(function (response) {
              // 是否出错
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        }
      }
    }
</script>

<style scoped>
  @font-face {
    font-family: 'huawen';
    src: url('../../font/huawenlishu.ttf') format('truetype')
  }

  .wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .content {
    width: 390px;
    background: #fff;
    border: 1px solid #eeeff2;
    padding: 32px 40px 24px;
    position: relative;
    box-sizing: border-box;
  }

  .head {
    font: bolder 3pc "huawen";
    color: #000;
  }

  ul,li {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .loginInfor {
    text-align: center;
    margin-top: 30px;
  }

  .loginInfor li {
    margin: 15px 0;
    width: 100%;
  }

  .loginInfor li input {
    border: 0;
    outline: none;
    overflow: hidden;
    padding: 9px 0 7px 8px;
    text-overflow: ellipsis;
    background: #fafafa;
    line-height: 20px;
    width: 100%;
    border-radius: 3px;
  }

  .loginInfor li:last-child input{
    background-color: rgba(0,192,87,1.0);
    color: #fff;
    font: 1.2pc "Bodoni MT Black";
  }

  .focuse {
    border: 1px solid #666;
  }

  .tip {
    margin-top: 40px;
    color: #444;
    font-size: 0.8pc;
  }
</style>
