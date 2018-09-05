<template>
  <div class="visit-mission-handle-detail">
    <div class="m-container">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/visit/mission-handling' }">走访任务处理</el-breadcrumb-item>
        <el-breadcrumb-item>{{title()}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="m-container info-block">
      <visit-detail-info :visit="visit"></visit-detail-info>
    </div>
    <div class="m-container info-block">
      <el-form label-width="130px">
        <template v-if="visit.isEvaluate === '1'">
          <el-form-item label="走访评价" class="too-long-content">
            {{visit.visitEvaluate}}
          </el-form-item>
        </template>

        <template v-else>
          <el-form-item label="审核结果">
            {{visit.advice ? '驳回' : '通过'}}
          </el-form-item>
          <el-form-item label="审核建议" v-if="visit.advice" class="too-long-content">
            {{visit.advice}}
          </el-form-item>
        </template>
      </el-form>
    </div>
  </div>
</template>
<script>
import {mapActions, mapState} from 'vuex';
import VisitDetailInfo from './DetailInfo';
export default {
  name: 'MissionDetail',
  components: {
    VisitDetailInfo
  },
  data() {
    return {
    };
  },
  created() {
    this.initVisit();
  },
  computed: {
    ...mapState({
      visit: ({ visit }) => {
        return visit.visitDetail;
      }
    })
  },
  methods: {
    title() {
      return this.visit.isEvaluate === '1' ? '查看评价' : '查看';
    },
    initVisit() {
      let visitId = this.$route.params.id;

      this.queryVisitDetail({
        visitId
      });
    },
    ...mapActions([
      'queryVisitDetail'
    ])
  }
};
</script>
<style lang="less">
.visit-mission-handle-detail{
  .info-block{
    margin-top: 16px;
  }

  .too-long-content{
    .el-form-item__content{
      word-break: break-all;
    }
  }
}
</style>
