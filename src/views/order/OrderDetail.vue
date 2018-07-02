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

        <div class="task-three-detail">
          <div class="task-three-detail-item">
            <div class="left">订单名称：</div>
            <div class="right">大数据产业合作订单</div>
          </div>
          <div class="task-three-detail-item">
            <div class="left">预计协议期：</div>
            <div class="right">4年</div>
          </div>
          <div class="task-three-detail-item">
            <div class="left">是否项目招标：</div>
            <div class="right">是</div>
          </div>
        </div>
        <div class="task-three-detail">
          <div class="task-three-detail-item">
            <div class="left">预计合同金额：</div>
            <div class="right">10000万元/月</div>
          </div>
          <div class="task-three-detail-item">
            <div class="left">预计签约时间：</div>
            <div class="right">2018-4-5</div>
          </div>
          <div class="task-three-detail-item">
          </div>
        </div>

        <div class="task-detail-item">
          <div class="left">订单名称：</div>
          <div class="right">大数据产业合作订单</div>
        </div>
        <div class="task-detail-item">
          <div class="left">合作集团：</div>
          <div class="right">广东移动大数据有限公司（237984739203）；广东省广州市大数据产业基地</div>
        </div>
        <div class="task-detail-item">
          <div class="left">联系人：</div>
          <div class="right">张三疯 ；男 ；19809209810 ；11920283@qq.com</div>
        </div>
        <div class="task-detail-item">
          <div class="left">订购产品：</div>
          <div class="right">这是产品名称</div>
        </div>
        <div class="task-detail-item">
          <div class="left">订单需求：</div>
          <div class="right">这是一段订单需求描述字段，这是一段订单需求描述字段这是一段订单需求描述字段</div>
        </div>
        <div class="task-detail-item">
          <div class="left">订单描述：</div>
          <div class="right">这是一段订单描述，这是一段订单描述，这是一段订单描述</div>
        </div>
      </div>

      <div class="task-submit-button">
        <el-button type="primary" @click="submit">签约处理</el-button>
      </div>

    </div>
  </div>
</template>

<script>
import AuditSteps from 'components/task/AuditSteps.vue';

export default {
  components: {
    AuditSteps
  },
  methods: {
    submit() {
      //
    }
  }
};
</script>

<style lang="scss">
.o-overview-detail {
  margin-top: 16px;
}
</style>
