<template>
  <div class="wrapper">
    <div class="left">
      <img :src="list.photo">
    </div>
    <div class="middle">
      <p>{{list.nickname}}</p>
      <p>关注 12155 | 粉丝 45485</p>
      <p>地址：{{list.address}}</p>
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
    width: 100px;
  }

  .left img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }

  .middle {
    margin-left: 2%;
    width: 63%;
  }

  .right {
    float: right;
    width: 20%;
  }

</style>
