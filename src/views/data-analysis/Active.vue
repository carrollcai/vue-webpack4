<template>
  <div>
    <active-search @query="handleQuery"/>

    <active-userdata v-if="isProvince()"/>

    <active-province-user
      v-if="isDistrict()"
      title="大区各省份活跃度排名情况"
      @query="handleQueryProvince"
    />
    <active-province-user
      v-if="isWholeCountry()"
      title="全国各省份活跃度排名情况"
      @query="handleQueryProvince"
    />

    <active-trend v-if="isProvince()"
      title="活跃度趋势分析"
      @changeType="handleChangeType"
      @query="handleQueryTrend"
      :is-province="isProvince()"/>

    <active-trend v-if="isDistrict()"
      title="各省份活跃度趋势分析"
      @changeType="handleChangeType"
      @query="handleQueryTrend"
      :is-district="isDistrict()" />

    <active-trend v-if="isWholeCountry()"
      title="全国各大区活跃度趋势分析"
      @changeType="handleChangeType"
      @query="handleQueryTrend"
      :is-whole-country="isWholeCountry()"/>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';

import ActiveSearch from 'components/data-analysis/ActiveSearch.vue';
import ActiveUserdata from 'components/data-analysis/ActiveUserdata.vue';
import ActiveTrend from 'components/data-analysis/ActiveTrend.vue';
import ActiveProvinceUser from 'components/data-analysis/ActiveProvinceUser.vue';

import mixins from './mixins.js';
import * as types from '@/store/types';

export default {
  mixins: [mixins],
  components: {
    ActiveSearch,
    ActiveTrend,
    ActiveUserdata,
    ActiveProvinceUser
  },
  computed: {
    ...mapState({
      activeObj: ({ dataAnalysis }) => dataAnalysis.activeObj,
      trend: ({ dataAnalysis }) => dataAnalysis.trend,
    })
  },
  created() {
    this.handleQuery();
  },
  methods: {
    handleQuery() {
      const that = this;
      const {isProvince, isDistrict, isWholeCountry} = that;
      let params = that.getParams();

      // 第一模块
      if (isProvince()) {
        this.getDailyActiveUser(params);
      }

      this.handleQueryTrend();

      // 第三模块
      if (isDistrict() || isWholeCountry()) {
        this.handleQueryProvince();
      }
    },
    getParams() {
      return this.activeObj;
    },
    /**
     *
     */
    handleQueryProvince() {
      this.getProvinceUser();
    },
    /**
     * 活跃度趋势分析 查询数据
     */
    handleQueryTrend() {
      const that = this;
      that.getTrendList().then(() => {
        that.handleChangeType(that.trend.chartRadio);
      });
    },
    handleChangeType(val) {
      const {isProvince, isDistrict, isWholeCountry} = this;
      let type = types.ACTIVE_UPDATE_PROVINCE_TREND;

      if (isProvince()) {
        type = types.ACTIVE_UPDATE_PROVINCE_TREND;
      }

      if (isDistrict()) {
        type = types.ACTIVE_UPDATE_DISTRICT_TREND;
      }

      if (isWholeCountry()) {
        type = types.ACTIVE_UPDATE_COUNTRY_TREND;
      }

      this.$store.commit(type, { chartRadio: val });
    },
    ...mapActions([
      'getMembers',
      'getDailyActiveUser',
      'getTrendList',
      'getProvinceUser',
      'getTrendNewMembers'
    ])
  }
};
</script>
