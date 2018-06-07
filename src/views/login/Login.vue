<template>
  <div class="login">
    <div class="login-form">
      <div class="title">
        欢迎登录销售管理平台
      </div>
      <div class="body">
        <div class="input-wrapper">
          <login-input type="text" v-model="loginName" placeholder="账号"></login-input>
        </div>
        <div  class="input-wrapper">
          <login-input type="password" v-model="pwd" placeholder="密码"></login-input>
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
export default {
  name: 'Login',
  components: {
    LoginInput
  },
  data() {
    return {
      loginName: '',
      pwd: ''
    };
  },
  methods: {
    isSuccess(res) {
      return res && res.code === 1;
    },
    handleLogin() {
      this.login({
        loginName: 'admin'
      });
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
    background: url('../../assets/images/login-bk.jpg') no-repeat;
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
  }
</style>
