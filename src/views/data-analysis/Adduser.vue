<template>
  <div>
    <adduser-search />
    <!-- 新增用户数据 -->
    <adduser-total-data v-if="isProvince()"/>

    <!-- 大区各省份用户新增排名情况 -->
    <adduser-total-data-chart v-if="isDistrict()" title="大区各省份用户新增排名情况"/>

    <!-- 全国各省份用户新增排名情况 -->
    <adduser-total-data-chart v-if="isWholeCountry()" title="全国各省份用户新增排名情况"/>

    <!-- 新增用户趋势分析 -->
    <adduser-trend :is-province="isProvince()" :is-district="isDistrict()" :is-whole-country="isWholeCountry()"/>

    <!-- 新增会员用户趋势分析 -->
    <adduser-vip-trend :is-province="isProvince()" :is-district="isDistrict()" :is-whole-country="isWholeCountry()" @vip="handleChangeVipType"/>
  </div>
</template>

<script>
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
  methods: {
    handleChangeVipType() {
      // TODO
      console.log('-----------');
    }
  }
};
</script>
