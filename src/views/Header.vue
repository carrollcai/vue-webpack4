<template>
  <div>
    <div class="header-title">
      销售管理平台
    </div>
    <div class="header-func">
      <!-- <div>
        <i class="el-icon-bell"></i>
      </div>
      <div class="header-func__split">|</div> -->
      <el-menu mode="horizontal" :default-active="'1'" background-color="#292c31" text-color="#fff">
        <el-submenu :index="'1'">
          <template slot="title">
            <i class="el-icon-service"></i>{{currentUser.operator.staffName}}
          </template>
          <el-menu-item index="2-1" @click="handleResetPwd">修改密码</el-menu-item>
          <el-menu-item index="2-2" @click="handleLogout">退出</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <reset-pwd v-if="resetPwdVisible" ref="resetPwd"></reset-pwd>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import ResetPwd from '@/views/common/ResetPwd.vue';
export default {
  name: 'TheHeader',
  components: {
    ResetPwd
  },
  data() {
    return {
      resetPwdVisible: false
    };
  },
  computed: {
    ...mapState({
      currentUser: ({ root }) => root.currentUser
    })
  },
  methods: {
    handleResetPwd() {
      this.resetPwdVisible = true;
      this.$nextTick(() => {
        this.$refs.resetPwd.init();
      });
    },

    handleLogout() {
      this.logout({});
    },
    ...mapActions(['logout'])
  }
};
</script>

<style lang="scss">
@import "scss/variables.scss";
.header-title {
  padding-left: 0;
  font-size: 18px;
  float: left;
  height: 100%;
  color: #fff;
}
.header-func {
  float: right;
  display: flex;
  color: #fff;
}
.header-func__split {
  margin: 0 16px;
}

</style>
