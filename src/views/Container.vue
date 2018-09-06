<template>
  <div class="common-view"
    v-loading.fullscreen.lock="pageLoading">
    <el-container class="app-container">
      <el-header class="app-header">
        <con-header />
      </el-header>
      <el-container v-if="currentUser.menuList.length"
        class="app-content">
        <div class="app-aside">
          <el-scrollbar class="app-aside-scroll">
            <con-aside style="height: 100%" />
          </el-scrollbar>
        </div>
        <div class="app-main">
          <el-scrollbar class="app-menu">
            <div class="app-main-content">
              <router-view />
            </div>
          </el-scrollbar>
        </div>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import ConAside from './Aside.vue';
import ConHeader from './Header.vue';
import { mapState, mapActions, mapMutations } from 'vuex';
export default {
  name: 'Container',
  components: {
    ConAside,
    ConHeader
  },
  beforeMount() {
    this.getUserRole({});
  },
  computed: {
    ...mapState({
      currentUser: ({ root }) => root.currentUser,
      pageLoading: ({ root }) => root.pageLoading
    })
  },
  methods: {
    ...mapActions([
      'getCurrentUserInfo',
      'getProvince',
      'getUserRole'
    ]),
    ...mapMutations({
      _addRoutes: 'ADD_ROUTES'
    })
  },
  beforeDestroy() {
    // 退出登录之后需要重置store里的state，可以用一个resetState的方法，初始化state，现在先用reload方法代替。
    window.location.reload();
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
