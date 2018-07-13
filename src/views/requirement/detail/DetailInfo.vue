<template>
  <el-form class="requirement-detail-info" label-width="130px">
    <el-form-item label="需求客户">
      {{requirement.organizeName}}
    </el-form-item>

    <el-form-item label="需求类型">
      {{requirement.reqType}}
    </el-form-item>

    <template v-if="requirement.reqType !== '2'">
      <el-form-item label="需求描述">
        {{requirement.reqDesc}}
      </el-form-item>

      <el-form-item label="需求附件">
        {{requirement.reqDesc}}
      </el-form-item>
    </template>

    <template v-if="requirement.reqType === '2'">
      <el-form-item label="物料名称">
        {{requirement.materialName}}
      </el-form-item>

      <el-form-item label="物料格式要求">
        {{requirement.materialSupplyType}}
      </el-form-item>

      <el-form-item label="物料使用时间">
        {{requirement.materialUseCreateTime}}-{{requirement.materialUseEndTime}}
      </el-form-item>

      <el-form-item label="物料描述">
        {{requirement.materialDesc}}
      </el-form-item>
    </template>

    <el-form-item label="联系人">
      {{requirement.contactName}}，{{requirement.contactMobile}}，{{requirement.contactEmail}}
    </el-form-item>

    <el-form-item label="">
      {{requirement.processor}}
    </el-form-item>

  </el-form>
</template>
<script>
export default {
  name: 'RequirementDetailInfo',
  props: {
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
