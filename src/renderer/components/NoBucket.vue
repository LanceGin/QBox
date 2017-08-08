<template>
  <div id="no-bucket-page">
    <div class="nothing-img"></div>
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
      <div class="notice">
        <p>不知道key? <el-button type="text" @click="openPortal()">去七牛查看</el-button></p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button @click="setKey()" v-loading.fullscreen.lock="fullscreenLoading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'no-bucket',
    data() {
      return {
        fullscreenLoading: false,
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
        const router = this.$router;
        localStorage.accessKey = this.form.ak;
        localStorage.secretKey = this.form.sk;
        this.dialogFormVisible = false;
        this.fullscreenLoading = true;
        setTimeout(() => {
          router.push({ path: 'bucket' });
          this.fullscreenLoading = false;
        }, 3000);
      },
      // go to qiniu portal to find key
      openPortal() {
        require('electron').shell.openExternal('https://portal.qiniu.com/user/key');
      },
    },
  };
</script>

<style scope>
  body {
    background: #fff;
  }
  .nothing-img {
    text-align: center;
    height: 260px;
    background: url(../../../static/img/nothing.png) no-repeat;
    background-size: 320px 198.35px;
    background-position: 40px 80px;
    margin-bottom: 80px;
  }
  .nothing-img img {
    width: 80vw;
  }
  .show-modal-btn {
    background: #2e84c7;
    color: #ffffff;
    border: 0;
    width: 40vw;
    margin-left: 30vw;
    margin-top: 20px;
    height: 50px;
  }
  .show-modal-btn:hover {
    color: #ffffff;
  }
  .el-dialog__body {
    padding-bottom: 0;
  }
  .notice {
    margin-left: 170px;
    color: #888;
    font-size: 14px;
    margin-top: -20px;
  }
  .dialog-footer {
    margin-top: -10px;
  }
</style>
