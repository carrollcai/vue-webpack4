<template>
  <div class="province-user block-containter">
    <div class="province-user-header">
      <div class="trend-header-title">各省日活跃用户情况</div>
      <el-form ref="provinceUserForm" :model="provinceUser" :rules="provinceUserRules" class="flex">
        <el-form-item class="normalize-form-item">查询：</el-form-item>

        <el-form-item class="normalize-form-item" prop="checkDate">
          <el-form-item class="normalize-form-item float-left" prop="startDate">
            <el-date-picker type="month" placeholder="选择开始日期" v-model="provinceUser.startDate" @change="triggerValidate()" />
          </el-form-item>
          <span class="date-connect-line float-left">-</span>
          <el-form-item class="normalize-form-item float-left" prop="endDate">
            <el-date-picker type="month" placeholder="选择结束日期" v-model="provinceUser.endDate" @change="triggerValidate()" />
          </el-form-item>
        </el-form-item>

      </el-form>
    </div>
    <div class="province-user-chart">
      <div class="province-user-chart__map">
        <Map :id="'map'" :charData="provinceUserList" :width="700" :height="500" />
      </div>
      <active-province-user-rank v-if="Object.isExistArray(provinceUserList)" :provinceUserList="provinceUserList" :maxNum="provinceUserList[0].value" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Map from 'components/chart/Map.vue';
import ActiveProvinceUserRank from 'components/data-analysis/ActiveProvinceUserRank.vue';
import { startDateBeforeEndDate } from '@/utils/rules.js';
export default {
  components: {
    Map,
    ActiveProvinceUserRank
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
    return {
      provinceUserRules: {
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
  methods: {
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
    ...mapActions([
      'getProvinceUser'
    ])
  }
};
</script>
