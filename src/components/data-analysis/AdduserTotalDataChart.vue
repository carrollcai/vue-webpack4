<template>
  <div class="province-user block-containter">
    <div class="province-user-header">
      <div class="provinceUser-header-title">{{title}}</div>
      <el-form ref="provinceUserForm" :model="userMapTrend" :rules="provinceUserRules" class="flex">
        <el-form-item class="normalize-form-item" prop="checkDate">
          <el-form-item prop="date" class="normalize-form-item">
            <el-date-picker type="daterange"
              placeholder="选择日期"
              v-model="userMapTrend.date"
              :editable="false"
              @change="query" />
          </el-form-item>
        </el-form-item>
      </el-form>
    </div>
    <div class="trend-sub">
      <div class="trend-sub__radio">
        <el-radio-group v-model="userMapTrend.chartRadio" @change="handleChangeType">
          <el-radio v-for="(item, index) in trendRadio" :key="index" :label="index">
            {{item}}
          </el-radio>
        </el-radio-group>
      </div>
    </div>
    <div class="province-user-chart">
      <no-data :data="addUserMapList">
        <div class="province-user-chart">
          <div class="province-user-chart__map">
            <Map id="adduserMap" :charData="addUserMapList" :width="700" :height="500" />
          </div>
          <rank :list="addUserMapList" />
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
import mixins from './mixins';

export default {
  name: 'AddUserTotalDataChart',
  mixins: [mixins],
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
      userMapTrend: ({ dataAnalysis }) => dataAnalysis.adduserMapTrend,
      addUserMapList: ({ dataAnalysis }) => dataAnalysis.addUserMapList
    })
  },
  data() {
    const checkDate = (rule, value, callback) => {
      const { startDate, endDate } = this.userMapTrend;
      if (startDate && endDate) {
        startDateBeforeEndDate(startDate, endDate, callback);
      }
    };
    const checkRangeDate = (rule, value, callback) => {
      const { startDate, endDate } = this.userMapTrend;
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
          { required: true, message: '请选择结束时间', trigger: 'change' }
        ],
        checkDate: [
          { validator: checkDate, trigger: 'change' },
          { validator: checkRangeDate, trigger: 'change' }
        ]
      }
    };
  },
  methods: {
    query() {
      this.$refs['provinceUserForm'].validate(valid => {
        if (valid) {
          this.$emit('query');
        }
      });
    },
    handleChangeType(val) {
      this.$emit('changeType', val);
    },
    ...mapActions([
      'getProvinceUser'
    ])
  }
};
</script>
