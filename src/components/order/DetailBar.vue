<template>
  <div class="detail-bar">
    <div class="detail-bar-item" v-for="(item, i) in title" :key="i">
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
<style lang="scss">
.detail-bar {
  border-radius: 2px;
  background-color: #fafafa;
  margin-top: 32px;
  padding: 24px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.detail-bar-item:nth-child(odd) {
  flex: 1;
  display: flex;
}
.title {
  width: 100px;
  text-align: right;
  color: rgba(0, 0, 0, 0.45);
  padding-right: 12px;
}
.detail-bar-item:nth-child(even) {
  flex: 2;
  display: flex;
}
</style>
