<template>
  <div class="main-page">
    <div class="bgPic">
      <re-gallery></re-gallery>
    </div>
    <div class="lists">
      <ul>
        <li v-for="a in 3" class="list">
          <interest-block></interest-block>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import ReGallery from "../ReGallery";
  import InterestBlock from "../InterestBlock";
  import $ from 'jquery';
  import Cookies from 'js-cookie';

    export default {
        mounted: function () {
              if(Cookies.get('token')) {
                console.log('token:---',Cookies.get('token'));
                $.post("http://192.168.1.104:8083/user/token",{token:Cookies.get('token')})
                  .done(function(res){
                    console.log('getToken:',res);
                  });
              } else {
                console.log('cookie error');
              }
        },
        components:{
          InterestBlock,
          ReGallery
        }
    }
</script>

<style scoped>
  ul,li {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .bgPic {
    width: 100%;
  }

  .bgPic img {
    width: 100%;
    margin-top: 78px;
  }

  .lists {
    width: 100%;
  }

  .list {
    margin-top: 100px;
  }
</style>
