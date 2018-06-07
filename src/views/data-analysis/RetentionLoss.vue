<template>
  <div>
    <retention-search />
    <div class="retention-user-outer">
      <retention-user />
      <div class="retention-user-center"></div>
      <retention-user />
    </div>

  </div>
</template>

<script>
import RetentionSearch from 'components/data-analysis/RetentionSearch.vue';
import RetentionUser from 'components/data-analysis/RetentionUser.vue';
export default {
  components: {
    RetentionSearch,
    RetentionUser
  }
};
</script>

<style lang="scss">
@import "scss/views/retention.scss";
</style>
