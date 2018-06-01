<template>
  <el-menu :default-active="getActiveNav" @select="handleNavSelect">
    <el-menu-item v-for="(item, i) in SIDEBAR_DATA" :key="i" :index="i">
      <i :class="item.icon"></i>
      <span slot="title">{{item.name}}</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
import { SIDEBAR_DATA } from '../config/index.js';
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      SIDEBAR_DATA
    };
  },
  computed: {
    ...mapGetters([
      'getActiveNav'
    ])
  },
  beforeMount() {
    // console.log(this.SIDEBAR_DATA)
  },
  methods: {
    handleNavSelect(index) {
      this.$router.push(this.SIDEBAR_DATA[index].url);
    }
  }
};
</script>

<style>
</style>
