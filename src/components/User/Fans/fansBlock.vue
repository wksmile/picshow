<template>
  <div class="wrapper">
    <div class="left">
      <img :src="list.photo" width="50" height="50">
    </div>
    <div class="middle">
      <p>{{list.nickname}}</p>
      <p>关注 12155 | 粉丝 45485</p>
      <p>地址：湖北 武汉</p>
    </div>
    <div class="right">
      <span>+ 关注</span>
    </div>
  </div>
</template>

<script>
    export default {
      props: [
        'list'
      ]
    }
</script>

<style scoped>

  .wrapper {
    width: 100%;
    position: relative;
    overflow: hidden;
    padding: 8px;
  }

  .wrapper, .right, .middle {
    float: left;
  }

  .left {
    float: left;
    width: 12%;
  }

  .left img {
    border-radius: 50%;
  }

  .middle {
    width: 63%;
  }

  .right {
    width: 25%;
  }

</style>
