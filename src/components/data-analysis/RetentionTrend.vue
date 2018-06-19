<template>
  <div class="active-trend block-containter">
    <div class="trend-header">
      <div class="trend-header-title">留存流失分析</div>
      <div class="trend-header-right">
        <div class="trend-header-right__query">
          <el-form ref="retTrendForm" :model="retTrend" :rules="retTrendTrendRules" class="flex">
            <el-form-item class="normalize-form-item">
              查询：
            </el-form-item>
            <el-form-item class="normalize-form-item" prop="checkDate">
              <el-form-item class="normalize-form-item float-left" prop="startDate">
                <el-date-picker type="month" placeholder="选择开始日期" v-model="retTrend.startDate" @change="triggerValidate()" />
              </el-form-item>
              <span class="date-connect-line float-left">-</span>
              <el-form-item class="normalize-form-item float-left" prop="endDate">
                <el-date-picker type="month" placeholder="选择结束日期" v-model="retTrend.endDate" @change="triggerValidate()" />
              </el-form-item>
            </el-form-item>
          </el-form>
        </div>
        <div class="trend-header-divider">
          |
        </div>
        <div>
          <el-radio-group v-model="retTrend.mode" size="small">
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
        <el-radio v-if="!retTrend.mode" v-for="i in Object.keys(trendRadio)" :key="i" v-model="retTrend.chartRadio" :label="Number(i)" @change="changeRadio">
          {{trendRadio[i]}}
        </el-radio>
      </div>
      <div>
        <i class="el-icon-download"></i>下载此数据分析
      </div>
    </div>
    <div class="trend-mode">
      <div v-if="!retTrend.mode" class="trend-chart">
        <div class="no-data" v-if="Object.isNullArray(retTrendList)">暂无数据</div>
        <line-chart v-else :charData="retTrendList" :id="'line'" :temperature="true" />
      </div>
      <div v-else>
        <wm-table :source="retTrendList" :max-height="500">
          <el-table-column label="月份" property="periodId" />
          <el-table-column label="本月新增用户" property="newMembersNum" />
          <el-table-column label="本月留存客户" property="retainNum" />
          <el-table-column label="本月流失用户" property="dropoutNum" />
          <el-table-column label="上月新增本月留存" property="newRetainNum" />
          <el-table-column label="新增用户留存率" property="newUserRetPer" />
          <el-table-column label="留存用户流失率" property="retLossPer" />
        </wm-table>
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from 'components/chart/Line.vue';
import { RETENTION_TREND_RADIO } from '@/config';
import { mapState, mapActions, mapMutations } from 'vuex';
import WmTable from 'components/Table.vue';
import { startDateBeforeEndDate } from '@/utils/rules.js';

export default {
  components: {
    LineChart,
    WmTable
  },
  data() {
    const checkDate = (rule, value, callback) => {
      const { startDate, endDate } = this.retTrend;
      if (startDate && endDate) {
        startDateBeforeEndDate(startDate, endDate, callback);
      }
    };
    return {
      trendRadio: RETENTION_TREND_RADIO,
      retTrendTrendRules: {
        startDate: [
          { required: true, message: '请选择开始时间', trigger: 'change' }
        ],
        endDate: [
          { required: true, message: '请选择结束范围', trigger: 'change' }
        ],
        checkDate: [
          { validator: checkDate, trigger: 'change' }
        ]
      }
    };
  },
  computed: {
    ...mapState({
      retTrend: ({ dataAnalysis }) => dataAnalysis.retTrend,
      retTrendList: ({ dataAnalysis }) => dataAnalysis.retTrendList
    })
  },
  beforeMount() {
  },
  methods: {
    triggerValidate() {
      if (this.retTrend.startDate && this.retTrend.endDate) {
        this.query();
      }
    },
    changeRadio(val) {
      // 留存用户流失率
      this.updateRetTrendList({ chartRadio: val });
    },
    query() {
      const { retTrend } = this;
      this.$refs['retTrendForm'].validate(valid => {
        if (valid) {
          this.getRetTrendList(retTrend);
        }
      });
    },
    ...mapMutations({
      updateRetTrendList: 'RETENTION_UPDATE_TREND_LIST'
    }),
    ...mapActions([
      'getRetTrendList'
    ])
  }
};
</script>
