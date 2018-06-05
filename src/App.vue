<template>
  <div id="app" class="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Main from './views/Main.vue';
import Aside from './views/Aside.vue';
import Header from './views/Header.vue';
import { mapActions } from 'vuex';
export default {
  name: 'App',
  components: {
    Main,
    Aside,
    Header
  },
  beforeMount() {
    this.getProvince();
  },
  methods: {
    ...mapActions([
      'getProvince'
    ])
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
