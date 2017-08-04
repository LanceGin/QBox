<template>
  <div class="manage-tool">
    <div class="bucket-info">
      <el-tag class="bucket-name">{{ bucket }}</el-tag>
    </div>
    <div class="manage-btn">
      <el-button class="w-btn" type="text" icon="upload" @click="upload()"> 上传</el-button>
      <el-button class="w-btn" type="text" icon="time" @click="refresh()"> 刷新</el-button>
      <el-button class="w-btn" type="text" icon="delete" :disabled="batchShow" @click="batchDelete()">删除</el-button>
      <el-button class="w-btn" type="text" :disabled="true" icon="document" @click="batchDownload()"> 下载</el-button>
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
  import Bus from '../utils/bus';

  export default {
    name: 'manage-tool',
    data() {
      return {
        bucket: this.$route.query.bucket,
        filter: '',
        batchShow: true,
      };
    },
    created() {
      Bus.$on('batchShowStatus', (multipleSelection) => {
        if (multipleSelection.length > 0) {
          this.batchShow = false;
        } else {
          this.batchShow = true;
        }
      });
    },
    destroyed() {
      Bus.$off('batchShowStatus');
    },
    methods: {
      search() {
        // file list filter
        Bus.$emit('search', this.filter);
      },
      refresh() {
        Bus.$emit('refresh');
      },
      upload() {
        this.$router.push({ path: `/upload?bucket=${this.bucket}` });
      },
      batchDelete() {
        Bus.$emit('batchDelete');
      },
      batchDownload() {
        Bus.$emit('batchDownload');
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
