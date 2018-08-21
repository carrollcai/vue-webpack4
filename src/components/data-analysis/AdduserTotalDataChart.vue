<template>
  <div class="province-user block-containter">
    <div class="province-user-header">
      <div class="provinceUser-header-title">大区各省份用户新增排名情况</div>
      <el-form ref="provinceUserForm" :model="provinceUser" :rules="provinceUserRules" class="flex">
        <el-form-item class="normalize-form-item" prop="checkDate">
          <el-form-item class="normalize-form-item float-left" prop="startDate">
            <el-date-picker class="user-form-item__input" type="month" placeholder="选择开始日期" v-model="adduserTrend.startDate" @change="triggerValidate()" />
          </el-form-item>
          <span class="date-connect-line float-left">-</span>
          <el-form-item class="normalize-form-item float-left" prop="endDate">
            <el-date-picker class="user-form-item__input" type="month" placeholder="选择结束日期" v-model="adduserTrend.endDate" @change="triggerValidate()" />
          </el-form-item>
        </el-form-item>
      </el-form>
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

export default {
  components: {
    Map,
    Rank,
    NoData
  },
  computed: {
    ...mapState({
      adduserTrend: ({ dataAnalysis }) => dataAnalysis.adduserTrend,
      provinceUserList: ({ dataAnalysis }) => dataAnalysis.provinceUserList
    })
  },
  data() {
    const checkDate = (rule, value, callback) => {
      const { startDate, endDate } = this.adduserTrend;
      if (startDate && endDate) {
        startDateBeforeEndDate(startDate, endDate, callback);
      }
    };
    const checkRangeDate = (rule, value, callback) => {
      const { startDate, endDate } = this.adduserTrend;
      if (startDate && endDate) {
        monthRange(startDate, endDate, callback);
      }
    };
    return {
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
      if (this.adduserTrend.startDate && this.adduserTrend.endDate) {
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
    ...mapActions([
      'getProvinceUser'
    ])
  }
};
</script>
