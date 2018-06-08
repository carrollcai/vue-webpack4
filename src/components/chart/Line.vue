<template>
  <div :style="{ width: `100%`, height:`${height}px` }" :id="id"></div>
</template>

<script>
import G2 from '@antv/g2';

export default {
  data() {
    return {
      chart: null
    };
  },
  props: {
    charData: {
      type: Array,
      default: function() {
        return [];
      }
    },
    width: {
      type: Number
      // default: 500
    },
    height: {
      type: Number,
      default: 500
    },
    id: String
  },
  mounted() {
    this.drawChart(this.charData);
  },
  watch: {
    charData(val, oldVal) {
      this.drawChart(val);
    }
  },
  methods: {
    // 注意点，图表的排序顺序需要是Number类型的，String默认不排序
    drawChart(data) {
      const { height, id } = this;
      this.chart && this.chart.destroy();
      this.chart = new G2.Chart({
        id: id,
        forceFit: true,
        height: height,
        padding: [40, 80]
      });
      this.chart.source(data);

      this.chart.line().position('date*value').size(1).shape('smooth');
      this.chart.point().position('date*value').color('#757373').shape('circle');

      this.chart.render();
    }
  }
};
</script>

<style>

</style>
