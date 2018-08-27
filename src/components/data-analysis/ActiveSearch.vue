<template>
  <el-form ref="activeSearchForm" :model="activeObj" :rules="activeSearchRules" class="block-containter">
    <div class="active-search__title">
      活跃度分析
    </div>
    <div class="active-search__client">
      <div>
        <span>客户端：</span>
        <el-radio-group size="small" v-model="activeObj.clientSelected" @change="query">
          <el-radio v-for="(val, i) in client"  :label="val.value" border size="medium" :key="i">{{val.value}}</el-radio>
        </el-radio-group>
      </div>
      <div class="temporary-module">
        "球球"新增活跃用户下载<i class="icon-downloan"></i>
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
      client: CLIENT,
      activeSearchRules: {
        clientSelected: [
          { required: true, message: '请选择客户端', trigger: 'change' }
        ]
      }
    };
  },
  computed: {
    ...mapState({
      activeObj: ({ dataAnalysis }) => dataAnalysis.activeObj
    })
  },
  methods: {
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
.temporary-module {
  justify-self: flex-end;
}
</style>
