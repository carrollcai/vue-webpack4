<template>
  <div class="active-trend block-containter">
    <div class="trend-header">
      <div class="trend-header-title">活跃度分析</div>
      <div class="trend-header-right">
        <el-radio-group v-model="trend.dateType" size="small">
          <el-radio-button :label="0">按日</el-radio-button>
          <el-radio-button :label="1">按月</el-radio-button>
        </el-radio-group>
        <div class="trend-header-right__query">
          <span>查询：</span>
          <el-date-picker v-if="trend.dateType" type="month" placeholder="选择日期" v-model="trend.date" :editable="false" @change="query" />
          <el-date-picker v-if="!trend.dateType" type="date" placeholder="选择日期" v-model="trend.date" :editable="false" @change="query" />
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
        <el-radio v-if="!trend.mode" v-for="i in Object.keys(trendRadio)" :key="i" v-model="trend.chartRadio" :label="Number(i)" @change="changeRadio">
          {{trendRadio[i]}}
        </el-radio>
      </div>
      <div>
        <i class="el-icon-download"></i>下载此数据分析
      </div>
    </div>
    <div class="trend-mode">
      <div v-if="!trend.mode" class="trend-chart">
        <line-chart :charData="trendList" :id="'line'" />
      </div>
      <div v-else>
        <wm-table :source="trendList" :max-height="500">
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
import { mapState, mapActions, mapMutations } from 'vuex';
import WmTable from 'components/Table.vue';

export default {
  components: {
    LineChart,
    WmTable
  },
  data() {
    return {
      trendRadio: TREND_RADIO
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
      this.getTrendList(trend);
    },
    changeRadio(val) {
      this.updateTrendList({ chartRadio: val });
    },
    ...mapMutations({
      updateTrendList: 'ACTIVE_UPDATE_TREND'
    }),
    ...mapActions([
      'getTrendList'
    ])
  }
};
</script>
