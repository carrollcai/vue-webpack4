<template>
  <div>
    <div class="m-container">
      <div class="breadcrumb">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: toPath }">{{isDetail === '0' ? '产品总览' : '产品创建管理'}}</el-breadcrumb-item>
          <el-breadcrumb-item>产品详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div>
      <baseInfo :product="productSaleDemo"></baseInfo>
      <!--<saleDome :data="productSaleDemo.salesList"></saleDome>-->
      <div class="m-container">
        <el-form class="handle-detail" label-width="86px">
          <el-form-item label="审核结果：">
            <el-radio-group v-model="auditForm.result" @change="handleChangeSalesType">
              <el-radio label="0">通过并入库</el-radio>
              <el-radio label="1">通过</el-radio>
              <el-radio label="2">驳回</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="审核建议：">
            <el-input
              class="form-input-320"
              v-model="auditForm.suggest"
              :maxlength="500"
              placeholder="请输入介绍" type="textarea" :rows="3"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" @click="confirmAudit">确认审核</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import baseInfo from 'components/product/BaseInfo.vue';
// import SaleDome from 'components/product/SaleDome.vue';
import { mapState, mapActions } from 'vuex';

export default {
  components: {
    baseInfo: baseInfo
    // saleDome: SaleDome
  },
  data() {
    return {
      productId: this.$route.params.id,
      isDetail: this.$route.query.isDetail,
      toPath: this.$route.query.isDetail === '0' ? '/product/product-view' : '/product/product-creat-manage',
      auditForm: {
        result: '',
        suggest: ''
      }
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
    confirmAudit() {
      this.setProductAudit();
    },
    ...mapActions([
      'getProductDetail', 'setProductAudit'
    ])
  }
};
</script>

<style lang="scss">
.p-content {
  .crumb-bar {
    .el-breadcrumb {
      line-height: 62px;
    }
  }
  .el-table__expand-column {
    display: none;
  }
}
.handle-detail {
  background-color: #fafafa;
  padding: 20px;
}
</style>
