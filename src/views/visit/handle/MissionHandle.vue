<template>
  <div class="visit-mission-handle">
    <div class="m-container">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/visit/mission-handling' }">走访任务处理</el-breadcrumb-item>
        <el-breadcrumb-item>评价</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="m-container info-block">
      <visit-detail-info :visit="visit"></visit-detail-info>
    </div>

    <div class="m-container info-block">
      <el-form ref="baseForm" :model="baseForm" :rules="rules" label-width="130px">
        <el-form-item label="走访评价" required prop="estimation">
          <el-input type="textarea" placeholder="请输入走访评价" v-model="baseForm.estimation">
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="judge">确认</el-button>
          <el-button type="default" @click="back">取消</el-button>
        </el-form-item>
      </el-form>

      <el-form ref="auditForm" :model="baseForm" :rules="rules" label-width="130px">
        <el-form-item label="审核结果" required prop="resultStatus">
          <el-radio-group v-model="baseForm.resultStatus" key="status-radio">
            <el-radio label="1">通过</el-radio>
            <el-radio label="0">驳回</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-if="baseForm.resultStatus === '0'" label="审核建议" prop="suggestions">
          <el-input type="textarea" placeholder="如审核不通过，请填写原因供创建者查看！" v-model="baseForm.suggestions">
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="audit">确认</el-button>
          <el-button type="default" @click="back">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import VisitDetailInfo from './DetailInfo.vue';
export default {
  name: 'MissionHandle',
  components: {
    VisitDetailInfo
  },
  data() {
    return {
      baseForm: {
        estimation: '',
        resultStatus: '1'
      },
      rules: {
        estimation: [
          {required: true, message: '请输入走访评价', trigger: 'blur'}
        ],
        resultStatus: [
          {required: true, message: '请选择审核结果', trigger: 'change'}
        ],
        suggestions: [
          {required: true, message: '请输入审核建议', trigger: 'blur'}
        ]
      }
    };
  },
  created() {
    this.initVisit();
  },
  computed: {
    ...mapState({
      visit: ({ requirement }) => {
        return {};
      }
    })
  },
  methods: {
    initVisit() {
      let visitId = this.$route.params.id;

      return visitId;
    },
    /**
     * 评价走访任务
     */
    judge() {
      const that = this;
      that.$refs.baseForm.validate((valid) => {
        if (valid) {
          that.judgeVisit({
            visitId: that.$route.params.id,
            visitEvaluate: ''
          });
        }
      });
    },
    /**
     * 审核走访任务
     */
    audit() {
      const that = this;
      that.$refs.auditForm.validate((valid) => {
        if (valid) {
          that.auditVisit({
            resultStatus: '',
            id: that.$route.params.id,
            dealResult: ''
          });
        }
      });
    },
    back() {
      this.$router.replace('/visit/mission-handling');
    },
    ...mapActions([
      'auditVisit',
      'judgeVisit'
    ])
  }
};
</script>
<style lang="scss">
@import "scss/variables.scss";
.visit-mission-handle{
  .info-block{
    margin-top: 16px;
  }

  .el-textarea{
    width: $formLargeWidth;
  }
}
</style>
