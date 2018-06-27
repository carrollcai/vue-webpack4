<template>
<div class="p-content">
  <div class="crumb-bar"><span>产品总览 / </span>产品详情</div>
  <baseInfo></baseInfo>
  <saleDome></saleDome>
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
    return {};
  },
  computed: {
    ...mapState({
      productBaseInfo: ({ product }) => product.productBaseInfo,
      productSaleDemo: ({ product }) => product.productSaleDemo
    })
  },
  beforeMount() {
    this.getProductDetail();
  },
  methods: {
    ...mapActions([
      'getProductDetail'
    ])
  },
  onload() {
    console.log(this.productBaseInfo);
    console.log(this.productSaleDemo);
  }
};
</script>

<style lang="scss">
.crumb-bar {
  height: 48px;
  line-height: 48px;
  font-size: 12px;
  color: #595959;
  background: #fff;
  padding: 0 32px;
  span {
    color: #c0c0c0;
  }
}
</style>
