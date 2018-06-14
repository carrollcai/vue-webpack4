<template>
  <el-button class="esop-button">
    <slot />
  </el-button>
</template>

<script>
/* 这个组件已废弃 */
export default {
  props: {
    value: {
      type: String
    }
  }
};
</script>

<style lang="scss">
@import "scss/variables.scss";
.esop-button {
  width: $buttonWidth;
  line-height: $buttonLineHeight;
  background-color: $buttonColor !important;
  color: #fff;
  padding: 0;
}
</style>
