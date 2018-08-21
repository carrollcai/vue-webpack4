<template>
  <el-form ref="activeSearchForm" :model="adduserObj" class="block-containter">
    <div class="adduser-search__title">
      新增用户分析<span>{{`（权限：全国）`}}</span>
    </div>
    <div class="adduser-search-client">
      <span>客户端：</span>
      <el-radio v-for="(val, i) in clients" v-model="adduserObj.clientSelected" :label="val.value" border size="medium" :key="i">{{val.value}}</el-radio>
      <!-- <el-radio v-model="radio8" label="2" border size="medium">备选项2</el-radio> -->
    </div>
  </el-form>
</template>

<script>
/* 新增用户分析只有月维度 */
import { mapState, mapActions } from 'vuex';
import { CLIENT } from '@/config';

export default {
  data() {
    return {
      clients: CLIENT,
    };
  },
  computed: {
    ...mapState({
      adduserObj: ({ dataAnalysis }) => dataAnalysis.adduserObj,
      currentUser: ({ root }) => root.currentUser
    })
  },
  methods: {
    ...mapActions([

    ])
  }
};
</script>

<style lang="scss" scoped>
.adduser-search__title {
  height: 28px;
  line-height: 28px;
  color: rgba(0, 0, 0, 0.85);
  font-size: 20px;
}
.adduser-search__title span {
  height: 20px;
  line-height: 20px;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
}
.adduser-search-client {
  margin-top: 32px;
}
</style>
