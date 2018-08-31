<template>
  <div :style="{ width: `100%`, height:`${height}px` }"
    :id="id"></div>
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
      default: () => []
    },
    fields: {
      type: Array,
      default: () => []
    },
    position: {
      type: String,
      default: 'periodId*value'
    },
    width: {
      type: Number
    },
    height: {
      type: Number,
      default: 500
    },
    id: String,
    sourceConfig: {
      type: Object,
      default: () => {
        return {
          periodId: {
            type: 'cat'
          }
        };
      }
    }
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

      chart.source(dv, this.sourceConfig);

      chart.interval().position(this.position).color('name').adjust([{
        type: 'dodge',
        marginRatio: 1 / 32
      }]);
      chart.render();
    }
  }
};
</script>
