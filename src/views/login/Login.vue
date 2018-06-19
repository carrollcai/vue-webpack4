<template>
  <div class="login">
    <div class="login-desc">
      <div class="login-desc__title">
        <i class="title-icon"></i>咪咕销售管理平台
      </div>
      <div class="login-line"></div>
      <div class="login-desc__detail">
        <ul>
          <li><i class="list-icon"></i>客户端数据查看，清晰准确</li>
          <li><i class="list-icon"></i>集团客户信息共享，便捷可靠</li>
          <li><i class="list-icon"></i>订单跟踪管理，高效清晰</li>
        </ul>
        <div class="desc-btn">
          立即体验
        </div>
      </div>
    </div>
    <div class="login-form">
      <div class="title">
        欢迎登录销售管理平台
      </div>
      <div class="body">
        <div class="input-wrapper">
          <login-input type="text" v-model="loginName" placeholder="账号" @focus="clearError"></login-input>
        </div>
        <div class="input-wrapper">
          <login-input type="password" v-model="pwd" placeholder="密码" @focus="clearError" @keyup="handleLogin"></login-input>
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
      return res && res.errorInfo && res.errorInfo.code === '200';
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
          username: loginName,
          password: pwd
        }).then((res) => {
          if (isSuccess(res)) {
            this.$store.commit(types.SET_LOGIN_USER, res.data);
            // this.$router.replace('/');
            this.$router.replace('/analysis/active');
          } else {
            this.errorMsg = res.errorInfo.message;
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
  justify-content: space-between;

  *{
    box-sizing: border-box;
  }

  .login-desc{
    width: 752px;
    margin: 88px 0 0 68px;
  }

  .login-desc__title{
    display: flex;
    align-items: center;
    font-size: 36px;
    color: #FFFFFF;

    .title-icon{
      background: url('~@/assets/images/login-icon.png') no-repeat;
      width: 34px;
      height: 34px;
      margin-right: 16px;
      display: inline-block;
    }
  }

  .login-line{
    background: url('~@/assets/images/line.png') no-repeat;
    margin: 37px 0;
    height: 1px;
  }

  .login-desc__detail{
    margin-left: 49px;
    ul {
      li{
        color: #FFFFFF;
        .list-icon{
          background: url('~@/assets/images/check.png') no-repeat;
          width: 15px;
          height: 11px;
          margin-right: 16px;
          display: inline-block;
        }

        &:not(:last-child){
          margin-bottom: 16px;
        }
      }
    }
  }

  .desc-btn{
    width: 267px;
    height: 40px;
    line-height: 40px;
    color: #FFFFFF;
    text-align: center;
    border-radius: 3px;
    border: 1px solid rgba(255, 255, 255, 0.56);
    margin-top: 32px;
  }

  .login-form{
    width: 470px;
    background: #FFFFFF;
    box-sizing: border-box;
    height: auto;
    align-self: center;
    margin-right: 170px;
    padding: 0 53px;

    .title{
      box-sizing: border-box;
      color: rgba(0, 0, 0, 0.85);
      font-size: 24px;
      height: 33px;
      line-height: 33px;
      text-align: center;
      margin-top: 33px;
    }

    .body{
      width: 100%;
      .input-wrapper{
        height: 70px;
        display: flex;
        align-items: flex-end;
      }

      .btn-group{
        display: flex;
        justify-content: center;
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
