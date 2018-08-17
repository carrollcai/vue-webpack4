<template>
  <div>
    <div class="m-container">
      <div class="breadcrumb">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/product/product-audit-manage' }">产品审核管理</el-breadcrumb-item>
          <el-breadcrumb-item>产品审核</el-breadcrumb-item>
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
              <el-radio v-if="productSaleDemo.opType === 1" label="0">通过并入库</el-radio>
              <el-radio label="1">通过</el-radio>
              <el-radio label="2">驳回</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="审核建议：">
            <el-input
              class="form-input-320"
              v-model="auditForm.suggest"
              :maxlength="50"
              placeholder="如审核不通过，请填写原因供创建者查看" type="textarea" :rows="3"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" @click="confirmAudit">确认审核</el-button>
            <el-button @click="cancel">取消</el-button>
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
    var data = { productId: Number(this.$route.params.id) };
    this.getProductDetail(data);
  },
  methods: {
    confirmAudit() {
      let params = {};
      params.id = Number(this.$route.params.id);
      params.taskInsId = Number(this.$route.params.taskInsId);
      let status = Number(this.$route.params.businessStatus);
      if (status === 1) {
        if (this.auditForm.result === '1') {
          params.resultStatus = 2;
        } else if (this.auditForm.result === '0') {
          params.resultStatus = 3;
        } else if (this.auditForm.result === '2') {
          params.resultStatus = 4;
          if (this.auditForm.suggest.trim() !== '') {
          } else {
            this.$message('请输入审核建议！');
            return;
          }
        }
      } else if (status === 5) {
        if (this.auditForm.result === '1') {
          params.resultStatus = 6;
        } else if (this.auditForm.result === '2') {
          params.resultStatus = 7;
          if (this.auditForm.suggest.trim() !== '') {
          } else {
            this.$message('请输入审核建议！');
            return;
          }
        }
      }
      params.dealResult = this.auditForm.suggest;
      if (params.resultStatus) {
      } else {
        this.$message('请选择审核结果！');
        return;
      }
      // this.setProductAudit(params).then(res => {
      //   this.$router.push(`/product/product-audit-manage`);
      // });
    },
    cancel() {
      this.$router.push(`/product/product-audit-manage`);
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
