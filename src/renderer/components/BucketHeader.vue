<template>
  <header style="-webkit-app-region: drag">
  </header>
</template>

<script>
  export default {
    name: 'bucket-header',
  };
</script>

<style scope>
  header {
    height: 50px;
    -webkit-app-region: drag;
    background: url('../../../static/img/logo.png') no-repeat #2e84c7;
    background-size: 80.6px 30px;
    background-position: center;
  }
</style>
