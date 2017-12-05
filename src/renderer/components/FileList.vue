<template>
  <div id="file-list-page">

    <!-- rename resource -->
    <el-dialog
      title="重命名资源"
      :visible.sync="renameDialogVisible"
      width="30%">
      <el-input v-model="currentName" :placeholder="currentName"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="renameCancel">取 消</el-button>
        <el-button type="primary" @click="renameConfirm">确 定</el-button>
      </span>
    </el-dialog>
  
    <!-- preview -->
    <el-dialog
      :title="preview_name"
      :visible.sync="dialogVisible"
      size="large">
      <div class="preview">
        <img :src="preview_url" class="preview-img">
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="previewCopy()">复 制</el-button>
        <el-button type="primary" @click="download()">下 载</el-button>
      </span>
    </el-dialog>

    <!-- file list table -->
    <el-table
      ref="multipleTable"
      :data="fileList"
      tooltip-effect="dark"
      style="width: 100%"
      stripe
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="35">
      </el-table-column>
      <el-table-column
        prop="key"
        label="文件名"
        sortable
        width="320">
      </el-table-column>
      <el-table-column
        prop="mimeType"
        label="文件类型"
        sortable
        width="140">
      </el-table-column>
      <el-table-column
        prop="fsize"
        label="文件大小"
        sortable
        width="120"
        :formatter="fsizeFormat">
      </el-table-column>
      <el-table-column
        prop="putTime"
        label="修改时间"
        sortable
        width="200"
        :formatter="dateFormat">
      </el-table-column>
      <el-table-column
        label="操作"
        width="185">
        <template scope="scope">
          <el-button type="text" size="small" icon="view" @click="preview(scope.row)"></el-button>
          <el-button type="text" size="small" @click="removeFile(scope.row)">删除</el-button>
          <el-button type="text" size="small" @click="copyLink(scope.row)">复制</el-button>
          <el-button type="text" size="small" @click="rename(scope.row)">重命名</el-button>
        </template>
      </el-table-column>
      <template slot="append">
        <div class="loadmore">
          <el-button
            align="center"
            type="text"
            v-if="marker != ''"
            size="small"
            @click="loadMore()">加载更多</el-button>
        </div>
      </template>
    </el-table>
  </div>
</template>

