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
    drawChart(data) {
      const { height, id } = this;
      this.chart && this.chart.destroy();
      this.chart = new G2.Chart({
        id: id,
        forceFit: true,
        height: height,
        padding: 40
      });

      this.chart.source(data, {
        // 这边的value对应数据中的value
        value: {
          max: 100,
          min: 0
        }
      });

      this.chart.axis('value', {
        label: {
          formatter: function formatter(val) {
            return val + '%';
          }
        }
      });
      this.chart.line().position('date*value').size(1).shape('smooth');
      this.chart.point().position('date*value').color('#757373').shape('circle');

      this.chart.render();
    }
  }
};
</script>

<style>
</style>
