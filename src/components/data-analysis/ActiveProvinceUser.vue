<template>
  <div class="province-user block-containter">
    <div class="province-user-header">
      <!--
      <div class="provinceUser-header-title">各省{{!provinceUser.dateType ? '日' : '月'}}活跃用户情况</div>
      -->
      <div class="provinceUser-header-title">{{title}}</div>
      <el-form ref="provinceUserForm" :model="provinceUser" :rules="provinceUserRules" class="flex">
        <el-form-item class="normalize-form-item">
          <el-radio-group v-model="provinceUser.dateType" size="small" @change="dateTypeChange">
            <el-radio-button :label="0">按日</el-radio-button>
            <el-radio-button :label="1">按月</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <!-- <el-form-item class="normalize-form-item provinceUser-search">查询：</el-form-item> -->
        <el-form-item class="normalize-form-item provinceUser-search"></el-form-item>
        <el-form-item v-if="!provinceUser.dateType" prop="date" class="normalize-form-item">
          <el-date-picker type="daterange" placeholder="选择日期" v-model="provinceUser.date" :editable="false" @change="query" />
        </el-form-item>
        <el-form-item v-if="provinceUser.dateType" class="normalize-form-item" prop="checkDate">
          <el-form-item class="normalize-form-item float-left" prop="startDate">
            <el-date-picker class="user-form-item__input" type="month" placeholder="选择开始日期" v-model="provinceUser.startDate" @change="triggerValidate()" />
          </el-form-item>
          <span class="date-connect-line float-left">-</span>
          <el-form-item class="normalize-form-item float-left" prop="endDate">
            <el-date-picker class="user-form-item__input" type="month" placeholder="选择结束日期" v-model="provinceUser.endDate" @change="triggerValidate()" />
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
          <!-- <rank :list="provinceUserList" :title="`${!provinceUser.dateType ? '日' : '月'}活全国排名情况：`" /> -->
          <rank :list="provinceUserList" />
        </div>
      </no-data>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import Map from 'components/chart/Map.vue';
import Rank from './rank/Rank.vue';
import NoData from 'components/NoData.vue';
import { startDateBeforeEndDate, dateRange, monthRange } from '@/utils/rules.js';

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
    NoData,
  },
  computed: {
    ...mapState({
      provinceUser: ({ dataAnalysis }) => dataAnalysis.provinceUser,
      provinceUserList: ({ dataAnalysis }) => dataAnalysis.provinceUserList
    })
  },
  data() {
    const checkDate = (rule, value, callback) => {
      const { startDate, endDate } = this.provinceUser;
      if (startDate && endDate) {
        startDateBeforeEndDate(startDate, endDate, callback);
      }
    };
    const checkRangeDate = (rule, value, callback) => {
      const { startDate, endDate } = this.provinceUser;
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
      const { provinceUser } = this;
      // 初始化区间段 日最近7天，月最近半年
      this.initDate(provinceUser);
      this.query();
    },
    triggerValidate() {
      if (this.provinceUser.startDate && this.provinceUser.endDate) {
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
    ...mapMutations({
      initDate: 'PROVINCER_USER_INIT_DATE'
    }),
    ...mapActions([
      'getProvinceUser'
    ])
  }
};
</script>
