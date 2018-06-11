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
        <el-form-item label="用户姓名：" prop="name">
          <el-input class="form-input" v-model="userCreate.name"></el-input>
        </el-form-item>
        <el-form-item label="登录账号：" prop="account">
          <el-input class="form-input" v-model="userCreate.account"></el-input>
        </el-form-item>
        <el-form-item label="用户角色：" prop="role">
          <el-select class="form-input" v-model="userCreate.role" multiple>
            <el-option v-for="(item, i) in userRoleList" :key="i" :value="item.key" :label="item.name" />
          </el-select>
        </el-form-item>
        <el-form-item label="省份权限：" prop="province">
          <el-select v-if="Object.isExistArray(province)" class="form-input" v-model="userCreate.province" placeholder="请选择" multiple>
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
import { mapState, mapActions } from 'vuex';
export default {
  data() {
    return {
      userCreateRules: {
        name: [
          { required: true, message: '请输入用户姓名', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '请输入登录账号', trigger: 'blur' }
        ],
        role: [
          { required: true, message: '请输入用户角色', trigger: 'change' }
        ],
        province: [
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
  methods: {
    submitForm() {
      const params = this.createUser;
      this.$refs['userForm'].validate(valid => {
        if (valid) {
          this.createUser(params);
        }
      });
    },
    ...mapActions([
      'createUser'
    ])
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
