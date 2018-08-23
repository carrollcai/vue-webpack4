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
          '月份': 'Apr.'
        },
        {
          'London': 18.9,
          'Berlin': 35.5,
          '月份': 'Jun.'
        },
        {
          'London': 180.9,
          'Berlin': 135.5,
          '月份': 'Aug.'
        }
      ]
    },
    fields: {
      type: Array,
      default: function() {
        return ['London', 'Berlin'];
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
      this.chart = new G2.Chart({
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

      this.chart.source(dv);

      this.chart.interval().position(this.position).color('name').adjust([{
        type: 'dodge',
        marginRatio: 1 / 32
      }]);
      this.chart.render();
    }
  }
};
</script>
