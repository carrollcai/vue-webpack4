<template>
  <div class="province-user block-containter">
    <div class="province-user-header">
      <div class="provinceUser-header-title">{{title}}</div>
      <el-form ref="provinceUserForm" :model="provinceUser" :rules="provinceUserRules" class="flex">
        <el-form-item class="normalize-form-item" prop="checkDate">
          <el-form-item class="normalize-form-item float-left" prop="startDate">
            <el-date-picker class="user-form-item__input"
              type="month"
              :editable="false"
              :clearable="false"
              placeholder="选择开始日期"
              v-model="adduserMapTrend.startDate"
              @change="triggerValidate()" />
          </el-form-item>
          <span class="date-connect-line float-left">-</span>
          <el-form-item class="normalize-form-item float-left" prop="endDate">
            <el-date-picker class="user-form-item__input"
              type="month"
              :editable="false"
              :clearable="false"
              placeholder="选择结束日期"
              v-model="adduserMapTrend.endDate"
              @change="triggerValidate()" />
          </el-form-item>
        </el-form-item>
      </el-form>
    </div>
    <div class="trend-sub">
      <div class="trend-sub__radio">
        <el-radio-group v-model="adduserMapTrend.chartRadio" @change="handleChangeType">
          <el-radio v-for="(item, index) in trendRadio" :key="index" :label="index">
            {{item}}
          </el-radio>
        </el-radio-group>
      </div>
    </div>
    <div class="province-user-chart">
      <no-data :data="provinceUserList">
        <div class="province-user-chart">
          <div class="province-user-chart__map">
            <Map :id="'adduserMap'" :charData="provinceUserList" :width="700" :height="500" />
          </div>
          <rank :list="provinceUserList" />
        </div>
      </no-data>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Map from 'components/chart/Map.vue';
import Rank from './rank/Rank.vue';
import NoData from 'components/NoData.vue';
import { startDateBeforeEndDate, dateRange, monthRange } from '@/utils/rules.js';
import { ADDUSER_TREND_COUNTRY_RADIO } from '@/config';

export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  components: {
    Map,
    Rank,
    NoData
  },
  computed: {
    ...mapState({
      adduserMapTrend: ({ dataAnalysis }) => dataAnalysis.adduserMapTrend,
      provinceUserList: ({ dataAnalysis }) => dataAnalysis.provinceUserList
    })
  },
  data() {
    const checkDate = (rule, value, callback) => {
      const { startDate, endDate } = this.adduserMapTrend;
      if (startDate && endDate) {
        startDateBeforeEndDate(startDate, endDate, callback);
      }
    };
    const checkRangeDate = (rule, value, callback) => {
      const { startDate, endDate } = this.adduserMapTrend;
      if (startDate && endDate) {
        monthRange(startDate, endDate, callback);
      }
    };
    return {
      trendRadio: ADDUSER_TREND_COUNTRY_RADIO,
      provinceUserRules: {
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
  methods: {
    dateTypeChange() {
      this.query();
    },
    triggerValidate() {
      if (this.adduserMapTrend.startDate && this.adduserMapTrend.endDate) {
        this.query();
      }
    },
    query() {
      this.$refs['provinceUserForm'].validate(valid => {
        if (valid) {
          this.getProvinceUser();
        }
      });
    },
    handleChangeType() {
      this.query();
    },
    ...mapActions([
      'getProvinceUser'
    ])
  }
};
</script>
