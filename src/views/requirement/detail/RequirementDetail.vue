<template>
  <div class="requirement-detail">
    <div class="m-container">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/requirement/manage' }">需求创建管理</el-breadcrumb-item>
        <el-breadcrumb-item>查看</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="m-container info-block">
      <detail-info :requirement="requirement"></detail-info>
    </div>
    <div class="m-container info-block">
      <el-form>
        <el-form-item label="处理人">
        </el-form-item>
        <el-form-item label="处理方案">
        </el-form-item>
        <el-form-item label="备注">
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import mixins from './mixins';
export default {
  name: 'RequirementDetail',
  mixins: [mixins],
  data() {
    return {
    };
  },
  methods: {
  }
};
</script>
<style lang="scss">
.requirement-detail{
  .info-block{
    margin-top: 16px;
  }
}
</style>
