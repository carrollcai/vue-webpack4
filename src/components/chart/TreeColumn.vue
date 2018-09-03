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
    drawChart(_data) {
      const { height, id } = this;
      this.chart && this.chart.destroy();
      let data = [{
        gender: '男',
        count: 40,
        'class': '一班',
        grade: '上级领导'
      }, {
        gender: '男',
        count: 35,
        'class': '二班',
        grade: '上级领导'
      }, {
        gender: '男',
        count: 20,
        'class': '三班',
        grade: '上级领导'
      }, {
        gender: '男',
        count: 30,
        'class': '一班',
        grade: '二年级'
      }, {
        gender: '男',
        count: 25,
        'class': '二班',
        grade: '二年级'
      }, {
        gender: '男',
        count: 28,
        'class': '三班',
        grade: '二年级'
      }];
      let _DataSet = DataSet;
      let DataView = _DataSet.DataView;

      this.chart = new G2.Chart({
        id: id,
        forceFit: true,
        height: height,
        padding: [60, 90, 80, 80]
      });
      this.chart.source(data);
      this.chart.coord('theta');
      this.chart.tooltip({
        showTitle: false
      });
      this.chart.facet('tree', {
        fields: ['grade', 'class'],
        line: {
          stroke: '#00a3d7'
        },
        lineSmooth: true,
        eachView: function eachView(view, facet) {
          var data = facet.data;
          var dv = new DataView();
          dv.source(data).transform({
            type: 'percent',
            field: 'count',
            dimension: 'gender',
            as: 'percent'
          });
          view.source(dv, {
            percent: {
              formatter: function formatter(val) {
                return (val * 100).toFixed(2) + '%';
              }
            }
          });
          view.intervalStack().position('percent').color('gender')
            .label('grade', {
              offset: 0,

              textStyle: {
                textBaseline: 'middle'
              },
              htmlTemplate: function formatter(val) {
                if (val !== 'root') {
                  return `
                    <div style="width: 100%">${val} | 'test'</div>
                    <div style="width: 100%">${val}</div>
                    `;
                }
              }
            });
        }
      });
      this.chart.render();
    }
  }
};
</script>
