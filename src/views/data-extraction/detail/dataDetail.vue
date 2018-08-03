<template>
<div>
  <div class="m-container">
    <el-breadcrumb v-if="isAudit !== 'true' && isToAudit !== 'true'">
      <el-breadcrumb-item :to="{ path: '/data-extraction/data-download' }">明细数据下载</el-breadcrumb-item>
      <el-breadcrumb-item>查看详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-breadcrumb v-if="isAudit !== 'true' && isToAudit === 'true'">
      <el-breadcrumb-item :to="{ path: '/data-extraction/data-download' }">数据审核管理</el-breadcrumb-item>
      <el-breadcrumb-item>查看详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-breadcrumb v-if="isAudit === 'true' && isToAudit === 'true'">
      <el-breadcrumb-item :to="{ path: '/data-extraction/data-download' }">数据审核管理</el-breadcrumb-item>
      <el-breadcrumb-item>数据审核</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div class="m-container table-container">
    <steps :stepData="dataSteps"></steps>
    <info v-if="dataDetailList" :infoData="dataDetailList"></info>
  </div>
  <div v-if="isAudit === 'true'" class="m-container table-container">
    <el-form :model="auditForm" ref="refName" :rules="auditFromVaild">
      <el-form-item label="审核结果：" label-width="140px" required prop="audit">
        <el-radio v-model="auditForm.audit" :value="0" :label="0">通过</el-radio>
        <el-radio v-model="auditForm.audit" :value="1" :label="1">不通过</el-radio>
      </el-form-item>
      <el-form-item label="备注：" label-width="140px" prop="remark">
        <el-input v-model="auditForm.remark" class="form-input-medium" placeholder="请输入备注" />
      </el-form-item>
      <el-form-item label-width="140px" >
        <el-button type="primary" @click="onSubmit()">提交</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>

<script>
import {mapActions} from 'vuex';
import steps from 'components/data-extraction/Steps.vue';
import info from 'components/data-extraction/Info.vue';
import mixins from './mixins';
export default {
  mixins: [mixins],
  components: {
    steps,
    info
  },
  data() {
    return {
      id: this.$route.params.id,
      isAudit: this.$route.query.isAudit,
      isToAudit: this.$route.name === 'data-audit-detail' ? 'true' : 'false',
      auditForm: {
        audit: '',
        remark: ''
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs.refName.validate((valid) => {
        if (valid) {
          this.auditDataExtraction(this.auditForm);
        }
      });
    },
    cancel() {
      this.$router.push({path: '/data-extraction/data-audit'});
    },
    ...mapActions([
      'auditDataExtraction'
    ])
  }
};
</script>
