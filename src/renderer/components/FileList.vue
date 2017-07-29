<template>
  <div id="file-list-page">
  
    <!-- preview -->
    <el-dialog
      title="预览"
      :visible.sync="dialogVisible"
      size="large">
      <span>这里用来预览文件，暂时开发中</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- file list table -->
    <el-table
      ref="multipleTable"
      :data="fileList"
      tooltip-effect="dark"
      style="width: 100%"
      height="540"
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
        width="150">
      </el-table-column>
      <el-table-column
        prop="fsize"
        label="文件大小"
        sortable
        width="150"
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
        width="145">
        <template scope="scope">
          <el-button type="text" size="small" icon="view" @click="preview"></el-button>
          <el-button type="text" size="small" @click="removeFile(scope.row)">删除</el-button>
          <el-button type="text" size="small" @click="copyLink(scope.row)">复制</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
  // import Qiniu class
  import Qiniu from '../utils/qiniu';
  import Util from '../utils/util';
  const moment = require('moment');
  const clipboard = require('electron').clipboard;

  export default {
    name: 'file-list',
    data() {
      return {
        dialogVisible: false,
        fileList: [],
        multipleSelection: [],
      };
    },
    mounted() {
      const bucket = this.$route.query.bucket;
      const accessKey = localStorage.accessKey;
      const secretKey = localStorage.secretKey;
      Qiniu.list(accessKey, secretKey, bucket)
        .then((data) => {
          this.fileList = data.items;
        })
        .catch();
    },
    methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach((row) => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
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
              Qiniu.list(accessKey, secretKey, bucket)
                .then((data) => {
                  this.fileList = data.items;
                })
                .catch();
            })
            .catch();
        }).catch(() => {
          this.$message('取消删除');
        });
      },
      // preview file
      preview() {
        this.dialogVisible = true;
      },
    },
  };
</script>

<style scope>
  /* set table style */
  .el-table {
    color: #888;
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
    background: #fff;
  }
</style>
