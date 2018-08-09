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
      </div>
    </div>
    <div class="login-form">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="密码登录" name="first" key="tab-first">
          <login-input type="text"
            key="login-name"
            v-model="loginName"
            @blur="handleBlur"
            placeholder="账号/手机/邮箱"
            @focus="clearError"></login-input>
          <login-input type="password"
            v-model="pwd"
            key="login-pwd"
            placeholder="登录密码"
            @focus="clearError"
            @keyup="handleLogin"></login-input>
        </el-tab-pane>
        <el-tab-pane label="短信登录" name="second" key="tab-second">
          <login-input type="text"
            key="login-mobile"
            :maxlength="11"
            v-model="loginName"
            @blur="handleBlur"
            placeholder="手机号"
            @focus="clearError"></login-input>
          <login-input type="text"
            key="login-code"
            :maxlength="6"
            v-model="pwd"
            placeholder="短信验证码"
            @focus="clearError"
            @keyup="handleLogin">
            <span class="send-sms"
              :class="{'is-sent': isSent}"
              @click="handleSendSms">
              {{isSent ? `已发送（${time}s）` : '获取验证码'}}
              </span>
            </login-input>
        </el-tab-pane>
      </el-tabs>
      <div class="body">
        <div class="error-msg">
          {{errorMsg ? errorMsg : '&nbsp;'}}
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
      pwd: '',
      errorMsg: '',
      activeName: 'first',
      isSent: false,
      LOGIN_TYPE: {
        first: '1',
        second: '2'
      },
      time: 60
    };
  },
  methods: {
    validateForm() {
      let {loginName, pwd, activeName} = this;

      // 密码登录
      if (activeName === 'first') {
        if (!loginName) {
          this.errorMsg = '请输入账号/手机/邮箱';
          return false;
        }

        if (!pwd) {
          this.errorMsg = '请输入登录密码';
          return false;
        }
      } else {
        // 短信验证码登录

        if (!loginName) {
          this.errorMsg = '请输入手机号';
          return false;
        }

        if (!this.validateMobile(loginName)) {
          return false;
        }

        if (!pwd) {
          this.errorMsg = '请输入短信验证码';
          return false;
        }
      }

      return true;
    },

    validateMobile(mobile) {
      if (!/^1\d{10}$/.test(mobile)) {
        this.errorMsg = '请输入正确的手机号';
        return false;
      }

      return true;
    },

    handleLogin() {
      const { validateForm, LOGIN_TYPE, activeName } = this;
      if (validateForm()) {
        let { loginName, pwd } = this;

        this.login({
          account: loginName,
          password: pwd,
          loginType: LOGIN_TYPE[activeName]
        });
      }
    },

    clearError() {
      this.errorMsg = '';
    },

    handleBlur() {
      this.loginName = this.loginName.trim();
    },

    clearForm() {
      this.loginName = '';
      this.pwd = '';
    },

    handleClick() {
      this.clearForm();
      this.clearTimeInterval();
    },

    handleSendSms() {
      const {loginName, isSent} = this;
      if (isSent) {
        return false;
      }
      if (!this.validateMobile(loginName)) {
        return false;
      } else {
        this.sendSms({
          account: loginName
        }).then((res) => {
          this.$message({
            message: '发送成功',
            type: 'success',
            duration: 3000
          });
          this.isSent = true;

          this.interval = setInterval(() => {
            this.time -= 1;

            if (this.time === 0) {
              this.clearTimeInterval();
            }
          }, 1000);
        });
      }
    },

    clearTimeInterval() {
      clearInterval(this.interval);
      this.isSent = false;
      this.time = 60;
    },

    ...mapActions([
      'login',
      'sendSms'
    ])
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
    margin: 34px 0 0 68px;
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

  .login-form{
    width: 480px;
    background: #FFFFFF;
    box-sizing: border-box;
    height: auto;
    align-self: center;
    margin-right: 170px;

    .title{
      box-sizing: border-box;
      color: rgba(0, 0, 0, 0.85);
      font-size: 24px;
      text-align: center;
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
        margin: 0 0 40px 0;
        .el-button{
          width: 360px;
          align-self: flex-end;
        }
      }
    }
  }

  .error-msg{
    color: #F5222D;
    font-size: 14px;
    height: 20px;
    margin: 16px 0;
  }

  .el-tabs__item{
    font-size: 18px;
    width: 150px;
    height: 75px;
    line-height: 75px;
    text-align: center;
  }

  .el-tabs__header{
    margin-bottom: 0;
  }

  .el-tabs__content, .body{
    padding: 0 53px;
  }

  .el-tabs__nav-wrap::after{
    height: 1px;
  }

  .el-tabs__nav{
    margin: 0 85px;
  }

  .send-sms{
    position: absolute;
    right: 16px;
    bottom: 2px;
    color:#3778FF ;
    cursor: pointer;
    &.is-sent{
      color: rgba(0, 0, 0, 0.25);
      cursor: not-allowed;
    }
  }
}
</style>
