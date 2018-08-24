<template>
  <div>
    <adduser-search @query="handleQuery"/>

    <!-- 新增用户数据 -->
    <adduser-total-data v-if="isProvince()"/>

    <!-- 大区各省份用户新增排名情况 -->
    <adduser-total-data-chart
      v-if="isDistrict()"
      title="大区各省份用户新增排名情况"
      @query="handleQueryProvinceOverview"
      @changeType="handleChangeProvinceType"
    />

    <!-- 全国各省份用户新增排名情况 -->
    <adduser-total-data-chart
      v-if="isWholeCountry()"
      title="全国各省份用户新增排名情况"
      @query="handleQueryProvinceOverview"
      @changeType="handleChangeProvinceType"
    />

    <!-- 新增用户趋势分析 -->
    <adduser-trend
      :is-province="isProvince()"
      :is-district="isDistrict()"
      :is-whole-country="isWholeCountry()"
      @query="handleQueryTrend"
      @changeType="handleChangeTrendType"
    />

    <!-- 新增会员用户趋势分析 -->
    <adduser-vip-trend
      :is-province="isProvince()"
      :is-district="isDistrict()"
      :is-whole-country="isWholeCountry()"
      @query="handleQueryVip"
      @vip="handleChangeVipType"
    />
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import AdduserSearch from 'components/data-analysis/AdduserSearch.vue';
import AdduserTotalData from 'components/data-analysis/AdduserTotalData.vue';
import AdduserTrend from 'components/data-analysis/AdduserTrend.vue';
import AdduserTotalDataChart from 'components/data-analysis/AdduserTotalDataChart.vue';
import AdduserVipTrend from 'components/data-analysis/AdduserVipTrend.vue';

import mixins from './mixins';
import * as types from '@/store/types';
import {
  oneMonthAgo
} from '@/utils/helper';

export default {
  mixins: [mixins],
  components: {
    AdduserSearch,
    AdduserTotalData,
    AdduserTrend,
    AdduserTotalDataChart,
    AdduserVipTrend
  },
  computed: {
    ...mapState({
      addUserObj: ({ dataAnalysis }) => dataAnalysis.adduserObj,
      userMapTrend: ({ dataAnalysis }) => dataAnalysis.adduserMapTrend,
      userTrend: ({ dataAnalysis }) => dataAnalysis.adduserTrend,
      vipTrend: ({ dataAnalysis }) => dataAnalysis.adduserVipTrend,
    }),
    clientType() {
      return this.addUserObj.clientSelected;
    }
  },
  created() {
    this.handleQuery();
  },
  methods: {
    handleQuery() {
      const {isProvince, isDistrict, isWholeCountry} = this;

      if (isProvince()) {
        this.queryOverview();
      }

      if (isDistrict() || isWholeCountry()) {
        this.handleQueryProvinceOverview();
      }

      this.handleQueryTrend();
      this.handleQueryVip();
    },
    /**
     * 查询 新增用户数据
     */
    queryOverview() {
      console.log('queryOverview');
      this.queryAddUserOverview();
    },
    /**
     * 获取 查询新增用户数据的参数
     */
    getOverviewParams() {
      const {clientType} = this;
      return {
        clientSelected: clientType,
        date: oneMonthAgo
      };
    },
    /**
     *各省份用户新增排名情况 查询数据
     */
    handleQueryProvinceOverview() {
      this.queryAddUserMap().then(() => {
        this.handleChangeProvinceType(this.userMapTrend.chartRadio);
      });
    },
    /**
     *各省份用户新增排名情况 类型变化
     */
    handleChangeProvinceType(val) {
      const {isDistrict, isWholeCountry} = this;

      let mutation;
      if (isDistrict()) {
        mutation = types.ADD_USER_DISTRICT_MAP;
      }

      if (isWholeCountry()) {
        mutation = types.ADD_USER_COUNTRY_MAP;
      }

      this.$store.commit(mutation, val);
    },
    /**
     *新增用户趋势分析 查询数据
     */
    handleQueryTrend() {
      const {clientType, userTrend} = this;

      let params = {
        clientSelected: clientType,
        startDate: userTrend.startDate,
        endDate: userTrend.endDate,
        chartRadio: userTrend.chartRadio
      };

      this.queryAddUserTrend(params).then(() => {
        this.handleChangeTrendType(this.userTrend.chartRadio);
      });
    },
    /**
     * 新增用户趋势分析 类型变化
     */
    handleChangeTrendType(val) {
      const {isProvince, isDistrict, isWholeCountry} = this;

      let mutation;
      if (isProvince()) {
        mutation = types.ADD_USER_PROVINCE_TREND;
      }

      if (isDistrict()) {
        mutation = types.ADD_USER_DISTRICT_TREND;
      }

      if (isWholeCountry()) {
        mutation = types.ADD_USER_COUNTRY_TREND;
      }

      this.$store.commit(mutation, val);
    },
    /**
     * 新增会员用户趋势分析 查询数据
     */
    handleQueryVip() {
      const {clientType, vipTrend} = this;

      let params = {
        clientSelected: clientType,
        startDate: vipTrend.startDate,
        endDate: vipTrend.endDate,
        chartRadio: vipTrend.chartRadio
      };

      this.queryAddUserVip(params).then(() => {
        this.handleChangeVipType(this.vipTrend.chartRadio);
      });
    },
    /**
     * 新增会员用户趋势分析 类型变化
     */
    handleChangeVipType(val) {
      const {isProvince, isDistrict, isWholeCountry} = this;

      let mutation;
      if (isProvince()) {
        mutation = types.ADD_USER_PROVINCE_VIP;
      }

      if (isDistrict()) {
        mutation = types.ADD_USER_DISTRICT_VIP;
      }

      if (isWholeCountry()) {
        mutation = types.ADD_USER_COUNTRY_VIP;
      }

      this.$store.commit(mutation, val);
    },
    ...mapActions([
      'queryAddUserOverview',
      'queryAddUserTrend',
      'queryAddUserMap',
      'queryAddUserVip'
    ])
  }
};
</script>
