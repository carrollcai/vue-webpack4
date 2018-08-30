<template>
  <div class="active-trend block-containter">
    <div class="trend-header">
      <div class="trend-header-title">留存流失趋势分析</div>
      <div class="trend-header-right">
        <div class="trend-header-right__query">
          <el-form ref="retTrendForm"
            :model="retTrend"
            :rules="retTrendTrendRules"
            class="flex">
            <el-form-item class="normalize-form-item  province-form-item"
              v-if="isWholeCountry">
              <el-select class="user-form-item__input"
                v-model="retTrend.district"
                placeholder="请选择"
                @change="provinceChange">
                <el-option :key="null"
                  label="全国"
                  :value="null" />
                <el-option v-for="item in DISTRICTS"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value" />
              </el-select>
            </el-form-item>

            <el-form-item class="normalize-form-item"
              prop="checkDate">
              <el-form-item class="normalize-form-item float-left"
                prop="startDate">
                <el-date-picker type="month"
                  placeholder="选择开始日期"
                  v-model="retTrend.startDate"
                  :editable="false"
                  :clearable="false"
                  :picker-options="startOptions(retTrend.endDate)"
                  @change="triggerValidate()" />
              </el-form-item>
              <span class="date-connect-line float-left">-</span>
              <el-form-item class="normalize-form-item float-left"
                prop="endDate">
                <el-date-picker type="month"
                  placeholder="选择结束日期"
                  :editable="false"
                  :clearable="false"
                  v-model="retTrend.endDate"
                  :picker-options="endOptions(retTrend.startDate)"
                  @change="triggerValidate()" />
              </el-form-item>
            </el-form-item>
          </el-form>
        </div>
        <div class="trend-header-divider">
          |
        </div>
        <div>
          <el-radio-group v-model="retTrend.mode"
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
    <div class="trend-sub">
      <div class="trend-sub__radio"
        v-if="!retTrend.mode">
        <el-radio v-for="i in Object.keys(trendRadio)"
          :key="i"
          v-model="retTrend.chartRadio"
          :label="Number(i)"
          @change="changeRadio">
          {{trendRadio[i]}}
        </el-radio>
      </div>
    </div>
    <div class="trend-mode">
      <div v-if="!retTrend.mode"
        class="trend-chart">
        <div class="no-data"
          v-if="Object.isNullArray(retTrendList)">暂无数据</div>
        <template v-else>
          <multi-line :charData="retTrendData"
            id="line"
            :fields="retTrendFields" />
        </template>
      </div>
      <div v-else>
        <wm-table :source="retTrendList"
          :max-height="500">
          <el-table-column label="客户端"
            property="clientType" />
          <el-table-column label="月份"
            property="periodId" />
          <el-table-column :label="isWholeCountry ? (retTrend.district ? '省份' : '大区') : '省份'"
            property="province" />
          <el-table-column label="上月活跃用户数"
            property="activeNum" />
          <el-table-column label="上月存留用户数"
            property="retainNum" />
          <el-table-column label="上月存留本月流失用户数"
            property="dropoutNum" />
          <el-table-column label="上月新增本月存留用户数"
            property="newRetainNum" />
          <el-table-column label="新增用户留存率"
            property="newUserRetPer" />
          <el-table-column label="留存用户流失率"
            property="retLossPer" />
        </wm-table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import BasicAreaChart from 'components/chart/BasicAreaChart.vue';
import MultiLine from 'components/chart/MultiLine.vue';
import GroupedColumnChart from 'components/chart/GroupedColumnChart.vue';
import WmTable from 'components/Table.vue';

import { RETENTION_TREND_RADIO } from '@/config';
import { startDateBeforeEndDate, monthRange } from '@/utils/rules.js';
import mixins from './mixins';

export default {
  mixins: [mixins],
  props: {
    isWholeCountry: {
      type: Boolean,
      default: false
    },
    isProvince: {
      type: Boolean,
      default: false
    },
    isDistrict: {
      type: Boolean,
      default: false
    }
  },
  components: {
    BasicAreaChart,
    GroupedColumnChart,
    MultiLine,
    WmTable
  },
  data() {
    const checkDate = (rule, value, callback) => {
      const { startDate, endDate } = this.retTrend;
      if (startDate && endDate) {
        startDateBeforeEndDate(startDate, endDate, callback);
      }
    };
    const checkRangeDate = (rule, value, callback) => {
      const { startDate, endDate } = this.retTrend;
      if (startDate && endDate) {
        monthRange(startDate, endDate, callback);
      }
    };
    return {
      trendRadio: RETENTION_TREND_RADIO,
      retTrendTrendRules: {
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
      retTrend: ({ dataAnalysis }) => dataAnalysis.retTrend,
      retTrendList: ({ dataAnalysis }) => dataAnalysis.retTrendList,
      retTrendData: ({ dataAnalysis }) => dataAnalysis.retTrendData,
      retTrendFields: ({ dataAnalysis }) => dataAnalysis.retTrendFields
    })
  },
  beforeMount() {
  },
  methods: {
    downloadDataAnalysis() {
      this.$refs['retTrendForm'].validate(valid => {
        if (valid) {
          this.downloadRetTrendDataAnalysis();
        }
      });
    },
    triggerValidate() {
      if (this.retTrend.startDate && this.retTrend.endDate) {
        this.query();
      }
    },
    changeRadio() {
      this.$emit('trend');
    },
    query() {
      this.$refs['retTrendForm'].validate(valid => {
        if (valid) {
          this.$emit('query');
        }
      });
    },
    provinceChange() {
      this.query();
    },
    ...mapActions([
      'getRetTrendList',
      'downloadRetTrendDataAnalysis'
    ])
  }
};
</script>
