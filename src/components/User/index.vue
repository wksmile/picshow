<template>
  <div class="wrapepr">
    <div class="content">
      <div class="top">
        <span class="photo">
          <img :src="information.photo">
        </span>
      </div>
      <div class="middle">
        <div class="detail">
          <span class="nickname">{{information.nickname}}</span>
          <span>
            <img src="../../public/images/address.png">
            {{information.address}}
          </span>
          <span>
            <img src="../../public/images/man.png">
            {{information.sex}}</span>
          <span>
            {{information.age}}
          </span>
          <span>
            编辑个人信息
            <img src="../../public/images/setting.png">
          </span>
        </div>
        <div class="user-choose">
          <span>
            关注
          </span>
          <span>
            粉丝
          </span>
          <span>已发布</span>
          <span>收藏</span>
        </div>
      </div>
      <div class="bottom">
        <div>
          <ul>
            <comment v-for="list in 4"></comment>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import Comment from '../Comment';

  export default {
    computed: {
      ...mapState(['information'])
    },
    components: {
      Comment
    }
  }
</script>

<style scoped>
  .wrapepr {
    width: 100%;
    height: 100%;
    padding-top: 108px;
    display: flex;
    justify-content: center;
    background-color: #eee;
  }

  .content {
    width: 70%;
  }

  .middle, .top, .bottom {
    width: 100%;
    background-color: #fff;
  }

  .top {
    width: 100%;
    height: 200px;
    background-image: url("../../public/pic/img1.jpg");
    position: relative;
  }

  .photo {
    display: inline-block;
    position: absolute;
    overflow: hidden;
    left: 5%;
    top: 160px;
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }

  .middle {
    height: 100px;
    width: 100%;
    text-align: left;
  }

  .detail {
    margin-left: 17%;
  }

  .detail span {
    display: inline-block;
    padding: 5px;
  }

  .detail img {
    width: 25px;
    height: 25px;
  }

  .nickname {
    font: bold 1.2pc "Helvetica Neue", Helvetica, Arial, sans-serif;
  }

  .user-choose {
    margin: 30px 20px 0;
  }

  .user-choose span {
    display: inline-block;
    padding: 5px 7px;
  }

  .bottom {
    margin-top: 10px;
    box-sizing: border-box;
    padding: 15px;
    width: 100%;
    text-align: left;
  }
</style>
