<template>
  <div id="app" class="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'App',
  computed: {
    ...mapState({
      currentRoute: ({ root }) => root.currentRoute
    })
  },
  methods: {
    changeRoute(obj) {
      this.$router.push(obj.path);
    }
  },
  watch: {
    currentRoute: 'changeRoute'
  }
};
</script>

<style lang="scss">
@import "scss/element-variables.scss";
@import "scss/reset.scss";
@import "scss/index.scss";
@import "scss/views/active.scss";
@import "scss/views/product.scss";
@import "scss/views/retention.scss";
@import "scss/views/page-error.scss";
@import "scss/views/task.scss";
@import "scss/views/order.scss";

.app {
  height: 100vh;
}
</style>
