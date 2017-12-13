<template>
  <figure class="picture-continer"
          :style="{top: imgPos.position.top + 'px', left: imgPos.position.left + 'px',  transform:'rotate(' + this.imgPos.rotate + 'deg)'}"
          :class="{'is-center':imgPos.isCenter,'is-inverse':imgPos.isInverse}"
          @click.stop="pictureAction">
    <img :src="picture.src"
         :alt="picture.title" />
    <h2 class="img-title">{{picture.title}}</h2>
    <div class="img-back">
      <p>{{picture.desc}}</p>
    </div>
  </figure>
</template>
<script>
  // 引入event bus 作为组件间事件传递的中间件
  import bus from '../../assets/eventBus.js';

  export default {
    name: 'picture',
    props: ['picture', 'img-pos', 'index'],
    methods: {
      pictureAction: function () {
        if (this.$props.imgPos.isCenter) {
          // this.$props.imgPos.isInverse = !this.$props.imgPos.isInverse;
          this.$emit('refreshPic', this.$props.index);
        } else {
          this.$emit('doRearrange', this.$props.index);
        }
      }
    },
    data() {
      return {
        // imgPos: this.$props
      }
    },
    mounted() {

    },
    updated() {
      this.$nextTick(function () {
        if (this.$props.imgPos.isCenter) {
          // 由于roate 是内联样式，对于center的图片需要消除后才能让class的样式起作用
          this.$el.style.transform = '';
        }
      });
    }
  }
</script>
<style scoped>
  .picture-continer {
    width: 320px;
    height: 360px;
    margin: auto;
    padding: 40px 40px 0px 40px;
    box-sizing: border-box;
    border-radius: 1px;
    background-color: #fff;
    position: absolute;
    cursor: pointer;
    transform-style: preserve-3d;
    transform-origin: 0 50% 0; // 改变变化的原点为x轴原点
    transition: left .8s ease-in-out, top .8s ease-in-out, transform .5s;
    perspective: 1800px;
  }

  h2 {
    height: 80px;
    margin: 0;
    line-height: 80px;
    color: #727272;
    text-align: center;
    font-size: 16px;
  }

  .img-back {
    width: 320px;
    height: 360px;
    overflow: auto;
    position: absolute;
    left: 0;
    top: 0;
    background-color: #fff;
    transform: rotateY(-180deg);
  }

  .img-back p {
    padding: 40px;
    color: #727272;
    font-size: 16px;
  }

  .is-center {
    transform: rotate(0deg);
    z-index: 11;
  }

  .is-inverse {
    transform: translate(320px) rotateY(180deg);
  }
</style>
