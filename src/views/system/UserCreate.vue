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
      <el-form :label-position="'right'" label-width="120px" :model="userCreate" ref="userForm" :rules="userCreateRules">
        <el-form-item label="用户姓名：" prop="staffName">
          <el-input class="form-input-large" v-model="userCreate.staffName"></el-input>
        </el-form-item>
        <el-form-item label="登录账号：" prop="code">
          <el-input class="form-input-large" v-model="userCreate.code"></el-input>
        </el-form-item>
        <el-form-item label="手机号码：" prop="mobile">
          <el-input class="form-input-large" v-model="userCreate.mobile"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱：" prop="email">
          <el-input class="form-input-large" v-model="userCreate.email"></el-input>
        </el-form-item>

        <el-form-item label="用户归属：" prop="opRegion">
          <el-cascader class="form-input-large" expand-trigger="hover" :options="regionRelationList" v-model="userCreate.opRegion" placeholder="用户归属">
          </el-cascader>
        </el-form-item>

        <el-form-item label="用户角色：" prop="roleId">
          <el-select class="form-input-large" v-model="userCreate.roleId" multiple>
            <el-option v-for="(item, i) in userRoleList" :key="i" :value="item.roleId" :label="item.roleName" />
          </el-select>
        </el-form-item>
        <!-- 省份这里需要做key的处理 -->
        <!-- 指定key为null或者0，会报错。选择 collapse-tags就没问题。解决方式改为null字符串 -->
        <el-form-item label="省份权限：" prop="provinces">
          <el-select v-if="Object.isExistArray(province)" class="form-input-large" v-model="userCreate.provinces" placeholder="请选择" multiple @change="provinceChange">
            <el-option v-if="province.length > 1" :key="'null'" label="全部" :value="'null'" />
            <el-option v-for="(item, i) in province" :key="i" :label="item.value" :value="item.key" />
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
import { textLimit, checkPhone, emailCheck } from '@/utils/rules.js';

export default {
  data() {
    return {
      localProvinceSelected: [],
      userCreateRules: {
        staffName: [
          { required: true, message: '请输入用户姓名', trigger: 'blur' },
          { validator: textLimit, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入登录账号', trigger: 'blur' },
          { max: 20, message: '登录账号不能超过20个字符', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入电子邮箱', trigger: 'blur' },
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
  beforeMount() {
    !this.regionRelationList.length && this.queryRegionRelationList({});
    this.resetForm();
  },
  methods: {
    routeType() {
      const { type } = this.$route.params;
      return type === 'create' ? '创建' : '修改';
    },
    provinceChange(val) {
      const { province } = this;
      let isExistAll = val.some(val => val === 'null');
      let provinceNames = province.map(val => val.key);

      // 是否点击全部
      let isClickAll = !(isExistAll === this.localProvinceSelected.some(val => val === 'null'));

      // 点击全部
      if (isClickAll) {
        // 子选项未全选
        if (isExistAll) {
          this.userCreate.provinces = provinceNames;
          this.userCreate.provinces.push('null');
        } else {
          // 子选项已全选
          this.userCreate.provinces = [];
        }
      } else {
        if (!isExistAll && val.length === provinceNames.length) {
          this.userCreate.provinces.push('null');
        } else {
          this.userCreate.provinces = this.userCreate.provinces.filter(val => val !== 'null');
        }
      }
      this.localProvinceSelected = Object.cloneDeep(this.userCreate.provinces);
    },
    resetForm() {
      const { type, id } = this.$route.params;
      // 需要重新获取角色。
      this.getUserRole({});
      if (type === 'create') {
        this.initForm();
      } else {
        this.getUserInfo({ operatorId: id }).then(() => {
          // 重新赋值本地数据
          if (this.userCreate.provinces) {
            this.localProvinceSelected = Object.cloneDeep(this.userCreate.provinces);
          }
        });
      }
    },
    submitForm() {
      const { type, id } = this.$route.params;
      const params = Object.cloneDeep(this.userCreate);

      params.provinces = params.provinces.filter(val => val !== 'null');
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
