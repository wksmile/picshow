<template>
  <div class="main-page">
    <div class="bgPic">
      <img src="../../public/images/stock.jpg">
    </div>
    <div class="lists">
      <ul>
        <li v-for="a in 2" class="list">
          <interest-block></interest-block>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import InterestBlock from "../InterestBlock";

    export default {
        components:{
          InterestBlock
        }
    }
</script>

<style scoped>
  ul,li {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .bgPic img {
    width: 100%;
  }

  .lists {
    width: 100%;
    margin-left: 30%;
  }

  .list {
    margin-top: 100px;
  }
</style>
