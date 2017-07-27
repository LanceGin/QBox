<template>
  <div class="manage-page">
    <bucket-header></bucket-header>
  </div>
</template>

<script>
  import BucketHeader from '../components/BucketHeader';

  export default {
    name: 'manage',
    components: { BucketHeader },
  };
</script>

<style>
  webkit,
  ::-webkit-scrollbar {
    width: 0;
  }
  body {
    margin: 0;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
</style>
