<template>
<div class="p-content">
  <div class="crumb-bar">
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: toPath }">{{isDetail === '0' ? '产品总览' : '产品创建管理'}}</el-breadcrumb-item>
      <el-breadcrumb-item>产品详情</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <baseInfo :product="productSaleDemo"></baseInfo>
  <saleDome :data="productSaleDemo.salesList"></saleDome>
</div>
</template>

<script>
import baseInfo from 'components/product/BaseInfo.vue';
import SaleDome from 'components/product/SaleDome.vue';
import { mapState, mapActions } from 'vuex';

export default {
  components: {
    baseInfo: baseInfo,
    saleDome: SaleDome
  },
  data() {
    return {
      productId: this.$route.params.id,
      isDetail: this.$route.query.isDetail,
      toPath: this.$route.query.isDetail === '0' ? '/product/product-view' : '/product/product-creat-manage'
    };
  },
  computed: {
    ...mapState({
      productSaleDemo: ({ product }) => product.productSaleDemo
    })
  },
  beforeMount() {
    var data = {productId: Number(this.$route.params.id)};
    this.getProductDetail(data);
  },
  methods: {
    ...mapActions([
      'getProductDetail'
    ])
  }
};
</script>

<style lang="scss">
.p-content {
  .crumb-bar {
    .el-breadcrumb {
      line-height: 48px;
    }
  }
  .el-table__expand-column {
    display: none;
  }
}
</style>
