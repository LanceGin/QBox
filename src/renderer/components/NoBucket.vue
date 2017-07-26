<template>
  <div id="no-bucket-page">
    <p>似乎没有key哦？😯</p>
    <el-button class="show-modal-btn" @click="dialogFormVisible = true">设置Key</el-button>

    <el-dialog
      title="设置公/私钥"
      size="large"
      top="25%"
      :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="AccessKey" :label-width="formLabelWidth">
          <el-input v-model="form.ak" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="SecretKey" :label-width="formLabelWidth">
          <el-input type="password" v-model="form.sk" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button @click="setKey()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'no-bucket',
    data() {
      return {
        dialogVisible: false,
        dialogFormVisible: false,
        formLabelWidth: '80px',
        form: {
          ak: '',
          sk: '',
        },
      };
    },
    methods: {
      setKey() {
        localStorage.accessKey = this.ak;
        localStorage.secretKey = this.sk;
        this.dialogFormVisible = false;
      },
    },
  };
</script>

<style scope>
  .show-modal-btn {
    background: #2e84c7;
    color: #ffffff;
    position: absolute;
    bottom: 0;
    border: 0;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    width: 100vw;
    height: 50px;
  }
  .show-modal-btn:hover {
    color: #ffffff;
  }
  .el-dialog__body {
    padding-bottom: 0;
  }
</style>
