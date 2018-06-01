<template>
  <el-menu :default-active="$route.path" :router="true">
    <div v-for="(item, i) in SIDEBAR_DATA" :key="i">
      <el-menu-item v-if="!item.children" :index="item.url">
        <i :class="item.icon"></i>
        <span slot="title">{{item.name}}</span>
      </el-menu-item>
      <el-submenu v-else  :index="i">
        <template slot="title">
          <i :class="item.icon"></i>
          <span slot="title">{{item.name}}</span>
        </template>
        <el-menu-item v-for="(subItem, subI) in item.children" :key="subI" :index="subItem.url">
          {{subItem.name}}
        </el-menu-item>
      </el-submenu>
    </div>
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
    console.log(this.$route.path);
  },
  methods: {
  }
};
</script>

<style>
</style>
