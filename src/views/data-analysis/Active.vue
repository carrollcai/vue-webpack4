<template>
  <div>
    <active-search />
    <active-userdata />
    <active-trend />
    <active-province-user />
  </div>
</template>

<script>
import ActiveSearch from 'components/data-analysis/ActiveSearch.vue';
import ActiveUserdata from 'components/data-analysis/ActiveUserdata.vue';
import ActiveTrend from 'components/data-analysis/ActiveTrend.vue';
import ActiveProvinceUser from 'components/data-analysis/ActiveProvinceUser.vue';
export default {
  components: {
    ActiveSearch,
    ActiveTrend,
    ActiveUserdata,
    ActiveProvinceUser
  }
};
</script>
