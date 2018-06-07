<template>
  <div class="active-trend block-containter">
    <div class="trend-header">
      <div class="trend-header-title">活跃度趋势分析</div>
      <div class="trend-header-right">
        <el-radio-group v-model="trend.dateType" size="small" @change="query">
          <el-radio-button :label="0">按日</el-radio-button>
          <el-radio-button :label="1">按月</el-radio-button>
        </el-radio-group>
        <div class="trend-header-right__query">
          <span>查询：</span>
          <el-date-picker type="date" placeholder="选择日期" v-model="trend.date" :editable="false" @change="query" />
        </div>
        <div class="trend-header-divider">
          |
        </div>
        <div>
          <el-radio-group v-model="trend.mode" size="small">
            <el-radio-button :label="0">
              <i class="icon-chart"></i>
            </el-radio-button>
            <el-radio-button :label="1">
              <i class="icon-date1"></i>
            </el-radio-button>
          </el-radio-group>
        </div>
      </div>
    </div>
    <div class="trend-sub">
      <div class="trend-sub__radio">
        <el-radio v-if="!trend.mode" v-for="i in Object.keys(trendRadio)" :key="i" v-model="trend.chartRadio" :label="Number(i)" @change="query">
          {{trendRadio[i]}}
        </el-radio>
      </div>
      <div>
        <i class="el-icon-download"></i>下载此数据分析
      </div>
    </div>
    <div class="trend-mode">
      <div v-if="!trend.mode" class="trend-chart">
        <line-chart :charData="serverData" :id="'line'" />
      </div>
      <div v-else>
        <wm-table :source="trendList">
          <el-table-column label="日期" property="date" />
          <el-table-column label="日活跃用户数" property="activeUserNum" />
          <el-table-column label="手机账号登录用户" property="mobileAccount" />
          <el-table-column label="移动IP用户" property="mobileIp" />
          <el-table-column label="非移动IP用户" property="unmobileIp" />
          <el-table-column label="新增会员用户" property="newMembers" />
        </wm-table>
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from 'components/chart/Line.vue';
import { TREND_RADIO } from '@/config';
import { mapState, mapActions } from 'vuex';
import WmTable from 'components/Table.vue';

export default {
  components: {
    LineChart,
    WmTable
  },
  data() {
    return {
      dateType: 0,
      radio: '1',
      trendRadio: TREND_RADIO,
      serverData: [
        { 'mzkId': 113, 'strftime': '01-11', 'value': 9275501 },
        { 'mzkId': 112, 'strftime': '01-12', 'value': 9281904 },
        { 'mzkId': 112, 'strftime': '01-13', 'value': 9290777 },
        { 'mzkId': 112, 'strftime': '01-14', 'value': 9297913 },
        { 'mzkId': 112, 'strftime': '01-15', 'value': 9306918 },
        { 'mzkId': 112, 'strftime': '01-16', 'value': 9290777 }
      ]
    };
  },
  computed: {
    ...mapState({
      trend: ({ dataAnalysis }) => dataAnalysis.trend,
      trendList: ({ dataAnalysis }) => dataAnalysis.trendList
    })
  },
  beforeMount() {
    this.getTrendList();
  },
  methods: {
    query() {
      const { trend } = this;
      this.getActiveTrend(trend);
    },
    // modeChange(val) {
    // },
    ...mapActions([
      'getActiveTrend',
      'getTrendList'
    ])
  }
};
</script>
