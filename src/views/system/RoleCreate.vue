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
      <el-form :label-position="'right'" label-width="120px" :model="roleCreate" ref="roleForm" :rules="roleRules">
        <el-form-item label="角色名称：" prop="roleName">
          <el-input class="form-input" v-model="roleCreate.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述：" prop="desc">
          <el-input class="form-input" type="textarea" v-model="roleCreate.notes"></el-input>
        </el-form-item>
        <el-form-item label="菜单权限：" v-if="!Object.isNullArray(permissions)" prop="menuIds">
          <el-select class="form-input" multiple v-model="roleCreate.menuIds" placeholder="选择菜单权限">
            <div v-for="group in permissions" :key="group.menuId">
              <el-option-group v-if="group.children" :label="group.name">
                <el-option v-for="item in group.children" :key="item.menuId" :label="item.name" :value="item.menuId"></el-option>
              </el-option-group>

              <el-option v-else :key="group.menuId" :label="group.name" :value="group.menuId"></el-option>
            </div>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">提交</el-button>
          <form-cancel :path="'/system/role/management'">取消</form-cancel>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { MENU_PERMISSIONS } from '@/config';

export default {
  computed: {
    ...mapState({
      roleCreate: ({ system }) => system.roleCreate
    })
  },
  data() {
    return {
      permissions: MENU_PERMISSIONS,
      roleRules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        notes: [
          { required: true, message: '请输入角色描述', trigger: 'blur' }
        ],
        menuIds: [
          { required: true, message: '请输入菜单权限', trigger: 'change' }
        ]
      }
    };
  },
  beforeMount() {
    this.resetForm();

    // Object.isNullArray(this.permissions) && this.getPermissions();
  },
  methods: {
    submitForm() {
      const { type, id } = this.$route.params;
      const params = this.roleCreate;
      this.$refs['roleForm'].validate(valid => {
        if (!valid) return false;

        if (type === 'create') {
          this.createRole(params);
        } else {
          this.updateRole(Object.assign(params, {
            roleId: id
          }));
        }
      });
    },
    resetForm() {
      const { type, id } = this.$route.params;
      if (type === 'create') {
        this.initForm();
      } else {
        this.getRoleInfo({ roleId: id });
      }
    },
    ...mapActions([
      'getRoleInfo',
      'createRole',
      'updateRole',
      'getPermissions'
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
.form-input {
  width: 468px;
}
</style>
