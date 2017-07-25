<template>
  <div id="no-bucket-page">
    <p>似乎没有key哦？😯</p>
    <el-button type="info" @click="dialogFormVisible = true">点击设置Key</el-button>

    <el-dialog title="设置公/私钥" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="AccessKey" :label-width="formLabelWidth">
          <el-input v-model="form.ak" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="SecretKey" :label-width="formLabelWidth">
          <el-input v-model="form.sk" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="setKey()">确 定</el-button>
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
        form: {
          ak: '',
          sk: '',
        },
        formLabelWidth: '80px',
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
</style>
