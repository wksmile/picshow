<template>
  <div id="app">
    <nav>
      <div class="header-wrapepr">
        <div class="block pic">
          <span>
            <img src="./public/images/instagram.png" width="35" height="35">
          </span>
          <span>
            <img src="./public/images/Instagram_font.png" height="35">
          </span>
          <span class="login">
            登录
          </span>
          <span class="reg">
            注册
          </span>
        </div>
        <div class="block search">
          <input placeholder=" 搜 索" />
        </div>
        <div class="block user">
          <span>
            <img src="./public/images/change.png" width="25">
          </span>
          <span>
            <img src="./public/images/heart_line.png" width="25">
          </span>
          <span>
            <img src="./public/images/people_copy_3.png" width="25">
          </span>
        </div>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  body {
    margin: 0;
    padding: 0
  }

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#app nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 77px;
  background-color: rgba(255,255,255,0.37);
  border-bottom: 1px solid #ddd;
}

#app .header-wrapepr {
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

  .block.pic span:first-child {
    border-right: 1px solid #999;
  }

  .block.search input {
    border: 1px solid #ddd;
    height: 30px;
    border-radius: 3px;
  }

  .block.user span {
    margin-right: 20px;
  }

  .login, .reg {
    float: right;
  }
</style>
