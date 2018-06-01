<template>
  <div id="app">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">
          <Aside />
        </el-aside>
        <el-main>
          <Main />
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
</style>
