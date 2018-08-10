<template>
  <el-dialog title="修改密码" :visible.sync="dialogFormVisible" class="reset-pwd-dialog" :show-close="false" :center="true" @close="handleClose" :close-on-click-modal="false" width="470px">
    <el-form :model="form" ref="resetForm" :rules="rules" label-width="120px" class="reset-pwd-form">
      <el-form-item label="原密码" prop="oldPassword">
        <el-input type="password" v-model="form.oldPassword" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input type="password" v-model="form.newPassword" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="cNewPassword">
        <el-input type="password" v-model="form.cNewPassword" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
        <el-button @click="handleClose" class="btn-cancel">取 消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import { mapActions } from 'vuex';
import { passworReg } from '@/utils/rules.js';

export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (this.form.cNewPassword !== '') {
        this.$refs.resetForm.validateField('cNewPassword');
      }
      callback();
    };

    const validatePass2 = (rule, value, callback) => {
      if (value !== this.form.newPassword) {
        callback(new Error('两次输入密码不一致'));
      } else {
        callback();
      }
    };

    return {
      form: {
        oldPassword: '',
        newPassword: '',
        cNewPassword: ''
      },
      dialogFormVisible: false,
      rules: {
        oldPassword: [
          { required: true, message: '请输入原密码', trigger: 'blur' },
          { min: 8, max: 16, message: '原密码需要在8-16字符内', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 8, max: 16, message: '新密码需要在8-16字符内', trigger: 'blur' },
          { validator: passworReg, trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        cNewPassword: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { min: 8, max: 16, message: '确认密码需要在8-16字符内', trigger: 'blur' },
          { validator: passworReg, trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    isSuccess(res) {
      return res;
    },

    handleSubmit() {
      this.$refs.resetForm.validate((valid) => {
        if (valid) {
          this.resetPwd(this.form).then(res => {
            this.handleClose();
            if (this.isSuccess(res)) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.dialogFormVisible = false;
                  this.$nextTick(() => {
                    this.logout({});
                  });
                }
              });
            } else {
              this.$message.error(res.msg);
            }
          }, () => {
            this.$message.error('修改密码失败');
          });
        } else {
          return false;
        }
      });
    },

    handleClose() {
      this.$refs.resetForm.resetFields();
      this.dialogFormVisible = false;
    },

    init() {
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs.resetForm.resetFields();
      });
    },
    ...mapActions(['resetPwd', 'logout'])
  }
};
</script>
<style lang="scss">
.reset-pwd-dialog {
  line-height: 1;
  .el-dialog__header {
    padding: 24px;
  }

  .el-dialog__body {
    padding: 0 25px;

    .el-input__inner {
      width: 208px;
    }
  }

  .el-dialog__footer {
    padding-top: 10px;

    .btn-cancel {
      margin-left: 24px;
    }
  }
  .reset-pwd-form {
    padding-bottom: 16px;
  }
}
</style>
