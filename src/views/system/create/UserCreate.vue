<template>
  <div>
    <div class="m-container">
      <div class="breadcrumb">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/system/user/management' }">用户管理</el-breadcrumb-item>
          <el-breadcrumb-item>{{routeType()}}用户</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="m-container user-create">
      <el-form :label-position="'right'"
        label-width="120px"
        :model="userCreate"
        ref="userForm"
        :rules="userCreateRules">
        <el-form-item label="用户姓名："
          prop="staffName">
          <el-input class="form-input-large"
            v-model="userCreate.staffName"
            maxlength="6"></el-input>
        </el-form-item>
        <el-form-item label="登录账号："
          prop="code">
          <el-input :maxlength="15"
            class="form-input-large"
            v-model="userCreate.code"></el-input>
        </el-form-item>
        <el-form-item label="手机号码："
          prop="mobile">
          <el-input :maxlength="11"
            class="form-input-large"
            v-model="userCreate.mobile"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱："
          prop="email">
          <el-input class="form-input-large"
            v-model="userCreate.email"></el-input>
        </el-form-item>

        <el-form-item label="用户归属："
          prop="opRegion">
          <el-cascader class="form-input-large"
            expand-trigger="hover"
            :options="regionRelationList"
            v-model="userCreate.opRegion"
            placeholder="用户归属">
          </el-cascader>
        </el-form-item>

        <el-form-item label="用户角色："
          prop="roleId">
          <el-select class="form-input-large"
            v-model="userCreate.roleId"
            multiple>
            <el-option v-for="(item, i) in userRoleList"
              :key="i"
              :value="item.roleId"
              :label="item.roleName" />
          </el-select>
        </el-form-item>
        <el-form-item label="省份权限："
          prop="provinces">
          <select-all placeholder="省份选择"
            class="form-input-large"
            v-if="Object.isExistArray(province)"
            :list="province"
            collapse-tags
            v-model="userCreate.provinces" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary"
            @click="submitForm()">提交</el-button>
          <form-cancel :path="'/system/user/management'">取消</form-cancel>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { checkPhone, emailCheck, textLimit } from '@/utils/rules.js';
import SelectAll from 'components/SelectAll.vue';

export default {
  components: {
    SelectAll
  },
  data() {
    return {
      userCreateRules: {
        staffName: [
          { required: true, message: '请输入用户姓名', trigger: 'blur' },
          { validator: textLimit, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入登录账号', trigger: 'blur' },
          { validator: textLimit, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ],
        email: [
          // { required: true, message: '请输入电子邮箱', trigger: 'blur' },
          { validator: emailCheck, trigger: 'blur' }
        ],
        roleId: [
          { required: true, message: '请输入用户角色', trigger: 'change' }
        ],
        opRegion: [
          { required: true, message: '请输入用户归属', trigger: 'change' }
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
      regionRelationList: ({ system }) => system.regionRelationList,
      province: ({ root }) => root.province
    })
  },
  async beforeMount() {
    !this.regionRelationList.length && await this.queryRegionRelationList({});
    await this.resetForm();
  },
  methods: {
    routeType() {
      const { type } = this.$route.params;
      return type === 'create' ? '创建' : '修改';
    },
    resetForm() {
      const { type, id } = this.$route.params;
      // 需要重新获取角色。
      this.getUserRole({});
      if (type === 'create') {
        this.initForm();
      } else {
        this.getUserInfo({ operatorId: id });
      }
    },
    submitForm() {
      const { type, id } = this.$route.params;
      const params = Object.cloneDeep(this.userCreate);

      params.provinces = params.provinces.filter(val => val !== null);
      params.opRegion = params.opRegion.pop();

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
      'getUserInfo',
      'getUserRole',
      'queryRegionRelationList'
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
</style>
