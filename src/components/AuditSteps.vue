<template>
  <div class="audit-steps">
    <div v-if="title" class="title">{{title}}</div>
    <div>
      <div style="display: flex;">
        <div class="child-title" v-for="(item, i) in processList" :key="item.processId" :style="{'flex-basis': percent()}">
          <!-- 商机转订单特殊处理 -->
          {{!(businessToOrderId && i === 0) ? item.taskName : '商机转订单'}}
        </div>
      </div>
      <el-steps :active="activeIndex()" align-center>
        <el-step v-for="item in processList" :key="item.processId" :title="titleFilter(item)" :description="taskDesc(item)">
        </el-step>
      </el-steps>
      <div style="display: flex;">
        <div class="child" v-for="item in processList" :key="item.processId" :style="{'flex-basis': percent()}">
          <el-popover popper-class="audit-deal-result" v-if="isNotPassed(item)" placement="top" width="200" trigger="click" :content="item.dealResult">
            <el-button slot="reference" type="text">查看原因</el-button>
          </el-popover>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/*
* 公共的进度流程封装
*/
export default {
  props: {
    businessToOrderId: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    processList: {
      type: Array,
      default: () => []
    }
  },
  created() {
  },
  methods: {
    titleFilter(item) {
      return item.doneDate ? item.doneDate : '';
    },
    taskDesc(item) {
      let result = '';

      if (item.hasComplete === 1) {
        result = (item.opName ? item.opName : '') + (item.businessStatusName ? item.businessStatusName : (item.businessStatus ? item.businessStatus : ''));
      }

      return result;
    },
    isNotPassed(item) {
      return item.businessStatus === '0' && !!item.dealResult;
    },
    percent() {
      return this.processList.length && parseFloat(1 / this.processList.length * 100).toFixed(4) + '%';
    },
    activeIndex() {
      // hasComplete为1代表已完成
      let index = this.processList
        .map(val => val.hasComplete)
        .lastIndexOf(1);
      return index > -1 ? index + 1 : 0;
    }
  }
};
</script>

<style lang="scss" scoped>
.child-title {
  text-align: center;
  font-size: 16px;
  font-weight: bold;
}
.child {
  text-align: center;
}
.audit-steps {
  border-radius: 2px;
  background-color: rgba(250, 250, 250, 1);
  padding-bottom: 24px;
  padding-top: 24px;
  .title {
    height: 24px;
    line-height: 24px;
    font-size: 16px;
    font-weight: bold;
    padding: 32px 0;
    margin-left: 40px;
  }
}
</style>
