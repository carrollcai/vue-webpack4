<template>
  <div class="active-userdata block-containter">
    <div class="userdata-header">
      <el-radio-group v-model="dateType" size="small">
        <el-radio-button :label="0">按日</el-radio-button>
        <el-radio-button :label="1">按月</el-radio-button>
      </el-radio-group>
      <span>5-26日关键指标（展示“T-2”日关键指标数据，”T“为今日数据）</span>
    </div>
    <div class="userdata-main">
      <div class="userdata-main-left">
        <div class="userdata-main-left__outer">
          <div class="userdata-main-left__title">日活跃用户数</div>
          <div class="userdata-main-left__num">728972</div>
        </div>
        <div class="userdata-main-left__outer">
          <div class="userdata-main-left__title">日活跃用户数</div>
          <div class="userdata-main-left__num">728972</div>
        </div>
        <div class="userdata-main-left__outer">
          <div class="userdata-main-left__title">移动IP用户/非移动IP用户</div>
          <div class="userdata-main-left__num">24255/21333</div>
        </div>
        <div class="userdata-main-left__outer">
          <div class="userdata-main-left__title">日活跃用户数</div>
          <div class="userdata-main-left__num">728972</div>
        </div>
      </div>
      <div class="userdata-main-right">
        <div class="userdata-main-right__chart">
          <!-- <chart :id="'userdata'" :width="400" :height="360" @option="option" :charData="charData" /> -->
          <active-userdata-chart />
        </div>
      </div>
    </div>
    <!-- <div id="userdata"></div> -->
  </div>
</template>

<script>
import ActiveUserdataChart from 'components/data-analysis/ActiveUserdataChart';
// import G2 from 'g2';
// import Chart from 'components/Chart.vue';
// import DataSet from '@antv/data-set';

export default {
  data() {
    return {
      dateType: 0
    };
  },
  components: {
    // Chart,
    ActiveUserdataChart
  },
  beforeMount() {

  },
  beforeUpdate() {
    this.test();
  },
  methods: {
  }
};
</script>
