<template>
  <div class="common-view">
    <el-container class="app-container">
      <el-header class="app-header">
        <Header />
      </el-header>
      <el-container class="app-aside">
        <el-aside width="200px" height="100%">
          <Aside style="height: 100%" />
        </el-aside>
        <el-main class="app-menu">
          <Main style="height: 100%" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Main from './Main.vue';
import Aside from './Aside.vue';
import Header from './Header.vue';
export default {
  name: 'CommonView',
  components: {
    Main,
    Aside,
    Header
  }
};
</script>

<style lang="scss">
@import "scss/index.scss";
@import "scss/variables.scss";
.common-view {
  height: 100vh;
}
.app-container {
  height: 100%;
}
.app-aside {
  height: 100%;
}
.app-header {
  padding: 0 30px;
  height: 60px;
  line-height: 60px;
  background-color: $headerBg;
  z-index: 99;
}
.app-menu {
  height: 100%;
  padding: $blockWidth;
}
</style>
