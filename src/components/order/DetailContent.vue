<template>
  <div>
    <div class="task-three-detail">
      <div class="task-three-detail-item">
        <div class="left">订单名称：</div>
        <div class="right">{{orderOverviewDetail.ordName}}</div>
      </div>
      <div class="task-three-detail-item">
        <div class="left">预计协议期：</div>
        <div class="right">{{orderOverviewDetail.predictAgreementTime}}年</div>
      </div>
      <!-- <div class="task-three-detail-item">
        <div class="left">是否项目招标：</div>
        <div class="right">{{keyToValue(orderOverviewDetail.isProjectInvitation, projectInvitationStatic)}}</div>
      </div> -->
    </div>
    <div class="task-three-detail">
      <div class="task-three-detail-item">
        <div class="left">预计收入：</div>
        <div class="right">{{orderOverviewDetail.predictContractAmount? `${orderOverviewDetail.predictContractAmount}元/月`: '-'}}</div>
      </div>
      <div class="task-three-detail-item">
        <div class="left">预计签约时间：</div>
        <div class="right">{{orderOverviewDetail.predictSignTime}}</div>
      </div>
      <!-- <div class="task-three-detail-item">
      </div> -->
    </div>

    <!-- <div class="task-detail-item">
      <div class="left">订购产品：</div>
      <div class="right">{{orderOverviewDetail.productName}}</div>
    </div> -->
    <div class="task-detail-item">
      <div class="left">合作集团：</div>
      <div class="right">{{orderOverviewDetail.organizeName}}；{{orderOverviewDetail.address}}</div>
    </div>
    <div class="task-detail-item">
      <div class="left">联系人：</div>
      <div class="right">{{orderOverviewDetail.contactName}}；{{keyToValue(orderOverviewDetail.contactGender, genderStatic)}} ；{{orderOverviewDetail.contactMobile}} {{orderOverviewDetail.contactEmail}}</div>
    </div>
    <div class="task-detail-item">
      <div class="left">业务描述：</div>
      <div class="right">{{orderOverviewDetail.busiDesc}}</div>
    </div>
    <div class="task-detail-item">
      <div class="left">合同方案：</div>
      <div class="right">{{orderOverviewDetail.teamProject}}</div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
  props: {
    orderOverviewDetail: {
      type: Object,
      default: () => { }
    }
  },
  computed: {
    ...mapState({
      projectInvitationStatic: ({ root }) => root.staticData.PROJECT_INVITATION,
      genderStatic: ({ root }) => root.staticData.SEX
    })
  },
  methods: {
    keyToValue(key, list) {
      const obj = Array.isArray(list) && list.filter(val => parseInt(val.value, 10) === parseInt(key, 10))[0];
      return obj ? obj.label : '';
    }
  }
};
</script>
