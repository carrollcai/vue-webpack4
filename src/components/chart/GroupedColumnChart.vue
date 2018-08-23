<template>
  <div :style="{ width: `100%`, height:`${height}px` }" :id="id"></div>
</template>

<script>
import G2 from '@antv/g2';
import DataSet from '@antv/data-set';

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
      default: () => [
        {
          'London': 180.9,
          'Berlin': 135.5,
          'Berlin1': 135.5,
          'Berlin2': 135.5,
          'Berlin3': 135.5,
          'Berlin4': 135.5,
          'Berlin5': 135.5,
          '月份': 'Apr.'
        },
        {
          'Berlin': 35.5,
          'Berlin1': 135.5,
          'Berlin2': 35.5,
          'Berlin3': 135.5,
          'Berlin4': 35.5,
          'Berlin5': 135.5,
          '月份': 'Jun.'
        },
        {
          'London': 180.9,
          'Berlin': 135.5,
          'Berlin1': 35.5,
          'Berlin2': 135.5,
          'Berlin3': 35.5,
          'Berlin4': 35.5,
          'Berlin5': 35.5,
          '月份': 'Aug.'
        },
        {
          'Berlin': 35.5,
          'Berlin1': 135.5,
          'Berlin2': 35.5,
          'Berlin3': 135.5,
          'Berlin4': 35.5,
          'Berlin5': 135.5,
          '月份': 'Jun1.'
        },
        {
          'Berlin': 35.5,
          'Berlin1': 135.5,
          'Berlin2': 35.5,
          'Berlin3': 135.5,
          'Berlin4': 35.5,
          'Berlin5': 135.5,
          '月份': 'Jun2.'
        },
        {
          'Berlin': 35.5,
          'Berlin1': 135.5,
          'Berlin2': 35.5,
          'Berlin3': 135.5,
          'Berlin4': 35.5,
          'Berlin5': 135.5,
          '月份': 'Jun3.'
        },
        {
          'Berlin': 35.5,
          'Berlin1': 135.5,
          'Berlin2': 35.5,
          'Berlin3': 135.5,
          'Berlin4': 35.5,
          'Berlin5': 135.5,
          '月份': 'Jun4.'
        },
        {
          'Berlin': 35.5,
          'Berlin1': 135.5,
          'Berlin2': 35.5,
          'Berlin3': 135.5,
          'Berlin4': 35.5,
          'Berlin5': 135.5,
          '月份': 'Jun5.'
        },
        {
          'Berlin': 35.5,
          'Berlin1': 135.5,
          'Berlin2': 35.5,
          'Berlin3': 135.5,
          'Berlin4': 35.5,
          'Berlin5': 135.5,
          '月份': 'Jun32.'
        },
        {
          'Berlin': 35.5,
          'Berlin1': 135.5,
          'Berlin2': 35.5,
          'Berlin3': 135.5,
          'Berlin4': 35.5,
          'Berlin5': 135.5,
          '月份': 'Jun33.'
        },
        {
          'Berlin': 35.5,
          'Berlin1': 135.5,
          'Berlin2': 35.5,
          'Berlin3': 135.5,
          'Berlin4': 35.5,
          'Berlin5': 135.5,
          '月份': 'Jun24.'
        },
        {
          'Berlin': 35.5,
          'Berlin1': 135.5,
          'Berlin2': 35.5,
          'Berlin3': 135.5,
          'Berlin4': 35.5,
          'Berlin5': 135.5,
          '月份': 'Jun22.'
        },
      ]
    },
    fields: {
      type: Array,
      default: function() {
        return ['London', 'Berlin', 'Berlin1', 'Berlin2', 'Berlin3', 'Berlin4', 'Berlin5'];
      }
    },
    position: {
      type: String,
      default: '月份*value'
    },
    width: {
      type: Number
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
      const { height, id, fields } = this;
      this.chart && this.chart.destroy();

      let chart = this.chart = new G2.Chart({
        id: id,
        forceFit: true,
        height: height
      });

      const dataSet = new DataSet();
      const dv = dataSet.createView().source(data);
      dv.transform({
        type: 'fold',
        fields: fields, // 展开字段集
        key: 'name', // key字段
        value: 'value' // value字段
      });

      chart.source(dv);

      chart.interval().position(this.position).color('name').adjust([{
        type: 'dodge',
        marginRatio: 1 / 32
      }]);
      chart.render();
    }
  }
};
</script>
