<template>
  <div>
    <div v-for="(s,index) in 6" class="person">
      <single-person :key="index"></single-person>
    </div>
  </div>
</template>

<script>
  // 个人页面关注的人
  import SinglePerson from './singlePerson.vue';

  export default {
    components: {
      SinglePerson
    }
  }
</script>

<style scoped>
  .person {
    display: inline-block;
    width: 50%;
  }
</style>
