<template>
  <div id="app">
    <header-top :isShowTxt="isShowTxt"></header-top>
    <router-view/>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import HeaderTop from './components/common/HeaderTop';

export default {
  name: 'app',
  data () {
      return {
      }
  },
  computed: {
    ...mapState([
      'isShowTxt'
    ])
  },
  components: {
    HeaderTop
  }
}
</script>

<style>
  @font-face {
    font-family: 'huawen';
    src: url('./font/huawenlishu.ttf') format('truetype')
  }

  html,body {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    background-color: #f7f8fa;
  }

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
</style>
