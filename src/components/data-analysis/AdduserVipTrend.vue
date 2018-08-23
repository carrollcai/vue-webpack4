<template>
  <div class="active-trend block-containter">
    <el-form ref="activeTrendForm" :model="trend" :rules="activeTrendRules">
      <div class="trend-header">
        <div class="trend-header-title">新增会员用户趋势分析</div>
        <div class="trend-header-right">
          <div class="trend-header-right__query">
            <el-form-item v-if="isWholeCountry" class="normalize-form-item adduser-trend-dimen" prop="provinceSelected">
              <el-select class="user-form-item__input" placeholder="请选择" v-model="adduserTrend.selected" @change="handleChangeProvince">
                <el-option v-for="(val, key) in addUserTrendDimension" :key="val" :label="val" :value="Number(key)" />
              </el-select>
            </el-form-item>
            <el-form-item class="normalize-form-item" prop="checkDate">
              <el-form-item class="normalize-form-item float-left" prop="startDate">
                <el-date-picker class="user-form-item__input"
                  type="month"
                  placeholder="选择开始日期"
                  v-model="trend.startDate"
                  :editable="false"
                  :clearable="false"
                  :picker-options="startOptions(trend.endDate)"
                  @change="triggerValidate()" />
              </el-form-item>
              <span class="date-connect-line float-left">-</span>
              <el-form-item class="normalize-form-item float-left" prop="endDate">
                <el-date-picker class="user-form-item__input"
                  type="month"
                  placeholder="选择结束日期"
                  v-model="trend.endDate"
                  :editable="false"
                  :clearable="false"
                  :picker-options="endOptions(trend.startDate)"
                  @change="triggerValidate()"
                />
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
          <el-button class="data-download" type="primary" icon="icon-download" @click="downloadDataAnalysis" title="导出数据"/>
        </div>
      </div>
    </el-form>
    <div class="trend-sub">
      <div class="trend-sub__radio">
        <el-radio-group v-if="!trend.mode" v-model="trend.chartRadio" @change="changeRadio">
          <el-radio v-for="(item, index) in trendRadio" :key="index" :label="index">
            {{item}}
          </el-radio>
        </el-radio-group>
      </div>
    </div>
    <div class="trend-mode">
      <div v-if="!trend.mode" class="trend-chart">
        <no-data :data="testArr">
          <grouped-column-chart id="vip-column-chart"/>
        </no-data>
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
import { mapState, mapActions, mapMutations } from 'vuex';

import WmTable from 'components/Table.vue';
import GroupedColumnChart from 'components/chart/GroupedColumnChart.vue';
import NoData from 'components/NoData.vue';

import { ADDUSER_TREND_RADIO, ADD_USER_TREND_DIMENSION } from '@/config';
import { startDateBeforeEndDate, dateRange, monthRange } from '@/utils/rules.js';
import mixins from './mixins';

export default {
  mixins: [mixins],
  components: {
    WmTable,
    NoData,
    GroupedColumnChart
  },
  props: {
    isProvince: {
      type: Boolean,
      default: false
    },
    isDistrict: {
      type: Boolean,
      default: false
    },
    isWholeCountry: {
      type: Boolean,
      default: false
    }
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
      addUserTrendDimension: ADD_USER_TREND_DIMENSION,
      trendRadio: ADDUSER_TREND_RADIO,
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
      },
      testArr: [{}]
    };
  },
  computed: {
    ...mapState({
      adduserTrend: ({ dataAnalysis }) => dataAnalysis.adduserTrend,
      trend: ({ dataAnalysis }) => dataAnalysis.adduserVipTrend,
      trendList: ({ dataAnalysis }) => dataAnalysis.trendList,
      trendNewMembers: ({ dataAnalysis }) => dataAnalysis.trendNewMembers,
      membersList: ({ dataAnalysis }) => dataAnalysis.membersList
    })
  },
  beforeMount() {
  },
  methods: {
    handleChangeProvince() {
      this.query();
    },
    downloadAdduserTrend() {

    },
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
        if (valid) {
          this.$emit('query');
        }
      });
    },
    changeRadio(val) {
      this.$emit('vip', val);
    },
    ...mapMutations({
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

<style lang="scss">
.adduser-trend-dimen {
  width: 160px;
  margin-right: 16px;
}
</style>
