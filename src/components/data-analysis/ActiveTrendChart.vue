<template>
  <!--此处的id用变量，方便同一页面引用多次相同的组件-->
  <!-- <div :id="id"></div> -->
  <chart :id="id" :charData="charData" @option="option" />
</template>

<script>
import Chart from 'components/Chart.vue';
export default {
  components: {
    Chart
  },
  data() {
    return {
      // chart: null
    };
  },
  props: {
    charData: {
      type: Array
    },
    id: String
  },
  methods: {
    option(_this) {
      _this.chart.source(this.charData);
      _this.chart.line().position('strftime*value').size(2);
      _this.chart.point().position('strftime*value').color('#757373')
        .shape('circle')
        .label('value', { offset: 20, label: { fill: '#000' } });
      _this.chart.animate(false);
    }
  }
};
</script>

<style>
</style>
