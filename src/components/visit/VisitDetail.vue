<template>
  <div class="visit-datil">
    <div class="visit-title">
      <div class="task-detail-item" v-if="visitDetails.visitAuditor && isPoint === 'true'">
        <div class="left">指派人员：</div>
        <div class="right">{{visitDetails.visitAuditor}}</div>
      </div>
      <div class="task-detail-item" v-if="visitDetails.visitAuditor && isPoint === 'false'">
        <div class="left">审核人员：</div>
        <div class="right">{{visitDetails.visitAuditor}}</div>
      </div>
      <div class="task-detail-item" v-if="isPoint === 'true'">
        <div class="left">走访状态：</div>
        <div class="right">{{visitDetails.visitStatus}}</div>
      </div>
      <div class="task-detail-item" v-if="visitDetails.assignNote && isPoint === 'false'">
        <div class="left">指派说明：</div>
        <div class="right">{{visitDetails.assignNote}}</div>
      </div>
    </div>
    <div class="task-detail-item">
      <div class="left">走访主题：</div>
      <div class="right">{{visitDetails.visitTheme}}</div>
    </div>
    <div class="task-detail-item">
      <div class="left">走访公司：</div>
      <div class="right">{{visitDetails.organizeName}}</div>
    </div>
    <div class="task-detail-item">
      <div class="left">走访对象：</div>
      <div class="right">{{visitDetails.intervieweeName}}；{{visitDetails.intervieweeMobile}}</div>
    </div>
    <div class="task-detail-item">
      <div class="left">我方出席人员：</div>
      <div class="right">{{visitDetails.visitPresentMembers}}</div>
    </div>
    <div class="task-detail-item">
      <div class="left">走访时间：</div>
      <div class="right">{{visitDetails.visitStartTime}} ~ {{visitDetails.visitEndTime}}</div>
    </div>
    <div class="task-detail-item">
      <div class="left">走访内容：</div>
      <div class="right">{{visitDetails.visitContent}}</div>
    </div>
    <div class="task-detail-item">
      <div class="left">涉及商机编码：</div>
      <div class="right">{{visitDetails.relOpporCode}}</div>
    </div>
    <div class="task-detail-item">
      <div class="left">问题协调：</div>
      <div class="right">{{visitDetails.problemCoordinate}}</div>
    </div>
    <div class="task-detail-item">
      <div class="left">是否首客走访：</div>
      <div class="right">{{visitDetails.isFirstVisit === 0 || visitDetails.isFirstVisit === '0' ? '否' : '是'}}</div>
    </div>
    <!-- <div v-if="isPoint && visitDetails.isFirstVisit" class="task-detail-item">
      <div class="left">走访汇报：</div>
      <div class="right">{{visitDetails.isFirstVisit}}</div>
    </div> -->
  </div>
</template>
<script>
export default {
  props: {
    visitDetail: {
      type: Object
    },
    isPoint: {
      type: String
    }
  },
  computed: {
    visitDetails() {
      let _this = this;
      if (this.visitDetail) {
        let state = this.visitDetail.visitStatus;
        if (state === '1') {
          _this.visitDetail.visitStatus = '待审核';
        } else if (state === '2' || state === '0') {
          _this.visitDetail.visitStatus = '待执行';
        } else if (state === '3') {
          _this.visitDetail.visitStatus = '已驳回';
        } else {
          _this.visitDetail.visitStatus = '已完成';
        }
        return this.visitDetail;
      }
    }
  }
};
</script>
<style lang="scss">
.visit-datil {
  .visit-title {
    display: flex;
    background: #FAFAFA;
    .task-detail-item {
      width: 50%;
      margin-bottom: 16px;
    }
  }
  .task-detail-item {
    .left {
      min-width: 120px;
    }
    .right {
      word-break: break-all;
    }
  }
}
</style>
