<template>
  <div class="base-info">
    <h3>数据基本信息</h3>
    <ul class="b-i-list">
      <li><span>任务名称：</span>{{ infoData.productName }}</li>
      <li><span>数据日期：</span>{{infoData.price}}</li>
      <li><span>数据类型：</span>{{infoData.productType}}</li>
      <li><span>客户端：</span><label>{{infoData.username}}</label></li>
      <li><span>用户信息：</span><label>{{infoData.operation}}</label></li>
      <li><span>地址：</span>{{infoData.productType}}</li>
    </ul>
    <h3>数据明细设置</h3>
    <ul class="b-i-list">
      <li><span>会员类型：</span>{{infoData.productName}}</li>
      <li><span>性别：</span>{{infoData.price}}</li>
      <li><span>年龄：</span>{{infoData.productType}}</li>
      <li><span>用户行为：</span><label>{{infoData.username}}</label></li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    infoData: Object
  }
};
</script>
<style lang="scss">
.base-info {
  margin-top: 16px;
  padding-bottom: 30px;
  background: #fff;
  h3 {
    height: 48px;
    line-height: 48px;
    font-size: 16px;
    color: #262626;
    margin: 0;
    padding: 12px 32px 0;
  }
  .b-i-list {
    padding: 10px 32px 0;
    li {
      height: auto !important;
      display: flex;
      line-height: 1.5 !important;
      font-size: 14px;
      width: 33%;
      color: #262626;
      margin: 5px 0;
      span {
        min-width: 71px;
        color: #c0c0c0;
      }
    }
  }
}
</style>
