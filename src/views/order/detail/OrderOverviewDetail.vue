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
        <detail-content v-if="orderOverviewDetail && Object.keys(orderOverviewDetail).length"
          :orderOverviewDetail="orderOverviewDetail" />
      </div>
      <order-product-list :processList="processList"
        :isShowAll="true" />
    </div>
  </div>
</template>

<script>
import AuditSteps from 'components/AuditSteps.vue';
import DetailContent from 'components/order/detail/DetailContent.vue';
import OrderProductList from 'components/order/detail/OrderProductList.vue';
import { mapActions, mapMutations, mapState } from 'vuex';

export default {
  components: {
    AuditSteps,
    DetailContent,
    OrderProductList
  },
  data() {
    return {
      objData: []
    };
  },
  computed: {
    ...mapState({
      orderOverviewDetail: ({ order }) => order.orderOverviewDetail,
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

    // 如果是草稿状态，不请求流程
    // let isNotDraftStatus = this.orderOverviewDetail.ordProductDtoList.filter(val => val.processInsId);
    await this.getOrderOverviewProcessList({
      ordProductDtoList: this.orderOverviewDetail.ordProductDtoList,
    });
  },
  methods: {
    ...mapMutations({
      removeProcessList: 'ORDER_REMOVE_PROCESS_LIST',
    }),
    ...mapActions([
      'getOrderOverviewDetail',
      'getOrderOverviewProcessList',
    ])
  }
};
</script>

<style lang="less">
.o-overview-detail {
  margin-top: 16px;
}
</style>
