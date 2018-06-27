<template>
  <div class="customer-detail">
    <detail-info :customer="customer"></detail-info>
  </div>
</template>
<script>
import detailMixins from './detailMixins';
export default {
  name: 'CustomerDetail',
  mixins: [detailMixins],
  methods: {
  }
};
</script>
<style lang="scss">
</style>
