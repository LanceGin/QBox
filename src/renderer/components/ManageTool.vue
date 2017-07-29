<template>
  <div class="manage-tool">
    <div class="bucket-info">
      <el-tag class="bucket-name">{{ bucket }}</el-tag>
    </div>
    <div class="manage-btn">
      <el-button class="w-btn" type="text" icon="upload" @click="upload()">上传</el-button>
      <el-button class="w-btn" type="text" icon="edit">刷新</el-button>
      <el-button class="w-btn" type="text" icon="share" :disabled="true">下载</el-button>
      <el-button class="w-btn" type="text" icon="delete" :disabled="true">删除</el-button>
    </div>
    <div class="search-input">
      <el-input
        placeholder="搜索"
        icon="search"
        v-model="filter"
        :on-icon-click="search">
      </el-input>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'manage-tool',
    data() {
      return {
        bucket: this.$route.query.bucket,
        filter: '',
      };
    },
    methods: {
      search() {
        // file list filter
      },
      upload() {
        this.$router.push({ path: `/upload?bucket=${this.bucket}` });
      },
    },
  };
</script>

<style scope>
  .manage-tool {
    position: fixed;
    margin-top: 50px;
    width: 100vw;
    height: 50px;
    -webkit-app-region: drag;
    background: #2e84c7;
  }
  .manage-btn {
    float: left;
    margin-left: 4vw;
  }
  .bucket-info {
    float: left;
    margin-left: 10vw;
    padding-top: 4px;
  }
  .bucket-name {
    background: #fff;
    color: #2e84c7;
  }
  .w-btn,
  .w-btn:hover,
  .w-btn:focus {
    color: #fff;
  }
  .search-input {
    float: right;
    margin-right: 10vw;
  }
</style>
