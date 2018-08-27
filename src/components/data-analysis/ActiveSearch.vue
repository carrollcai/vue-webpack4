<template>
  <el-form ref="activeSearchForm"
    :model="activeObj"
    :rules="activeSearchRules"
    class="block-containter">
    <div class="active-search__title">
      活跃度分析
    </div>
    <div class="active-search__client">
      <div>
        <span>客户端：</span>
        <el-radio-group size="small"
          v-model="activeObj.clientSelected"
          @change="query">
          <el-radio v-for="(val, i) in client"
            :label="val.value"
            border
            size="medium"
            :key="i">{{val.value}}</el-radio>
        </el-radio-group>
      </div>
      <div class="temporary-module">
        <el-popover v-model="dialogVisible"
          placement="bottom-end"
          width="400"
          trigger="click"
          @show="resetOrganizeInfo">
          <el-form class="temporary-module-form"
            ref="organizeNameInfo"
            :rules="organizeNameInfoRules"
            :model="organizeNameInfo">
            <el-form-item class="form-query-input-width temporary-module-first-input"
              prop="provinceSelected">
              <el-select class="user-form-item__input"
                v-if="currentUser.operator.provinces.length"
                v-model="eventObj.provinceSelected"
                placeholder="选择省份"
                multiple
                @change="provinceChange"
                collapse-tags>
                <el-option v-if="currentUser.operator.provinces.length > 1"
                  :key="null"
                  label="全部"
                  :value="null" />
                <el-option v-for="item in currentUser.operator.provinces"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item class="form-query-input-width">
              <el-date-picker type="daterange"
                placeholder="选择日期"
                v-model="eventObj.date"
                :editable="false" />
            </el-form-item>
            <el-form-item class="form-query-input-width"
              prop="organizeName">
              <el-button type="primary"
                class="form-query-input-width"
                @click="eventDownload()">立即下载</el-button>
            </el-form-item>
          </el-form>
          <span slot="reference">"球球"新增活跃用户下载
            <i class="icon-downloan"></i>
          </span>
        </el-popover>
      </div>
    </div>
  </el-form>
</template>

<script>
import { mapState } from 'vuex';
import { CLIENT } from '@/config';

export default {
  data() {
    return {
      dialogVisible: false,
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
      eventObj: ({ dataAnalysis }) => dataAnalysis.eventObj,
      currentUser: ({ root }) => root.currentUser
    })
  },
  beforeMount() {
    if (this.activeObj.provinceSelected) {
      this.localProvinceSelected = Object.cloneDeep(this.activeObj.provinceSelected);
    }
  },
  methods: {
    eventDownload() {

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
          this.eventObj.provinceSelected = provinceNames;
          this.eventObj.provinceSelected.push(null);
        } else {
          // 子选项已全选
          this.eventObj.provinceSelected = [];
        }
      } else {
        if (!isExistAll && val.length === provinceNames.length) {
          this.eventObj.provinceSelected.push(null);
        } else {
          this.eventObj.provinceSelected = this.eventObj.provinceSelected.filter(val => val !== null);
        }
      }
      this.localProvinceSelected = Object.cloneDeep(this.eventObj.provinceSelected);
    },
    query() {
      this.$emit('query');
    }
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
.temporary-module-first-input {
  margin-top: 16px;
}
</style>
