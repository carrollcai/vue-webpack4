<template>
<div class="step-bg">
  {{processList}}
  <el-steps :active="activeIndex()" align-center>
    <el-step v-for="item in processList"
      :key="item"
      :title="item.title"
      :description="desc(item)"></el-step>
  </el-steps>
  <div style="display: flex;">
    <div class="child" v-for="item in processList" :key="item.processId" :style="{'flex-basis': percent()}">
      <el-popover
        v-if="item.state === '4' || item.state === 4"
        popper-class="audit-deal-result"
        placement="top"
        width="200"
        trigger="click"
        :content="item.detail">
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
    }
  },
  beforeMount() {
    this.$nextTick(() => {
      let prams = {
        processInsId: this.processInsId
      };
      this.queryDataExtractionSteps(prams);
    });
  },
  computed: {
    ...mapState({
      processList: ({ dataExtraction }) => dataExtraction.dataSteps
    })
  },
  methods: {
    desc(item) {
      return `${item.opName}${item.time}${item.detail}`;
    },
    percent() {
      return this.processList.length && parseFloat(1 / this.processList.length * 100).toFixed(4) + '%';
    },
    activeIndex() {
      let index = this.processList.map(val => val.state).lastIndexOf(2);
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
   .child {text-align: center;}
}
</style>
