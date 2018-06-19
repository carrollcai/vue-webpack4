<template>
  <el-form ref="activeSearchForm" :model="activeObj" :rules="activeSearchRules" class="active-search block-containter">
    <div class="active-search__select">
      <div class="active-search__province">
        <el-form-item class="normalize-form-item">省份：</el-form-item>
        <el-form-item class="normalize-form-item" prop="provinceSelected">
          <el-select v-if="currentUser.operator.provinces.length" v-model="activeObj.provinceSelected" placeholder="请选择" multiple @change="provinceChange" collapse-tags>
            <el-option v-if="currentUser.operator.provinces.length > 1" :key="null" label="全部" :value="null" />
            <el-option v-for="item in currentUser.operator.provinces" :key="item.value" :label="item.value" :value="item.value" />
          </el-select>
        </el-form-item>
      </div>
      <div class="active-search__client">
        <el-form-item class="normalize-form-item">客户端：</el-form-item>
        <el-form-item class="normalize-form-item" prop="clientSelected">
          <el-select v-if="client.length" v-model="activeObj.clientSelected" placeholder="请选择">
            <el-option v-for="item in client" :key="item.value" :label="item.value" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
    </div>
    <div class="province-operate">
      <div class="search-btn">
        <el-button type="primary" @click="query">查询</el-button>
      </div>
      <div class="daliy-download">
        <i class="el-icon-download">申请日活明细下载</i>
      </div>
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
        provinceSelected: [
          // { required: true, message: '请选择省份', trigger: 'change' }
        ],
        clientSelected: [
          { required: true, message: '请选择客户端', trigger: 'change' }
        ]
      }
    };
  },
  computed: {
    ...mapState({
      // province: ({ root }) => root.province,
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
    provinceChange(val) {
      debugger;
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

<style>
</style>
