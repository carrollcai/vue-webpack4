<template>
  <div>
    <div class="m-container">
      <div class="breadcrumb">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/system/role/management' }">角色管理</el-breadcrumb-item>
          <el-breadcrumb-item>{{routeType()}}角色</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="m-container role-create">
      <el-form :label-position="'right'" label-width="120px" :model="roleCreate" ref="roleForm" :rules="roleRules">
        <el-form-item label="角色名称：" prop="roleName">
          <el-input class="form-input" v-model="roleCreate.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述：" prop="notes">
          <el-input class="form-input" type="textarea" v-model="roleCreate.notes"></el-input>
        </el-form-item>
        <el-form-item label="菜单权限：" v-if="!Object.isNullArray(permissions)" prop="menuIds">
          <el-select class="form-input" multiple v-model="roleCreate.menuIds" placeholder="选择菜单权限" @change="changeMendIds">
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
import { textLimit, textareaLimit } from '@/utils/rules.js';

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
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { validator: textLimit, trigger: 'blur' }
        ],
        notes: [
          { required: true, message: '请输入角色描述', trigger: 'blur' },
          { validator: textareaLimit, trigger: 'blur' }
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
    routeType() {
      const { type } = this.$route.params;
      return type === 'create' ? '创建' : '修改';
    },
    changeMendIds(val) {
      let arr = [];
      val.map(val => {
        this.permissions.map(cval => {
          let flag = false;
          cval.children && cval.children.map(gval => {
            if (Number(val) === Number(gval.menuId)) {
              flag = true;
            }
          });
          flag && arr.push(cval.menuId);
        });
      });
      return [...new Set(this.roleCreate.menuIds.concat(arr))];
    },
    submitForm() {
      const { type, id } = this.$route.params;
      const params = Object.cloneDeep(this.roleCreate);

      // 菜单选择选择二级之后，将一级的menuId带入
      params.menuIds = this.changeMendIds(params.menuIds);

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
