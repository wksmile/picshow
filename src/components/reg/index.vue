<template>
  <div class="wrapper">
      <div class="content">
        <div class="head">PicShow</div>
        <ul class="loginInfor" @blur.capture="check">
          <li>
            <input type="email" class="email" v-model="email" placeholder="邮箱" />
          </li>
          <li>
            <input type="text" class="username" v-model="username" placeholder="用户名"/>
          </li>
          <li>
            <input type="password" class="password" v-model="password" placeholder="密码"/>
          </li>
          <li>
            <input type="password" class="repassword" v-model="repassword" placeholder="重复密码"/>
          </li>
          <li>
            <input type="button" @click="regUser" value="注册" />
          </li>
        </ul>
        <p v-if="isShowAlert" class="alertText">{{alertMessage}}</p>
        <div class="tip">已拥有账户？
          <router-link to="/login"><span>登录</span></router-link>
        </div>
      </div>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    data () {
      return {
        "alertMessage": null,
        "isShowAlert": false,
        "email": null,
        "username": null,
        "password": null,
        "repassword": null,
        "alertText": ["该邮箱已注册","邮箱格式不正确","用户名格式不正确","该用户名已存在","密码应该由6-16位字母、数字、下划线组成","两次输入的密码不一致"]
      }
    },
    methods: {
      regUser () {

      },
      addClassName (c) {
          this.$el.getElementsByClassName(c)[0].classList.add('focuse');
      },
      // 根据索引显示提示文字
      showAlert (index) {
        if(!this.isShowAlert) {
          this.isShowAlert = true;
        }
        this.alertMessage = this.alertText[index];
      },
      check (e) {
          var targetClass = e.target.className;
          var regex;
          if(targetClass == 'email') {
              regex = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
              if(!regex.test(this.email)) {
                this.showAlert(1);
                return false;
              }
              axios.post('/user', {
                email: this.email
              })
              .then(function (response) {
                  //  判断邮箱是否已注册
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
          } else if(targetClass == 'username') {
            regex = /[a-zA-Z0-9_]{4,16}/;
            if(!regex.test(this.username)) {
              this.showAlert(2);
              return false;
            }
              axios.post('/user', {
                username: this.username
              })
              .then(function (response) {
                //  判断用户名是否已注册
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
          } else if(targetClass == 'password') {
            regex = /\w{6,16}/;
            if(!regex.test(this.password)) {
              this.showAlert(4);
              return false;
            }
          } else if(targetClass == 'repassword') {
            if(this.repassword !== this.password) {
              this.showAlert(5);
              return false;
            }
          }
          return true;
      },
      reg () {

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

  .alertText {
    color: red;
    font-size: 0.8pc;
  }

  .tip {
    margin-top: 40px;
    color: #444;
    font-size: 0.8pc;
  }
</style>