<script>
  // import Qiniu class
  import Qiniu from '../utils/qiniu';
  import Util from '../utils/util';
  import Bus from '../utils/bus';
  const moment = require('moment');
  const clipboard = require('electron').clipboard;
  const webContents = require('electron').remote.getCurrentWebContents();

  export default {
    name: 'file-list',
    data() {
      return {
        renameDialogVisible: false,
        dialogVisible: false,
        fileList: [],
        multipleSelection: [],
        preview_url: '',
        preview_name: '',
        marker: '',
        filter: '',
        oldName: '',
        currentName: '',
      };
    },
    created() {
      // refresh files
      Bus.$on('refresh', () => {
        this.fileList = [];
        const bucket = this.$route.query.bucket;
        const accessKey = localStorage.accessKey;
        const secretKey = localStorage.secretKey;
        Qiniu.list(accessKey, secretKey, bucket)
          .then((data) => {
            this.marker = data.marker == null ? '' : data.marker;
            this.fileList = data.items;
          })
          .catch();
      });

      // batch delete
      Bus.$on('batchDelete', () => {
        const bucket = this.$route.query.bucket;
        const accessKey = localStorage.accessKey;
        const secretKey = localStorage.secretKey;
        // confirm to delete
        this.$confirm('此操作将永久删除文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          Qiniu.batchDelete(accessKey, secretKey, bucket, this.multipleSelection)
            .then(() => {
              this.$message('文件删除成功..💗');
              Qiniu.list(accessKey, secretKey, bucket)
                .then((data) => {
                  this.marker = data.marker == null ? '' : data.marker;
                  this.fileList = data.items;
                })
                .catch();
            })
            .catch();
        }).catch(() => {
          this.$message('取消删除');
        });
      });

      // batch download
      Bus.$on('batchDownload', () => {
        console.log('批量下载');
      });

      // search filter
      Bus.$on('search', (filter) => {
        const bucket = this.$route.query.bucket;
        const accessKey = localStorage.accessKey;
        const secretKey = localStorage.secretKey;
        Qiniu.list(accessKey, secretKey, bucket, '', filter)
          .then((data) => {
            console.log(data);
            this.filter = filter;
            this.marker = data.marker == null ? '' : data.marker;
            this.fileList = data.items;
          })
          .catch();
      });
    },
    destroyed() {
      Bus.$off('refresh');
      Bus.$off('batchDelete');
      Bus.$off('batchDownload');
    },
    mounted() {
      const bucket = this.$route.query.bucket;
      const accessKey = localStorage.accessKey;
      const secretKey = localStorage.secretKey;
      Qiniu.list(accessKey, secretKey, bucket)
        .then((data) => {
          console.log(data);
          this.marker = data.marker == null ? '' : data.marker;
          this.fileList = data.items;
        })
        .catch();
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
        Bus.$emit('batchShowStatus', this.multipleSelection);
      },
      // format the time stamp
      dateFormat(row) {
        let date = row.putTime;
        if (date === undefined) {
          return '';
        }
        date = date.toString();
        date = date.substring(0, date.length - 7);
        return moment.unix(date).format('YYYY-MM-DD HH:mm:ss');
      },
      // format file size
      fsizeFormat(row) {
        return Util.fsizeFormat(row.fsize);
      },
      // copy the link
      copyLink(row) {
        const bucket = this.$route.query.bucket;
        const accessKey = localStorage.accessKey;
        const secretKey = localStorage.secretKey;
        Qiniu.domain(accessKey, secretKey, bucket)
          .then((data) => {
            // get the latest domain
            const domain = data[data.length - 1];
            const link = `http://${domain}/${row.key}`;
            clipboard.writeText(link);
            this.$message('链接复制成功..💗');
          })
          .catch();
      },
      // remove a file
      removeFile(row) {
        const bucket = this.$route.query.bucket;
        const accessKey = localStorage.accessKey;
        const secretKey = localStorage.secretKey;
        // confirm to delete
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          Qiniu.delete(accessKey, secretKey, bucket, row.key)
            .then(() => {
              this.$message('文件删除成功..💗');
              // TODO
              // just remove items from local datas, do not
              // need to refresh.
              Qiniu.list(accessKey, secretKey, bucket)
                .then((data) => {
                  this.marker = data.marker == null ? '' : data.marker;
                  this.fileList = data.items;
                })
                .catch();
            })
            .catch();
        }).catch(() => {
          this.$message('取消删除');
        });
      },
      // rename file
      rename(row) {
        this.oldName = row.key;
        this.currentName = row.key;
        this.renameDialogVisible = true;
      },
      renameCancel() {
        this.renameDialogVisible = false;
      },
      renameConfirm() {
        const bucket = this.$route.query.bucket;
        const accessKey = localStorage.accessKey;
        const secretKey = localStorage.secretKey;
        console.log(bucket, this.oldName, this.currentName);
        Qiniu.rename(accessKey, secretKey, bucket, this.oldName, this.currentName)
          .then(() => {
            this.renameDialogVisible = false;
            this.$message('重命名成功..💗');
            Qiniu.list(accessKey, secretKey, bucket)
              .then((data) => {
                this.marker = data.marker == null ? '' : data.marker;
                this.fileList = data.items;
              })
              .catch();
          })
          .catch();
      },
      // preview file
      preview(row) {
        const bucket = this.$route.query.bucket;
        const accessKey = localStorage.accessKey;
        const secretKey = localStorage.secretKey;
        Qiniu.domain(accessKey, secretKey, bucket)
          .then((data) => {
            // get the latest domain
            const domain = data[data.length - 1];
            const link = `http://${domain}/${row.key}`;
            this.preview_name = row.key;
            this.dialogVisible = true;
            if (row.mimeType.indexOf('image') >= 0) {
              this.preview_url = link;
            } else {
              this.preview_url = 'https://qiniu.staticfile.org/static/images/no-prev.6ae40070.png';
            }
          })
          .catch();
      },
      // copy link in the preview modal
      previewCopy() {
        const bucket = this.$route.query.bucket;
        const accessKey = localStorage.accessKey;
        const secretKey = localStorage.secretKey;
        Qiniu.domain(accessKey, secretKey, bucket)
          .then((data) => {
            // get the latest domain
            const domain = data[data.length - 1];
            const link = `http://${domain}/${this.preview_name}`;
            clipboard.writeText(link);
            this.$message('链接复制成功..💗');
          })
          .catch();
      },
      // download file
      download() {
        const bucket = this.$route.query.bucket;
        const accessKey = localStorage.accessKey;
        const secretKey = localStorage.secretKey;
        Qiniu.domain(accessKey, secretKey, bucket)
          .then((data) => {
            // get the latest domain
            const domain = data[data.length - 1];
            const link = `http://${domain}/${this.preview_name}?attname=${this.preview_name}.${this.preview_name.split('.')[1]}`;
            webContents.loadURL(link);
          })
          .catch();
      },
      // loadMore feature
      loadMore() {
        console.log(this.filter);
        const bucket = this.$route.query.bucket;
        const accessKey = localStorage.accessKey;
        const secretKey = localStorage.secretKey;
        Qiniu.list(accessKey, secretKey, bucket, this.marker, this.filter)
          .then((data) => {
            this.marker = data.marker == null ? '' : data.marker;
            this.fileList.push(...data.items);
          })
          .catch();
      },
    },
  };
</script>

<style scope>
  /* set table style */
  .el-table {
    color: #888;
    max-height: 540px;
  }
  .el-table__header-wrapper thead div {
    background: #fff;
    color: #888;
    font-size: 14px;
    font-weight: lighter;
  }
  .el-table__header-wrapper th {
    height: 30px;
  }
  .el-checkbox__inner {
    width: 14px;
    height: 14px;
  }
  .el-checkbox__inner::after {
    width: 2px;
    height: 6px;
  }
  .el-table th {
    background: #fff;
  }
  .el-table .el-button--text {
    color: #2e84c7;
  }
  .el-table .el-button--text:hover {
    color: #2e84c7;
  }
  .el-table::after,
  .el-table::before {
    background: transparent;
    z-index: 1;
  }
  .el-table__body-wrapper {
    max-height: 520px !important;
  }
  .loadmore {
    width: 100vw;
    text-align: center;
    margin-top: 5px;
  }
  .preview {
    text-align: center;
    max-height: 300px;
  }
  .preview-img {
    max-height: 300px;
    max-width: 100%;
  }
</style>
