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
      <el-form class="handle-detail"
        label-width="86px"
        >
        <el-form-item label="处理人">
          {{requirement.processor}}
        </el-form-item>
        <el-form-item label="处理方案">
          {{requirement.reqScheme}}
        </el-form-item>
        <el-form-item label="备注">
          {{requirement.processorRemark}}
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

  .handle-detail{
    background-color: #FAFAFA;
    padding: 24px 72px 24px 0;

    .el-form-item{
      margin-bottom: 0;
    }
  }
}
</style>
