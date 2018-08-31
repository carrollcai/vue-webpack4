<template>
  <div class="new-user-analyze active-userdata block-containter">
    <div class="userdata-header">
      <div class="trend-header-title">{{oneMonthAgoNoDay}}新增用户数据</div>
    </div>
    <div class="userdata-main">
      <div class="userdata-main-left">
        <div class="userdata-main-left__outer">
          <div class="userdata-main-left__title ellipsis">新增用户</div>
          <div class="userdata-main-left__num">{{overviewData.newUserNum}}</div>
          <div class="userdata-main-left__rank">全国No.{{overviewData.newUserNumRank}}</div>
        </div>
        <div class="userdata-main-left__outer">
          <div class="userdata-main-left__title ellipsis">新增手机用户</div>
          <div class="userdata-main-left__num">{{overviewData.newMobileNum}}</div>
          <div class="userdata-main-left__rank">全国No.{{overviewData.newMobileNumRank}}</div>
        </div>
        <div class="userdata-main-left__outer">
          <div class="userdata-main-left__title ellipsis">新增游客用户</div>
          <div class="userdata-main-left__num">{{overviewData.newVisitNum}}</div>
          <div class="userdata-main-left__rank">全国No.{{overviewData.newVisitNumRank}}</div>
        </div>
        <div class="userdata-main-left__outer">
          <div class="userdata-main-left__title ellipsis">新增会员活跃用户</div>
          <div class="userdata-main-left__num">{{overviewData.newActiveNum}}</div>
          <div class="userdata-main-left__rank">全国No.{{overviewData.newActiveNumRank}}</div>
        </div>
      </div>
      <div class="userdata-main-right"
        v-if="members.length">
        <div class="userdata-main-right__chart">
          <Pie :id="'mountNode'"
            :charData="transformMemebers(members)"
            :width="80"
            :height="80"
            hasLegend />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pie from 'components/chart/Pie.vue';
import { mapState } from 'vuex';
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
      overviewData: ({ dataAnalysis }) => dataAnalysis.addUserOverviewData,
      memberType: ({ root }) => root.staticData.MEMBER_TYPE,
    })
  },
  methods: {
    transformMemebers(list) {
      let newList = this.memberType.map(typeItem => {
        let obj = {};
        list.map(item => {
          if (item[`member_${typeItem.value}`] || parseInt(item[`member_${typeItem.value}`] === 0)) {
            obj = {
              item: typeItem.label,
              value: item[`member_${typeItem.value}`]
            };
          }
        });
        return obj;
      });
      return newList.filter(val => val.value);
    },
  }
};
</script>
