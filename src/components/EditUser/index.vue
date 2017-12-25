<template>
  <div class="wrapper">
    <div class="content">
      <div class="left">
        <ul @click="changePage">
          <li class="user">基本信息</li>
          <li class="privacy">隐私设置</li>
          <li class="safe">账户密码</li>
          <li class="answer">问答设置</li>
        </ul>
      </div>
      <div class="right">
        <transition name="component-fade" mode="out-in">
          <component v-bind:is="view"></component>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex';
  import $ from 'jquery';
  import Cookies from 'js-cookie';
  import User from './user.vue';
  import Privacy from './privacy.vue';
  import Safe from './safe';
  import Answer from './answer.vue';

  export default {
    data () {
      return {
        view: 'User'
      }
    },
    created () {
      this.isLogined();
    },
    methods: {
      ...mapMutations(['SET_INFORMATION']),
      isLogined () {
        if(Cookies.get('token')) {
          console.log('token:---',Cookies.get('token'));
          var that = this;
          $.post("http://192.168.1.104:8083/user/token",{
            token: Cookies.get('token')
          })
          .done(function(res){
            if(res.status == 200) {
              console.log('-------90909999');
              that.SET_INFORMATION(res.data);
            } else {
              // 应该加一个弹框提示未登录
              return;
            }
            console.log('getToken:',res);
          });
        } else {
          console.log('has not logined');
        }
      },
      changePage (e) {
        var targetClass = e.target.className;
        console.log('targetClass:',targetClass);
        switch (targetClass) {
          case 'user':
              this.view = 'User';
              break;
          case 'privacy':
            this.view = 'Privacy';
            break;
          case 'safe':
            this.view = 'Safe';
            break;
          default:
            this.view = 'User';
        }
      }
    },
    components: {
      User,
      Privacy,
      Safe,
      Answer
    }
  }
</script>

<style scoped>

ul,li {
  margin: 0;
  padding: 0;
  list-style: none;
}

.wrapper {
  padding-top: 77px;
  width: 100%;
  height: 100%;
}

.content {
  width: 70%;
  height: 100%;
  display: flex;
  margin: 0 auto;
}

.left {
  width: 300px;
  background: #dffff8;
  padding: 20px 0;
}

.left li {
  padding: 6px 0;
}

.left li:hover {
  background: #f7ff71;
  cursor: pointer;
}

.right {
  flex: 1;
  background: #fff4fd;
}
</style>
