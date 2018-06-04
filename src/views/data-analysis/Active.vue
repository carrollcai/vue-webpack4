<template>
  <div>
    <div class="active-trend block-containter">
      <div class="trend-header">
        <div>活跃度趋势分析</div>
        <div>按月/按日</div>
        <div>
          <el-date-picker>

          </el-date-picker>
        </div>
        <div>
          |
        </div>
        <div>
          切换
        </div>
      </div>
      <div class="trend-sub">
        <div class="trend-sub__radio">
          <el-radio v-model="radio" label="1">日活跃用户数</el-radio>
          <el-radio v-model="radio" label="2">手机账号登录用户</el-radio>
          <el-radio v-model="radio" label="3">移动IP用户/非移动IP用户</el-radio>
          <el-radio v-model="radio" label="4">新增会员用户</el-radio>
        </div>
        <div>
          <i class="el-icon-download"></i>下载此数据分析
        </div>
      </div>
      <active-trend-chart :charData="serverData" :id="'c1'" />
    </div>
  </div>
</template>

<script>
import ActiveTrendChart from 'components/data-analysis/ActiveTrendChart.vue';

export default {
  data() {
    return {
      radio: '1',
      serverData: [
        { 'mzkId': 113, 'strftime': '2017-01-11', 'value': 9275501 },
        { 'mzkId': 112, 'strftime': '2017-01-12', 'value': 9281904 },
        { 'mzkId': 112, 'strftime': '2017-01-13', 'value': 9290777 },
        { 'mzkId': 112, 'strftime': '2017-01-14', 'value': 9297913 },
        { 'mzkId': 112, 'strftime': '2017-01-15', 'value': 9306918 },
        { 'mzkId': 112, 'strftime': '2017-01-16', 'value': 9315641 }
      ]
    };
  },
  components: {
    ActiveTrendChart
  }
};
</script>

<style>
.active-trend__header {
  display: flex;
}
.trend-sub {
  display: flex;
}
.trend-header {
  display: flex;
}
</style>
