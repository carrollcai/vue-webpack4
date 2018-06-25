<template>
  <div class="display-title">
    {{label}}
  </div>
</template>

<script>
export default {
  props: {
    label: String
  }
};
</script>

<style scoped>
.display-title {
  padding-left: 32px;
  background: #fff;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  text-align: left;
  font-weight: bold;
  border-bottom: 1px solid rgba(230, 230, 230, 1);
}
</style>
