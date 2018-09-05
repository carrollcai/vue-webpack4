<template>
  <div class="customer-detail">
    <div class="m-container">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/group-customer/create-manage' }">集团客户创建</el-breadcrumb-item>
        <el-breadcrumb-item>详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
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
<style lang="less">
</style>
