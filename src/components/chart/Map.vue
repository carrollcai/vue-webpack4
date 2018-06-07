<template>
  <div :style="{width: `${width}px`, height:`${height}px` }" :id="id"></div>
</template>

<script>
import G2 from '@antv/g2';
import DataSet from '@antv/data-set';
import { mapState } from 'vuex';
import { mapData } from '@/config/china.js';

export default {
  data() {
    return {
      chart: null,
      mapData
    }
  },
  // computed: {
  //   ...mapState({
  //     mapData: ({ dataAnalysis }) => dataAnalysis.mapData
  //   })
  // },
  props: {
    charData: {
      type: Array,
      default: function() {
        return [];
      }
    },
    width: {
      type: Number | String
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
      const { height, id, mapData } = this;
      var chart = new G2.Chart({
        container: id,
        forceFit: true,
        height: height,
        padding: [55, 20]
      });
      chart.tooltip({
        showTitle: false
      });
      // 同步度量
      chart.scale({
        longitude: {
          sync: true
        },
        latitude: {
          sync: true
        }
      });
      chart.axis(false);
      chart.legend('trend', {
        position: 'left'
      });

      // 绘制世界地图背景
      var ds = new DataSet();
      var worldMap = ds.createView('back').source(mapData, {
        type: 'GeoJSON'
      });
      var worldMapView = chart.view();
      worldMapView.source(worldMap);
      worldMapView.tooltip(false);
      worldMapView.polygon().position('longitude*latitude').style({
        fill: '#fff',
        stroke: '#ccc',
        lineWidth: 1
      });

      // 可视化用户数据

      var userDv = ds.createView().source(data).transform({
        geoDataView: worldMap,
        field: 'name',
        type: 'geo.region',
        as: ['longitude', 'latitude']
      }).transform({
        type: 'map',
        callback: function callback(obj) {
          // obj.trend = obj.value > 100 ? '男性更多' : '女性更多';
          return obj;
        }
      });
      var userView = chart.view();
      userView.source(userDv, {
        'trend': {
          alias: '每100位女性对应的男性数量'
        }
      });
      userView.polygon().position('longitude*latitude').color('trend', ['#F51D27', '#0A61D7']).opacity('value').tooltip('name*trend').animate({
        leave: {
          animation: 'fadeOut'
        }
      });
      chart.render();
    }
  }
};
</script>

<style>
</style>
