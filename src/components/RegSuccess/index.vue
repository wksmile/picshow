<template>
  <div class="wrapper">
    <div class="content">
      <div class="left">
        <img src="../../public/pic/kk.jpg">
      </div>
      <div class="right">
        <p class="success">注册成功！</p>
        <p>欢迎加入PicShow！</p>
        <div>
          <router-link to="/login">
            <span class="logBtn">立即登录</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      methods: {
        linkToLogin () {
          this.$router.push('/login');
        }
      }
    }
</script>

<style scoped>
  .wrapper {
    width: 100%;
    height: 100%;
  }

  .content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .left img {
    width: 350px;
  }

  .left {
    margin-left: -20%;
  }

  .right {
    margin-left: 50px;
    margin-top: -18%;
    text-align: left;
  }

  .right .success {
    font: bold 3pc "Cooper Black";
    color: rgba(43,194,52,1)
  }

  .right .logBtn {
    display: inline-block;
    font-size: 1.1pc;
    color: #fff;
    background-color: rgba(242,221,12,1);
    padding: 5px 60px;
    line-height: 30px;
    margin-top: 10%;
  }
</style>
