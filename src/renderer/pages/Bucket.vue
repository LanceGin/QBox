<template>
  <div class="bucket-page">
    <bucket-header></bucket-header>
    <bucket-list></bucket-list>
  </div>
</template>

<script>
  import BucketHeader from '../components/BucketHeader';
  import BucketList from '../components/BucketList';

  export default {
    name: 'bucket',
    components: { BucketHeader, BucketList },
  };
</script>

<style scope>
  body {
    margin: 0;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
</style>
