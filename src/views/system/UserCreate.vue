<template>
  <div>
    <div class="m-container">
      <div class="breadcrumb">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/system/user/management' }">用户管理</el-breadcrumb-item>
          <el-breadcrumb-item>创建用户</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="m-container user-create">
      <el-form :label-position="'right'" label-width="120px" :model="userCreate" ref="userForm" :rules="userCreateRules">
        <el-form-item label="用户姓名：" prop="staffName">
          <el-input class="form-input" v-model="userCreate.staffName"></el-input>
        </el-form-item>
        <el-form-item label="登录账号：" prop="code">
          <el-input class="form-input" v-model="userCreate.code"></el-input>
        </el-form-item>
        <el-form-item label="用户角色：" prop="roleId">
          <el-select class="form-input" v-model="userCreate.roleId" multiple>
            <el-option v-for="(item, i) in userRoleList" :key="i" :value="item.roleId" :label="item.roleName" />
          </el-select>
        </el-form-item>
        <!-- 省份这里需要做key的处理 -->
        <el-form-item label="省份权限：" prop="province">
          <el-select v-if="Object.isExistArray(province)" class="form-input" v-model="userCreate.provinces" placeholder="请选择" multiple>
            <el-option v-for="item in province" :key="item.key" :label="item.value" :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm()">提交</el-button>
          <form-cancel :path="'/system/user/management'">取消</form-cancel>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
  data() {
    return {
      userCreateRules: {
        staffName: [
          { required: true, message: '请输入用户姓名', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入登录账号', trigger: 'blur' }
        ],
        roleId: [
          { required: true, message: '请输入用户角色', trigger: 'change' }
        ],
        provinces: [
          { required: true, message: '请输入省份权限', trigger: 'change' }
        ]
      }
    };
  },
  computed: {
    ...mapState({
      userCreate: ({ system }) => system.userCreate,
      userRoleList: ({ root }) => root.userRoleList,
      province: ({ root }) => root.province
    })
  },
  beforeMount() {
    this.resetForm();
  },
  methods: {
    resetForm() {
      const { type, id } = this.$route.params;
      if (type === 'create') {
        this.initForm();
      } else {
        this.getUserInfo({ operatorId: id });
      }
    },
    submitForm() {
      const { type, id } = this.$route.params;
      const params = this.userCreate;
      this.$refs['userForm'].validate(valid => {
        if (!valid) return false;

        if (type === 'create') {
          this.createUser(params);
        } else {
          this.updateUser(Object.assign(params, {
            operatorId: id
          }));
        }
      });
    },
    ...mapMutations({
      initForm: 'USER_INIT_FORM'
    }),
    ...mapActions([
      'createUser',
      'updateUser',
      'getUserInfo'
    ])
  },
  watch: {
    $route: 'resetForm'
  }
};
</script>

<style lang="scss">
@import "scss/variables.scss";
.user-create {
  margin-top: $blockWidth;
  display: flex;
  justify-content: center;
}
.form-input {
  width: 468px;
}
</style>
