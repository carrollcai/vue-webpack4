<template>
  <div class="common-view" v-loading.fullscreen.lock="pageLoading">
    <el-container class="app-container">
      <el-header class="app-header">
        <Header />
      </el-header>
      <el-container class="app-content">
        <!-- <el-aside width="200px" height="100%">
          <Aside style="height: 100%" />
        </el-aside> -->
        <aside class="app-aside">
          <el-scrollbar class="app-aside-scroll">
            <div class="">

              <Aside style="height: 100%" />
            </div>
          </el-scrollbar>
        </aside>
        <main class="app-main">
          <el-scrollbar class="app-menu">
            <div class="app-main-content">
              <router-view />
            </div>
          </el-scrollbar>
        </main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from './Aside.vue';
import Header from './Header.vue';
import { mapState, mapActions } from 'vuex';
export default {
  name: 'Container',
  components: {
    Aside,
    Header
  },
  beforeMount() {
    this.getCurrentUserInfo({});
    this.getProvince();
    this.getUserRole({});
  },
  computed: {
    ...mapState({
      pageLoading: ({ root }) => root.pageLoading
    })
  },
  methods: {
    ...mapActions([
      'getCurrentUserInfo',
      'getProvince',
      'getUserRole'
    ])
  }
};
</script>

<style lang="scss">
@import "scss/variables.scss";

.common-view {
  height: 100vh;
}
.app-container {
  height: 100%;
}
.app-content {
  // 这里需要注意，中间的加减运算必须含有空格
  height: calc(100% - 60px);
  position: relative;
}
.app-header {
  padding: 0 30px;
  height: 60px;
  line-height: 60px;
  background-color: $headerBg;
}
.app-aside-scroll {
  height: 100%;
}
.app-aside {
  background-color: #fff;
  width: 200px;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
}
.app-menu {
  width: 100%;
  height: 100%;
}
.app-main {
  padding-left: 200px;
  width: calc(100% - 200px);
}
.app-main-content {
  padding: $blockWidth;
}
</style>
