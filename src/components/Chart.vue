<template>
  <div :id="id"></div>
</template>

<script>
import G2 from 'G2';
export default {
  data() {
    return {
      chart: null
    };
  },
  props: {
    charData: Array,
    option: Function,
    id: String,
    width: {
      type: Number,
      default: 1000
    },
    height: {
      type: Number,
      default: 250
    }
  },
  mounted() {
    this.drawChart(this.charData);
  },
  beforeUpdate() {
    this.drawChart(this.charData);
  },
  watch: {
    charData(val, oldVal) {
      this.drawChart(val);
    }
  },
  methods: {
    drawChart(data) {
      const { width, height, id } = this;
      this.chart && this.chart.destroy();
      this.chart = new G2.Chart({
        id: id,
        width: width,
        height: height
      });
      this.chart.source(data);

      this.$emit('option', this);

      this.chart.render();
    }
  }
};
</script>

<style>

</style>
