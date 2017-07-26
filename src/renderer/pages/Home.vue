<template>
  <div class="home-page">
    <header style="-webkit-app-region: drag">
    </header>
    <!-- check the exist of Key -->
    <bucket-list v-if="accessKey"></bucket-list>

    <no-bucket v-else></no-bucket>
  </div>
</template>

<script>
  import NoBucket from '../components/NoBucket';
  import BucketList from '../components/BucketList';

  const accessKey = localStorage.getItem('accessKey');
  const secretKey = localStorage.getItem('secretKey');

  // check the exist of AK and SK
  let hasKey = true;
  if (accessKey == null || secretKey == null) {
    hasKey = false;
  }

  export default {
    name: 'home',
    components: { NoBucket, BucketList },

    // data
    data() {
      return {
        accessKey: hasKey,
      };
    },
  };
</script>

<style scope>
  body {
    margin: 0;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
  header {
    height: 50px;
    -webkit-app-region: drag;
    background: url('../../../static/img/logo.png') no-repeat #2e84c7;
    background-size: 80.6px 30px;
    background-position: center;
  }
</style>
