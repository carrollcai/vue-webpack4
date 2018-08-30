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
      if (_Data.length) {
        let status = this.dataDetailList.extractBusinessStatus;
        let statusName = this.dataDetailList.extractBusinessStatusName;
        let obj = {};
        let flag = false;
        if (_Data[2] && _Data[2].taskName.indexOf('审核') !== -1 && _Data[2].hasComplete === 0) {
          flag = true;
        }
        if (status < 2) {
          obj.taskName = '数据生成';
          obj.hasComplete = 0;
          obj.hasCompleteName = '未完成';
          obj.businessStatus = '待处理';
        } else {
          if (flag) {
            obj.taskName = '数据生成';
            obj.hasComplete = 0;
            obj.hasCompleteName = '未完成';
            obj.businessStatus = '待处理';
          } else {
            obj.taskName = statusName;
            obj.hasComplete = 1;
            if (status === 3) {
              obj.hasCompleteName = '数据生成中需要一段时间，请耐心等待生成后会短信通知您！';
            } else {
              obj.hasCompleteName = '已完成';
            }
            obj.businessStatus = '已处理';
          }
        }
        if (this.$route.name === 'data-detail') {
          _Data.push(obj);
        }
        return _Data;
      }
    },
    ...mapState({
      processList: ({ dataExtraction }) => dataExtraction.dataSteps,
      dataDetailList: ({ dataExtraction }) => dataExtraction.dataDetailList
    })
  },
  methods: {
    desc(item) {
      let createDate = item.createDate ? item.createDate : '';
      let opName = item.opName ? (item.opName === '我' ? '（我）' : item.opName) : '';
      let businessStatusName = item.businessStatusName ? item.businessStatusName : '';
      return `${createDate}${opName}${businessStatusName}`;
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
