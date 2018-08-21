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
    multipart: true,
    charData: {
      type: Array,
      default: () => []
    },
    width: {
      type: Number
      // default: 500
    },
    height: {
      type: Number,
      default: 500
    },
    id: String,
    temperature: Boolean
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
        // padding: this.multipart ? 'auto' : [40, 80]
      });

      this.chart.source(data);
      this.chart.interval().position('月份*月均降雨量').color('name').adjust([{
        type: 'dodge',
        marginRatio: 1 / 32
      }]);
      this.chart.render();
    }
  }
};
</script>
