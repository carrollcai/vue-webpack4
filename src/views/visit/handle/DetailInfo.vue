<template>
  <el-form label-width="130px" class="visit-mission-detail-info">
    <el-form-item label="走访主题">
      {{visit.name}}
    </el-form-item>

    <el-form-item label="走访公司">
      {{visit.name}}
    </el-form-item>

    <el-form-item label="走访对象">
      {{visit.name}}
    </el-form-item>

    <el-form-item label="我方出席人员">
      {{visit.name}}
    </el-form-item>

    <el-form-item label="走访时间">
      {{visit.name}}
    </el-form-item>

    <el-form-item label="走访内容">
      {{visit.name}}
    </el-form-item>

    <el-form-item label="涉及商机编码">
      {{visit.name}}
    </el-form-item>

    <el-form-item label="问题协调">
      {{visit.name}}
    </el-form-item>

    <el-form-item label="是否首客走访">
      {{visit.name}}
    </el-form-item>

    <template>
      <div class="line"></div>

      <el-form-item label="执行汇报">
        {{visit.name}}
      </el-form-item>

      <el-form-item label="上传附件">
        {{visit.name}}
      </el-form-item>
    </template>
  </el-form>
</template>
<script>
export default {
  name: 'VisitDetailInfo',
  props: {
    visit: {
      typeL: Object,
      dafault() {
        return {};
      }
    }
  },
  methods: {

  }
};
</script>
<style lang="scss">
.visit-mission-detail-info{
  .line{
    height: 1px;
    border-top: 1px solid rgba(229, 229, 229, 1);
    margin: 2px 0 24px 0;
  }
}
</style>
