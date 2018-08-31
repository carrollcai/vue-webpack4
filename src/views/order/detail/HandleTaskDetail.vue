<template>
  <div>
    <div class="m-container">
      <div class="breadcrumb">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/order/handle-task' }">订单处理任务</el-breadcrumb-item>
          <el-breadcrumb-item v-if="routeType === 'sign'">签约处理</el-breadcrumb-item>
          <el-breadcrumb-item v-else-if="routeType === 'pay'">付款处理</el-breadcrumb-item>
          <el-breadcrumb-item v-else>详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="m-container o-overview-detail">
      <div class="task-detail-content"
        v-if="handleTaskDetail && Object.keys(handleTaskDetail).length">
        <detail-content :orderOverviewDetail="handleTaskDetail" />

        <!-- 已处理详情 -->
        <order-product-list v-if="routeType === 'detail'"
          :processList="processList" />
      </div>
      <!-- 待签约 -->
      <div class="detail-line"
        v-if="routeType === 'pay' || routeType === 'sign'"></div>

      <div v-if="routeType === 'sign' && handleTaskDetail && handleTaskDetail.ordProductDtoList">
        <sign-handle :handleTaskDetail="handleTaskDetail"
          :premissionDenied="premissionDenied"
          :processCompleteStatus="processCompleteStatus"
          :taskInsId="taskInsId"
          :id="id" />
      </div>

      <div v-if="routeType === 'pay' && handleTaskDetail && handleTaskDetail.ordProductDtoList">
        <pay-handle :handleTaskDetail="handleTaskDetail"
          :premissionDenied="premissionDenied"
          :operatorId="operatorId"
          :taskInsId="taskInsId"
          :id="id" />
      </div>

      <!-- 待签约处理、待付款处理详情 -->
      <div class="task-submit-button">
        <el-button type="primary"
          @click="submitSign"
          v-if="routeType === 'detail-sign'">签约处理</el-button>
        <el-button type="primary"
          @click="submitSign"
          v-if="routeType === 'detail-pay'">付款处理</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import DetailContent from 'components/order/detail/DetailContent.vue';
import OrderProductList from 'components/order/detail/OrderProductList.vue';
import SignHandle from 'components/order/detail/SignHandle.vue';
import PayHandle from 'components/order/detail/PayHandle.vue';

export default {
  components: {
    DetailContent,
    OrderProductList,
    SignHandle,
    PayHandle,
  },
  data() {
    return {
      routeType: '',
      ordCode: null,
      id: null,
      taskInsId: null,
      operatorId: '',
    };
  },
  created() {
    this.processCompleteStatus = 4; // 流程已完成状态
    // this.dispatchSignStatus = 2; // 分派签约处理
    // this.hasSignStatus = 3; // 已签约
    // this.cancelStatus = 5; // 取消签约
    this.routeChange();
  },
  computed: {
    ...mapState({
      handleTaskDetail: ({ order }) => order.handleTaskDetail,
      processList: ({ order }) => order.processList,
      hasSignedFile: ({ order }) => order.hasSignedFile,
      lastProcessInfo: ({ order }) => order.lastProcessInfo,
      opRegion: ({ root }) => root.currentUser.operator.opRegion,
    })
  },
  async beforeMount() {
    // 清空processList数据
    this.removeProcessList();
    this.removePayDetailFiles();

    this.getUserInfoSelf({}).then(res => {
      this.operatorId = res;
    });
    await this.getHandleTaskDetail({ ordCode: this.ordCode });

    // 获取流程信息
    if (this.routeType === 'detail') {
      await this.getOrderOverviewProcessList({
        ordProductDtoList: this.handleTaskDetail.ordProductDtoList
      });
    }

    // 如果是付款处理，需要获取通过附件id获取附件相关信息，添加到流程对象中
    if (this.routeType === 'pay') {
      await this.gethasSignedFileList({
        ordProductDtoList: this.handleTaskDetail.ordProductDtoList
      });
    }

    // 签约获取指派人流程
    // if (this.handleTaskDetail.assignReason && this.taskInsId) {
    //   await this.getOrderProcessInfo({ taskInsId: this.taskInsId });
    // }
    // 获取文件名和地址
    // await this.handleTaskDetail.fileId && this.gethasSignedFile({ fileInputId: this.handleTaskDetail.fileId });
  },
  watch: {
    '$route'() {
      this.routeChange();
    }
  },
  methods: {
    routeChange() {
      this.routeType = this.$route.params.type;
      this.ordCode = this.$route.params.id;
      this.id = this.$route.query.ordId;
      this.taskInsId = this.$route.query.taskInsId;
      this.businessStatus = this.$route.query.businessStatus;

      // 如果是付款处理，需要获取通过附件id获取附件相关信息，添加到流程对象中
      if (this.routeType === 'pay') {
        this.gethasSignedFileList({
          ordProductDtoList: this.handleTaskDetail.ordProductDtoList
        });
      }
    },
    premissionDenied(item) {
      // 如果当前用户所属归属地和流程归属地相同
      if (Number(this.opRegion) === item.companyBelong) {
        return true;
      }
    },
    submitSign() {
      // 跳转到付款的详情
      let path = '';
      if (this.routeType === 'detail-sign') {
        path = `/order/handle-task/sign/${this.id}?taskInsId=${this.taskInsId}`;
      } else {
        path = `/order/handle-task/pay/${this.id}?taskInsId=${this.taskInsId}`;
      }
      this.$router.push(path);
    },
    ...mapMutations({
      removeProcessList: 'ORDER_REMOVE_PROCESS_LIST',
      removePayDetailFiles: 'ORDER_REMOVE_PAY_DETAIL_FILES',
    }),
    ...mapActions([
      'getUserInfoSelf',
      'getHandleTaskDetail',
      'getOrderOverviewProcessList',
      'gethasSignedFileList'
    ])
  }
};
</script>
