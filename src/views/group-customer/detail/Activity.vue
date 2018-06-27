<template>
  <div class="activity">

  </div>
</template>
<script>
export default {
  name: 'Activity',
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>
<style lang="scss">
.activity{
  border-radius: 2px;
  background-color: #FAFAFA;
  height: 163px;

  * {
    box-sizing: border-box;
  }
}
</style>
