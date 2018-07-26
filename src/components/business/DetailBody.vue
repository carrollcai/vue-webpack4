<template>
  <div>
    <div class="task-three-detail">
      <div class="task-three-detail-item">
        <div class="left">商机类别：</div>
        <div class="right">{{detailData.opporTypeName}}</div>
      </div>
      <div class="task-three-detail-item">
        <div class="left">预计协议期限：</div>
        <div class="right">{{detailData.predictAgreementTimeName}}</div>
      </div>
      <div class="task-three-detail-item">
        <div class="left">是否项目招标：</div>
        <div class="right">
          <span class="content" v-if="detailData.isProjectInvitation === '0'">否</span>
          <span class="content" v-if="detailData.isProjectInvitation === '1'">是</span>
        </div>
      </div>
    </div>
    <div class="task-three-detail">
      <div class="task-three-detail-item">
        <div class="left">预计收入：</div>
        <div class="right">{{detailData.predictContractAmount}}万元/月</div>
      </div>
      <div class="task-three-detail-item">
        <div class="left">预计签约时间：</div>
        <div class="right">{{detailData.predictSignTime}}</div>
      </div>
      <div class="task-three-detail-item">
        <div class="left">商机提供人员：</div>
        <div class="right">{{detailData.opId}}（{{detailData.opMobile}}）</div>
      </div>
    </div>
    <div class="task-detail-item">
      <div class="left">合作集团：</div>
      <div class="right">{{detailData.organizeName}}（{{detailData.organizeCode}}）;{{detailData.address}}</div>
    </div>
    <div class="task-detail-item">
      <div class="left">联系人员：</div>
      <div class="right">{{detailData.contactName}} ；{{detailData.contactGenderName}} ；{{detailData.contactMobile}} ；{{detailData.contactEmail}}</div>
    </div>
    <div class="task-detail-item">
      <div class="left">商机描述：</div>
      <div class="right">{{detailData.busiDesc}}</div>
    </div>
    <div class="task-detail-item">
      <div class="left">业务需求：</div>
      <div class="right">{{detailData.busiRequire}}</div>
    </div>
    <div class="task-detail-item">
      <div class="left">需要协调处：</div>
      <div class="right">{{detailData.needCoordinationIssue}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    detailData: JSON
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
@import "scss/variables.scss";
.detail-container {
  background: #fff;
  padding-bottom: 40px;
  margin-top: 0px;
}
</style>
