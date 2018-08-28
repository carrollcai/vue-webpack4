<template>
  <div>
    <div class="m-container">
      <div class="breadcrumb">
        <el-breadcrumb>
          <el-breadcrumb-item v-if="isOverview"
            :to="{ path: '/order/overview' }">订单总览</el-breadcrumb-item>
          <el-breadcrumb-item v-if="!isOverview"
            :to="{ path: '/order/create-manage' }">订单创建管理</el-breadcrumb-item>
          <el-breadcrumb-item>订单详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="m-container o-overview-detail">
      <div class="task-detail-content">
        <!-- <audit-steps style="margin-left: 180px;" v-if="this.$route.params.processId && processList.length" :processList="processList" :businessToOrderId="orderOverviewDetail.relOpporId" /> -->
        <detail-content v-if="orderOverviewDetail && Object.keys(orderOverviewDetail).length"
          :orderOverviewDetail="orderOverviewDetail" />
      </div>

      <div class="p-table"
        v-if="processList.length">
        <dl class="tHead">
          <dt class="tH01">订购产品</dt>
          <dd class="tH02">订单状态</dd>
        </dl>
        <dl class="tTr"
          v-for="(item, index) in processList"
          :key="index">
          <dt class="tH01">{{item.productName}}</dt>
          <dd class="tH02">
            <audit-steps v-if="item.list && item.list.length"
              background-color="#fff"
              :processList="item.list" />
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import AuditSteps from 'components/AuditSteps.vue';
import DetailContent from 'components/order/DetailContent.vue';
import { mapActions, mapMutations, mapState } from 'vuex';

export default {
  components: {
    AuditSteps,
    DetailContent
  },
  data() {
    return {
      objData: []
    };
  },
  computed: {
    ...mapState({
      orderOverviewDetail: ({ order }) => order.orderOverviewDetail[0],
      processList: ({ order }) => order.processList,
    })
  },
  created() {
    this.isOverview = this.$route.fullPath.includes('/overview/detail/');
  },
  async beforeMount() {
    // 清空processList数据
    this.removeProcessList();

    const { id } = this.$route.params;
    await this.getOrderOverviewDetail({ ordCode: id });
    await this.getOrderOverviewProcessList({
      ordProductDtoList: this.orderOverviewDetail.ordProductDtoList
    });
  },
  methods: {
    ...mapMutations({
      removeProcessList: 'ORDER_REMOVE_PROCESS_LIST',
    }),
    ...mapActions([
      'getOrderOverviewDetail',
      'getOrderOverviewProcess',
      'getOrderOverviewProcessList',
    ])
  }
};
</script>

<style lang="scss">
.o-overview-detail {
  margin-top: 16px;
}
</style>
