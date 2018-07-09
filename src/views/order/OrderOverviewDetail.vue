<template>
  <div>
    <div class="m-container">
      <div class="breadcrumb">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/order/overview' }">订单总览</el-breadcrumb-item>
          <el-breadcrumb-item>订单详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="m-container o-overview-detail">
      <div class="task-detail-content">
        <audit-steps></audit-steps>

        <detail-content />
      </div>
      <!-- <div class="task-submit-button">
        <el-button type="primary" @click="submit">签约处理</el-button>
      </div> -->

    </div>
  </div>
</template>

<script>
import AuditSteps from 'components/task/AuditSteps.vue';
import DetailContent from 'components/order/DetailContent.vue';
import { mapActions } from 'vuex';

export default {
  components: {
    AuditSteps,
    DetailContent
  },
  methods: {
    submit() {
      let { id } = this.$route.params;
      this.overviewSignHandle(id);
      //
    },
    ...mapActions([
      'overviewSignHandle'
    ])
  }
};
</script>

<style lang="scss">
.o-overview-detail {
  margin-top: 16px;
}
</style>
