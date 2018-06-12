<template>
  <div class="active-trend block-containter">
    <el-form ref="activeTrendForm" :model="trend" :rules="activeTrendRules">
      <div class="trend-header">
        <div class="trend-header-title">活跃度分析</div>
        <div class="trend-header-right">
          <el-radio-group v-model="trend.dateType" size="small" @change="dateTypeChange">
            <el-radio-button :label="0">按日</el-radio-button>
            <el-radio-button :label="1">按月</el-radio-button>
          </el-radio-group>
          <div class="trend-header-right__query">
            <!-- 这里的切换需要重置或者默认选项 -->
            <el-form-item class="normalize-form-item">
              查询：
            </el-form-item>
            <el-form-item prop="date" class="normalize-form-item">
              <el-date-picker v-if="trend.dateType" type="daterange" placeholder="选择日期" v-model="trend.date" :editable="false" @change="query" format="yyyy-MM" />
              <el-date-picker v-if="!trend.dateType" type="daterange" placeholder="选择日期" v-model="trend.date" :editable="false" @change="query" />
            </el-form-item>
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
    </el-form>
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
        <line-chart v-if="trend.chartRadio === 0 || trend.chartRadio === 1" :charData="trendList" :id="'line'" />
        <multi-line v-else-if="trend.chartRadio === 2" :charData="addFieldsTrendList()" :id="'line'" :fields="mobileIpArr" />
        <multi-line v-else-if="trend.chartRadio === 3" :charData="trendNewMembers" :id="'line'" :fields="newMembersFields()" />
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
import MultiLine from 'components/chart/MultiLine.vue';
import LineChart from 'components/chart/Line.vue';
import { TREND_RADIO } from '@/config';
import { mapState, mapActions, mapMutations } from 'vuex';
import WmTable from 'components/Table.vue';

export default {
  components: {
    WmTable,
    MultiLine,
    LineChart
  },
  data() {
    return {
      trendRadio: TREND_RADIO,
      mobileIpArr: ['移动IP用户', '非移动IP用户'],
      activeTrendRules: {
        date: [
          { required: true, message: '请选择时间范围', trigger: 'change' }
        ]
      }
    };
  },
  computed: {
    ...mapState({
      trend: ({ dataAnalysis }) => dataAnalysis.trend,
      trendList: ({ dataAnalysis }) => dataAnalysis.trendList,
      trendNewMembers: ({ dataAnalysis }) => dataAnalysis.trendNewMembers,
      members: ({ dataAnalysis }) => dataAnalysis.members
    })
  },
  beforeMount() {
    this.getTrendList();
    this.getTrendNewMembers();
  },
  methods: {
    newMembersFields() {
      return this.members.map(val => val.item);
    },
    addFieldsTrendList() {
      return this.trendList.map(val => {
        val[this.mobileIpArr[0]] = val.msisdnNum;
        val[this.mobileIpArr[1]] = val.chinaMobileIpNum;
        return val;
      });
    },
    dateTypeChange() {
      const { trend } = this;
      // 初始化区间段 日最近7天，月最近半年
      this.initDate(trend);
      this.query();
    },
    query() {
      const { trend } = this;
      this.$refs['activeTrendForm'].validate(valid => {
        if (valid) {
          this.getTrendList(trend);
        }
      });
    },
    changeRadio(val) {
      this.updateTrendList({ chartRadio: val });
    },
    ...mapMutations({
      updateTrendList: 'ACTIVE_UPDATE_TREND',
      initDate: 'ACTIVE_INIT_DATE'
    }),
    ...mapActions([
      'getTrendList',
      'getTrendNewMembers'
    ])
  }
};
</script>
