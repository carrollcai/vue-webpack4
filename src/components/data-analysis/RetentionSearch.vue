<template>
  <el-form ref="activeSearchForm"
    :model="retentionObj"
    :rules="retSearchRules"
    class="block-containter">
    <div class="active-search__title">
      留存流失分析
    </div>
    <div class="active-search__client">
      <div>
        <span>客户端：</span>
        <el-radio-group size="small"
          v-model="retentionObj.clientSelected"
          @change="query">
          <el-radio v-for="(val, i) in client"
            :label="val.value"
            border
            size="medium"
            :key="i">{{val.value}}</el-radio>
        </el-radio-group>
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
    query() {
      this.$emit('query');
    },
    ...mapActions([
      'getRetTrendList'
    ])
  }
};
</script>
