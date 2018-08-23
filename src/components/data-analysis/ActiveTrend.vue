<template>
  <div class="active-trend block-containter">
    <el-form ref="activeTrendForm" :model="trend" :rules="activeTrendRules">
      <div class="trend-header">
        <div class="trend-header-title">{{title}}</div>
        <div class="trend-header-right">
          <el-form-item class="normalize-form-item" v-if="isWholeCountry">
            <el-select class="user-form-item__input"
              v-model="trend.district"
              placeholder="请选择"
              @change="provinceChange">
              <el-option :key="null" label="全国" :value="null" />
              <el-option v-for="item in DISTRICTS" :key="item.value" :label="item.value" :value="item.value" />
            </el-select>
          </el-form-item>

          <el-radio-group class="trend-header-right__query" v-model="trend.dateType" size="small" @change="dateTypeChange">
            <el-radio-button :label="0">按日</el-radio-button>
            <el-radio-button :label="1">按月</el-radio-button>
          </el-radio-group>
          <div class="trend-header-right__query">
            <!-- 这里的切换需要重置或者默认选项 -->
            <el-form-item v-if="!trend.dateType" prop="date" class="normalize-form-item">
              <el-date-picker type="daterange"
                placeholder="选择日期"
                v-model="trend.date"
                :editable="false"
                @change="query" />
            </el-form-item>

            <el-form-item v-if="trend.dateType" class="normalize-form-item" prop="checkDate">
              <el-form-item class="normalize-form-item float-left" prop="startDate">
                <el-date-picker class="user-form-item__input"
                  type="month"
                  :clearable="false"
                  :editable="false"
                  placeholder="选择开始日期"
                  v-model="trend.startDate"
                  :picker-options="startOptions"
                  @change="triggerValidate()" />
              </el-form-item>
              <span class="date-connect-line float-left">-</span>
              <el-form-item class="normalize-form-item float-left" prop="endDate">
                <el-date-picker class="user-form-item__input"
                  type="month"
                  :clearable="false"
                  :editable="false"
                  placeholder="选择结束日期"
                  v-model="trend.endDate"
                  :picker-options="endOptions"
                  @change="triggerValidate()" />
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
        <el-radio v-if="!trend.mode" v-for="i in Object.keys(trendRadio)"
          :key="i"
          v-model="trend.chartRadio"
          :label="Number(i)"
          @change="handleChangeType">
          <span>{{radioTransformDate(i)}}</span>
        </el-radio>
      </div>
    </div>
    <div class="trend-mode">
      <div v-if="!trend.mode" class="trend-chart">
        <!--活跃用户-->
        <div class="no-data" v-if="trend.chartRadio === 0">
          <div class="no-data" v-if="Object.isNullArray(trendList)">暂无数据</div>
          <template v-else>
            <basic-area-chart v-if="isProvince" :charData="trendData" :id="'line'" :fields="trendFields" />

            <grouped-column-chart v-if="isWholeCountry || isDistrict" :id="'active-trend'"/>
          </template>
        </div>
        <!--手机账号登录用户-->
        <div class="no-data" v-if="trend.chartRadio === 1">
          <div class="no-data" v-if="Object.isNullArray(trendList)">暂无数据</div>
          <template v-else>
            <basic-area-chart v-if="isProvince" :charData="trendData" :id="'line'" :fields="trendFields" />
            <grouped-column-chart v-if="isWholeCountry || isDistrict" :id="'active-trend'"/>
          </template>
        </div>
        <!--移动IP用户-->
        <div class="no-data" v-else-if="trend.chartRadio === 2">
          <div class="no-data" v-if="Object.isNullArray(trendData)">暂无数据</div>
          <template v-else>
            <basic-area-chart v-if="isProvince" :charData="trendData" :id="'line'" :fields="trendFields" />
            <grouped-column-chart v-if="isWholeCountry || isDistrict" :id="'active-trend'"/>
          </template>
        </div>
        <!--非移动IP用户-->
        <div class="no-data" v-else-if="trend.chartRadio === 3">
          <div class="no-data" v-if="Object.isNullArray(trendData)">暂无数据</div>
          <template v-else>
            <basic-area-chart v-if="isProvince" :charData="trendData" :id="'line'" :fields="trendFields" />
            <grouped-column-chart v-if="isWholeCountry || isDistrict" :id="'active-trend'"/>
          </template>
        </div>
      </div>
      <div v-else>
        <wm-table :source="trendList" :max-height="500">
          <el-table-column label="日期" property="periodId" />
          <el-table-column :label="!trend.dateType ? '日活跃用户数' : '月活跃用户数'" property="activeNum" />
          <el-table-column label="手机账号登录用户" property="msisdnNum" />
          <el-table-column label="移动IP用户" property="chinaMobileIpNum" />
          <el-table-column label="非移动IP用户" property="otherIpNum" />
        </wm-table>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import MultiLine from 'components/chart/MultiLine.vue';
import BasicAreaChart from 'components/chart/BasicAreaChart.vue';
import GroupedColumnChart from 'components/chart/GroupedColumnChart.vue';
import LineChart from 'components/chart/Line.vue';
import { TREND_RADIO } from '@/config';
import { mapState, mapActions, mapMutations } from 'vuex';
import WmTable from 'components/Table.vue';
import { startDateBeforeEndDate, dateRange, monthRange } from '@/utils/rules.js';
import mixins from './mixins';
import * as types from '@/store/types';

export default {
  mixins: [mixins],
  props: {
    title: {
      type: String,
      default: ''
    },
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
  components: {
    WmTable,
    MultiLine,
    LineChart,
    BasicAreaChart,
    GroupedColumnChart
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
    const that = this;
    return {
      trendRadio: TREND_RADIO,
      mobileIpArr: ['移动IP用户'],
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
      startOptions: {
        disabledDate(time) {
          if (that.trend.endDate) {
            return (time.getTime() < moment(that.trend.endDate).add(-12, 'months').toDate().getTime()) || (time.getTime() > new Date(that.trend.endDate).getTime());
          } else {
            return time.getTime() > Date.now();
          }
        }
      },
      endOptions: {
        disabledDate(time) {
          if (that.trend.startDate) {
            return (time.getTime() > moment(that.trend.startDate).add(12, 'months').toDate().getTime()) || (time.getTime() < new Date(that.trend.startDate).getTime());
          } else {
            return time.getTime() > Date.now();
          }
        }
      }
    };
  },
  computed: {
    ...mapState({
      trend: ({ dataAnalysis }) => dataAnalysis.trend,
      trendList: ({ dataAnalysis }) => dataAnalysis.trendList,
      trendData: ({ dataAnalysis }) => dataAnalysis.trendData,
      trendFields: ({ dataAnalysis }) => dataAnalysis.trendFields,
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
      const that = this;
      this.$refs['activeTrendForm'].validate(valid => {
        if (valid) {
          this.getTrendList().then(() => {
            that.handleChangeType(that.trend.chartRadio);
          });
        }
      });
    },
    handleChangeType(val) {
      let type = types.ACTIVE_UPDATE_PROVINCE_TREND;
      if (this.isProvince) {
        type = types.ACTIVE_UPDATE_PROVINCE_TREND;
      }

      if (this.isDistrict) {
        type = types.ACTIVE_UPDATE_DISTRICT_TREND;
      }

      if (this.isWholeCountry) {
        type = types.ACTIVE_UPDATE_COUNTRY_TREND;
      }

      this.$store.commit(type, { chartRadio: val });
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
