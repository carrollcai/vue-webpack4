<template>
  <!--此处的id用变量，方便同一页面引用多次相同的组件-->
  <div :id="id"></div>
</template>

<script>
import G2 from 'g2';
export default {
  data() {
    return {
      chart: null
    };
  },
  props: {
    charData: {
      type: Array
    },
    id: String
  },
  mounted() {
    this.drawChart(this.charData);
  },
  beforeUpdate() {
    this.drawChart(this.charData);
  },
  watch: {
    charData(val, oldVal) {
      console.log('new: %s, old: %s', val, oldVal);
      this.drawChart(val);
    }
  },
  methods: {
    drawChart(datas) {
      // 如果图形存在则删除再创建，这个地方感觉稍微有点坑
      // 具体的G2 api函数说明请看上面提供的官网地址，此处不再逐一说明
      this.chart && this.chart.destroy();
      let data = datas;
      this.chart = new G2.Chart({
        id: this.id,
        width: 1000,
        height: 250
      });
      this.chart.source(data, {
        strftime: {
          alias: '日期',
          type: 'cat',
          range: [0, 1]
        },
        value: {
          alias: '数量值(人)'
        }
      });
      this.chart.line().position('strftime*value').size(2);
      this.chart.point().position('strftime*value').color('#757373')
        .shape('circle')
        .label('value', { offset: 20, label: { fill: '#000' } });
      this.chart.animate(false);
      this.chart.render();
    }
  }
};
</script>

<style>
</style>
