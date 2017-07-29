<template>
  <div class="manage-page">
    <bucket-header></bucket-header>
    <manage-tool></manage-tool>
    <div class="file-list">
      <file-list></file-list>
    </div>
  </div>
</template>

<script>
  import BucketHeader from '../components/BucketHeader';
  import ManageTool from '../components/ManageTool';
  import FileList from '../components/FileList';

  export default {
    name: 'manage',
    components: { BucketHeader, ManageTool, FileList },
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
  .file-list {
    padding-top: 100px;
  }
</style>
