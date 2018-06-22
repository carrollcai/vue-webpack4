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
      <div class="userdata-main-left">
        <div class="userdata-main-left__outer">
          <div class="userdata-main-left__title ellipsis">日活跃用户数</div>
          <div class="userdata-main-left__num">{{dailyUser.activeUserNum}}</div>
        </div>
        <div class="userdata-main-left__outer">
          <div class="userdata-main-left__title ellipsis">手机账号登录用户</div>
          <div class="userdata-main-left__num">{{dailyUser.mobileAccount}}</div>
        </div>
        <div class="userdata-main-left__outer">
          <div class="userdata-main-left__title ellipsis">移动IP用户 / 非移动IP用户</div>
          <div class="userdata-main-left__num">{{dailyUser.mobileIp + ' / ' + dailyUser.unmobileIp}}</div>
        </div>
        <div class="userdata-main-left__outer">
          <div class="userdata-main-left__title ellipsis">新增会员用户</div>
          <div class="userdata-main-left__num">{{dailyUser.newMembers}}</div>
        </div>
      </div>
      <div class="userdata-main-right">
        <div class="userdata-main-right__chart">
          <Pie :id="'mountNode'" :charData="members" :width="80" :height="80" hasLegend />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pie from 'components/chart/Pie.vue';
import { mapActions, mapState } from 'vuex';
import { twoDaysAgo, oneMonthAgoNoDay } from '@/utils/helper';

export default {
  data() {
    return {
      twoDaysAgo,
      oneMonthAgoNoDay
    };
  },
  components: {
    Pie
  },
  computed: {
    ...mapState({
      members: ({ dataAnalysis }) => dataAnalysis.members,
      dailyUser: ({ dataAnalysis }) => dataAnalysis.dailyUser,
      activeObj: ({ dataAnalysis }) => dataAnalysis.activeObj
    })
  },
  methods: {
    dateChange() {
      this.getMembers();
      this.getDailyActiveUser();
    },
    ...mapActions([
      'getMembers',
      'getDailyActiveUser'
    ])
  }
};
</script>
