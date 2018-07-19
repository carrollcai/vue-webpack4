<template>
  <el-form label-width="130px" class="visit-mission-detail-info">
    <el-form-item label="走访主题">
      {{visit.visitTheme}}
    </el-form-item>

    <el-form-item label="走访公司">
      {{visit.organizeName}}
    </el-form-item>

    <el-form-item label="走访对象">
      {{visit.intervieweeName}}； {{visit.intervieweeMobile}}
    </el-form-item>

    <el-form-item label="我方出席人员">
      {{visit.visitPresentMembers}}
    </el-form-item>

    <el-form-item label="走访时间">
      {{visit.visitStartTime}} - {{visit.visitEndTime}}
    </el-form-item>

    <el-form-item label="走访内容">
      {{visit.visitContent}}
    </el-form-item>

    <el-form-item label="涉及商机编码">
      {{visit.relOpporCode}}
    </el-form-item>

    <el-form-item label="问题协调">
      {{visit.problemCoordinate}}
    </el-form-item>

    <el-form-item label="是否首客走访">
      {{visit.isFirstVisit}}
    </el-form-item>

    <template v-if="visit.visitStatus === '2'">
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
