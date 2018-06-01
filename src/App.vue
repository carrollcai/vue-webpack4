<template>
  <div id="app" class="app">
    <el-container class="app-container">
      <el-header>Header</el-header>
      <el-container class="app-aside">
        <el-aside width="200px" height="100%">
          <Aside style="height: 100%" />
        </el-aside>
        <el-main height="100%">
          <Main style="height: 100%" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Main from './views/Main.vue';
import Aside from './views/Aside.vue';
export default {
  name: 'App',
  components: {
    Main,
    Aside
  }
};
</script>

<style lang="scss">
@import "scss/index.scss";
.app {
  height: 100vh;
}
.app-container {
  height: 100%;
}
.app-aside {
  height: 100%;
}
</style>
