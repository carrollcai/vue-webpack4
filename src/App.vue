<template>
  <div id="app" class="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Main from './views/Main.vue';
import Aside from './views/Aside.vue';
import Header from './views/Header.vue';
import { mapActions, mapState } from 'vuex';
export default {
  name: 'App',
  components: {
    Main,
    Aside,
    Header
  },
  computed: {
    ...mapState({
      currentRoute: ({ root }) => root.currentRoute
    })
  },
  beforeMount() {
    this.getProvince();
    this.getUserRole();
    this.getClient();
  },
  methods: {
    changeRoute(obj) {
      this.$router.push(obj.path);
    },
    ...mapActions([
      'getProvince',
      'getUserRole',
      'getClient'
    ])
  },
  watch: {
    currentRoute: 'changeRoute'
  }
};
</script>

<style lang="scss">
@import "scss/reset.scss";
@import "scss/index.scss";
@import "scss/views/active.scss";
@import "scss/views/retention.scss";
.app {
  height: 100vh;
}
</style>
