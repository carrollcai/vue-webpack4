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
      /* 这里有一个坑，
      * 如果数据类型为2018-08-27，g2会报错，需要转换一个数据格式,
      * 解决方案：https://github.com/alibaba/BizCharts/issues/120
      */
      // let newData = data.map((val, i) => {
      //   return {
      //     name: val.province,
      //     // '月份': new Date(val.periodId),
      //     '月份': chinaDatetransformDate(val.periodId),
      //     '数量': val.activeNum,
      //   };
      // });
      // console.log(data);
      this.chart.source(data);

      this.chart.interval().position('月份*数量').color('name')
        .adjust([{
          type: 'dodge',
          marginRatio: 1 / 32
        }]);
      this.chart.render();
    }
  }
};
</script>
