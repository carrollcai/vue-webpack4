<template>
  <div class="customer-detail">
    <detail-info :customer="customer"></detail-info>
    <div class="customer-detail_audit">
      <el-form class="customer-manager-info" :model="auditInfo" ref="managerForm" :rules="auditRules" label-width="120px" key="managerForm">
        <el-form-item label="审核结果" prop="status" required key="status">
          <el-radio-group v-model="auditInfo.status" key="status-radio">
            <el-radio label="Y">通过</el-radio>
            <el-radio label="N">不通过</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="auditInfo.status === 'N'" label="审核建议" prop="desc" required key="desc">
          <el-input v-model="customer.desc" type="textarea" placeholder="如审核不通过，请填写原因供创建者查看" key="desc-input"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">确认审核</el-button>
          <el-button @click="back">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import detailMixins from './detailMixins';
export default {
  name: 'CustomerAudit',
  mixins: [detailMixins],
  methods: {
  }
};
</script>
<style lang="scss">
</style>
