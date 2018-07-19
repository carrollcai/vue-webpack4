<template>
<div class="base-info">
  <h3>产品基本信息</h3>
  <ul class="b-i-list">
    <li><span>产品名称：</span>{{productList.productName}}</li>
    <li><span>产品价格：</span>{{productList.price}}元</li>
    <li><span>产品类别：</span>{{productList.productType}}</li>
    <li><span>负责人员：</span><label>{{productList.username}}-{{productList.deptment}}-{{productList.position}}</label></li>
    <li class="pro-w-67"><span>产品介绍：</span><label>{{productList.description}}</label></li>
  </ul>
</div>
</template>

<script>

export default {
  props: {
    product: {
      type: Object
    }
  },
  computed: {
    productList() {
      if (this.product) {
        var product = this.product;
        if (this.product.productType === '0') {
          product.productType = '个人市场';
        } else {
          product.productType = '政企市场';
        }
        return this.product;
      }
    }
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
    border-bottom: 1px #E6E6E6 solid;
    padding: 0px 32px;
  }
  .b-i-list {
    display: flex;
    flex-flow: wrap;
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
    .pro-w-67 {
      width: 67%;
    }
  }
}
</style>
