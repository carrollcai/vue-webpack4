<template>
  <div :style="{width: `96%`, height:`${height}px` }" :id="id"></div>
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
    drawChart(data) {
      const { height, id } = this;
      this.chart && this.chart.destroy();
      this.chart = new G2.Chart({
        id: id,
        forceFit: true,
        height: height
      });
      this.chart.source(data);

      this.chart.source(this.charData);
      this.chart.line().position('strftime*value').size(1).shape('smooth');
      this.chart.point().position('strftime*value').color('#757373')
        .shape('circle')
        .label('value', { offset: 20, label: { fill: '#000' } });
      // this.chart.animate(false);

      this.chart.render();
    }
  }
};
</script>

<style>

</style>
