<template>
  <div class="manage-tool">
    <div class="manage-btn">
      <el-button class="w-btn" type="text" icon="upload">上传</el-button>
      <el-button class="w-btn" type="text" icon="edit">刷新</el-button>
      <el-button class="w-btn" type="text" icon="share">下载</el-button>
      <el-button class="w-btn" type="text" icon="delete">删除</el-button>
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
        filter: '',
      };
    },
    methods: {
      search(e) {
        console.log(e);
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
    margin-left: 18vw;
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
