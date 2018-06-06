<template>
  <div :style="{width: `${width}px`, height:`${height}px` }" :id="id"></div>
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
      default: []
    },
    option: Function,
    id: String,
    width: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 5000
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
      this.chart && this.chart.destroy();

      const { id, height, width } = this;
      const { DataView } = DataSet;
      let dv = new DataView();

      dv.source(data).transform({
        type: 'percent',
        field: 'count',
        dimension: 'item',
        as: 'percent'
      });
      this.chart = new G2.Chart({
        container: id,
        forceFit: true,
        height: height,
        width: width,
        animate: false
      });
      this.chart.source(dv, {
        percent: {
          formatter: function formatter(val) {
            val = val * 100 + '%';
            return '';
          }
        }
      });
      this.chart.coord('theta', {
        radius: 0.75,
        innerRadius: 0.6
      });
      this.chart.tooltip({
        showTitle: false,
        itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
      });
      // 辅助文本
      // this.chart.guide().html({
      //   position: ['50%', '50%'],
      //   html: '<div style="color:#8c8c8c;font-size: 14px;text-align: center;width: 10em;">主机<br><span style="color:#8c8c8c;font-size:20px">200</span>台</div>',
      //   alignX: 'middle',
      //   alignY: 'middle'
      // });
      var interval = this.chart.intervalStack().position('percent').color('item').label('percent').tooltip('item*percent', function(item, percent) {
        percent = percent * 100 + '%';
        return {
          name: item,
          value: percent
        };
      }).style({
        lineWidth: 1,
        stroke: '#fff'
      });
      // this.chart.axis('x',false)
      this.chart.legend(false);

      // this.chart.legend('gender', {
      //   position: 'right'
      // });
      this.chart.render();
      // interval.setSelected(dv.rows[0]);
    }
  }
}
</script>

<style>
</style>
