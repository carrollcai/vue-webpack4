<template>
  <div class="active-search block-containter">
    <div class="active-search__select">
      <div class="active-search__province">
        省份：
        <el-select v-if="province.length" v-model="provinceSelected" placeholder="请选择" multiple @change="channelChange" collapse-tags>
          <el-option v-for="item in province" :key="item.key" :label="item.value" :value="item.key">
          </el-option>
        </el-select>
      </div>
      <div class="active-search__client">
        客户端：
        <el-select v-if="province.length" v-model="provinceSelected" placeholder="请选择" multiple @change="channelChange" collapse-tags>
          <el-option v-for="item in province" :key="item.key" :label="item.value" :value="item.key">
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
// import MultSelect from 'components/MultSelect.vue';
import { mapState } from 'vuex';

export default {
  components: {
    // MultSelect
  },
  data() {
    return {
      provinceSelected: [],
      clientSelected: []
    };
  },
  computed: {
    ...mapState({
      province: ({ root }) => root.province
    })
  },
  beforeMount() {
    console.log(123);
    // this.provinceSelected
  },
  methods: {
    channelChange() {

    },
    query() {
      console.log();
    }
  }
};
</script>

<style>
</style>
