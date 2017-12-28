<template>
  <div class="content">
    <img class="img" :src="imgSrc">
  </div>
</template>

<script>
    export default {
        data () {
            return {
                imgSrc: 'http://192.168.1.104:9091/group1/M00/00/00/wKgZhVmVV_qAGKarAAHxJw8JM7M836.jpg'
            }
        }
    }
</script>

<style scoped>
  .content {
    margin: 15px;
  }

  .img {
    width: 25%;
  }
</style>
