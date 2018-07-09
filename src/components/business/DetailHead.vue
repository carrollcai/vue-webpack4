<template>
  <div class="business-detail">
      <div class="business-detail-content">
        <!--待处理-->
        <div v-if="type === '待处理'" class="business-detail-content-item">
          <span class="left">处理人员：</span>
          <span class="right">张小明</span>
        </div>
        <div v-if="type === '待处理'" class="business-detail-content-item">
          <span class="left">处理结果：</span>
          <span class="right">客户签约</span>
        </div>
        <!--<div v-if="type === '0'" class="business-detail-content-item">
          <span class="left">合同下载：</span>
          <a class="down" href="#">第三次签约合同.doc</a>
        </div>-->
        <!--已转订单-->
        <div v-if="type === '已转订单'" class="business-detail-content-item">
          <span class="left">处理人员：</span>
          <span class="right">张小明</span>
        </div>
        <div v-if="type === '已转订单'" class="business-detail-content-item">
          <span class="left">处理结果：</span>
          <span class="right">已转订单</span>
        </div>
        <div v-if="type === '已转订单'" class="business-detail-content-item">
          <span class="left">订单编号：</span>
          <span class="down">HJK89564873</span>
        </div>
        <!--已作废-->
        <div v-if="type === '已作废'" class="business-detail-content-item">
          <span class="left">处理人员：</span>
          <span class="right">张小明</span>
        </div>
        <div v-if="type === '已作废'" class="business-detail-content-item">
          <span class="left">处理结果：</span>
          <span class="right">作废</span>
        </div>
        <div v-if="type === '已作废'" class="business-detail-content-item">
          <span class="left">作废原因：</span>
          <span class="down">这个商机不合适，作废吧</span>
        </div>
        <!--已分派-->
        <div v-if="type === '已分派'" class="business-detail-content-item">
          <span class="left">处理结果：</span>
          <span class="right">已分派</span>
        </div>
        <div v-if="type === '已分派'" class="business-detail-content-item">
          <span class="left">指派处理人：</span>
          <span class="down">张三疯</span>
        </div>
        <div v-if="type === '已分派'" class="business-detail-content-item">
          <span class="left">指派说明：</span>
          <span class="right">你来处理这个商机吧，你懂</span>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    type: String
  }
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
