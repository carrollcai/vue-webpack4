<template>
  <div class="province-user block-containter">
    <div class="province-user-header">
      <div class="trend-header-title">各省日活跃用户情况</div>
      <el-form ref="provinceUserForm" :model="provinceUser" :rules="provinceUserRules" class="flex">
        <el-form-item class="normalize-form-item">查询：</el-form-item>
        <el-form-item class="normalize-form-item" prop="date">
          <el-date-picker type="daterange" placeholder="选择日期" v-model="provinceUser.date" :editable="false" @change="query" />
        </el-form-item>
      </el-form>
    </div>
    <div class="province-user-chart">
      <div class="province-user-chart__map">
        <Map :id="'map'" :charData="provinceUserList" :width="700" :height="500" />
      </div>
      <active-province-user-rank v-if="Object.isExistArray(provinceUserList)" :provinceUserList="provinceUserList" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Map from 'components/chart/Map.vue';
import ActiveProvinceUserRank from 'components/data-analysis/ActiveProvinceUserRank.vue';
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
    return {
      provinceUserRules: {
        date: [
          { required: true, message: '请选择时间范围', trigger: 'change' }
        ]
      }
    };
  },
  beforeMount() {
    this.getProvinceUser();
  },
  methods: {
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
