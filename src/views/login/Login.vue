<template>
  <div class="login">
    <div class="login-form">
      <div class="title">
        欢迎登录销售管理平台
      </div>
      <div class="body">
        <div class="input-wrapper">
          <input type="text" class="login-input" placeholder="账号">
        </div>
        <div  class="input-wrapper">
          <input type="text" class="login-input" placeholder="密码">
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
export default {
  name: 'Login',
  methods: {
    handleLogin() {

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
      background: #FFFFFF;
      width: 510px;
      box-sizing: border-box;
      height: 350px;

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
        .login-input{
          border: none;
          border-bottom: 1px solid rgba(163, 195, 254, 1);
          height: 24px;
          line-height: 24px;
          width: 429px;
          &:focus{
            border: none;
            border-bottom: 1px solid rgba(163, 195, 254, 1);
            outline: none;
          }
        }

        .btn-group{
          display: flex;
          justify-content: flex-end;
          padding-right: 37px;
          margin-top: 22px;
          .el-button{
            width: 130px;
            align-self: flex-end;
          }
        }
      }
    }
  }
</style>
