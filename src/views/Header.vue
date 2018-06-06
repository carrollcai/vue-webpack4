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
            <i class="el-icon-service"></i>{{username}}
          </template>
          <el-menu-item index="2-1" @click="readUserInfo">修改密码</el-menu-item>
          <el-menu-item index="2-2" @click="handleLogout">退出</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <el-dialog title="修改密码"
      :visible.sync="dialogFormVisible"
      class="reset-pwd-dialog"
      :show-close="false"
      :center="true"
      @close="handleClose"
      width="470px">
      <el-form :model="form" ref="resetForm" :rules="rules" label-width="145px">
        <el-form-item label="原密码" prop="oldPwd">
          <el-input v-model="form.oldPwd" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPwd">
          <el-input type="password" v-model="form.newPwd" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="form.checkPass" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
        <el-button @click="handleClose" class="btn-cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters(['username'])
  },
  data() {
    const validateOldPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入旧密码'));
      } else {
        callback();
      }
    };

    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'));
      } else {
        if (this.form.checkPass !== '') {
          this.$refs.resetForm.validateField('checkPass');
        }
        callback();
      }
    };

    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.newPwd) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };

    return {
      form: {
        oldPwd: '',
        newPwd: '',
        checkPass: ''
      },
      dialogFormVisible: false,
      rules: {
        oldPwd: [
          { validator: validateOldPass, trigger: 'blur' }
        ],
        newPwd: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    readUserInfo() {
      this.dialogFormVisible = true;
    },
    handleLogout() {
      this.logout();
    },
    handleSubmit() {
      this.$refs.resetForm.validate((valid) => {
        if (valid) {
          this.handleClose();
          this.resetPwd(this.form);
        } else {
          return false;
        }
      });
    },
    handleClose() {
      this.$refs.resetForm.resetFields();
      this.dialogFormVisible = false;
    },
    ...mapActions(['logout', 'resetPwd'])
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

.reset-pwd-dialog{
  line-height: 1;
  .el-dialog__header{
    padding: 24px;
  }

  .el-dialog__body{
    padding: 0 25px;

    .el-input__inner{
      width: 208px;
    }
  }

  .el-dialog__footer{
    padding-top: 10px;

    .btn-cancel{
      margin-left: 24px;
    }
  }
}
</style>
