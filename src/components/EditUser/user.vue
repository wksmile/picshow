<template>
  <div class="wrapper">
    <div class="left">
      <p class="username">用户名：{{username}}</p>
      <ul class="select">
        <li><span>昵称</span><input v-model="nickname"/></li>
        <li><span>性别</span>
          <label for="man">男</label>
          <input type="radio" name="sex" value="1" id="man" v-model="sex" checked/>
          <label for="wommom">女</label>
          <input type="radio" name="sex" value="2" id="wommom" v-model="sex" />
        </li>
        <li><span>地址</span><v-distpicker hide-area @selected="selectAddress"></v-distpicker></li>
        <li><span>电话</span><input v-model="phone"/></li>
        <li><span>学校</span><input v-model="school"/></li>
        <li><span>生日</span>
          <datepicker  @selected="selectBirthday" v-model="birthday"></datepicker>
        </li>
        <li><span>简介</span><textarea class="description" v-model="description"></textarea></li>
      </ul>
      <input class="sumbit" type="button" value="保存" @click="submit" />
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
                 img-format="png"
                 ></my-upload>
      <img :src="imgDataUrl" width="200">
      <p><a class="btn" @click="toggleShow">设置头像</a></p>
    </div>
    <form id="uploadForm" action="http://192.168.1.104:8083/user/update/photo/upload"  method="post" enctype="multipart/form-data">
      <input id="uploadFile" type="file" name="uploadFile"/>
      <input id="id" name="id" value="2"/>
      <input id="token" name="token" value="dd9dbb12-74b0-4845-9bf4-4d31a84ff2b3"/>
      <input id="upload" type="submit" value="upload">
    </form>
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
        address: '',
        birthday: '',
        description: '',
        show: false,
        sex: null,
        params: {
//          token: '123456798',
//          name: 'avatar'
        },
        headers: {
//        smail: '*_~'
          'Access-Control-Allow-Origin': '*',
          'Content-type' : 'multipart/form-data, boundary=AaB03x',
          'withCredentials': true
        },
        imgDataUrl: person // the datebase64 url of created image
      }
    },
    beforeMounted () {
      this.init();
    },
    computed: {
      ...mapState(['information']),
      defaultImg () {
        return person
      }
    },
    methods: {
      uploadFile () {
          var that = this;
        $.ajax({
          url: "http://192.168.1.104:8083/user/update/photo/upload",
          type: 'POST',
          cache: false,
          data: {
            'uploadFile':new FormData($("#uploadForm")[0]),
            'id': that.information.id,
            'token': Cookies.get('token')
          },
          processData: false,
          contentType: false,
          success: function (result) {
          },
          error: function (err) {
          }
        });
      },
      demo (file) {
        if (file.files && file.files[0])
        {
          var reader = new FileReader();
          reader.onload = function(evt){
            console.log('用户上传',evt.target.result)
          }
          var that = this;
          $.ajax({
            url: 'http://192.168.1.104:8083/user/update/photo/upload',
            type: 'POST',
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-type' : 'multipart/form-data',
              'Access-Control-Allow-Headers': 'post,get,options'
            },
            data: {
              'uploadFile': file.files[0],
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
        }
        else
        {
          console.log('upload fail');
        }
      },
      submit () {
        if(Cookies.get('token')) {
          console.log('token:---',Cookies.get('token'));
          var that = this;
          $.post("http://192.168.1.104:8083/user/update/info",{
            token: Cookies.get('token'),
            id: that.information.id,
            nickname: that.nickname,
            sex: that.sex,
            address: that.address,
            phone: that.phone,
            school: that.school,
            birthday: that.birthday,
            description: that.description
          })
          .done(function(res){
            if(res.status == 200) {
              console.log('上传用户信息',res);
            } else {
              // 应该加一个弹框提示未登录
              console.log('上传用户信息失败');
              return;
            }
          });
        } else {
          console.log('has not logined');
        }
      },
      init () {
          console.log('Use nested data properties instead:',this.information);
        let {username, nickname, phone, school, birthday, description} = this.information;
        Object.assign(this.$data,{username, nickname, phone, school, birthday, description});
        this.imgDataUrl = this.information.photo
      },
      selectAddress (ad) {
        console.log('selectAddress:', ad);
        this.address = ad.province.value + ',' + ad.city.value;
      },
      selectBirthday (value) {
          // 将日期转化为毫秒数
        console.log('selectBirthday',value.getTime());
        this.birthday = value.getTime();
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
//        var that = this;
//        $.ajax({
//          url: 'http://192.168.1.104:8083/user/update/photo/upload',
//          type: 'POST',
//          headers: {
//            'Access-Control-Allow-Origin': '*',
//            'Content-type' : 'multipart/form-data',
//            'Access-Control-Allow-Headers': 'post,get,options',
//            'withCredentials': true
//          },
//          data: {
//            'uploadFile': field,
//            'id': that.information.id,
//            'token': Cookies.get('token')
//          },
//          success: function (res) {
//            console.log('uploadFile:',res)
//          },
//          error: function (err) {
//            console.log('uploadFile err:',err)
//          }
//        })
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
    display: flex;
    align-items: center;
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

  .birthday {
    height: 40px;
  }

  #man {
    margin-right: 30px;
  }

  .description {
    resize:none
  }

  .username {
    font: bold 1.2pc "Helvetica Neue", Helvetica, Arial, sans-serif;
  }

  .sumbit {
    height: 40px;
    width: 40%;
    line-height: 40px;
    margin-left: 42px;
    background: #00f43f;
    border: none;
  }

  .right {
    width: 300px;
  }
</style>
