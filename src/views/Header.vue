<template>
  <div>
    <div class="header-title">
      销售管理平台
    </div>
    <div class="header-func">
      <div>
        <i class="el-icon-bell"></i>
      </div>
      <div class="header-func__split">|</div>
      <el-menu mode="horizontal" :default-active="'1'" background-color="#292c31" text-color="#fff">
        <el-submenu :index="'1'">
          <template slot="title">
            <i class="el-icon-service"></i>用户名
          </template>
          <el-menu-item index="2-1" @click="readUserInfo">个人资料</el-menu-item>
          <el-menu-item index="2-2" @click="logout">退出</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    readUserInfo() {

    },
    logout() {

    }
  }
};
</script>

<style lang="scss" scoped>
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
