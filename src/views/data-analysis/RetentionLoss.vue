<template>
  <div>
    <retention-search />
    <div class="retention-user-outer">
      <retention-user :type="0" />
      <div class="retention-user-center"></div>
      <retention-user :type="1" />
    </div>
    <retention-trend />
  </div>
</template>

<script>
import RetentionSearch from 'components/data-analysis/RetentionSearch.vue';
import RetentionUser from 'components/data-analysis/RetentionUser.vue';
import RetentionTrend from 'components/data-analysis/RetentionTrend.vue';
export default {
  components: {
    RetentionSearch,
    RetentionUser,
    RetentionTrend
  }
};
</script>

<style lang="scss">
</style>
