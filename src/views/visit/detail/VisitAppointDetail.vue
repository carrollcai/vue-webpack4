<template>
<div>
  <div class="m-container">
    <Vdetail :visitDetail="visitDetailData" :isPoint="isPoint"></Vdetail>
  </div>
  <div v-if="isExecute === 'true'" class="m-container transfer-out">
    <el-form
      :model="formData"
      :rules="formDataValid"
      :ref="formData">
      <el-form-item label="转发人：" required prop="processor">
        <el-select
          v-model="formData.processor"
          placeholder="请选择">
          <el-option></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="转发说明：" required>
        <el-input v-model="formData.visitEvaluator" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="走访汇报：" label-width="130px" prop="">
        <el-input v-model="formData.feedback" placeholder="简要描述一下处理方案" type="textarea" :rows="4"></el-input>
      </el-form-item>
      <el-form-item label="物料上传：" label-width="130px">
        <el-upload class="upload-demo"
          action=""
          :auto-upload="false"
          :multiple="false"
          :limit="5">
          <span class="blue"> <i class="el-icon el-icon-plus fs12"></i>上传附件</span>
          <div slot="tip" class="el-upload__tip">
            <p class="lh1-5">1. 附件格式支持“PPT、Excel、World和压缩包“格式</p>
            <p class="lh1-5">2. 附件大小不超过20M。</p>
          </div>
        </el-upload>
      </el-form-item>
    </el-form>
    <el-form-item class="mt28 mb10">
      <el-button type="primary">提交</el-button>
    </el-form-item>
  </div>
</div>
</template>

<script>
import WmTable from 'components/Table.vue';
import Vdetail from 'components/visit/VisitDetail.vue';
import { mapState, mapActions } from 'vuex';
export default {
  components: {
    WmTable,
    Vdetail
  },
  computed: {
    visitDetailData() {
      if (this.visitAppointDetail) {
        return this.visitAppointDetail;
      }
    },
    ...mapState({
      visitAppointDetail: ({ visit }) => visit.visitAppointDetail
    })
  },
  data() {
    return {
      visitId: this.$route.params.id,
      isExecute: this.$route.query.isExecute,
      isPoint: this.$route.query.point,
      formData: {
        processor: '',
        feedbackNote: '',
        feedback: ''
      },
      formDataValid: {}
    };
  },
  beforeMount() {
    this.query();
  },
  methods: {
    query() {
      this.queryVisitAppointDetail({visitId: this.visitId});
    },
    ...mapActions([
      'queryVisitAppointDetail'
    ])
  }
};
</script>

<style lang="scss">
@import "scss/variables.scss";
.transfer-out {
  margin-top: 20px;
  form {
    width: 50%;
  }
}
</style>
