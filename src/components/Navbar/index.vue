<template>
  <span class="nav-button"
        :class="{'is-center':imgPos.isCenter, 'is-inverse':imgPos.isInverse}"
        @click.stop="pictureAction"></span>
</template>
<script>
  // 引入event bus 作为组件间事件传递的中间件
  import bus from '../../assets/eventBus.js';

  export default {
    name: 'navbar',
    props: ['img-pos','index'],
    methods: {
      pictureAction: function () {
        if (this.$props.imgPos.isCenter) {
          // this.$props.imgPos.isInverse = !this.$props.imgPos.isInverse;
          bus.$emit('refresh-pic', this.$props.index);
        } else {
          bus.$emit('do-rearrange', this.$props.index);
        }
      }
    },
    data() {
      return {
        // imgPos: this.$props
      }
    },
    mounted() { },
    updated() { }
  }
</script>
<style scoped>
  @font-face {
    font-family: 'iconfont';
    /* project id 226408 */
    src: url('../../font/iconfont.eot') format('embedded-opentype'),
    url('../../font/iconfont.woff') format('woff'),
    url('../../font/iconfont.ttf') format('truetype'),
    url('../../font/iconfont.svg') format('svg');
  }

  .nav-button {
    width: 30px;
    height: 30px;
    margin: 0 5px;
    border-radius: 15px;
    background: #aaa;
    display: inline-block;
    cursor: pointer;

    text-align: center;
    vertical-align: middle;

    z-index: 100;

    transform: scale(.5);
    transition: transform .6s ease-in-out;
  }

  .is-center {
     background-color: #888;
     transform: scale(1);
  }

  .is-center::after {
     line-height: 30px;
     font-family: 'iconfont';
     color: #fff;
     content: "\e620";
   }

  .is-inverse {
    background-color: #555;
    transform: rotateY(180deg);
  }
</style>
