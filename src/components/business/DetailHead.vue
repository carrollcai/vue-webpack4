<template>
  <div class="business-detail-bar" v-if="type !== '草稿'">
      <div v-if="type === '待处理'" class="detail-bar-item">
        <div class="title">处理人员：</div>
        <div>{{headData.processor}}</div>
      </div>
      <div v-if="type === '待处理'" class="detail-bar-item-2">
        <div class="title">处理结果：</div>
        <div>{{type}}</div>
      </div>

      <div v-if="type === '已转订单'" class="detail-bar-item">
        <div class="title">处理人员：</div>
        <div>{{headData.processor}}</div>
      </div>
      <div v-if="type === '已转订单'" class="detail-bar-item">
        <div class="title">处理结果：</div>
        <div>{{type}}</div>
      </div>
      <div v-if="type === '已转订单'" class="detail-bar-item">
        <div class="title">订单编号：</div>
        <div>{{headData.ordCode}}</div>
      </div>

      <div v-if="type === '已作废'" class="detail-bar-item">
        <div class="title">处理人员：</div>
        <div>{{headData.processor}}</div>
      </div>
      <div v-if="type === '已作废'" class="detail-bar-item">
        <div class="title">处理结果：</div>
        <div>{{type}}</div>
      </div>
      <div v-if="type === '已作废'" class="detail-bar-item">
        <div class="title">作废原因：</div>
        <div class="ellipsis" :title="headData.invalidReason">{{headData.invalidReason}}</div>
      </div>

      <div v-if="type === '已分派'" class="detail-bar-item">
        <div class="title">处理结果：</div>
        <div>{{type}}</div>
      </div>
      <div v-if="type === '已分派'" class="detail-bar-item">
        <div class="title">指派处理人：</div>
        <div>{{headData.nextOpName}}</div>
      </div>
      <div v-if="type === '已分派'" class="detail-bar-item">
        <div class="title">指派说明：</div>
        <div class="ellipsis" :title="headData.dealResult">{{headData.dealResult}}</div>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    type: String,
    headData: Object
  }
};
</script>

<style lang="scss" scoped>
@import "scss/variables.scss";
.business-detail-bar {
  border-radius: 2px;
  background-color: #fafafa;
  padding: 24px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .detail-bar-item {
    flex: 1;
    display: flex;
    .ellipsis {
      width: 230px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
    }
  }
  .title {
    width: 100px;
    text-align: right;
    color: rgba(0, 0, 0, 0.45);
    padding-right: 12px;
  }
  .detail-bar-item-2 {
    flex: 2;
    display: flex;
  }
}
</style>
