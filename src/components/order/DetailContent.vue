<template>
  <div>
    <div class="task-three-detail">
      <div class="task-three-detail-item">
        <div class="left">订单名称：</div>
        <div class="right">{{orderOverviewDetail.ordName}}</div>
      </div>
      <div class="task-three-detail-item">
        <div class="left">预计协议期：</div>
        <div class="right">{{orderOverviewDetail.predictAgreementTime}}</div>
      </div>
      <div class="task-three-detail-item">
        <div class="left">是否项目招标：</div>
        <div class="right">{{orderOverviewDetail.isProjectInvitation}}</div>
      </div>
    </div>
    <div class="task-three-detail">
      <div class="task-three-detail-item">
        <div class="left">预计合同金额：</div>
        <div class="right">{{orderOverviewDetail.predictContractAmount}}万元/月</div>
      </div>
      <div class="task-three-detail-item">
        <div class="left">预计签约时间：</div>
        <div class="right">{{orderOverviewDetail.predictSignTime}}</div>
      </div>
      <div class="task-three-detail-item">
      </div>
    </div>

    <div class="task-detail-item">
      <div class="left">订购产品：</div>
      <div class="right">{{orderOverviewDetail.productName}}</div>
    </div>
    <div class="task-detail-item">
      <div class="left">合作集团：</div>
      <div class="right">{{orderOverviewDetail.organizeName}}；{{orderOverviewDetail.address}}</div>
    </div>
    <div class="task-detail-item">
      <div class="left">联系人：</div>
      <div class="right">{{orderOverviewDetail.contactName}}；{{orderOverviewDetail.contactGender}} ；{{orderOverviewDetail.contactMobile}} {{orderOverviewDetail.contactEmail}}</div>
    </div>
    <div class="task-detail-item">
      <div class="left">订单需求：</div>
      <div class="right">{{orderOverviewDetail.busiRequire}}</div>
    </div>
    <div class="task-detail-item">
      <div class="left">订单描述：</div>
      <div class="right">{{orderOverviewDetail.busiDesc}}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    orderOverviewDetail: {
      type: Object,
      default: () => {}
    }
  }
};
</script>
