<template>
  <div>
    <adduser-search @query="handleQuery" />

    <!-- 新增用户数据 -->
    <adduser-total-data v-if="isProvince()" />

    <!-- 大区各省份用户新增排名情况 -->
    <adduser-total-data-chart v-if="isDistrict()"
      title="大区各省份用户新增排名情况"
      @query="handleQueryProvinceOverview"
      @changeType="handleChangeProvinceType" />

    <!-- 全国各省份用户新增排名情况 -->
    <adduser-total-data-chart v-if="isWholeCountry()"
      title="全国各省份用户新增排名情况"
      @query="handleQueryProvinceOverview"
      @changeType="handleChangeProvinceType" />

    <!-- 新增用户趋势分析 -->
    <adduser-trend :is-province="isProvince()"
      :is-district="isDistrict()"
      :is-whole-country="isWholeCountry()"
      @query="handleQueryTrend"
      @changeType="handleChangeTrendType"
      @downloadAdduserTrend="downloadAdduserTrend" />

    <!-- 新增会员用户趋势分析 -->
    <adduser-vip-trend :is-province="isProvince()"
      :is-district="isDistrict()"
      :is-whole-country="isWholeCountry()"
      @query="handleQueryVip"
      @vip="handleChangeVipType"
      @downloadAdduserVip="downloadAdduserVip" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AdduserSearch from 'components/data-analysis/adduser/AdduserSearch.vue';
import AdduserTotalData from 'components/data-analysis/adduser/AdduserTotalData.vue';
import AdduserTrend from 'components/data-analysis/adduser/AdduserTrend.vue';
import AdduserTotalDataChart from 'components/data-analysis/adduser/AdduserTotalDataChart.vue';
import AdduserVipTrend from 'components/data-analysis/adduser/AdduserVipTrend.vue';
import { addFirstDayinMonth } from '@/utils/common.js';

import mixins from './mixins';
import * as types from '@/store/types';
import {
  oneMonthAgo,
  oneMonthAgoNoDay
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
    downloadAdduserTrend() {
      const { clientType, userTrend } = this;

      let params = {
        clientType,
        startDate: addFirstDayinMonth(userTrend.startDate),
        endDate: addFirstDayinMonth(userTrend.endDate),
        region: userTrend.district
      };

      this.downloadAdduserDataAnalysis(params);
    },
    downloadAdduserVip() {
      const { clientType, vipTrend } = this;

      let params = {
        clientType,
        startDate: addFirstDayinMonth(vipTrend.startDate),
        endDate: addFirstDayinMonth(vipTrend.endDate),
        region: vipTrend.district
      };
      this.downloadNewMember(params);
    },
    handleQuery() {
      const { isProvince, isDistrict, isWholeCountry } = this;

      if (isProvince()) {
        this.queryOverview();
        this.queryLastMonthNewNembers();
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
      const { clientType } = this;
      let params = {
        clientType,
        startDate: addFirstDayinMonth(oneMonthAgoNoDay),
        endDate: addFirstDayinMonth(oneMonthAgoNoDay)
      };
      this.queryAddUserOverview(params);
    },
    /**
     * 查询 上一个月新增会员用户
     */
    queryLastMonthNewNembers() {
      const { clientType } = this;
      let params = {
        clientType,
        startDate: oneMonthAgo,
        endDate: oneMonthAgo
      };
      this.queryAddUserLastMonthNewNembers(params);
    },
    /**
     * 获取 查询新增用户数据的参数
     */
    getOverviewParams() {
      const { clientType } = this;
      return {
        clientSelected: clientType,
        date: oneMonthAgo
      };
    },
    /**
     *各省份用户新增排名情况 查询数据
     */
    handleQueryProvinceOverview() {
      const { clientType, userMapTrend } = this;
      let params = {
        clientType,
        startDate: addFirstDayinMonth(userMapTrend.startDate),
        endDate: addFirstDayinMonth(userMapTrend.endDate)
      };

      this.queryAddUserMap(params).then(() => {
        this.handleChangeProvinceType(this.userMapTrend.chartRadio);
      });
    },
    /**
     *各省份用户新增排名情况 类型变化
     */
    handleChangeProvinceType(val) {
      this.$store.commit(types.ADD_USER_DISTRICT_MAP, val);
    },
    /**
     *新增用户趋势分析 查询数据
     */
    handleQueryTrend() {
      const { clientType, userTrend } = this;

      let params = {
        clientType,
        startDate: addFirstDayinMonth(userTrend.startDate),
        endDate: addFirstDayinMonth(userTrend.endDate),
        region: userTrend.district
      };

      this.queryAddUserTrend(params).then(() => {
        this.handleChangeTrendType(this.userTrend.chartRadio);
      });
    },
    /**
     * 新增用户趋势分析 类型变化
     */
    handleChangeTrendType(val) {
      this.$store.commit(types.ADD_USER_PROVINCE_TREND, val);
    },
    /**
     * 新增会员用户趋势分析 查询数据
     */
    handleQueryVip() {
      const { clientType, vipTrend } = this;

      let params = {
        clientType,
        startDate: addFirstDayinMonth(vipTrend.startDate),
        endDate: addFirstDayinMonth(vipTrend.endDate),
        region: vipTrend.district
      };

      this.queryAddUserVip(params).then(() => {
        this.handleChangeVipType(this.vipTrend.chartRadio);
      });
    },
    /**
     * 新增会员用户趋势分析 类型变化
     */
    handleChangeVipType(val) {
      this.$store.commit(types.ADD_USER_VIP_CHART, val);
    },
    ...mapActions([
      'queryAddUserOverview',
      'queryAddUserTrend',
      'queryAddUserMap',
      'queryAddUserVip',
      'downloadAdduserDataAnalysis',
      'downloadNewMember',
      'queryAddUserLastMonthNewNembers',
    ]),
  }
};
</script>
