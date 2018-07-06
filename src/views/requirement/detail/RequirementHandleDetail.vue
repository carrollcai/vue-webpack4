<template>
  <div class="requirement-detail">
    <detail-info :requirement="requirement"></detail-info>
    <div>
      <el-form>
        <el-form-item label="处理方案">
        </el-form-item>
        <el-form-item label="备注">
        </el-form-item>
      <el-form>
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

</style>
