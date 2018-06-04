<template>
  <div id="app" class="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  }
};
</script>

<style lang="scss">
@import "scss/index.scss";
@import "scss/variables.scss";
.app {
  height: 100vh;
}
</style>
