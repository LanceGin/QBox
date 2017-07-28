<template>
  <div id="file-list-page">
    <div class="manage-btn-group">
      <el-button class="upload-btn" type="text" icon="upload">upload</el-button>
      <el-button class="refresh-btn" type="text" icon="time">refresh</el-button>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData3"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="35">
      </el-table-column>
      <el-table-column
        prop="key"
        label="文件名"
        width="320">
      </el-table-column>
      <el-table-column
        prop="mType"
        label="文件类型"
        width="150">
      </el-table-column>
      <el-table-column
        prop="fsize"
        label="文件大小"
        width="150">
      </el-table-column>
      <el-table-column
        prop="putTime"
        label="更新时间"
        width="200"
        show->
      </el-table-column>
      <el-table-column
        label="操作"
        width="145">
        <template scope="scope">
          <el-button type="text" size="small" icon="view"></el-button>
          <el-button type="text" size="small">删除</el-button>
          <el-button type="text" size="small">替换</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'file-list',
    data() {
      return {
        tableData3: [{
          key: 'assets/Home-Slider/slide-1.jpg',
          mType: 'image/jpeg',
          fsize: '640 KB',
          putTime: '2016-05-03',
        }, {
          key: 'assets/Home-Slider/slide-1.jpg',
          mType: 'image/jpeg',
          fsize: '640 KB',
          putTime: '2016-05-03',
        }, {
          key: 'assets/Home-Slider/slide-1.jpg',
          mType: 'image/jpeg',
          fsize: '640 KB',
          putTime: '2016-05-03',
        }, {
          key: 'assets/Home-Slider/slide-1.jpg',
          mType: 'image/jpeg',
          fsize: '640 KB',
          putTime: '2016-05-03',
        }, {
          key: 'assets/Home-Slider/slide-1.jpg',
          mType: 'image/jpeg',
          fsize: '640 KB',
          putTime: '2016-05-03',
        }, {
          key: 'assets/Home-Slider/slide-1.jpg',
          mType: 'image/jpeg',
          fsize: '640 KB',
          putTime: '2016-05-03',
        }],
        multipleSelection: [],
      };
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
    },
  };
</script>

<style scope>
  #file-list-page {
    max-height: 590px;
    overflow: scroll;
  }
  .upload-btn {
    position: fixed;
    left: 160px;
    top: 6px;
    background: transparent;
    color: #fff;
    font-size: 18px;
  }
  .upload-btn:hover,
  .upload-btn:focus {
    color: #fff;
  }
  .refresh-btn {
    position: fixed;
    right: 40px;
    top: 6px;
    background: transparent;
    color: #fff;
    font-size: 18px;
  }
  .refresh-btn:hover,
  .refresh-btn:focus {
    color: #fff;
    cursor: pointer;
  }
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
