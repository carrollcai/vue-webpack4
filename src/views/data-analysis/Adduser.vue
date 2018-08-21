<template>
  <div>
    <adduser-search />
    <adduser-total-data />
    <adduser-trend />
    <active-province-user />
  </div>
</template>

<script>
import AdduserSearch from 'components/data-analysis/AdduserSearch.vue';
import AdduserTotalData from 'components/data-analysis/AdduserTotalData.vue';
import AdduserTrend from 'components/data-analysis/AdduserTrend.vue';
import ActiveProvinceUser from 'components/data-analysis/ActiveProvinceUser.vue';
export default {
  components: {
    AdduserSearch,
    AdduserTotalData,
    AdduserTrend,
    ActiveProvinceUser
  }
};
</script>