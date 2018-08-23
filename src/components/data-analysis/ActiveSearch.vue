<template>
  <el-form ref="activeSearchForm" :model="activeObj" :rules="activeSearchRules" class="block-containter">
    <div class="active-search__title">
      活跃度分析
    </div>
    <div class="active-search__client">
      <span>客户端：</span>
      <el-radio-group size="small" v-model="activeObj.clientSelected" @change="query">
        <el-radio v-for="(val, i) in client"  :label="val.value" border size="medium" :key="i">{{val.value}}</el-radio>
      </el-radio-group>
    </div>
  </el-form>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { CLIENT } from '@/config';

export default {
  data() {
    return {
      client: CLIENT,
      localProvinceSelected: [],
      activeSearchRules: {
        clientSelected: [
          { required: true, message: '请选择客户端', trigger: 'change' }
        ]
      }
    };
  },
  computed: {
    ...mapState({
      activeObj: ({ dataAnalysis }) => dataAnalysis.activeObj,
      currentUser: ({ root }) => root.currentUser
    })
  },
  beforeMount() {
    if (this.activeObj.provinceSelected) {
      this.localProvinceSelected = Object.cloneDeep(this.activeObj.provinceSelected);
    }
    this.query();
  },
  methods: {
    redirectDailyLive() {
      const path = `/analysis/daily-live`;
      this.$router.push(path);
    },
    provinceChange(val) {
      const { provinces } = this.currentUser.operator;
      let isExistAll = val.some(val => val === null);
      let provinceNames = provinces.map(val => val.value);

      // 是否点击全部
      let isClickAll = !(isExistAll === this.localProvinceSelected.some(val => val === null));

      // 点击全部
      if (isClickAll) {
        // 子选项未全选
        if (val.length !== provinceNames.length) {
          this.activeObj.provinceSelected = provinceNames;
          this.activeObj.provinceSelected.push(null);
        } else {
          // 子选项已全选
          this.activeObj.provinceSelected = [];
        }
      } else {
        if (!isExistAll && val.length === provinceNames.length) {
          this.activeObj.provinceSelected.push(null);
        } else {
          this.activeObj.provinceSelected = this.activeObj.provinceSelected.filter(val => val !== null);
        }
      }
      this.localProvinceSelected = Object.cloneDeep(this.activeObj.provinceSelected);
    },
    query() {
      const { activeObj } = this;
      // 第一模块
      this.getMembers(activeObj);
      this.getDailyActiveUser(activeObj);
      // 第二模块
      this.getTrendList().then(() => {
        this.getTrendNewMembers();
      });
      // 第三模块
      this.getProvinceUser();
    },
    ...mapActions([
      'getMembers',
      'getDailyActiveUser',
      'getTrendList',
      'getProvinceUser',
      'getTrendNewMembers'
    ])
  }
};
</script>

<style lang="scss">
.active-search__title {
  height: 28px;
  line-height: 28px;
  color: rgba(0, 0, 0, 0.85);
  font-size: 20px;
}
.active-search__title span {
  height: 20px;
  line-height: 20px;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
}
</style>
