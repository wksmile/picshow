<template>
  <div class="wrapper">
    <div class="left">
      <p class="username">用户名：{{username}}</p>
      <ul class="select">
        <li><span>昵称</span><input v-model="nickname"/></li>
        <li><span>性别</span>
          <label for="man">
          男：<input type="radio" name="sex" value="man" id="man" checked/></label>
          <label for="wommom">
            女：<input type="radio" name="sex" value="wommom" id="wommom"/></label>
        </li>
        <li><span>地址</span><v-distpicker hide-area @selected="selectAddress"></v-distpicker></li>
        <li><span>电话</span><input v-model="phone"/></li>
        <li><span>学校</span><input v-model="school"/></li>
        <li><span>生日</span><datepicker @selected="selectBirthday" v-model="birthday" class="birthday"></datepicker></li>
        <li><span>简介</span><textarea v-model="description"></textarea></li>
      </ul>
      <input class="sumbit" type="button" value="保存" />
    </div>
    <div class="right">
      <my-upload field="uploadFile"
                 @crop-success="cropSuccess"
                 @crop-upload-success="cropUploadSuccess"
                 @crop-upload-fail="cropUploadFail"
                 v-model="show"
                 :width="300"
                 :height="300"
                 url="http://192.168.1.104:8083/user/update/photo/upload"
                 :params="params"
                 :headers="headers"
                 img-format="png"></my-upload>
      <img :src="imgDataUrl">
      <p><a class="btn" @click="toggleShow">设置头像</a></p>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import VDistpicker from 'v-distpicker';
  import Datepicker from 'vuejs-datepicker';
  import myUpload from 'vue-image-crop-upload';
  import $ from 'jquery';
  import Cookies from 'js-cookie';
  import person from './person.png';      //  这里的头像不能直接写url data到src，必须要通过computed返回

  export default {
    data () {
      return {
        username: '',
        nickname: '',
        phone: '',
        school: '',
        birthday: '',
        description: '',
        show: false,
        params: {
//          token: '123456798',
//          name: 'avatar'
        },
        headers: {
//        smail: '*_~'
          'Access-Control-Allow-Origin': '*',
          'enctype':'multipart/form-data'
        },
        imgDataUrl: person // the datebase64 url of created image
      }
    },
    created () {
      this.init();
    },
    computed: {
      ...mapState(['information']),
      defaultImg () {
        return person
      }
    },
    methods: {
      init () {
          console.log('Use nested data properties instead:',this.information);
        let {username, nickname, phone, school, birthday, description} = this.information;
        Object.assign(this.$data,{username, nickname, phone, school, birthday, description});
      },
      selectAddress (value) {
        console.log('selectAddress:', value);
      },
      selectBirthday (value) {
        console.log('selectBirthday',value);
      },
      toggleShow() {
        this.show = !this.show;
      },
      /**
       * crop success
       *
       * [param] imgDataUrl
       * [param] field
       */
      cropSuccess(imgDataUrl, field){
        console.log('-------- crop success --------');
        this.imgDataUrl = imgDataUrl;
        this.params = {
          id: this.information.id,
          token: Cookies.get('token')
        }
        var that = this;
        $.ajax({
          url: 'http://192.168.1.104:8083/user/update/photo/upload',
          type: 'POST',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'enctype':'multipart/form-data',
            'Access-Control-Allow-Headers': 'post,get'
          },
          data: {
            'uploadFile': field,
            'id': that.information.id,
            'token': Cookies.get('token')
          },
          success: function (res) {
            console.log('uploadFile:',res)
          },
          error: function (err) {
            console.log('uploadFile err:',err)
          }
        })
      },
      /**
       * upload success
       *
       * [param] jsonData   服务器返回数据，已进行json转码
       * [param] field
       */
      cropUploadSuccess(jsonData, field){
        console.log('-------- upload success --------');
        console.log(jsonData);
        console.log('field: ' + field);
      },
      /**
       * upload fail
       *
       * [param] status    server api return error status, like 500
       * [param] field
       */
      cropUploadFail(status, field){
        console.log('-------- upload fail --------');
        console.log(status);
        console.log('field: ' + field);
      }
    },
    components: {
      VDistpicker,
      Datepicker,
      myUpload
    }
  }
</script>

<style scoped>
  ul,li {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .wrapper {
    display: flex;
    padding: 10px 10px 10px 8%;
  }

  .left {
    flex: 1;
    text-align: left;
  }

  .select li {
    margin: 10px 0;
    height: 40px;
  }

  .select li span {
    display: inline-block;
    margin-right: 10px;
  }

  .select li>div {
    display: inline-block;
  }

  .select li input {
    display: inline-block;
    box-sizing: border-box;
    padding: 8px 12px;
    height: 40px;
    line-height: 40px;
    box-shadow: none;
    font-size: 1rem;
    color: #464a4c;
    background-image: none;
    border-radius: 0.25rem;
  }

  .username {
    font: bold 1.2pc "Helvetica Neue", Helvetica, Arial, sans-serif;
  }

  .sumbit {
    width: 20%;
    height: 40px;
    line-height: 40px;
    background: #00ffb6;
  }

  .right {
    width: 300px;
  }
</style>
