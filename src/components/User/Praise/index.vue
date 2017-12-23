<template>
  <div class="wrapper">
    <ul>
      <li v-for="list in lists" class="single-block">
        <interest-block :list="list"></interest-block>
      </li>
    </ul>
  </div>
</template>

<script>
  // 个人页面已赞的状态
  import $ from 'jquery';
  import Cookies from 'js-cookie';
  import InterestBlock from "../../InterestBlock";

  export default {
    data () {
      return {
        lists: null
      }
    },
    created () {
      this.requestData();
    },
    methods: {
      requestData () {
        if(Cookies.get('token')) {
          var that = this;
          $.post("http://192.168.1.104:8081/user/info/thumbup",{
            token: Cookies.get('token'),
            page: 1,
            rows: 10
          })
          .done(function(res){
            if(res.status == 200) {
              console.log('已赞返回',res);
              that.lists = res.rows;
            } else {
              console.log('已赞返回');
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

  .single-block {
    margin-top: 30px;
  }
</style>
