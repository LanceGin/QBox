<template>
  <div id="bucket-list-page">
    <el-row :gutter="20">
      <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="3"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="5">
        <div class="grid-content bg-purple">
          <el-button class="logout-btn" icon="upload2" @click="logout()" v-loading.fullscreen.lock="fullscreenLoading"></el-button>
        </div>
      </el-col>
    </el-row>
    <div v-for="o in 8" :key="o" class="bucket-item">
      <div class="item-icon">
        <img src="../../../static/img/bucket.png">
      </div>
      <div class="item-name">
        <p>FanUpload</p>
      </div>
      <div class="item-handler">
        <i class="el-icon-edit"></i>
        <i class="el-icon-delete"></i>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'bucket-list',
    data() {
      return {
        fullscreenLoading: false,
      };
    },
    methods: {
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
            router.push({ path: '/' });
            this.fullscreenLoading = false;
          }, 1000);
        }).catch(() => {
        });
      },
    },
  };
</script>

<style scope>
  .logout-btn {
    position: absolute;
    right: 15px;
    top: -43px;
    border: 0;
    background: transparent;
    color: #fff;
  }
  .confirm-box {
    width: 80vw;
  }
  .logout-btn:hover {
    color: #fff;
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
  }
  .item-icon img {
    height: 48px;
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
  }
  .item-handler i:hover {
    color: #2e84c7;
  }
</style>
