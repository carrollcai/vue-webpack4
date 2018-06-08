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
import { mapActions, mapState } from 'vuex';
export default {
  components: {
    RetentionSearch,
    RetentionUser,
    RetentionTrend
  },
  beforeMount() {
    // 默认第一次加载所有请求
    this.query();
  },
  computed: {
    ...mapState({
      retentionObj: ({ dataAnalysis }) => dataAnalysis.retentionObj,
      retTrend: ({ dataAnalysis }) => dataAnalysis.retTrend
    })
  },
  methods: {
    query() {
      const { retentionObj, retTrend } = this;
      this.getRetentionLossUser(retentionObj);
      this.getRetTrendList(retTrend);
    },
    ...mapActions([
      'getRetentionLossUser',
      'getRetTrendList'
    ])
  }
};
</script>

<style lang="scss">
</style>
