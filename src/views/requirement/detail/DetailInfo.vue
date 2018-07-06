<template>
  <el-form class="requirement-detail-info">
    <el-form-item lable="需求客户">
      {{requirement.name}}
    </el-form-item>

    <el-form-item lable="需求类型">
      {{requirement.name}}
    </el-form-item>

    <template>
      <el-form-item lable="需求描述">
        {{requirement.name}}
      </el-form-item>

      <el-form-item lable="需求附件">
        {{requirement.name}}
      </el-form-item>
    </template>

    <template>
      <el-form-item lable="物料名称">
        {{requirement.name}}
      </el-form-item>

      <el-form-item lable="物料提供方式">
        {{requirement.name}}
      </el-form-item>

      <el-form-item lable="物料使用时间">
        {{requirement.name}}
      </el-form-item>

      <el-form-item lable="物料描述">
        {{requirement.name}}
      </el-form-item>
    </template>

    <el-form-item lable="联系人">
      {{requirement.name}}
    </el-form-item>

    <el-form-item lable="">
      {{requirement.name}}
    </el-form-item>

  </el-form>
</template>
<script>
export default {
  name: 'DetailInfo',
  props:{
    requirement: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    handleDownload() {
      window.open('');
    }
  }
};
</script>
<style lang="scss">
.requirement-detail-info{

}
</style>
