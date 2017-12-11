<template>
  <div class="wrapper">
    <div class="header">
      <div class="img icon">
        <img src="../../public/pic/person.png">
        <div class="message">
          <span class="name">
            kain
          </span>
          <span class="site">
            北极
          </span>
        </div>
      </div>
    </div>
    <div class="pic">
      <img src="../../public/pic/img1.jpg">
    </div>
    <div class="bottom">
      <div class="pic-information">
        <span class="icon">
          <img src="../../public/images/heart_line.png">
          <span>50000</span>
        </span>
        <span class="icon">
          <img src="../../public/images/chat.png">
        </span>
        <span class="icon">
          <img src="../../public/images/bookstate.png">
        </span>
      </div>
      <ul>
        <li v-for="comment in comments">
          {{comment}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
              "comments": [
                      "真的很好看", "太漂亮了", "wow，buautiful"
                    ]
            }
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
  }

.header, .pic, .bottom {
  width: 100%;
}

  .header {
    border: 1px solid #ddd;
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

  .message {
    position: absolute;
    margin-left: 50px;
    top: 10px;
    width: 50%;
  }

  .name {
    line-height: 20px;
  }

  .site {
  }

.pic-information {
  width: 100%;
  text-align: left;
}

  .pic img {
    width: 100%;
  }

  .icon {
    width: 50px;
    height: 50px;
  }

  .icon img {
    height: 30px;
    width: 30px;
  }

  .bottom {
    border: 1px solid #ddd;
    border-radius: 2px;
    border-top: none;
    margin: -2px;
    margin-top: 0;
    text-align: left;
  }
</style>
