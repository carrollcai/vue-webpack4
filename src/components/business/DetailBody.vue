<template>
  <div class="detail-container">
      <div class="business-detail-body-item">
        <span class="title">商机类别：</span>
        <span class="content">{{detailData.opporType}}</span>
        <span class="title">预计协议期限：</span>
        <span class="content">{{detailData.predictAgreementTime}}</span>
        <span class="title">是否项目招标：</span>
        <span class="content" v-if="detailData.isProjectInvitation === '0'">否</span>
        <span class="content" v-if="detailData.isProjectInvitation === '1'">是</span>
      </div>
      <div class="business-detail-body-item">
        <span class="title">预计收入：</span>
        <span class="content">{{detailData.predictContractAmount}}万/月</span>
        <span class="title">预计签约时间：</span>
        <span class="content">{{detailData.predictSignTime}}</span>
        <span class="title">商机提供人员：</span>
        <span class="content">{{detailData.opId}}</span>
      </div>
      <div class="business-detail-body-item">
        <div class="left">合作集团：</div>
        <div class="right">{{detailData.organizeName}}</div>
      </div>
      <div class="business-detail-body-item">
        <div class="left">联系人员：</div>
        <div class="right">{{detailData.contactName}} ；{{detailData.contactGenderName}} ；{{detailData.contactMobile}} ；{{detailData.contactEmail}}</div>
      </div>
      <div class="business-detail-body-item">
        <div class="left">商机描述：</div>
        <div class="right">{{detailData.busiDesc}}</div>
      </div>
      <div class="business-detail-body-item">
        <div class="left">业务需求：</div>
        <div class="right">{{detailData.busiRequire}}</div>
      </div>
      <div class="business-detail-body-item">
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
.business-detail-body-item {
  display: flex;
  padding-top: 16px;
  & .left {
    width: 122px;
    text-align: right;
    color: rgba(0, 0, 0, 0.45);
    padding-right: 12px;
  }
  & .right {
    flex: 1;
    text-align: left;
    padding-right: 108px;
  }
  & .down {
    height: 20px;
    line-height: 20px;
    color: rgba(55, 120, 255, 1);
    font-size: 14px;
    text-align: left;
  }
  & .title {
    width: 122px;
    text-align: right;
    color: rgba(0, 0, 0, 0.45);
    padding-right: 12px;
    font-size: 14px;
    height: 20px;
    line-height: 20px;
  }
  & .content {
    width: 215px;
  }
}
.business-detail-body-title {
  height: 68px;
  display: flex;
  background: #FAFAFA 100%;
  margin: 32px 36px 8px 32px;
  & .item {
    flex: 1;
    text-align: left;
    color: rgba(0, 0, 0, 0.45);
  }
}
</style>
