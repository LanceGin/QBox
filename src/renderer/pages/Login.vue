<template>
  <div class="login-page">
    <bucket-header></bucket-header>
    <no-bucket></no-bucket>
  </div>
</template>

<script>
  import BucketHeader from '../components/BucketHeader';
  import NoBucket from '../components/NoBucket';

  export default {
    name: 'login',
    components: { BucketHeader, NoBucket },
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
