<template>
  <div class="active-trend block-containter">
    <el-form ref="activeTrendForm"
      :model="trend"
      :rules="activeTrendRules">
      <div class="trend-header">
        <div class="trend-header-title">新增会员用户趋势分析</div>
        <div class="trend-header-right">
          <div class="trend-header-right__query">
            <el-form-item v-if="isWholeCountry"
              class="normalize-form-item province-form-item"
              prop="provinceSelected">
              <el-select class="user-form-item__input"
                placeholder="请选择"
                v-model="trend.district"
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
            <el-form-item class="normalize-form-item"
              prop="checkDate">
              <el-form-item class="normalize-form-item float-left"
                prop="startDate">
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
              <el-form-item class="normalize-form-item float-left"
                prop="endDate">
                <el-date-picker class="user-form-item__input"
                  type="month"
                  placeholder="选择结束日期"
                  v-model="trend.endDate"
                  :editable="false"
                  :clearable="false"
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
          @change="changeRadio">
          <el-radio v-for="(item, index) in MEMBER_TYPE"
            :key="index"
            :label="item.value">
            {{item.label}}
          </el-radio>
        </el-radio-group>
      </div>
    </div>
    <div class="trend-mode">
      <div v-if="!trend.mode"
        class="trend-chart">
        <no-data :data="addUserVipData">
          <Column id="vip-column-chart"
            :fields="addUserVipFields"
            :char-data="addUserVipData" />
        </no-data>
      </div>
      <div v-else>
        <wm-table :source="addUserVipList"
          :max-height="500">
          <el-table-column label="客户端"
            property="clientType" />
          <el-table-column label="日期"
            property="periodId" />
          <el-table-column :label="isWholeCountry ? (trend.district ? '省份' : '大区') : '省份'"
            property="province" />
          <el-table-column v-for="(item, index) in MEMBER_TYPE"
            :key="index"
            :label="item.label">
            <template slot-scope="scope">
              {{convertNull(scope.row[`member_${item.value}`])}}
            </template>
          </el-table-column>
        </wm-table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import WmTable from 'components/Table.vue';
import Column from 'components/chart/Column.vue';
import NoData from 'components/NoData.vue';
import { ADDUSER_TREND_RADIO, ADD_USER_TREND_DIMENSION } from '@/config';
import { startDateBeforeEndDate, dateRange, monthRange } from '@/utils/rules.js';
import {
  convertNull
} from '@/utils/common';
import mixins from '../mixins';

export default {
  mixins: [mixins],
  components: {
    WmTable,
    NoData,
    Column
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
  computed: {
    ...mapState({
      trend: ({ dataAnalysis }) => dataAnalysis.adduserVipTrend,
      addUserVipList: ({ dataAnalysis }) => dataAnalysis.addUserVipList,
      addUserVipData: ({ dataAnalysis }) => dataAnalysis.addUserVipData,
      addUserVipFields: ({ dataAnalysis }) => dataAnalysis.addUserVipFields,
    })
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
  beforeMount() {
  },
  methods: {
    convertNull(val) {
      return convertNull(val);
    },
    handleChangeProvince() {
      this.query();
    },
    downloadDataAnalysis() {
      this.$refs['activeTrendForm'].validate(valid => {
        if (!valid) return false;
        this.$emit('downloadAdduserVip');
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
    changeRadio(val) {
      this.$emit('vip', val);
    },
    ...mapMutations({
      initDate: 'ACTIVE_INIT_DATE'
    })
  }
};
</script>

<style lang="scss">
.province-form-item {
  width: 160px;
  margin-right: 16px;
}
</style>
