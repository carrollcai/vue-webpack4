<template>
  <div class="login">
    <div class="login-form">
      <div class="title">
        欢迎登录销售管理平台
      </div>
      <div class="body">
        <div class="input-wrapper">
          <login-input type="text" v-model="loginName" placeholder="账号" @focus="clearError"></login-input>
        </div>
        <div class="input-wrapper">
          <login-input type="password" v-model="pwd" placeholder="密码"></login-input>
        </div>
        <div class="error-msg" v-if="!!errorMsg">
          {{errorMsg}}
        </div>
        <div class="btn-group">
          <el-button type="primary" @click="handleLogin">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import LoginInput from 'components/LoginInput.vue';
import * as types from '@/store/types';
export default {
  name: 'Login',
  components: {
    LoginInput
  },
  data() {
    return {
      loginName: '',
      pwd: '',
      errorMsg: ''
    };
  },
  methods: {
    isSuccess(res) {
      return res && res.code === 1;
    },

    validateForm() {
      let {loginName, pwd} = this;

      if (!loginName) {
        this.errorMsg = '请输入账号';
        return false;
      }

      if (!pwd) {
        this.errorMsg = '请输入密码';
        return false;
      }

      return true;
    },

    handleLogin() {
      const { isSuccess, validateForm } = this;
      if (validateForm()) {
        let {loginName, pwd} = this;

        this.login({
          loginName,
          pwd
        }).then((res) => {
          if (isSuccess(res)) {
            this.$store.commit(types.SET_LOGIN_USER, res.data);
            this.$router.replace('/');
          } else {
            this.errorMsg = res.msg;
          }
        }, err => {
          console.log(err);
        });
      }
    },

    clearError() {
      this.errorMsg = '';
    },

    ...mapActions(['login'])
  }
};
</script>

<style lang="scss">
$padding-left: 46px;

.login{
  height: 100%;
  width: 100%;
  background: url('~@/assets/images/login-bk.jpg') no-repeat;
  background-size: 100% 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  .login-form{
    width: 510px;
    background: #FFFFFF;
    box-sizing: border-box;
    height: auto;

    .title{
      padding-left: $padding-left;
      height: 56px;
      box-sizing: border-box;
      border-bottom: 1px solid rgba(230, 230, 230, 1);
      color: rgba(0, 0, 0, 0.85);
      font-size: 20px;
      line-height: 56px;
    }

    .body{
      padding-left: $padding-left;
      .input-wrapper{
        height: 70px;
        display: flex;
        align-items: flex-end;
      }

      .btn-group{
        display: flex;
        justify-content: center;
        padding-right: 37px;
        margin: 40px 0 24px 0;
        .el-button{
          width: 130px;
          align-self: flex-end;
        }
      }
    }
  }

  .error-msg{
    color: #F5222D;
    font-size: 14px;
    height: 20px;
    margin-top: 16px;
  }
}
</style>
