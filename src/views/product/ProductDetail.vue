<template>
<div class="p-content">
  <div class="crumb-bar"><span>产品总览 / </span>产品详情</div>
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
      productId: this.$route.params.id
    };
  },
  computed: {
    ...mapState({
      productSaleDemo: ({ product }) => product.productSaleDemo
    })
  },
  beforeMount() {
    var data = {productId: Number(this.$route.params.id)};
    console.log(data);
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
