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
      vipTrend: ({ dataAnalysis }) => dataAnalysis.adduserVipTrend,
      currentUser: ({ root }) => root.currentUser
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
    },
    /**
     * 获取 查询新增用户数据的参数
     */
    getOverviewParams() {
      const {addUserObj} = this;
      return {
        clientSelected: addUserObj.clientSelected
      };
    },
    /**
     *各省份用户新增排名情况 查询数据
     */
    handleQueryProvinceOverview() {
      console.log('handleQueryProvinceOverview');
      this.getProvinceUser().then(() => {
        this.handleChangeProvinceType(this.userMapTrend.chartRadio);
      });
    },
    /**
     *各省份用户新增排名情况 类型变化
     */
    handleChangeProvinceType(val) {
      const {isDistrict, isWholeCountry} = this;

      if (isDistrict()) {
        console.log('handleChangeProvinceType--district');
      }

      if (isWholeCountry()) {
        console.log('handleChangeProvinceType--whole');
      }
    },
    /**
     *新增用户趋势分析 查询数据
     */
    handleQueryTrend() {
      console.log('handleQueryTrend');
    },
    /**
     * 新增用户趋势分析 类型变化
     */
    handleChangeTrendType() {
      console.log('handleChangeTrendType');
    },
    /**
     * 新增会员用户趋势分析 查询数据
     */
    handleQueryVip() {
      // TODO
      console.log('handleQueryVip');

      this.queryVip().then(() => {
        this.handleChangeVipType(this.vipTrend.chartRadio);
      });
    },
    /**
     * 新增会员用户趋势分析 类型变化
     */
    handleChangeVipType(val) {
      // TODO
      console.log('handleChangeVipType');
    },
    ...mapActions([
      'queryVip',
      'getProvinceUser'
    ])
  }
};
</script>
