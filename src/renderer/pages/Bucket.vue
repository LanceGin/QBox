<template>
  <div class="bucket-page">
    <bucket-header></bucket-header>
    <div class="bucket-list">
      <bucket-list></bucket-list>
    </div>
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

<style>
  webkit,
  ::-webkit-scrollbar {
    width: 0;
  }
  body {
    margin: 0;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
  .bucket-list {
    padding-top: 50px;
  }
</style>
