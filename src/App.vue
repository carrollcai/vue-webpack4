<template>
  <div id="app"
    class="app">
    <router-view></router-view>
  </div>
</template>

<script>import { mapState } from 'vuex';
export default {
  name: 'App',
  computed: {
    ...mapState({
      currentRoute: ({
        root
      }
      ) => root.currentRoute
    }
    )
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

<style lang="less">
@import "~scss/element-variables.less";
@import "~scss/reset.less";
@import "~scss/index.less";
@import "~scss/views/active.less";
@import "~scss/views/product.less";
@import "~scss/views/retention.less";
@import "~scss/views/page-error.less";
@import "~scss/views/task.less";
@import "~scss/views/order.less";
.app {
  height: 100vh;
}
</style>