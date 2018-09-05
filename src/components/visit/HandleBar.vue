<template>
  <div class="visit-handle-bar">
    <div class="visit-handle-bar-item" v-for="(item, i) in title" :key="i">
      <div class="title">{{item}}</div>
      <div>{{content[i]}}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      default: () => {
        return [];
      },
      type: Array
    },
    content: {
      default: () => {
        return [];
      },
      type: Array
    }
  }
};
</script>
<style lang="less">
.visit-handle-bar {
  border-radius: 2px;
  background-color: #fafafa;
  padding: 24px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .title {
    width: 100px;
    text-align: right;
    color: rgba(0, 0, 0, 0.45);
    padding-right: 12px;
  }
}
.visit-handle-bar-item:nth-child(odd) {
  flex: 1;
  display: flex;
}
.visit-handle-bar-item:nth-child(even) {
  flex: 2;
  display: flex;
}
</style>
