<template>
  <div class="active-trend block-containter">
    <el-form ref="activeTrendForm"
      :model="trend"
      :rules="activeTrendRules">
      <div class="trend-header">
        <div class="trend-header-title">{{title}}</div>
        <div class="trend-header-right">
          <el-form-item class="normalize-form-item province-form-item"
            v-if="isWholeCountry">
            <el-select class="user-form-item__input"
              v-model="trend.district"
              placeholder="请选择"
              @change="handleChangeProvince">
              <el-option :key="null"
                label="全国"
                :value="null" />
              <el-option v-for="item in DISTRICTS"
                :key="item.value"
                :label="item.label"
                :value="item.value" />
            </el-select>
          </el-form-item>

          <el-radio-group class="flex"
            v-model="trend.dateType"
            size="small"
            @change="dateTypeChange">
            <el-radio-button :label="0">按日</el-radio-button>
            <el-radio-button :label="1">按月</el-radio-button>
          </el-radio-group>
          <div class="trend-header-right__query">
            <!-- 这里的切换需要重置或者默认选项 -->
            <el-form-item v-if="!trend.dateType"
              prop="date"
              class="normalize-form-item">
              <el-date-picker type="daterange"
                placeholder="选择日期"
                v-model="trend.date"
                :editable="false"
                @change="query" />
            </el-form-item>

            <el-form-item v-if="trend.dateType"
              class="normalize-form-item"
              prop="checkDate">
              <el-form-item class="normalize-form-item float-left"
                prop="startDate">
                <el-date-picker class="user-form-item__input"
                  type="month"
                  :clearable="false"
                  :editable="false"
                  placeholder="选择开始日期"
                  v-model="trend.startDate"
                  :picker-options="startOptions(trend.endDate)"
                  @change="triggerValidate()" />
              </el-form-item>
              <span class="date-connect-line float-left">-</span>
              <el-form-item class="normalize-form-item float-left"
                prop="endDate">
                <el-date-picker class="user-form-item__input"
                  type="month"
                  :clearable="false"
                  :editable="false"
                  placeholder="选择结束日期"
                  v-model="trend.endDate"
                  :picker-options="endOptions(trend.startDate)"
                  @change="triggerValidate()" />
              </el-form-item>
            </el-form-item>
          </div>
          <div class="trend-header-divider">
            |
          </div>
          <div>
            <el-radio-group v-model="trend.mode"
              size="small">
              <el-radio-button :label="0">
                <i class="icon-chart"></i>
              </el-radio-button>
              <el-radio-button :label="1">
                <i class="icon-date1"></i>
              </el-radio-button>
            </el-radio-group>
          </div>
          <el-button class="data-download"
            type="primary"
            icon="icon-download"
            @click="downloadDataAnalysis"
            title="导出数据" />
        </div>
      </div>
    </el-form>
    <div class="trend-sub">
      <div class="trend-sub__radio">
        <el-radio-group v-if="!trend.mode"
          v-model="trend.chartRadio"
          @change="handleChangeType">
          <el-radio v-for="i in Object.keys(trendRadio)"
            :key="i"
            :label="Number(i)">
            <span>{{radioTransformDate(i)}}</span>
          </el-radio>
        </el-radio-group>
      </div>
    </div>
    <div class="trend-mode">
      <div v-if="!trend.mode"
        class="trend-chart">
        <div class="no-data">
          <div class="no-data"
            v-if="Object.isNullArray(trendList)">暂无数据</div>
          <template v-else>
            <Column :char-data="trendData"
              :fields="trendFields"
              id="activeColumn" />
          </template>
        </div>
      </div>
      <div v-else>
        <wm-table :source="trendList"
          :max-height="500">
          <el-table-column label="客户端"
            property="clientType" />
          <el-table-column label="日期"
            property="periodId" />
          <el-table-column :label="isWholeCountry ? (trend.district === null ? '大区' : '省份') : '省份'"
            property="province" />
          <el-table-column :label="!trend.dateType ? '日活跃用户数' : '月活跃用户数'"
            property="activeNum" />
          <el-table-column label="手机账号登录用户"
            property="msisdnNum" />
          <el-table-column label="移动IP用户"
            property="chinaMobileIpNum" />
          <el-table-column label="非移动IP用户"
            property="otherIpNum" />
        </wm-table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import MultiLine from 'components/chart/MultiLine.vue';
import Column from 'components/chart/Column.vue';
import LineChart from 'components/chart/Line.vue';
import WmTable from 'components/Table.vue';
import mixins from '../mixins';
import { TREND_RADIO } from '@/config';
import { startDateBeforeEndDate, dateRange, monthRange } from '@/utils/rules.js';

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
    Column
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
      dataMode: 0,
      trendRadio: TREND_RADIO,
      activeTrendRules: {
        date: [
          { required: true, message: '请选择时间范围', trigger: 'change' },
          { validator: dateRange, trigger: 'change' }
        ],
        startDate: [
          { required: true, message: '请选择开始时间', trigger: 'change' }
        ],
        endDate: [
          { required: true, message: '请选择结束时间', trigger: 'change' }
        ],
        checkDate: [
          { validator: checkDate, trigger: 'change' },
          { validator: checkRangeDate, trigger: 'change' }
        ]
      },
    };
  },
  computed: {
    ...mapState({
      trend: ({ dataAnalysis }) => dataAnalysis.trend,
      trendList: ({ dataAnalysis }) => dataAnalysis.trendList,
      trendData: ({ dataAnalysis }) => dataAnalysis.trendData,
      trendFields: ({ dataAnalysis }) => dataAnalysis.trendFields,
    })
  },
  methods: {
    handleChangeProvince() {
      this.query();
    },
    radioTransformDate(i) {
      // 这个函数会触发多次，每次只触发第一次
      if (i !== '0') return this.trendRadio[i];
      return !this.trend.dateType ? this.trendRadio[i] : this.trendRadio[i].replace('日', '月');
    },
    downloadDataAnalysis() {
      this.$refs['activeTrendForm'].validate(valid => {
        if (valid) {
          this.downloadTrendDataAnalysis();
        }
      });
    },
    triggerValidate() {
      if (this.trend.startDate && this.trend.endDate) {
        this.query();
      }
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
    handleChangeType(val) {
      this.$emit('changeType', val);
    },
    ...mapMutations({
      initDate: 'ACTIVE_INIT_DATE'
    }),
    ...mapActions([
      'downloadTrendDataAnalysis'
    ])
  }
};
</script>
