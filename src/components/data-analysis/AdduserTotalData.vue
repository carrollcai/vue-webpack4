<template>
  <div class="active-userdata block-containter">
    <div class="userdata-header">
      <div class="trend-header-title">{{`6月新增用户数据`}}</div>
    </div>
    <div class="userdata-main">
      <div class="userdata-main-left">
        <div class="userdata-main-left__outer">
          <div class="userdata-main-left__title ellipsis">新增用户</div>
          <div class="userdata-main-left__num">{{dailyUser.activeUserNum}}</div>
          <div class="userdata-main-left__rank">全国No.1</div>
        </div>
        <div class="userdata-main-left__outer">
          <div class="userdata-main-left__title ellipsis">新增手机用户</div>
          <div class="userdata-main-left__num">{{dailyUser.mobileAccount}}</div>
          <div class="userdata-main-left__rank">全国No.1</div>
        </div>
        <div class="userdata-main-left__outer">
          <div class="userdata-main-left__title ellipsis">新增游客用户</div>
          <div class="userdata-main-left__num">{{dailyUser.mobileIp}}</div>
          <div class="userdata-main-left__rank">全国No.1</div>
        </div>
        <div class="userdata-main-left__outer">
          <div class="userdata-main-left__title ellipsis">新增会员用户</div>
          <div class="userdata-main-left__num">{{dailyUser.newMembers}}</div>
          <div class="userdata-main-left__rank">全国No.1</div>
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
