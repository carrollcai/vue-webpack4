<template>
  <div class="active-trend block-containter">
    <div class="trend-header">
      <div>活跃度趋势分析</div>
      <div class="trend-header-right">
        <el-radio-group v-model="dateType" size="small">
          <el-radio-button :label="0">按日</el-radio-button>
          <el-radio-button :label="1">按月</el-radio-button>
        </el-radio-group>
        <div>
          <span>查询：</span>
          <el-date-picker>

          </el-date-picker>
        </div>
        <div>
          |
        </div>
        <div>
          <el-radio-group v-model="dateType" size="small">
            <el-radio-button :label="0">按日</el-radio-button>
            <el-radio-button :label="1">按月</el-radio-button>
          </el-radio-group>
        </div>
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
</template>

<script>
import ActiveTrendChart from 'components/data-analysis/ActiveTrendChart.vue';

export default {
  components: {
    ActiveTrendChart
  },
  data() {
    return {
      dateType: 0,
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
  }
};
</script>
