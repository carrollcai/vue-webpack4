<template>
  <div class="active-userdata block-containter">
    <div class="userdata-header">
      <el-radio-group v-model="activeObj.dateType" size="small" @change="dataChange">
        <el-radio-button :label="0">按日</el-radio-button>
        <el-radio-button :label="1">按月</el-radio-button>
      </el-radio-group>
      <span class="userdata-header-quote">{{nowDay}}日关键指标（展示“T-2”日关键指标数据，”T“为今日数据）</span>
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
import { nowDay } from '@/utils/helper';

export default {
  data() {
    return {
      nowDay
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
  beforeMount() {
    // this.getMembers();
  },
  methods: {
    dataChange() {
      this.getMembers();
      this.getDailyActiveUser();
    },
    ...mapActions([
      'getDailyActiveUser',
      'getMembers'
    ])
  }
};
</script>
