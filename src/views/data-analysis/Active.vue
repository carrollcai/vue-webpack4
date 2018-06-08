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
import ActiveTrend from 'components/data-analysis/ActiveTrend.vue';
import ActiveUserdata from 'components/data-analysis/ActiveUserdata.vue';
import ActiveProvinceUser from 'components/data-analysis/ActiveProvinceUser.vue';
import MultSelect from 'components/MultSelect.vue';
import { mapActions } from 'vuex';
export default {
  components: {
    ActiveSearch,
    ActiveTrend,
    ActiveUserdata,
    ActiveProvinceUser,
    MultSelect
  },
  data() {
    return {
    };
  },
  beforeMount() {
    // this.getClient();
    // this.getMapJson();
  },
  methods: {
    ...mapActions([
      // 'getClient'
      // 'getMapJson'
    ])
  }
};
</script>

<style lang="scss">
</style>
