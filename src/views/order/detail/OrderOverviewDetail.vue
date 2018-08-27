<template>
  <div>
    <div class="m-container">
      <div class="breadcrumb">
        <el-breadcrumb>
          <el-breadcrumb-item v-if="isOverview" :to="{ path: '/order/overview' }">订单总览</el-breadcrumb-item>
          <el-breadcrumb-item v-if="!isOverview" :to="{ path: '/order/create-manage' }">订单创建管理</el-breadcrumb-item>
          <el-breadcrumb-item>订单详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="m-container o-overview-detail">
      <div class="task-detail-content">
        <!-- <audit-steps style="margin-left: 180px;" v-if="this.$route.params.processId && processList.length" :processList="processList" :businessToOrderId="orderOverviewDetail.relOpporId" /> -->
        <detail-content v-if="orderOverviewDetail && Object.keys(orderOverviewDetail).length" :orderOverviewDetail="orderOverviewDetail" />
      </div>
      <div class="p-table">
        <dl class="tHead">
          <dt class="tH01">产品名称02</dt>
          <dd class="tH02">您暂无权限处理~</dd>
        </dl>
        <dl class="tTr" v-if="productList" v-for="(item, k) in productList" :key="k">
          <dt class="tH01">{{item.productName}}</dt>
          <dd class="tH02">
            {{item}}
          </dd>
        </dl>
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
    productList() {
      if (Object.keys(this.orderOverviewDetail).length) {
        return this.orderOverviewDetail;
      }
    },
    ...mapState({
      orderOverviewDetail: ({ order }) => order.orderOverviewDetail[0]
      // processList: ({ order }) => order.processList
    })
  },
  created() {
    this.isOverview = this.$route.fullPath.includes('/overview/detail/');
  },
  async beforeMount() {
    // const { id, processId } = this.$route.params;
    const { id } = this.$route.params;
    // 如果这边不让getOrderOverviewDetail在后面执行，会导致orderOverviewDetail里的对象消失，因为orderOverviewDetail没定义对象内属性
    await this.getOrderOverviewDetail({ ordCode: id });
    /* await processId && this.getOrderOverviewProcess({
       processInsId: processId,
       businessStatus: ['1']
     }); */
  },
  methods: {
    ...mapActions([
      'getOrderOverviewDetail',
      // 'getOrderOverviewProcess',
    ])
  }
};
</script>

<style lang="scss">
.o-overview-detail {
  margin-top: 16px;
}
</style>
