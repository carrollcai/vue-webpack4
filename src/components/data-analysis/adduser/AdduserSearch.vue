<template>
  <el-form ref="activeSearchForm" :model="addUserObj" class="block-containter">
    <div class="adduser-search__title">
      新增用户分析
    </div>
    <div class="adduser-search-client">
      <span>客户端：</span>
      <el-radio-group size="small" v-model="addUserObj.clientSelected" @change="handleChange">
        <el-radio v-for="(val, i) in clients"  :label="val.value" border size="medium" :key="i">{{val.value}}</el-radio>
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
      clients: CLIENT,
    };
  },
  computed: {
    ...mapState({
      addUserObj: ({ dataAnalysis }) => dataAnalysis.adduserObj,
      currentUser: ({ root }) => root.currentUser
    })
  },
  methods: {
    ...mapActions([

    ]),
    handleChange() {
      this.$emit('query');
    }
  }
};
</script>

<style lang="less" scoped>
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
