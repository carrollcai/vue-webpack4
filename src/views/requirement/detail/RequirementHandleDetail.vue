<template>
  <div class="requirement-handle-detail">
    <div class="m-container">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/requirement/list' }">需求任务处理</el-breadcrumb-item>
        <el-breadcrumb-item>查看</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="m-container info-block">
      <detail-info :requirement="requirement" ></detail-info>
      <el-form class="handle-detail" label-width="86px">
        <el-form-item label="处理方式">
          {{requirement.reqScheme}}
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
  name: 'RequirementHandleDetail',
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
.requirement-handle-detail{
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
