<template>
  <div class="upload-page">
    <bucket-header></bucket-header>
    <!-- manage tool -->
    <div class="manage-tool">
      <div class="bucket-info">
        <el-tag class="bucket-name">{{ bucket }}</el-tag>
      </div>
      <div class="manage-btn">
        <el-button class="w-btn" type="text" icon="arrow-left" @click="goback()">返回</el-button>
      </div>
    </div>

    <div class="upload-panel">
      <el-upload
        class="upload-demo"
        action="//up-z2.qiniu.com"
        drag
        :before-upload="beforeUpload"
        :on-success="handleSuccess"
        :on-error="handleError"
        :on-progress="handleProgress"
        :data="form">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
    </div>
  </div>
</template>

<script>
  import BucketHeader from '../components/BucketHeader';
  import PutPolicy from '../utils/put_policy';

  export default {
    name: 'upload',
    components: { BucketHeader },
    data() {
      return {
        bucket: this.$route.query.bucket,
        form: {},
        headers: {},
      };
    },
    methods: {
      goback() {
        this.$router.push({ path: `/manage?bucket=${this.bucket}` });
      },
      handleSuccess(res) {
        console.log(res);
      },
      handleError(err) {
        console.log(err);
      },
      handleProgress(a) {
        console.log(a);
      },
      async beforeUpload(file) {
        // generate uploadToken
        const options = {
          scope: `${this.bucket}:${file.name}`,
        };
        const mac = {
          accessKey: localStorage.accessKey,
          secretKey: localStorage.secretKey,
        };
        const putPolicy = new PutPolicy(options);
        const uploadToken = putPolicy.uploadToken(mac);
        // form data
        this.form = {
          key: file.name,
          token: uploadToken,
        };
      },
    },
  };
</script>

<style>
  webkit,
  ::-webkit-scrollbar {
    width: 0;
  }
  body {
    margin: 0;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
  .upload-panel {
    padding-top: 100px;
  }
  .manage-tool {
    position: fixed;
    margin-top: 50px;
    width: 100vw;
    height: 50px;
    -webkit-app-region: drag;
    background: #2e84c7;
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
  .manage-btn {
    float: left;
    margin-left: 4vw;
  }
  .w-btn,
  .w-btn:hover,
  .w-btn:focus {
    color: #fff;
  }
  /* dtrag upload style */
  .el-upload-dragger {
    width: 100vw;
    height: 536px;
    border: 0;
    border-radius: 0;
  }
  .el-upload-dragger .el-icon-upload {
    margin-top: 30vh;
  }
</style>
