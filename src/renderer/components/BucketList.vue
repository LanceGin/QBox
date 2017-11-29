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
        <i class="el-icon-delete" @click="drop(bucket)"></i>
      </div>
    </div>
    <div class="mkbucket">
      <el-button class="mkbucket-btn" @click="dialogFormVisible = true">创建新仓库</el-button>
      <el-dialog
        title="创建新仓库"
        size="large"
        top="25%"
        :visible.sync="dialogFormVisible">
        <el-form :model="newBucket">
          <el-form-item label="Name" :label-width="formLabelWidth">
            <el-input v-model="newBucket.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="Region" :label-width="formLabelWidth">
            <el-select v-model="newBucket.region" placeholder="请选择">
              <el-option
                v-for="item in regions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button @click="mkbucket()" v-loading.fullscreen.lock="fullscreenLoading">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  // import Qiniu class
  import Qiniu from '../utils/qiniu';

  const BrowserWindow = require('electron').remote.BrowserWindow;
  const { ipcRenderer } = require('electron');

  // transfer data to main process
  const key = {
    ak: localStorage.accessKey,
    sk: localStorage.secretKey,
    db: localStorage.db,
  };

  // register an event to set default bucket
  ipcRenderer.on('setDefaultBucket', (event, arg) => {
    // console.log(`${arg} args from main process`);
    localStorage.db = arg;
  });

  // send signal and transfer localstorage to the main process
  ipcRenderer.send('setKey', key);
  // console.log(localStorage.db);

  let buckets;
  export default {
    name: 'bucket-list',
    data() {
      return {
        fullscreenLoading: false,
        bucketList: buckets,
        dialogFormVisible: false,
        formLabelWidth: '80px',
        regions: [
          {
            value: 'z0',
            label: '华东',
          },
          {
            value: 'z1',
            label: '华北',
          },
          {
            value: 'z2',
            label: '华南',
          },
          {
            value: 'na0',
            label: '北美',
          },
        ],
        newBucket: {
          name: '',
          region: '',
        },
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
      // create new bucket
      mkbucket() {
        this.fullscreenLoading = true;
        const accessKey = localStorage.accessKey;
        const secretKey = localStorage.secretKey;

        Qiniu.mkbucket(accessKey, secretKey, this.newBucket.name, this.newBucket.region)
          .then(() => {
            Qiniu.buckets(accessKey, secretKey)
              .then((data) => {
                this.dialogFormVisible = false;
                this.fullscreenLoading = false;
                this.bucketList = data;
                this.$message(`仓库 ${this.newBucket.name} 创建成功..💗`);
              });
          })
          .catch((err) => {
            this.fullscreenLoading = false;
            this.$message(`${err.error.error}...💔`);
          });
      },
      // drop an exist bucket
      drop(bucket) {
        const accessKey = localStorage.accessKey;
        const secretKey = localStorage.secretKey;
        this.$confirm(`确定删除 ${bucket} ?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          customClass: 'confirm-box',
        }).then(() => {
          this.fullscreenLoading = true;
          Qiniu.drop(accessKey, secretKey, bucket)
            .then(() => {
              Qiniu.buckets(accessKey, secretKey)
                .then((data) => {
                  this.bucketList = data;
                  this.fullscreenLoading = false;
                  this.$message(`成功删除 ${bucket}...💗`);
                });
            })
            .catch((err) => {
              this.$message(`${err.error.error}...💔`);
            });
        }).catch(() => {
          this.$message('差点手误...💔');
        });
      },
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
    height: 60px;
    border-bottom: 1px #eee solid;
    padding: 0 20px;
  }
  .bucket-item:hover {
    background: #eee;
  }
  .item-icon {
    float: left;
    margin-top: 5px;
    height: 48px;
    width: 48px;
    background: url("../../../static/img/bucket.png") no-repeat;
    background-size: contain;
    background-position: 0 2px;
  }
  .item-name {
    float: left;
    margin-top: 20px;
    margin-left: 10px;
    color: #888;
  }
  .item-name p {
    -webkit-margin-before: 0;
  }
  .item-handler {
    float: right;
    margin-top: 20px;
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
  .mkbucket {
    text-align: center;
    margin-top: 20px;
  }
  .mkbucket-btn {
    background: #2e84c7;
    border: 0;
    color: #fff;
    font-size: 12px;
  }
  .mkbucket-btn:hover,
  .mkbucket-btn:focus {
    color: #fff;
  }
  .el-input__icon+.el-input__inner {
    width: 240px;
  }
</style>
