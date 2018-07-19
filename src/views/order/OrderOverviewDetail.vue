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
        <audit-steps v-if="this.$route.params.processId && processList.length" :processList="processList" :businessToOrderId="orderOverviewDetail.relOpporId" />

        <detail-content v-if="Object.keys(orderOverviewDetail).length" :orderOverviewDetail="orderOverviewDetail" />
      </div>

    </div>
  </div>
</template>

<script>
import AuditSteps from 'components/AuditSteps.vue';
import DetailContent from 'components/order/DetailContent.vue';
import { mapActions, mapState } from 'vuex';

export default {
  components: {
    AuditSteps,
    DetailContent
  },
  computed: {
    ...mapState({
      orderOverviewDetail: ({ order }) => order.orderOverviewDetail,
      processList: ({ order }) => order.processList
    })
  },
  async beforeMount() {
    const { id, processId } = this.$route.params;

    // 如果这边不让getOrderOverviewDetail在后面执行，会导致orderOverviewDetail里的对象消失，因为orderOverviewDetail没定义对象内属性
    await this.getOrderOverviewDetail({ ordId: id });
    await processId && this.getOrderOverviewProcess({
      processInsId: processId,
      businessStatus: ['1']
    });
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
