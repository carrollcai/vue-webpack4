<template>
  <div>
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
      type: Boolean
    }
  },
  computed: {
    visitDetails() {
      if (this.visitDetail) {
        return this.visitDetail;
      }
    }
  }
};
</script>
