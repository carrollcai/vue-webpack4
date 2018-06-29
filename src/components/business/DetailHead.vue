<template>
  <div class="business-detail">
      <div class="business-detail-content">
        <div class="business-detail-content-item">
          <span class="left">处理人员：</span>
          <span class="right">张小明</span>
        </div>
        <div class="business-detail-content-item">
          <span class="left">处理结果：</span>
          <span class="right">客户签约</span>
        </div>
        <div class="business-detail-content-item">
          <span class="left">合同下载：</span>
          <a class="down" href="#">第三次签约合同.doc</a>
        </div>
        <!--<div class="business-detail-content-item">
          <span class="left">处理结果：</span>
          <span class="right">已转订单</span>
        </div>
        <div class="business-detail-content-item">
          <span class="left">订单编号：</span>
          <span class="down">HJK89564873</span>
        </div>-->
      </div>
    </div>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>
@import "scss/variables.scss";
.business-detail {
  margin-top: $blockWidth;
}
.business-detail {
  margin-top: 16px;
  background: #ffffff;
  padding: 32px 36px 8px 32px;
  & .business-detail-content {
    height: 42px;
    background: #fafafa;
    padding-top: 26px;
    padding-left: 19px;
    & .business-detail-content-item {
      width: 349px;
      float: left;
      & .left {
        height: 22px;
        line-height: 22px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
        padding-right: 12px;
      }
      & .right {
        height: 20px;
        line-height: 20px;
        color: rgba(0, 0, 0, 0.85);
        font-size: 14px;
        text-align: left;
      }
    }
  }
}
</style>
