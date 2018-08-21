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
        processInsId: this.processInsId
      };
      // if (this.processList.businessStatus === '1') {
        // prams.businessStatus = [1];
      // }
      this.queryDataExtractionSteps(prams);
    });
  },
  computed: {
    processLists() {
      let _Data = this.processList;
      if (_Data) {
        let obj = null;
        _Data.map((val) => {
          if (val.taskName === '二级审核') {
            if (val.businessStatus === '3') {
              obj = {
                hasComplete: 1,
                hasCompleteName: '已完成',
                taskName: '审核不通过',
                businessStatus: '已处理',
                sortId: val.sortId,
                taskId: val.taskId,
                taskKey: val.taskKey
              };
            } else {
              obj = {
                hasComplete: 0,
                hasCompleteName: '未完成',
                taskName: '数据生成中',
                businessStatus: '待处理',
                sortId: val.sortId,
                taskId: val.taskId,
                taskKey: val.taskKey
              };
            }
            if (this.$route.name === 'data-audit-detail') {
              _Data.push(obj);
            }
          }
        });
        return _Data;
      }
    },
    ...mapState({
      processList: ({ dataExtraction }) => dataExtraction.dataSteps
    })
  },
  methods: {
    desc(item) {
      let createDate = item.createDate ? item.createDate : '';
      let opName = item.opName ? item.opName : '';
      let hasCompleteName = item.hasCompleteName ? item.hasCompleteName : '';
      return `${createDate}${opName}${hasCompleteName}`;
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

<style lang="scss" scoped>
.step-bg{
   background: #F0F2F5;
   padding-top: 30px;
   padding-bottom: 20px;
   .child {text-align: center;}
}
</style>
