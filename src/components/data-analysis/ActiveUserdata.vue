<template>
  <div class="active-userdata block-containter">
    <div class="userdata-header">
      <el-radio-group v-model="dateType" size="small" @change="dataChange">
        <el-radio-button :label="0">按日</el-radio-button>
        <el-radio-button :label="1">按月</el-radio-button>
      </el-radio-group>
      <span>5-26日关键指标（展示“T-2”日关键指标数据，”T“为今日数据）</span>
    </div>
    <div class="userdata-main">
      <div class="userdata-main-left">
        <div class="userdata-main-left__outer">
          <div class="userdata-main-left__title ellipsis">日活跃用户数</div>
          <div class="userdata-main-left__num">728972</div>
        </div>
        <div class="userdata-main-left__outer">
          <div class="userdata-main-left__title ellipsis">日活跃用户数</div>
          <div class="userdata-main-left__num">728972</div>
        </div>
        <div class="userdata-main-left__outer">
          <div class="userdata-main-left__title ellipsis">移动IP用户/非移动IP用户</div>
          <div class="userdata-main-left__num">24255/21333</div>
        </div>
        <div class="userdata-main-left__outer">
          <div class="userdata-main-left__title ellipsis">日活跃用户数</div>
          <div class="userdata-main-left__num">728972</div>
        </div>
      </div>
      <div class="userdata-main-right">
        <div class="userdata-main-right__chart">
          <Pie :id="'mountNode'" :charData="members" :width="100" :height="100" hasLegend />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pie from 'components/chart/Pie.vue';
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      dateType: 0
    };
  },
  components: {
    Pie
  },
  computed: {
    ...mapState({
      members: ({ dataAnalysis }) => dataAnalysis.members
    })
  },
  beforeMount() {
    this.getMembers();
  },
  methods: {
    dataChange(val) {
      console.log(val);
      this.getDailyActiveUser({ val });
    },
    ...mapActions([
      'getDailyActiveUser',
      'getMembers'
    ])
  }
};
</script>
