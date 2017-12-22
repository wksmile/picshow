<template>
  <div>
    <div v-for="(s,i) in fans" class="person">
      <single-person :information="s" :key="i"></single-person>
    </div>
  </div>
</template>

<script>
  // 个人页面关注的人
  import $ from 'jquery';
  import Cookies from 'js-cookie';
  import SinglePerson from './singlePerson.vue';

  export default {
    data () {
      return {
        fans: null
      }
    },
    created () {
      this.requestData();
    },
    methods: {
      requestData () {
        if(Cookies.get('token')) {
          var that = this;
          $.post("http://192.168.1.104:8081/user/info/follow",{
            token: Cookies.get('token'),
            page: 1,
            rows: 20
          })
          .done(function(res){
            if(res.status == 200) {
              console.log('已关注返回',res);
              that.fans = res.rows;
            } else {
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
      SinglePerson
    }
  }
</script>

<style scoped>
  .person {
    display: inline-block;
    width: 50%;
  }
</style>
