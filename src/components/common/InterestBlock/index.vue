<template>
  <div class="wrapper" v-if="list">
    <div class="header">
      <div class="img icon">
        <img :src="list.user.photo">
        <div class="message">
          <span class="name">
            {{list.user.nickname}}
          </span>
          <sex :sex="list.user.sex"></sex>
        </div>
      </div>
      <p class="description">{{list.description}}</p>
    </div>
    <div class="pic">
      <img :src="list.picture">
    </div>
    <p class="site float-left" v-if="list.location"><img src="./address.png" width="14"> {{list.location}}</p>
    <p class="site text-right">{{time}}</p>
    <div class="bottom">
      <div class="pic-information">
        <span class="icon">
          <img :src="heartPic">
          <span class="likenum">{{list.thumbupCount}}</span>
        </span>
        <span class="icon">
          <img :src="collectPic">
        </span>
      </div>
      <ul>
        <li v-for="comment in comments"  class="commentList">
          {{comment}}
        </li>
      </ul>
      <section class="comment-section">
        <form>
          <textarea aria-label="添加评论..." placeholder="添加评论..." class="write-comment"></textarea>
        </form>
      </section>
    </div>
  </div>
</template>

<script>
  // 主页中每一个模块的组件
  import {publicTime} from '../../../public/js/parse-time';
  import Sex from '../../../base/sex';
  import collect from './collect.png';
  import collected from './collected.png';
  import heart_line from './heart_line.png';
  import heart_line_red from './heart_line_red.png';

    export default {
      data() {
        return {
          "comments": [
            "kain:真的很好看", "haiFeng@kain:太漂亮了", "fan:wow，buautiful"
          ]
        }
      },
      computed: {
        collectPic () {
          return this.list.favorite === 1 ? collected : collect;
        },
        heartPic () {
          return this.list.thumbup === 1 ? heart_line_red : heart_line;
        },
        time () {
          return publicTime(this.list.time);
        }
      },
      props: {
        "list": Object
      },
      components: {
        Sex
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
    width: 50%;
    background: white;
    position: relative;
    margin: 0 auto;
    border: 1px solid #ddd;
  }

.header, .pic, .bottom {
  width: 100%;
}

.site {
  font-size: 0.8pc;
  margin: 10px 30px;
  color: #999;
}

.float-left {
  float: left;
}

.text-right {
  text-align: right;
}

  .header {
    border-radius: 2px;
    border-bottom: none;
    margin: -2px;
    margin-bottom: 0;
    text-align: left;
  }

  .img {
    display: inline-block;
    height: 50px;
    padding: 10px;
    position: relative;
  }

  .img img {
    width: 30px;
    border-radius: 50% 50%;
  }

  .img img:hover {
    cursor: pointer;
    border: 1px solid #f2dd0c;
  }

  .message {
    display: flex;
    align-items: center;
  }

  .message span {
    margin-left: 10px;
  }

.name {
  line-height: 20px;
  color: #3352ff;
  font-weight: bold;
}

.name:hover {
  cursor: pointer;
  color: burlywood;
}

.description {
  margin: 0 0 10px 50px;
}

.pic-information {
  overflow: hidden;
  width: 100%;
  vertical-align: top;
}

.pic-information .icon:first-child {
  display: flex;
  float: left;
}

.pic-information .icon:last-child {
  float: right;
}

.likenum {
  margin-left: 10px;
}

  .pic img {
    width: 100%;
  }

  .icon {
    display: flex;
    align-items: center;
  }

  .icon img {
    height: 30px;
    width: 30px;
  }

  .icon .likenum {
    position: relative;

  }

  .bottom {
    border-radius: 2px;
    border-top: none;
    margin: -2px;
    margin-top: 0;
    text-align: left;
    padding: 10px;
    font-family: "Arial Unicode MS";
    box-sizing: border-box;
  }

  .commentList {
    margin: 10px 0;
  }

  .comment-section {
    padding-right: 26px;
    margin-top: 4px;
    border-top: 1px solid #efefef;
    color: #999;
    flex-shrink: 0;
    font-size: 14px;
    line-height: 22px;
    -webkit-box-pack: center;
    justify-content: center;
    padding: 16px 0;
  }

  .write-comment {
    width: 100%;
    background: 0 0;
    border: none;
    color: #262626;
    font-size: inherit;
    height: 18px;
    max-height: 80px;
    outline: none;
    padding: 0;
    resize: none;
    display: flex;
    -webkit-box-flex: 1;
    flex-grow: 1;
  }
</style>
