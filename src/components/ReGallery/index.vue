<template>
  <div id="container" class="stage">
    <!-- 图片区域 -->
    <section class="img-sec">
      <Picture v-for="(picture, index) in pictureList"
               :key="index"
               :index="index"
               :picture="picture"
               :img-pos="imgArrangeList[index]"
               ref="pictureList"
               v-on:doRearrange="doRearrange"
               v-on:refreshPic="refreshPic"
      ></Picture>
    </section>
    <!-- 导航条区域 -->
    <section class="nav-sec">
      <navbar v-for="(picture, index) in pictureList"
              :key="index"
              :index="index"
              :img-pos="imgArrangeList[index]"></navbar>
    </section>
  </div>
</template>
<script>
  // 引入event bus 作为组件间事件传递的中间件
  import bus from '../../assets/eventBus.js';

  import Picture from '../Picture';
  import Navbar from '../Navbar';

  // 舞台区域大小 因为要撑满整个屏幕，所以采用屏幕的宽高
  var stageOpt = {
    // 页面的高度与宽度，配合overflow:hidden 让舞台充满整个页面
    width: document.documentElement.clientWidth,
    height: '600px'
  };

  // 获取图片列表并补充src值
  var imageData = require('../../config/imgConfig.json')
  var imgList = (function (imageDatas) {
      // 这里imageDatas是一个数组，而for in循环是循环对象的属性，数组每一项的属性是索引号，也就是1,2,3,4......
    for (var i in imageDatas) {
      imageDatas[i].src = require('../../images/' + imageDatas[i].src);  //获取图片地址,将imgConfig中的src属性换成对应的地址
    }
    return Array.from(imageDatas);
  })(imageData);

  // 在两个值之间取一个随机值
  function getRandomValue(low, high) {
    return Math.ceil(Math.random() * (high - low) + low);
  }

  // 获取一个0~30°之间的任意正负角度
  function getRandomRange() {
    return (Math.random() > 0.5 ? '' : '-') + Math.ceil(Math.random() * 30);
  }

  export default {
    name: 'app',
    data() {
      return {
        pictureList: [],   // 获取图片地址src后的数组列表
        imgArrangeList: [
          // 数据结构
          // {
          //  position: {
          //    left: 0,
          //    top: 0
          //  },
          // rotate: 0,  表示旋转角度
          // isInverse: false , 表示图片正反面
          // isCenter: false
          // }
        ],
        areaPostition: {
          center: { // 中心区域位置
            left: 0,
            top: 0
          },
          hPosRange: { // 水平区域范围
            leftRange: [0, 0],
            rightRange: [0, 0],
            top: [0, 0]
          },
          vPosRange: { // 垂直区域范围
            x: [0, 0],
            topRange: [0, 0]
          }
        },
        imgSize: {
          width: 320,
          height: 360
        }
      }
    },
    methods: {
        // 这里用的输入的sizeObj是上面定义的stageOpt变量，用来定义vue实例定义的根元素的宽和高
      setStageSize: function (sizeObj) {
        var stage = this.$el;
        stage.style.width = sizeObj.width + 'px';
        stage.style.height = sizeObj.height + 'px';
      },
      // 初始化定义所有的图片信息
      initImgArrangeList: function (pictureList) {
        for (var i = 0; i < pictureList.length; i++) {
          this.imgArrangeList[i] = {
            position: {
              left: 0,
              top: 0
            },
            rotate: 0,
            isInverse: false,
            isCenter: false
          }
        }
      },
      setAreaPosition: function () {
        // 图片位置区域计算
        var stageHalfWidth = Math.ceil(stageOpt.width / 2);
        var stageHalfHeight = Math.ceil(stageOpt.height / 2);

        // 获取图片大小 因为图片都是相同的所以取第一个图片
        var imgSize = this.imgSize;
        var imgHalfWidth = Math.ceil(imgSize.width / 2);
        var imgHalfHeight = Math.ceil(imgSize.height / 2);

        // 计算中心图片位置点
        this.areaPostition.center = {
          left: stageHalfWidth - imgHalfWidth,
          top: stageHalfHeight - imgHalfHeight
        };
        // 计算左右侧区域范围
        this.areaPostition.hPosRange = {
          leftRange: [0 - imgHalfWidth, stageHalfWidth - 3 * imgHalfWidth],
          rightRange: [stageHalfWidth + imgHalfWidth, stageOpt.width - imgHalfWidth],
          top: [0 - imgHalfHeight, stageHalfHeight + imgHalfHeight]
        };
        // 计算上侧区域取值范围
        this.areaPostition.vPosRange = {
          x: [stageHalfWidth - imgHalfWidth, stageHalfWidth],
          topRange: [0 - imgHalfHeight, stageHalfHeight - imgHalfHeight * 3]
        };
      },
      rearrange: function (centerIndex) {
        let imgArrangeList = this.imgArrangeList;
        let AreaPos = this.areaPostition;
        let center = AreaPos.center;

        let hPosRangeLeftRange = AreaPos.hPosRange.leftRange;
        let hPosRangeRightRange = AreaPos.hPosRange.rightRange;
        let hPosRangeTop = AreaPos.hPosRange.top;
        let vPosRangeX = AreaPos.vPosRange.x;
        let vPosRangeTopRange = AreaPos.vPosRange.topRange;

        let imgTopArray = [];
        let topImgNumber = Math.floor(Math.random() * 2); // 取上测区域的图片数量0或者1个

        // 取得居中图片
        let centerImgArray = imgArrangeList.splice(centerIndex, 1);
        // 定义居中图片的位置
        centerImgArray[0].position = center;
        centerImgArray[0].rotate = 0; // 中间图片不需要旋转
        centerImgArray[0].isCenter = true;

        // 取出上侧图片的信息，如果有上侧图片，随机取一张图片作为上侧图片
        let topImgSpliceIndex = Math.floor(Math.random() * (imgArrangeList.length - topImgNumber));
        imgTopArray = imgArrangeList.splice(topImgSpliceIndex, topImgNumber);
        // 布局上侧图片
        imgTopArray.forEach(function (img) {
          img.position = {
              // 根据显示的窗口大小在水平范围内随机取一个数作为左边距离，... 作为上面距离
            left: getRandomValue(vPosRangeX[0], vPosRangeX[1]),
            top: getRandomValue(vPosRangeTopRange[0], vPosRangeTopRange[1])
          }
          img.rotate = getRandomRange();
          img.isCenter = false;
        });
        // 布局左右两侧图片
        for (let i = 0, len = imgArrangeList.length, k = len / 2; i < len; i++) {
          // 设置一个临时变量，其结构与每一个 imgArrangeList[i]相同
          let tmpItem = {};
          let hPosRangeTmp = null;
          // 取布局的随机值，
          if (i < k) {
            hPosRangeTmp = hPosRangeLeftRange;
          } else {
            hPosRangeTmp = hPosRangeRightRange;
          }
          tmpItem = {
            position: {
              left: getRandomValue(hPosRangeTmp[0], hPosRangeTmp[1]),
              top: getRandomValue(hPosRangeTop[0], hPosRangeTop[1])
            },
            rotate: getRandomRange(),
            isCenter: false,
            isInverse: imgArrangeList[i].isInverse
          };
          // 这样可以设置添加对象的属性
          this.$set(imgArrangeList, i, tmpItem);
        }

        // 重新合成数组，将上侧图片插入数组
        if (imgArrangeList && imgTopArray[0]) {
          imgArrangeList.splice(topImgSpliceIndex, 0, imgTopArray[0]);
        }
        // centerIndex为函数传入的变量，将中间的元素插入到数组中
        imgArrangeList.splice(centerIndex, 0, centerImgArray[0]);

        this.imgArrangeList = imgArrangeList;
      },
      doRearrange: function (index) {
          // 重排画廊
        this.rearrange(index);
      },
      refreshPic: function (index) {
        var tmpItem = this.imgArrangeList[index];
        // tmpItem.isCenter = !tmpItem.isCenter;
        // 翻转图片
        tmpItem.isInverse = !tmpItem.isInverse;
        this.$set(this.imgArrangeList, index, tmpItem);
      }
    },
    mounted() {
      this.pictureList = imgList;
      this.initImgArrangeList(this.pictureList);
      this.setStageSize(stageOpt);
      this.setAreaPosition();
      // console.log(this.imgArrangeList);
      this.rearrange(0);
    },
    beforeUpdate() {
      // this.arrange = false;
    },
    updated() {
      // this.arrange = true;
      this.$nextTick(function () {

      });
    },
    components: {
      Picture,
      Navbar
    }
  }
</script>
<style scoped>
  /*body {*/
    /*width: 100%;*/
    /*height: 100%;*/
    /*overflow: hidden;*/
    /*position: relative;*/
    /*margin: 0;*/
    /*padding: 0;*/
    /*background: #222;*/
  /*}*/

  .stage {
    width: 100%;
    height: 600px;
    overflow: hidden;
    background: #dddddd;
    position: relative;
    margin-top: 77px;
  }

  .nav-sec {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 30px;
    z-index: 101;
    text-align: center;
  }
</style>
