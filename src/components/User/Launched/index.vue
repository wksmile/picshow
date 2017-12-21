<template>
  <div class="wrapper">
    <ul>
      <li v-for="list in lists">
        <interest-block :list="list"></interest-block>
      </li>
    </ul>
  </div>
</template>

<script>
  // 个人页面已发布的状态
  import InterestBlock from "../../InterestBlock";

  export default {
    data () {
      lists: []
    },
    components: {
      InterestBlock
    }
  }
</script>

<style scoped>

</style>
