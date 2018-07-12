<template>
  <div class="audit-steps">
    <div v-if="title" class="title">{{title}}</div>
    <div>
      <el-steps :active="activeIndex()" align-center>
        <el-step v-for="item in processList" :key="item.processId" :title="item.opName ? item.opName : '未知'" :description="item.taskName"></el-step>
      </el-steps>
    </div>
  </div>
</template>

<script>
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
  methods: {
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
.audit-steps {
  border-radius: 2px;
  background-color: rgba(250, 250, 250, 1);
  // margin-top: 32px;
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
