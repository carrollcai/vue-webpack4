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
        <audit-steps v-if="processList.length" :processList="processList"></audit-steps>

        <detail-content v-if="Object.keys(handleTaskDetail).length" :handleTaskDetail="handleTaskDetail" />
      </div>

    </div>
  </div>
</template>

<script>
import AuditSteps from 'components/task/AuditSteps.vue';
import DetailContent from 'components/order/DetailContent.vue';
import { mapActions, mapState } from 'vuex';

export default {
  components: {
    AuditSteps,
    DetailContent
  },
  computed: {
    ...mapState({
      handleTaskDetail: ({ order }) => order.handleTaskDetail,
      processList: ({ order }) => order.processList
    })
  },
  async beforeMount() {
    const { id, processId } = this.$route.params;

    // 如果这边不让getOrderOverviewDetail在后面执行，会导致handleTaskDetail里的对象消失，因为handleTaskDetail没定义对象内属性
    await this.getOrderOverviewProcess({ processInsId: processId });
    await this.getOrderOverviewDetail({ ordId: id });
  },
  methods: {
    ...mapActions([
      'getOrderOverviewDetail',
      'getOrderOverviewProcess'
    ])
  }
};
</script>

<style lang="scss">
.o-overview-detail {
  margin-top: 16px;
}
</style>
