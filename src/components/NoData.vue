<template>
  <span>
    <slot v-if="data.length" />
    <div v-if="!data.length" class="no-data">暂无数据</div>
  </span>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  }
};
</script>
