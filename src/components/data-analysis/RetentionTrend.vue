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
            <el-form-item prop="date" class="normalize-form-item">
              <el-date-picker type="daterange" placeholder="选择日期" v-model="retTrend.date" :editable="false" @change="query" />
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
        <ret-loss-line :charData="retTrendList" :id="'line'" />
      </div>
      <div v-else>
        <wm-table :source="retTrendList">
          <el-table-column label="月份" property="date" />
          <el-table-column label="本月新增用户" property="newUser" />
          <el-table-column label="本月留存客户" property="retentionUser" />
          <el-table-column label="本月流失用户" property="lossUser" />
          <el-table-column label="上月新增本月留存" property="lastMonthRentention" />
          <el-table-column label="新增用户留存率" property="newUserRetPer" />
          <el-table-column label="留存用户流失率" property="retLossPer" />
        </wm-table>
      </div>
    </div>
  </div>
</template>

<script>
import RetLossLine from 'components/chart/RetLossLine.vue';
import { RETENTION_TREND_RADIO } from '@/config';
import { mapState, mapActions, mapMutations } from 'vuex';
import WmTable from 'components/Table.vue';
import { timeRange } from '@/utils/rules';

export default {
  components: {
    RetLossLine,
    WmTable
  },
  data() {
    return {
      trendRadio: RETENTION_TREND_RADIO,
      retTrendTrendRules: {
        date: [
          { required: true, message: '请选择时间范围', trigger: 'change' },
          { validator: timeRange, trigger: 'change' }
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
