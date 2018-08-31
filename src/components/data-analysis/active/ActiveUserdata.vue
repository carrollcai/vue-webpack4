<template>
  <div class="active-userdata block-containter">
    <div class="userdata-header">
      <el-radio-group v-model="activeObj.dateType" size="small" @change="dateChange">
        <el-radio-button :label="0">按日</el-radio-button>
        <el-radio-button :label="1">按月</el-radio-button>
      </el-radio-group>
      <span class="userdata-header-quote">
        {{!activeObj.dateType ? `${twoDaysAgo}日关键指标` : `${oneMonthAgoNoDay}月关键指标`}}
      </span>
    </div>
    <div class="userdata-main">
      <div class="userdata-main-left__outer">
        <div class="userdata-main-left__title ellipsis">{{!activeObj.dateType ? '日' : '月'}}活跃用户数</div>
        <div class="userdata-main-left__num">{{dailyUser.activeUserNum}}</div>
      </div>
      <div class="userdata-main-left__outer">
        <div class="userdata-main-left__title ellipsis">手机账号登录用户</div>
        <div class="userdata-main-left__num">{{dailyUser.mobileAccount}}</div>
      </div>
      <div class="userdata-main-left__outer">
        <div class="userdata-main-left__title ellipsis">移动IP用户</div>
        <div class="userdata-main-left__num">{{dailyUser.mobileIp}}</div>
      </div>
      <div class="userdata-main-left__outer">
        <div class="userdata-main-left__title ellipsis">非移动IP用户</div>
        <div class="userdata-main-left__num">{{dailyUser.unmobileIp}}</div>
      </div>
      <div class="userdata-main-left__outer">
        <div class="userdata-main-left__title ellipsis">{{!activeObj.dateType ? '日' : '月'}}活排名情况</div>
        <div class="userdata-main-left__num">{{dailyUser.orderNum}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { twoDaysAgo, oneMonthAgoNoDay } from '@/utils/helper';

export default {
  data() {
    return {
      twoDaysAgo,
      oneMonthAgoNoDay
    };
  },
  computed: {
    ...mapState({
      dailyUser: ({ dataAnalysis }) => dataAnalysis.dailyUser,
      activeObj: ({ dataAnalysis }) => dataAnalysis.activeObj
    })
  },
  methods: {
    dateChange() {
      this.getDailyActiveUser();
    },
    ...mapActions([
      'getDailyActiveUser'
    ])
  }
};
</script>
