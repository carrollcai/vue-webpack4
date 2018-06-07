<template>
  <div class="active-search block-containter">
    <div class="active-search__select">
      <div class="active-search__province">
        省份：
        <el-select v-if="province.length" v-model="retentionObj.provinceSelected" placeholder="请选择" multiple @change="provinceChange" collapse-tags>
          <el-option v-for="item in province" :key="item.key" :label="item.value" :value="item.key">
          </el-option>
        </el-select>
      </div>
      <div class="active-search__client">
        客户端：
        <el-select v-if="client.length" v-model="retentionObj.clientSelected" placeholder="请选择" multiple @change="clientChange" collapse-tags>
          <el-option v-for="item in client" :key="item.key" :label="item.value" :value="item.key">
          </el-option>
        </el-select>
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
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      provinceSelected: [],
      clientSelected: []
    };
  },
  computed: {
    ...mapState({
      province: ({ root }) => root.province,
      retentionObj: ({ dataAnalysis }) => dataAnalysis.retentionObj,
      client: ({ dataAnalysis }) => dataAnalysis.client
    })
  },
  beforeMount() {
    // this.provinceSelected
  },
  methods: {
    provinceChange() {

    },
    clientChange() {

    },
    query() {
      const { retentionObj } = this;
      this.queryActiveForm(retentionObj);
    },
    ...mapActions([
      'queryActiveForm'
    ])
  }
};
</script>
