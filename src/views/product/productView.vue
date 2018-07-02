<template>
<div class="p-manage">
  <el-form :inline="true" :model="formData" class="demo-form-inline">
    <el-form-item>
      <el-col>
        <el-date-picker v-model="timeRange" @change="getTimeRange" style="width: 225px" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-select v-if="composedProduct" style="width: 130px" v-model="formData.productType" placeholder="产品类型">
        <el-option v-for="item in composedProduct" :key="item.productId" :label="item.productName" :value="item.productId" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-input style="width: 130px" v-model="formData.operatorCn" placeholder="创建人"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input style="width: 130px" v-model="formData.productName" placeholder="产品名称/编码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>
  <wm-table
    :source="productList"
    :pageNo="formData.pageNo"
    :pageSize="formData.pageSize"
  >
      <el-table-column label="产品编码" property="productId">
      </el-table-column>
      <el-table-column label="产品名称" property="productName">
      </el-table-column>
      <el-table-column label="产品类别" property="productType">
      </el-table-column>
      <el-table-column label="创建时间" property="insertdate">
      </el-table-column>
      <el-table-column label="最近更新时间" property="updateTime">
      </el-table-column>
      <el-table-column label="操作" property="">
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
        productType: '',
        operatorCn: '',
        productName: '',
        pageNo: 1,
        pageSize: 20
      }
    };
  },
  beforeMount() {
    this.getProductList(this.formData);
    this.getComposedProduct();
  },
  computed: {
    pageNo() {
      return Number(this.formData.pageNo);
    },
    ...mapState({
      productList: ({ product }) => product.productList.List,
      composedProduct: ({ product }) => product.composedProduct
    })
  },
  methods: {
    getTimeRange(time) {
      console.log(time);
      this.formData.startDate = time[0];
      this.formData.endDate = time[1];
    },
    query() {
      // 产品数据查询方法
      this.getProductList(this.formData);
    },
    onSubmit() {
      console.log(this.formData);
    },
    toPageDetail(row) {
      const path = `/product/product-detail/${row.productId}`;
      this.$router.push(path);
    },
    ...mapActions([
      'getProductList',
      'getComposedProduct'
    ])
  },
  onload() {
    console.log(this.productList);
  }
};
</script>

<style lang="scss">
.p-manage {padding: 24px; background: #fff;}
</style>
