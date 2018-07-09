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
            <el-form-item v-if="!trend.dateType" prop="date" class="normalize-form-item">
              <el-date-picker type="daterange" placeholder="选择日期" v-model="trend.date" :editable="false" @change="query" />
            </el-form-item>

            <el-form-item v-if="trend.dateType" class="normalize-form-item" prop="checkDate">
              <el-form-item class="normalize-form-item float-left" prop="startDate">
                <el-date-picker class="user-form-item__input" type="month" placeholder="选择开始日期" v-model="trend.startDate" @change="triggerValidate()" />
              </el-form-item>
              <span class="date-connect-line float-left">-</span>
              <el-form-item class="normalize-form-item float-left" prop="endDate">
                <el-date-picker class="user-form-item__input" type="month" placeholder="选择结束日期" v-model="trend.endDate" @change="triggerValidate()" />
              </el-form-item>
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
      <div class="trend-sub__radio" v-if="!trend.mode">
        <el-radio v-for="i in Object.keys(trendRadio)" :key="i" v-model="trend.chartRadio" :label="Number(i)" @change="changeRadio">
          <span v-if="trend.dateType">{{radioTransformDate(i)}}</span>
          <span v-else>{{radioTransformDate(i)}}</span>
        </el-radio>
      </div>
      <div @click="downloadDataAnalysis" class="cursor-pointer">
        <i class="el-icon-download"></i>下载此数据分析
      </div>
    </div>
    <div class="trend-mode">
      <div v-if="!trend.mode" class="trend-chart">
        <div class="no-data" v-if="trend.chartRadio === 0 || trend.chartRadio === 1">
          <div class="no-data" v-if="Object.isNullArray(trendList)">暂无数据</div>
          <line-chart v-else :charData="trendList" :id="'line'" />
        </div>
        <div class="no-data" v-else-if="trend.chartRadio === 2">
          <div class="no-data" v-if="Object.isNullArray(addFieldsTrendList())">暂无数据</div>
          <multi-line v-else :charData="addFieldsTrendList()" :id="'line'" :fields="mobileIpArr" />
        </div>
        <div class="no-data" v-else-if="trend.chartRadio === 3">
          <div class="no-data" v-if="Object.isNullArray(trendNewMembers)">暂无数据</div>
          <multi-line v-else :charData="trendNewMembers" :id="'line'" :fields="newMembersFields()" />
        </div>
      </div>
      <div v-else>
        <wm-table :source="trendList" :max-height="500">
          <el-table-column label="日期" property="periodId" />
          <el-table-column :label="!trend.dateType ? '日活跃用户数' : '月活跃用户数'" property="activeNum" />
          <el-table-column label="手机账号登录用户" property="msisdnNum" />
          <el-table-column label="移动IP用户" property="chinaMobileIpNum" />
          <el-table-column label="非移动IP用户" property="otherIpNum" />
          <el-table-column label="新增会员用户" property="newMembersNum" />
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
import { startDateBeforeEndDate, dateRange, monthRange } from '@/utils/rules.js';

export default {
  components: {
    WmTable,
    MultiLine,
    LineChart
  },
  data() {
    const checkDate = (rule, value, callback) => {
      const { startDate, endDate } = this.trend;
      if (startDate && endDate) {
        startDateBeforeEndDate(startDate, endDate, callback);
      }
    };
    const checkRangeDate = (rule, value, callback) => {
      const { startDate, endDate } = this.trend;
      if (startDate && endDate) {
        monthRange(startDate, endDate, callback);
      }
    };
    return {
      trendRadio: TREND_RADIO,
      mobileIpArr: ['移动IP用户', '非移动IP用户'],
      activeTrendRules: {
        date: [
          { required: true, message: '请选择时间范围', trigger: 'change' },
          { validator: dateRange, trigger: 'change' }
        ],
        startDate: [
          { required: true, message: '请选择开始时间', trigger: 'change' }
        ],
        endDate: [
          { required: true, message: '请选择结束范围', trigger: 'change' }
        ],
        checkDate: [
          { validator: checkDate, trigger: 'change' },
          { validator: checkRangeDate, trigger: 'change' }
        ]
      }
    };
  },
  computed: {
    ...mapState({
      trend: ({ dataAnalysis }) => dataAnalysis.trend,
      trendList: ({ dataAnalysis }) => dataAnalysis.trendList,
      trendNewMembers: ({ dataAnalysis }) => dataAnalysis.trendNewMembers,
      membersList: ({ dataAnalysis }) => dataAnalysis.membersList
    })
  },
  beforeMount() {
  },
  methods: {
    radioTransformDate(i) {
      if (i !== '0') return this.trendRadio[i];
      return !this.trend.dateType ? this.trendRadio[i] : this.trendRadio[i].replace('日', '月');
    },
    downloadDataAnalysis() {
      this.$refs['activeTrendForm'].validate(valid => {
        if (!valid) return false;

        this.downloadTrendDataAnalysis();
      });
    },
    triggerValidate() {
      if (this.trend.startDate && this.trend.endDate) {
        this.query();
      }
    },
    newMembersFields() {
      return this.membersList.map(val => val.item);
    },
    addFieldsTrendList() {
      return this.trendList.map(val => {
        val[this.mobileIpArr[0]] = val.chinaMobileIpNum;
        val[this.mobileIpArr[1]] = val.otherIpNum;
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
      this.$refs['activeTrendForm'].validate(valid => {
        if (!valid) return false;

        this.getTrendList().then(() => {
          this.getTrendNewMembers();
        });
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
      'getTrendNewMembers',
      'downloadTrendDataAnalysis'
    ])
  }
};
</script>
