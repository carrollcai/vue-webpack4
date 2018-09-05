<template>
<div class="step-bg">
  <el-steps :active="activeIndex()" align-center>
    <el-step v-for="item in processLists"
      :key="item"
      :title="item.taskName"
      :description="desc(item)"></el-step>
  </el-steps>

  <div style="display: flex;">
    <div class="child" v-for="item in processLists" :key="item.taskId" :style="{'flex-basis': percent()}">
      <el-popover
        v-if="item.businessStatus === '3' || item.businessStatus === 3"
        popper-class="audit-deal-result"
        placement="top"
        width="200"
        trigger="click"
        :content="item.dealResult">
        <el-button slot="reference" type="text">查看原因</el-button>
        </el-popover>
    </div>
  </div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  props: {
    processInsId: {
      type: Number
    },
    businessStatus: {
      type: String
    }
  },
  beforeMount() {
    this.$nextTick(() => {
      let prams = {
        processInsId: this.processInsId,
        state: this.businessStatus,
        apply: this.$route.name === 'data-audit-detail' ? 1 : 2
      };
      this.queryDataExtractionSteps(prams);
    });
  },
  computed: {
    processLists() {
      return this.processList;
    },
    ...mapState({
      processList: ({ dataExtraction }) => dataExtraction.dataSteps,
      dataDetailList: ({ dataExtraction }) => dataExtraction.dataDetailList
    })
  },
  methods: {
    desc(item) {
      let createDate = item.createDate ? item.createDate : '';
      let opName = item.opName ? (item.opName === '我' ? '(我)' : item.opName) : '';
      let businessStatusName = item.businessStatusName ? item.businessStatusName : '';
      // let hasCompleteName = item.hasCompleteName ? item.hasCompleteName : '';
      return `${createDate} ${opName} ${businessStatusName}`;
    },
    percent() {
      return this.processList.length && parseFloat(1 / this.processList.length * 100).toFixed(4) + '%';
    },
    activeIndex() {
      let index = this.processList.map(val => val.hasComplete).lastIndexOf(1);
      return index > -1 ? index + 1 : 0;
    },
    ...mapActions([
      'queryDataExtractionSteps'
    ])
  }
};
</script>

<style lang="less" scoped>
.step-bg{
   background: #F0F2F5;
   padding-top: 30px;
   padding-bottom: 20px;
   .child {text-align: center;}
}
</style>
