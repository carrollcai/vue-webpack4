<template>
<div class="p-manage m-container">
  <el-form :model="formData" class="demo-form-inline">
    <div class="flex">
      <el-form-item>
        <el-col>
          <el-date-picker v-model="timeRange" @change="getTimeRange" format="yyyy-MM-dd" value-format="yyyy-MM-dd HH:mm:ss" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00','23:59:59']">
          </el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item class="p-form-item__lable">
        <el-select class="item-width" v-model="formData.productType" clearable placeholder="产品类型">
          <el-option label="全部" value="" />
          <el-option label="个人市场" value="0" />
          <el-option label="政企市场" value="1" />
        </el-select>
      </el-form-item>
      <el-form-item class="p-form-item__lable">
        <el-input class="item-width" clearable v-model="formData.operatorCn" @change="checkOperatorCn" placeholder="创建人"></el-input>
      </el-form-item>
      <el-form-item class="p-form-item__lable">
        <el-input class="item-width" clearable v-model="formData.productName" placeholder="产品名称/编码" @change="checkProductName"></el-input>
      </el-form-item>
    </div>
    <div class="flex product-query-btns">
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </div>
  </el-form>
  <wm-table
    :source="productList.list"
    :total="productList.totalCount"
    :pageNo="formData.pageNo"
    :pageSize="formData.pageSize"
    @onPagination="onPagination"
    @onSizePagination="onSizePagination">
      <el-table-column label="产品编码" show-overflow-tooltip width="170" property="productCode">
      </el-table-column>
      <el-table-column label="产品名称" show-overflow-tooltip property="productName">
      </el-table-column>
      <el-table-column label="产品类别" property="productType" width="90" :formatter="productTypeFn">
      </el-table-column>
      <el-table-column label="创建时间" width="170" property="insertdate" :formatter="dateFn">
      </el-table-column>
      <el-table-column label="最近更新时间" width="170" property="updatedate" :formatter="dateFn">
      </el-table-column>
      <el-table-column label="创建人" show-overflow-tooltip property="operatorId" width="100">
      </el-table-column>
      <el-table-column label="操作" width="80">
        <template slot-scope="operation">
          <el-button class="table-button" type="text" @click="toPageDetail(operation.row)">
            详情
          </el-button>
        </template>
      </el-table-column>
  </wm-table>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import WmTable from 'components/Table.vue';

export default {
  components: {
    WmTable
  },
  data() {
    return {
      timeRange: '',

      formData: {
        startDate: '',
        endDate: '',
        productName: '',
        productType: null,
        operatorCn: '',
        pageNo: 1,
        pageSize: 20
      }
    };
  },
  beforeMount() {
    this.getProductList(this.formData);
  },
  computed: {
    pageNo() {
      return Number(this.formData.pageNo);
    },
    ...mapState({
      productList: ({ product }) => product.productList,
      composedProduct: ({ product }) => product.composedProduct
    })
  },
  methods: {
    onPagination(value) {
      this.formData.pageNo = value;
      this.query();
    },
    onSizePagination(value) {
      this.formData.pageSize = value;
      this.query();
    },
    checkOperatorCn(value) {
      this.formData.operatorCn = String(value).trim();
    },
    checkProductName(value) {
      this.formData.productName = String(value).trim();
    },
    getTimeRange(time) {
      if (time) {
        this.formData.startDate = time[0];
        this.formData.endDate = time[1];
      } else {
        this.formData.startDate = '';
        this.formData.endDate = '';
      }
    },
    dateFn(row, column, columnValue) {
      let value = '';
      if (columnValue) {
        value = columnValue.split(' ')[0];
      }
      return value;
    },
    query() {
      // 产品数据查询方法
      this.getProductList(this.formData);
    },
    onSubmit() {
      this.query();
    },
    toPageDetail(row) {
      const path = `/product/product-detail/${row.productId}?isDetail=0`;
      this.$router.push(path);
    },
    productTypeFn(row, column, columnValue) {
      if (columnValue === '0') {
        return '个人市场';
      } else {
        return '政企市场';
      }
    },
    ...mapActions([
      'getProductList'
    ])
  }
};
</script>

<style lang="scss">
@import "scss/variables.scss";
.p-form-item__lable {
  width: $inputWidthQuery;
  margin-left: $blockWidth;
}
.p-manage {
  // padding: 24px; background: #fff;
  .demo-form-inline {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .item-width {
    width: $inputWidthQuery;
  }

  .product-query-btns{
    margin-left: 40px;
  }
}
</style>
