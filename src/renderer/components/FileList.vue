<template>
  <div id="file-list-page">
    <el-table
      ref="multipleTable"
      :data="tableData3"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="key"
        label="文件名"
        width="300">
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
</style>
