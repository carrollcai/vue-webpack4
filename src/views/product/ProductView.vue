<template>
<div class="p-manage">
  <el-form :inline="true" :model="formData" class="demo-form-inline">
    <el-form-item>
      <el-col>
        <el-date-picker v-model="timeRange" @change="getTimeRange" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-select style="width: 130px" v-model="formData.productType" placeholder="产品类型">
        <el-option label="全部" value="" />
        <el-option label="个人市场" value="0" />
        <el-option label="政企市场" value="1" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-input style="width: 130px" v-model="formData.operatorCn" placeholder="创建人"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input style="width: 130px" v-model="formData.productName" placeholder="产品名称/编码" @change="checkProductName"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
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
      <el-table-column label="创建时间" width="170" property="insertdate">
      </el-table-column>
      <el-table-column label="最近更新时间" width="170" property="updatedate">
      </el-table-column>
      <el-table-column label="创建人" show-overflow-tooltip property="operatorId" width="100">
      </el-table-column>
      <el-table-column label="操作" property="" width="80">
        <template slot-scope="operation">
          <span class="blue hand" @click="toPageDetail(operation.row)">详情</span>
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
        pageSize: 10
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
    query() {
      // 产品数据查询方法
      this.getProductList(this.formData);
    },
    onSubmit() {
      this.query();
    },
    toPageDetail(row) {
      const path = `/product/product-detail/${row.productId}`;
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
.p-manage {padding: 24px; background: #fff;}
</style>
