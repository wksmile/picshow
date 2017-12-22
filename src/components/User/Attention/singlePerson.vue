<template>
  <div class="wrapper">
    <div class="left">
      <img src="../../../public/pic/person.png">
    </div>
    <div class="right">
      <p class="nickname">{{information.nickname}}
        <span v-if="information.sex">
          <img :src="sexPic" with="16" height="16">
        </span>
      </p>
      <p><img :src="attendImg" width="22" height="22">{{attendTxt}}</p>
      <p class="description">{{information.description}}</p>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import man from '../../../public/images/man.png';
  import women from '../../../public/images/women.png';
  import attend from '../../../public/images/attend.png';
  import attendOther from '../../../public/images/attention-other.png';

  export default {
    data () {
      return {
      }
    },
    props: ['information'],
    computed: {
      sexPic () {
        if (this.information.sex == 1) return man;
        if (this.information.sex == 2) return women;
        return null;
      },
      attendImg () {
        return this.information.follow == 1 ? attend : attendOther;
      },
      attendTxt () {
        return this.information.follow == 1 ? '已关注' : '关注';
      }
    }
  }
</script>

<style scoped>
  .wrapper {
    margin: 5px;
    padding: 5px;
    background-color: rgba(145,145,145,0.15);
    position: relative;
  }

  .left {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30%;
    height: 100px;
    overflow: hidden;
    border-right: 1px solid #999;
  }

  .left img {
    width: 60%;
    border-radius: 50%;
  }

  .right {
    position: absolute;
    top: 0;
    left: 30%;
    margin: 10px;
  }

  .right p {
    margin: 8px 0;
  }

  .nickname {
    font: bold 1.1pc "Helvetica Neue", Helvetica, Arial, sans-serif;
  }

  .description {
    font: 0.8pc "Helvetica Neue", Helvetica, Arial, sans-serif;
    color: #666;
  }
</style>
