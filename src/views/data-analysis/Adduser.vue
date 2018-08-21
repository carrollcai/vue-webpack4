<template>
  <div>
    <adduser-search />
    <adduser-total-data />
    <adduser-trend />
    <active-province-user />
    <adduser-total-data-chart />
  </div>
</template>

<script>
import AdduserSearch from 'components/data-analysis/AdduserSearch.vue';
import AdduserTotalData from 'components/data-analysis/AdduserTotalData.vue';
import AdduserTrend from 'components/data-analysis/AdduserTrend.vue';
import ActiveProvinceUser from 'components/data-analysis/ActiveProvinceUser.vue';
import AdduserTotalDataChart from 'components/data-analysis/AdduserTotalDataChart.vue';
export default {
  components: {
    AdduserSearch,
    AdduserTotalData,
    AdduserTrend,
    ActiveProvinceUser,
    AdduserTotalDataChart,
  }
};
</script>