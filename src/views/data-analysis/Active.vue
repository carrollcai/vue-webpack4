<template>
  <div>
    <active-search />
    <active-userdata v-if="isProvince()"/>
    <active-province-user v-if="isDistrict()" title="大区各省份活跃度排名情况"/>
    <active-province-user v-if="isWholeCountry()" title="全国各省份活跃度排名情况"/>
    <active-trend v-if="isProvince()" title="活跃度趋势分析" :is-province="isProvince()"/>
    <active-trend v-if="isDistrict()" title="各省份活跃度趋势分析" :is-district="isDistrict()" />
    <active-trend v-if="isWholeCountry()" title="全国各大区活跃度趋势分析" :is-whole-country="isWholeCountry()"/>
  </div>
</template>

<script>
import ActiveSearch from 'components/data-analysis/ActiveSearch.vue';
import ActiveUserdata from 'components/data-analysis/ActiveUserdata.vue';
import ActiveTrend from 'components/data-analysis/ActiveTrend.vue';
import ActiveProvinceUser from 'components/data-analysis/ActiveProvinceUser.vue';

import mixins from './mixins.js';

export default {
  mixins: [mixins],
  components: {
    ActiveSearch,
    ActiveTrend,
    ActiveUserdata,
    ActiveProvinceUser
  }
};
</script>
