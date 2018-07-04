<template>
  <div class="customer-detail">
    <detail-info :customer="customer"></detail-info>
    <div class="customer-detail_audit">
      <el-form class="customer-manager-info" :model="auditInfo" ref="auditForm" :rules="auditRules" label-width="120px" key="managerForm">
        <el-form-item label="审核结果" prop="flag" required key="status">
          <el-radio-group v-model="auditInfo.flag" key="status-radio">
            <el-radio label="1">通过</el-radio>
            <el-radio label="0">不通过</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="auditInfo.flag === '0'" label="审核建议" prop="dealResult" required key="desc">
          <el-input v-model="auditInfo.dealResult"
            :rows="3"
            type="textarea"
            placeholder="如审核不通过，请填写原因供创建者查看"
            key="desc-input"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">确认审核</el-button>
          <el-button @click="back">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {mapActions} from 'vuex';
import detailMixins from './detailMixins';
export default {
  name: 'CustomerAudit',
  mixins: [detailMixins],
  data() {
    return {
      auditInfo: {
        flag: '1',
        dealResult: ''
      },
      auditRules: {
        dealResult: [
          {required: true, message: '请输入审核意见', trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.auditForm.validate((valid) => {
        if (valid) {
          const {auditInfo} = this;
          this.auditCustomer({
            dealResult: auditInfo.dealResult,
            flag: auditInfo.flag,
            id: parseInt(this.$route.params.id),
            taskInsId: parseInt(this.$route.params.taskId)
          });
        }
      });
    },
    ...mapActions([
      'auditCustomer'
    ])
  }
};
</script>
<style lang="scss">
</style>
