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
    charData: {
      type: Array,
      default: function() {
        return [];
      }
    },
    width: {
      type: Number
    },
    height: {
      type: Number,
      default: 500
    },
    id: String,
    fields: {
      type: Array,
      default: function() {
        return [];
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
    drawChart(data) {
      const { height, id, fields } = this;
      this.chart && this.chart.destroy();

      this.chart = new G2.Chart({
        id: id,
        forceFit: true,
        height: height,
        padding: [40, 80, 80]
      });

      const ds = new DataSet();
      const dv = ds.createView().source(data);
      dv.transform({
        type: 'fold',
        fields: fields, // 展开字段集
        key: 'type', // key字段
        value: 'value', // value字段
        retains: [ 'periodId' ]
      });

      this.chart.source(dv, {
        periodId: {
          range: [0, 1]
        }
      });

      // 这里必须在line里加color，否则曲线会有问题
      this.chart.area().position('periodId*value').color('type').shape('smooth');
      this.chart.line().position('periodId*value').color('type').size(1).shape('smooth');
      this.chart.point().position('periodId*value').color('type').shape('circle');

      this.chart.render();
    }
  }
};
</script>
