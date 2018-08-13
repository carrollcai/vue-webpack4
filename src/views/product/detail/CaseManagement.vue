<template>
  <div>
    <div class="m-container">
      <div class="breadcrumb">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: toPath }">销售产品库</el-breadcrumb-item>
          <el-breadcrumb-item>案例管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div>
      <div class="base-info">
        <!--<h3>产品基本信息</h3>-->
        <ul class="b-i-list">
            <li><span>产品名称：</span>{{salesCaseDetail.productName}}</li>
            <li><span>产品介绍：</span>{{salesCaseDetail.description}}</li>
            <li>更多产品信息<i @click="showMore = true;" class="el-icon el-icon-arrow-right blue el-table__expand-icon--expanded"></i></li>
        </ul>
        <div v-if="showMore">
          <ul class="b-i-list">
            <li><span>主营市场：</span>{{salesCaseDetail.mainMarket}}</li>
            <li><span>产品类别：</span>{{salesCaseDetail.productType === '0' ? '个人市场' : '政企市场'}}</li>
          </ul>
          <ul class="b-i-list">
            <li><span>价格策略：</span>{{salesCaseDetail.priceStrategy}}</li>
          </ul>
          <ul class="b-i-list">
            <li><span>商务策略：{{salesCaseDetail.commercialStrategy}}</span></li>
          </ul>
          <ul class="b-i-list">
            <li><span>产品归属：</span>{{salesCaseDetail.belongToCompany}}</li>
          </ul>
          <ul class="b-i-list">
            <li><span>产品对接人：</span><label>{{salesCaseDetail.broker}}-{{salesCaseDetail.deptment}}-{{salesCaseDetail.position}}</label></li>
          </ul>
        </div>
      </div>
      <div class="m-container info-block">
        <h3>销售案例</h3>
        <el-table
            border
            :data="salesCaseDetail.salesList">
            <el-table-column label="销售类型" property="salesType" :formatter="salesTypeFormat">
            </el-table-column>
            <el-table-column label="组合产品" property="composedProduct" :formatter="composedProductFormat" show-overflow-tooltip >
            </el-table-column>
            <el-table-column label="方案介绍" show-overflow-tooltip property="scheme">
            </el-table-column>
            <el-table-column label="销售数量" property="salesNumber">
            </el-table-column>
            <el-table-column label="操作" align="center">
            <template slot-scope="scope">
                <el-button type="text" @click="handleEditCase(scope.row, scope.$index)">
                    编辑
                </el-button>
                <el-button type="text" @click="handleDeleteCase(scope.$index, scope.row)">
                删除
                </el-button>
            </template>
            </el-table-column>
        </el-table>
        <product-case ref="prodctCases" v-if="isAddingCase" @cancel="cancelAddingCase" :list="cases" :proId="salesCaseDetail.productId"></product-case>
        <div class="btn_add-case" @click="addCase">
            <i class="el-icon-plus"></i> 添加销售案例
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixins from '../create/mixins';
import { mapState, mapActions } from 'vuex';

export default {
  components: {
  },
  mixins: [mixins],
  data() {
    return {
      productId: this.$route.params.id,
      isDetail: this.$route.query.isDetail,
      toPath: '/product/sales-product-store',
      showMore: false
    };
  },
  computed: {
    ...mapState({
      salesCaseDetail: ({ product }) => product.salesCaseDetail
    })
  },
  beforeMount() {
    var data = {productId: Number(this.$route.params.id)};
    this.getSalesCaseDetail(data);
  },
  methods: {
    ...mapActions([
      'getSalesCaseDetail'
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
.btn_add-case{
    width: 100%;
    height: 32px;
    line-height: 32px;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 1);
    border: 1px dashed rgba(217, 217, 217, 1);
    color: rgba(0, 0, 0, 0.65);
    text-align: center;
    margin: 24px 0;
    cursor: pointer;
  }
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
  }
}
</style>
