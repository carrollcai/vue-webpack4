<template>
<div>
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
export default {
  props: {
    processList: {
      type: Array,
      default: () => []
    }
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
    }
  }
};
</script>

<style lang="scss" scoped>
.child {text-align: center;}
</style>
