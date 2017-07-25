<template>
  <!-- check the exist of Key -->
  <bucket-list v-if="accessKey"></bucket-list>
  <no-bucket v-else></no-bucket>
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

</style>
