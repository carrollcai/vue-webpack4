<template>
  <div class="audit-steps">
    <div v-if="title" class="title">{{title}}</div>
    <div>
      <div style="display: flex;">
        <div class="child-title" v-for="item in processList" :key="item.processId" :style="{'flex-basis': percent()}">
          {{item.taskName}}
        </div>
      </div>
      <el-steps :active="activeIndex()" align-center>
        <el-step v-for="item in processList" :key="item.processId" :title="titleFilter(item)" :description="item.opName">
        </el-step>
      </el-steps>
      <div style="display: flex;">
        <div v-if="Number(item.businessStatus) === cancelReasonStatus && item.dealResult" class="child" v-for="item in processList" :key="item.processId" :style="{'flex-basis': percent()}">
          <el-popover placement="top" width="200" trigger="click" :content="item.dealResult">
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
    this.cancelReasonStatus = 3;
  },
  methods: {
    titleFilter(item) {
      return item.doneDate ? item.doneDate : '';
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
