<template>
  <div class="wrapper">
    <ul>
      <li v-for="information in lists">
        <fans-block :list="information"></fans-block>
      </li>
    </ul>
  </div>
</template>

<script>
  // 粉丝页面
  import $ from 'jquery';
  import Cookies from 'js-cookie';
  import FansBlock from './fansBlock';

  export default {
    data () {
      return {
        lists: []
      }
    },
    created () {
      this.requestData();
    },
    methods: {
      requestData () {
        if(Cookies.get('token')) {
          var that = this;
          $.post("http://192.168.1.104:8081/user/info/fan",{
            token: Cookies.get('token'),
            page: 1,
            rows: 20
          })
            .done(function(res){
              if(res.status == 200) {
                console.log('粉丝返回',res);
                that.lists = res.rows;
              } else {
                console.log('已发布返回');
                // 应该加一个弹框提示未登录
                return;
              }
            });
        } else {
          console.log('has not logined');
        }
      }
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
