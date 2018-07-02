<template>
  <div class="audit-steps">
    <div v-if="title" class="title">{{title}}</div>
    <div>
      <el-steps :active="1" align-center>
        <el-step title="曲丽丽" description="审核通过"></el-step>
        <el-step title="张小明" description="审核中…"></el-step>
        <el-step title="李晓红"></el-step>
        <el-step title="王晓红"></el-step>
      </el-steps>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
};
</script>

<style lang="scss" scoped>
.audit-steps {
  border-radius: 2px;
  background-color: rgba(250, 250, 250, 1);
  margin-top: 32px;
  padding-bottom: 32px;
  .title {
    height: 24px;
    line-height: 24px;
    font-size: 16px;
    font-weight: bold;
    padding: 32px 0;
    margin-left: 40px;
  }
}
</style>
