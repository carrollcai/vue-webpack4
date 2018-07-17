<template>
  <div>
    <div class="m-container">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/visit/mission-handling' }">走访任务处理</el-breadcrumb-item>
        <el-breadcrumb-item>评价</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="m-container">
      <visit-detail-info :visit="visit"></visit-detail-info>
    </div>

    <el-form label-width="130px">
      <template>
        <el-form-item label="审核结果">
        </el-form-item>
        <el-form-item label="审核建议">
        </el-form-item>
      </template>

      <template>
        <el-form-item label="走访评价">
        </el-form-item>
      </template>
    </el-form>
  </div>
</template>
<script>
import VisitDetailInfo from './DetailInfo';
export default {
  name: 'MissionDetail',
  component: {
    VisitDetailInfo
  },
  data() {
    return {
      visit: {}
    };
  },
  methods: {
  }
};
</script>
<style lang="scss">

</style>
