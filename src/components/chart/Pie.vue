<template>
  <div style="position: relative;">
    <div style="width: calc(100% - 200px);">
      <div style="font-size: 0px;position: relative;">
        <div :style="{width: `${width}px`, height:`${height}px` }" :id="id"></div>
      </div>
      <ul v-if="hasLegend" class="has-legend">
        <div>
          <li v-for="(item, i) in legendData" :key="i" v-if="i <= 2">
            <span class="dot" :style="{backgroundColor: item.color}" />
            <span class="legend-title">{{item.item}}</span>
          </li>
        </div>
        <div class="pie-item">
          <li v-for="(item, i) in legendData" :key="i" v-if="i > 2">
            <span class="dot" :style="{backgroundColor: item.color}" />
            <span class="legend-title">{{item.item}}</span>
          </li>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import G2 from '@antv/g2';
import DataSet from '@antv/data-set';
export default {
  data() {
    return {
      chart: null,
      legendData: []
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
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 500
    },
    id: String,
    hasLegend: Boolean
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
    pushColor() {
      const { hasLegend } = this;
      if (hasLegend) {
        const geom = this.chart.getAllGeoms()[0]; // 获取所有的图形
        const items = geom.get('dataArray') || []; // 获取图形对应的

        this.legendData = items.map(item => {
          const origin = item[0]._origin;
          origin.color = item[0].color;
          origin.checked = true;
          return origin;
        });
      }
    },
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
        animate: false,
        padding: 10
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
        radius: 1,
        innerRadius: 0.6
      });
      this.chart.tooltip({
        showTitle: false,
        itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
      });
      // this.chart.tooltip(false);
      this.chart.intervalStack().position('percent').color('item').label('percent').tooltip('item*percent', function(item, percent) {
        percent = percent * 100 + '%';
        return {
          name: item,
          value: percent
        };
      }).style({
        lineWidth: 1,
        stroke: '#fff'
      });
      this.chart.legend(false);
      this.chart.render();
      this.pushColor();
    }
  }
};
</script>

<style lang="scss">
.has-legend {
  position: absolute;
  // right: 0;
  min-width: 200px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 20px;
  list-style: none;
  padding: 0;
  display: flex;
  left: 80px;
}

.pie-item {
  margin-left: 16px;
}
.has-legend li {
  cursor: pointer;
  margin-bottom: 4px;
  height: 22px;
  line-height: 22px;

  & .dot {
    border-radius: 8px;
    display: inline-block;
    margin-right: 8px;
    position: relative;
    top: -1px;
    height: 8px;
    width: 8px;
    background-color: rgb(133, 67, 224);
  }
  & .legend-title {
    color: rgba(0, 0, 0, 0.65);
  }
}
</style>
