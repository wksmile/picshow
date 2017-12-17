<template>
  <div class="wrapper">
      <div class="content">
        <div class="head">PicShow</div>
        <ul class="loginInfor" @blur.capture="check">
          <li>
            <input type="text" class="username" v-model="username" placeholder="用户名"/>
          </li>
          <li>
            <input type="email" class="email" v-model="email" placeholder="邮箱" /><input ref="sendMsg" class="sendEmail" type="button" v-model="sendTxt" @click="sendEmail" />
          </li>
          <li>
            <input type="email" class="verifyCode" v-model="captcha" placeholder="验证码" />
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
  //  axios使用跨域请求失败，改用jquery，后期找原因？？？？？？？？？？？？？？？？？
  import axios from "axios";
  import Qs from 'qs';
  import $ from 'jquery';

//  const instance = axios.create({
//    baseURL: 'http://192.168.1.104:8083/user/check',
//    headers:{
//      'Content-Type':'application/x-www-form-urlencoded'
//    },
//    transformRequest: [function (data) {
//      data = Qs.stringify(data);
//      return data;
//    }],
//    withCredentials:true   //加了这段就可以跨域了
//  });

//  axios.interceptors.request.use(
//      config => {
//          config.data = JSON.stringify(config.data);
//          config.headers = {
//            'Content-Type': "application/x-www-form-urlencoded",
//            'Access-Control-Allow-Origin':'*',
//            'access-control-allow-headers': 'ContentType',
//            'Access-Control-Allow-Methods':'GET,POST,OPTIONS'
//          }
//          return config
//      }
//  )

  export default {
    data () {
      return {
        "captcha": null,
        "sendTxt": "获取验证码",
        "checkNum": '',    //  验证码
        "isCheck": false,     //  检查所填信息是否符合
        "alertMessage": null,
        "isShowAlert": false,
        "email": null,
        "username": null,
        "password": null,
        "repassword": null,
        "alertText": ["该邮箱已注册","邮箱格式不正确","用户名格式不正确","该用户名已存在","密码应该由6-16位字母、数字、下划线组成","两次输入的密码不一致","验证码不正确"]
      }
    },
    methods: {
      regUser () {
          if(!this.captcha === this.checkNum) {
            this.showAlert(6);
            return;
          }
          var that = this;
        $.post("http://192.168.1.104:8083/user/register",{
          email: this.email,
          password: this.password,
          username: this.username
        })
        .done(function (res) {
            if(res.msg === "OK") {
              console.log('注册成功:');
              that.$router.push('/regsuccess');
            }
          console.log('注册返回:',res);
        })
      },
      addClassName (c) {
          this.$el.getElementsByClassName(c)[0].classList.add('focuse');
      },
      startTime (t) {
          this.$refs.sendMsg.disabled = true;
          this.sendTxt = t+'s';
          // setInterval单独使用失败，必须加上window才使用正常，后期查原因？？？？？？？？？？？？？？？？？？？？？？？？？？
          var time = window.setInterval(() => {
              t--;
            this.sendTxt = t+'s';
            if(t<=0) {
              clearInterval(time);
              this.$refs.sendMsg.disabled = false;
              this.sendTxt = "获取验证码";
            }
            console.log('sendTxt',this.sendTxt);
          },1000)
      },
      sendTxtC (i) {
        this.sendTxt = i;
      },
      // 根据索引显示提示文字
      showAlert (index) {
        if(!this.isShowAlert) {
          this.isShowAlert = true;
        }
        this.alertMessage = this.alertText[index];
      },
      produceCheckNum (n) {
          var value = '';
          for(var i=0;i<n;i++) {
              value += Math.floor(Math.random()*10)
          }
          return value;
      },
      sendEmail () {
          console.log('--------sendEmail');
          var regex = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
          if(!regex.test(this.email)) {
            this.showAlert(1);
            return;
          }
          var that = this;
          $.post("http://192.168.1.104:8083/user/check",{param:this.email,type:"2"})
            .done(function(res){
              console.log('email:',res);
              if(res.data) {
                // 邮箱已注册
                that.showAlert(0);
              } else {
                that.checkNum = that.produceCheckNum(6);
                that.startTime(20);
                console.log('the num is',that.checkNum);
                $.post("http://192.168.1.104:8083/user/captcha",{email:that.email,captcha: that.checkNum})
                  .done(function (res) {
                    console.log('checkNum:',res);
                  })
              }
            })
        },
      check (e) {
          var targetClass = e.target.className;
          var regex;
          if(targetClass == 'username') {
            regex = /[a-zA-Z0-9_]{4,16}/;
            if(!regex.test(this.username)) {
              this.showAlert(2);
              return;
            } else {
              this.alertMessage = null;
            }
            var that = this;
            $.post("http://192.168.1.104:8083/user/check",{param:this.username,type:"1"})
              .done(function(res){
                console.log('username:',res);
                if(res.data) {
                  that.showAlert(3);
                }
              });
          } else if(targetClass == 'password') {
            regex = /\w{6,16}/;
            if(!regex.test(this.password)) {
              this.showAlert(4);
            }
          } else if(targetClass == 'repassword') {
            if(this.repassword !== this.password) {
              this.showAlert(5);
            }
          }
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
    box-sizing: content-box;
    position: relative;
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

  .loginInfor li .sendEmail {
    position: absolute;
    right: 0;
    top: 0;
    right: -3%;
    width: 27%;
    background-color: rgba(88,88,88,0.36);
    border-radius: 0;
  }

  .loginInfor li .email {
    padding-right: 0%;
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
