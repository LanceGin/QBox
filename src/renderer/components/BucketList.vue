<template>
  <div id="bucket-list-page">
    <div class="logout">
      <el-button type="text" class="logout-btn" icon="upload2" @click="logout()" v-loading.fullscreen.lock="fullscreenLoading"></el-button>
    </div>
    <div v-for="bucket in bucketList" :key="bucket" class="bucket-item">
      <div class="item-icon"></div>
      <div class="item-name">
        <p>{{ bucket }}</p>
      </div>
      <div class="item-handler">
        <i class="el-icon-edit" @click="manage(bucket)"></i>
        <i class="el-icon-delete"></i>
      </div>
    </div>
  </div>
</template>

<script>
  // import Qiniu class
  import Qiniu from '../utils/qiniu';

  const BrowserWindow = require('electron').remote.BrowserWindow;

  let buckets;
  export default {
    name: 'bucket-list',
    data() {
      return {
        fullscreenLoading: false,
        bucketList: buckets,
      };
    },
    mounted() {
      const accessKey = localStorage.accessKey;
      const secretKey = localStorage.secretKey;
      Qiniu.buckets(accessKey, secretKey)
        .then((data) => {
          this.bucketList = data;
        })
        .catch((err) => {
          // 当token无效时触发
          this.$message(`${err.error.error}...💔`);
          localStorage.clear();
          this.$router.push({ path: '/login' });
        });
    },
    methods: {
      // logout function.
      // keys will be clear.
      logout() {
        const router = this.$router;
        this.$confirm('确认退出并清空公私钥？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          customClass: 'confirm-box',
        }).then(() => {
          localStorage.clear();
          this.fullscreenLoading = true;
          setTimeout(() => {
            router.push({ path: '/login' });
            this.fullscreenLoading = false;
          }, 1000);
        }).catch(() => {
        });
      },

      // manage function.
      // open a new window to manage files.
      manage(bucket) {
        // window.open(this.$router);
        const win = new BrowserWindow({
          height: 640,
          useContentSize: true,
          width: 1000,
          titleBarStyle: 'hidden-inset',
          resizable: false,
        });
        const winURL = process.env.NODE_ENV === 'development'
          ? 'http://localhost:9080'
          : `file://${__dirname}/index.html`;
        win.loadURL(`${winURL}#/manage?bucket=${bucket}`);
      },
    },
  };
</script>

<style scope>
  .logout-btn {
    position: fixed;
    right: 30px;
    top: 6px;
    color: #fff;
  }
  .logout-btn:hover {
    color: #fff;
  }
  .el-icon-upload2 {
    cursor: pointer;
  }
  .confirm-box {
    width: 80vw;
  }
  .bucket-item {
    height: 50px;
    border-bottom: 1px #eee solid;
    padding: 5px 20px;
  }
  .bucket-item:hover {
    background: #eee;
  }
  .item-icon {
    float: left;
    height: 48px;
    width: 48px;
    background: url("../../../static/img/bucket.png") no-repeat;
    background-size: contain;
    background-position: 0 2px;
  }
  .item-name {
    float: left;
    padding-left: 10px;
    color: #888;
  }
  .item-handler {
    float: right;
    padding-top: 15px;
  }
  .item-handler i {
    border: 0;
    margin-right: 10px;
    background: transparent;
    color: #888;
    cursor: pointer;
  }
  .item-handler i:hover {
    color: #2e84c7;
  }
</style>
