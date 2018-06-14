<template>
  <div class="common-view" v-loading.fullscreen.lock="pageLoading">
    <el-container class="app-container">
      <el-header class="app-header">
        <Header />
      </el-header>
      <el-container class="app-content">
        <el-aside width="200px" height="100%">
          <Aside style="height: 100%" />
        </el-aside>
        <el-main class="app-menu">
          <!-- style="height: 100%" -->
          <Main />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Main from './Main.vue';
import Aside from './Aside.vue';
import Header from './Header.vue';
import { mapState, mapActions } from 'vuex';
export default {
  name: 'CommonView',
  components: {
    Main,
    Aside,
    Header
  },
  beforeMount() {
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
  height: calc(100% - 60px)
}
.app-header {
  padding: 0 30px;
  height: 60px;
  line-height: 60px;
  background-color: $headerBg;
  /* z-index: 99; */
}
.app-menu {
  height: 100%;
  padding: $blockWidth;
}
</style>
