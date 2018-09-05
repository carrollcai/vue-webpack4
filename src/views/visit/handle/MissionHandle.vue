<template>
  <div class="visit-mission-handle">
    <div class="m-container">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/visit/mission-handling' }">走访任务处理</el-breadcrumb-item>
        <el-breadcrumb-item> { { title() } }

        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="m-container info-block">
      <visit-detail-info :visit="visit"></visit-detail-info>
    </div>
    <div class="m-container info-block">
      <!-- 评价 -->
      <el-form v-if="visit.visitStatus === '4'"
        ref="baseForm"
        :model="baseForm"
        :rules="rules"
        label-width="130px"
        key="judge-form">
        <el-form-item label="走访评价"
          prop="visitEvaluate">
          <el-input type="textarea"
            placeholder="请输入走访评价"
            :maxlength="500"
            v-model="baseForm.visitEvaluate"></el-input>
        </el-form-item>
        <el-form-item key="judge-btns">
          <el-button type="primary"
            key="judge-btn"
            @click="judge">确认</el-button>
          <el-button type="default"
            @click="back">取消</el-button>
        </el-form-item>
      </el-form>
      <!-- 审核 -->
      <el-form v-if="visit.visitStatus === '1'"
        ref="auditForm"
        :model="baseForm"
        :rules="rules"
        label-width="130px"
        key="audit-form">
        <el-form-item label="审核结果"
          prop="resultStatus">
          <el-radio-group v-model="baseForm.resultStatus"
            key="status-radio">
            <el-radio label="2">通过</el-radio>
            <el-radio label="3">驳回</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="baseForm.resultStatus === '3'"
          label="审核建议"
          prop="dealResult">
          <el-input type="textarea"
            :maxlength="500"
            placeholder="如审核不通过，请填写原因供创建者查看！"
            v-model="baseForm.dealResult"></el-input>
        </el-form-item>
        <el-form-item key="audit-btns">
          <el-button type="primary"
            key="audit-btn"
            @click="audit">确认</el-button>
          <el-button type="default"
            @click="back">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  mapActions,
  mapState
} from 'vuex';
import VisitDetailInfo from './DetailInfo.vue';
import {
  isEmpty as emptyValidator
} from '@/utils/rules';
export default {
  name: 'MissionHandle',
  components: {
    VisitDetailInfo
  },
  data() {
    return {
      baseForm: {
        visitEvaluate: '', resultStatus: '2', dealResult: ''
      },
      rules: {
        visitEvaluate: [{
          required: true, message: '请输入走访评价', trigger: 'blur'
        },
        {
          validator: emptyValidator, trigger: 'blur'
        }
        ],
        resultStatus: [{
          required: true, message: '请选择审核结果', trigger: 'change'
        }
        ],
        dealResult: [{
          required: true, message: '请输入审核建议', trigger: 'blur'
        },
        {
          validator: emptyValidator, trigger: 'blur'
        }
        ]
      }
    };
  },
  created() {
    this.initVisit();
  },
  computed: {
    ...mapState({
      visit: ({ visit }) => visit.visitDetail
    })
  },
  methods: {
    initVisit() {
      let visitId = this.$route.params.id;
      this.queryVisitDetail({
        visitId
      });
    },
    title() {
      return this.visit.visitStatus === '1' ? '审核' : '评价';
    },
    /**
     * 评价走访任务
     */
    judge() {
      const that = this;
      that.$refs.baseForm.validate((valid) => {
        if (valid) {
          that.judgeVisit({
            visitId: that.$route.params.id, visitEvaluate: this.baseForm.visitEvaluate
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
          const {
            dealResult, resultStatus
          } = that.baseForm;
          that.auditVisit({
            id: that.$route.params.id, taskInsId: that.$route.params.taskInsId, resultStatus, dealResult
          }
          );
        }
      });
    },
    back() {
      this.$router.replace('/visit/mission-handling');
    },
    ...mapActions(['auditVisit', 'judgeVisit', 'queryVisitDetail'])
  }
};
</script>

<style lang="less">
@import "~scss/variables.less";
.visit-mission-handle {
  .info-block {
    margin-top: 16px;
  }
  .el-textarea {
    width: @formLargeWidth;
  }
}
</style>