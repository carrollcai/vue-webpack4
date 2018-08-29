<template>
  <div class="retention-user block-containter">
    <div class="trend-header-title">
      {{ !type ? '上月新增用户留存率' : '上月留存用户流失率' }}
      <el-tooltip class="item"
        effect="dark"
        :content="!type ? '新增率 = 上月新增本月存留用户数 / 上月新增用户数' : '留存率 = 上月存留本月流失用户数 / 上月留存用户数'"
        placement="top-start">
        <i class="el-icon-info"></i>
      </el-tooltip>
    </div>
    <div class="retention-user-data-outer">
      <el-progress :stroke-width="16"
        type="circle"
        :percentage="circlePercent()"></el-progress>
      <ul class="retention-user-data">
        <li>
          <p class="retention-user-data__title">{{ !type ? '上月新增用户数' : '上月留存用户数' }}</p>
          <p class="retention-user-data__num">{{ !type ? retentionLossUser.newMemberNum : retentionLossUser.retainNum}}</p>
        </li>
        <li>
          <p class="retention-user-data__title">{{ !type ? '上月新增本月存留用户数' : '上月存留本月流失用户数' }}</p>
          <p class="retention-user-data__num">{{ !type ? retentionLossUser.newRetainNum : retentionLossUser.dropoutNum}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    type: Number
  },
  computed: {
    ...mapState({
      retentionLossUser: ({ dataAnalysis }) => dataAnalysis.retentionLossUser
    })
  },
  methods: {
    circlePercent() {
      const { type, retentionLossUser } = this;
      let percent = !type ? parseInt(retentionLossUser.dropoutRate * 100) : parseInt(retentionLossUser.retainRate * 100);
      return percent | 0;
    }
  }
};
</script>

<style>
</style>
