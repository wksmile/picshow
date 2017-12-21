<template>
  <div class="wrapper">
    <ul>
      <li v-for="a in 8">
        <fans-block :list="information"></fans-block>
      </li>
    </ul>
  </div>
</template>

<script>
  // 粉丝页面
  import {mapState} from 'vuex';
  import FansBlock from './fansBlock';

  export default {
    computed: {
      ...mapState(['information']),
    },
    components: {
      FansBlock
    }
  }
</script>

<style scoped>
  .wrapper {
    overflow: hidden;
  }

  .wrapper li {
    overflow: hidden;
    border-bottom: 1px solid rgba(0,0,0,0.2);
  }

  ul,li {
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>
