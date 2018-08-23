<template>
  <div>
    <retention-search
      :is-whole-country="isWholeCountry()"
      :is-province="isProvince()"
      :is-district="isDistrict()"
      @query="handleQuery"
    />
    <div class="retention-user-outer">
      <retention-user :type="0" />
      <div class="retention-user-center"></div>
      <retention-user :type="1" />
    </div>
    <retention-trend
      :is-whole-country="isWholeCountry()"
      :is-province="isProvince()"
      :is-district="isDistrict()"
      @trend="handleChangeType"
      @query="handleQuery"
    />
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import RetentionSearch from 'components/data-analysis/RetentionSearch.vue';
import RetentionUser from 'components/data-analysis/RetentionUser.vue';
import RetentionTrend from 'components/data-analysis/RetentionTrend.vue';

import mixins from './mixins.js';
import * as types from '@/store/types';

export default {
  mixins: [mixins],
  components: {
    RetentionSearch,
    RetentionUser,
    RetentionTrend
  },
  computed: {
    ...mapState({
      retTrend: ({ dataAnalysis }) => dataAnalysis.retTrend
    })
  },
  methods: {
    handleQuery() {
      this.getRetTrendList(this.retTrend).then(() => {
        this.handleChangeType();
      });
    },
    handleChangeType() {
      let val = this.retTrend.chartRadio;
      if (this.isProvince()) {
        this.$store.commit(types.RETENTION_UPDATE_PROVINCE_TREND_LIST, { chartRadio: val });
      }
    },
    ...mapActions([
      'getRetTrendList'
    ])
  }
};
</script>

<style lang="scss">
</style>
