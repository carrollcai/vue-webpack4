<template>
<div class="p-manage">
  <el-form :inline="true" :model="formData" class="demo-form-inline">
    <el-form-item>
      <el-col>
        <el-date-picker style="width: 200px" format="yyyy-MM-dd hh:mm:ss" value-format="yyyy-MM-dd hh:mm:ss" v-model="formData.time" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-select style="width: 130px" v-model="formData.type" placeholder="产品类型">
        <el-option label="产品类型一" value="shanghai"></el-option>
        <el-option label="产品类型二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-input style="width: 130px" v-model="formData.create" placeholder="创建人"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input style="width: 130px" v-model="formData.code" placeholder="产品名称/编码"></el-input>
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
          <span class="blue hand" @click="toPageDetail">详情</span>
        </template>
      </el-table-column>
  </wm-table>
</div>
</template>

<script>
import {mapState, mapActions } from 'vuex';
import WmTable from 'components/Table.vue';

export default {
  components: {
    WmTable
  },
  data() {
    return {
      formData: {
        startDate: '',
        endDate: '',
        productType: '0',
        operatorCn: '',
        productName: '',
        pageNo: 1,
        pageSize: 20
      }
    };
  },
  beforeMount() {
    this.getProductCreatList(this.formData);
  },
  computed: {
    ...mapState({
      productList: ({ product }) => product.productList.List
    })
  },
  methods: {
    query() {
      // 产品数据查询方法
      this.getProductCreatList(this.formData);
    },
    onSubmit() {
      console.log(this.formData);
    },
    toCreatProduct() {
      this.$router.push({path: '/product/product-creat'});
    },
    toPageDetail() {
      this.$router.push({path: '/product/product-detail', params: {}});
    },
    ...mapActions([
      'getProductCreatList'
    ])
  },
  onload() {
    console.log(this.productList);
    debugger;
  }
};
</script>

<style lang="scss">
.p-manage {padding: 24px; background: #fff;}
</style>
