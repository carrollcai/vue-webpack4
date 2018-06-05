<template>
  <div>
    <div class="m-container">
      <div class="breadcrumb">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/system/role/management' }">角色管理</el-breadcrumb-item>
          <el-breadcrumb-item>创建角色</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="m-container role-create">
      <el-form :label-position="'right'" label-width="120px" :model="roleCreate" ref="roleForm">
        <el-form-item label="角色名称：">
          <el-input style="width: 468px;" v-model="roleCreate.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述：">
          <el-input style="width: 468px;" v-model="roleCreate.desc"></el-input>
        </el-form-item>
        <el-form-item label="菜单权限：">
          <el-input style="width: 468px;" v-model="roleCreate.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">提交</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
  computed: {
    ...mapState({
      roleCreate: ({ system }) => system.roleCreate
    })
  },
  beforeMount() {
    this.resetForm();
  },
  methods: {
    submitForm() {
      
    },
    resetForm() {
      const { type } = this.$route.params;
      // console.log(type);
      if (type === 'create') {
        this.initForm();
      } else {
        this.getRoleInfo();
      }
    },
    ...mapActions([
      'getRoleInfo'
    ]),
    ...mapMutations({
      initForm: 'ROLE_INIT_FORM'
    })
  },
  watch: {
    $route: 'resetForm'
  }
};
</script>

<style lang="scss">
@import "scss/variables.scss";
.role-create {
  margin-top: $blockWidth;
  display: flex;
  justify-content: center;
}
</style>
