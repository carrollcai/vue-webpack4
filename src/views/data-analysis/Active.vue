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
      dateType: 0,
      radio: '1',
      serverData: [
        { 'mzkId': 113, 'strftime': '2017-01-11', 'value': 9275501 },
        { 'mzkId': 112, 'strftime': '2017-01-12', 'value': 9281904 },
        { 'mzkId': 112, 'strftime': '2017-01-13', 'value': 9290777 },
        { 'mzkId': 112, 'strftime': '2017-01-14', 'value': 9297913 },
        { 'mzkId': 112, 'strftime': '2017-01-15', 'value': 9306918 },
        { 'mzkId': 112, 'strftime': '2017-01-16', 'value': 9315641 }
      ]
    };
  },
  beforeMount() {
    this.getClient();
    // this.getMapJson();
  },
  methods: {
    ...mapActions([
      'getClient',
      // 'getMapJson'
    ])
  }
};
</script>

<style lang="scss">
@import "scss/views/active.scss";
</style>
