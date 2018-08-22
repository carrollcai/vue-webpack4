<template>
  <el-form ref="activeSearchForm" :model="retentionObj" :rules="retSearchRules" class="active-search block-containter">
    <div class="active-search__select">
      <!-- <div class="active-search__province">
        <el-form-item class="normalize-form-item">省份：</el-form-item>
        <el-form-item class="normalize-form-item" prop="provinceSelected">
          <el-select class="user-form-item__input" v-if="currentUser.operator.provinces.length" v-model="retentionObj.provinceSelected" placeholder="请选择" multiple @change="provinceChange" collapse-tags>
            <el-option v-if="currentUser.operator.provinces.length > 1" :key="null" label="全部" :value="null" />
            <el-option v-for="item in currentUser.operator.provinces" :key="item.value" :label="item.value" :value="item.value" />
          </el-select>
        </el-form-item>
      </div> -->
      <div class="active-search__client">
        <el-form-item class="normalize-form-item">客户端：</el-form-item>
        <el-form-item class="normalize-form-item" prop="clientSelected">
          <el-select class="user-form-item__input" v-if="client.length" v-model="retentionObj.clientSelected" placeholder="请选择">
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
    </div>
  </el-form>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { CLIENT } from '@/config';

export default {
  props: {
    isWholeCountry: {
      type: Boolean,
      default: false
    },
    isProvince: {
      type: Boolean,
      default: false
    },
    isDistrict: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      client: CLIENT,
      localProvinceSelected: [],
      retSearchRules: {
        provinceSelected: [],
        clientSelected: [
          { required: true, message: '请选择客户端', trigger: 'change' }
        ]
      }
    };
  },
  computed: {
    ...mapState({
      retentionObj: ({ dataAnalysis }) => dataAnalysis.retentionObj,
      currentUser: ({ root }) => root.currentUser,
      retTrend: ({ dataAnalysis }) => dataAnalysis.retTrend,
    })
  },
  beforeMount() {
    if (this.retentionObj.provinceSelected) {
      this.localProvinceSelected = Object.cloneDeep(this.retentionObj.provinceSelected);
    }
    this.query();
  },
  methods: {
    provinceChange(val) {
      const { provinces } = this.currentUser.operator;
      let isSelectedAll = val.some(val => val === null);
      let provinceNames = provinces.map(val => val.value);

      // 是否点击全部
      let isClickAll = !(this.localProvinceSelected.some(val => val === null) === isSelectedAll);

      // 选择全部，且子选项未全选
      if (isClickAll) {
        if (val.length !== provinceNames.length) {
          this.retentionObj.provinceSelected = provinceNames;
          this.retentionObj.provinceSelected.push(null);
        } else {
          this.retentionObj.provinceSelected = [];
        }
      } else {
        if (!isSelectedAll && val.length === provinceNames.length) {
          this.retentionObj.provinceSelected.push(null);
        } else {
          this.retentionObj.provinceSelected = this.retentionObj.provinceSelected.filter(val => val !== null);
        }
      }
      this.localProvinceSelected = Object.cloneDeep(this.retentionObj.provinceSelected);
    },
    query() {
      this.getRetentionLossUser();
      this.$emit('query');
    },
    ...mapActions([
      'getRetentionLossUser',
      'getRetTrendList'
    ])
  }
};
</script>
