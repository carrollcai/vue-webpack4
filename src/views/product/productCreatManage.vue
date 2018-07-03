<template>
<div class="p-manage">
  <el-form :inline="true" :model="formData" class="demo-form-inline box">
    <el-form-item>
      <el-col>
        <!-- <el-date-picker v-model="formData.time" type="date" placeholder="创建时间范围" style="width: 100%;"></el-date-picker> -->
        <el-date-picker v-model="timeRange" @change="getTimeRange" style="width: 225px" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-select v-if="composedProduct" style="width: 130px" v-model="formData.productType" placeholder="产品类型">
        <el-option label="个人市场" value="0"></el-option>
        <el-option label="政企市场" value="1"></el-option>
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
    <el-form-item>
      <el-button type="primary" @click="toCreatProduct">+ 新建产品</el-button>
    </el-form-item>
  </el-form>
  <wm-table
    :source="productList.list"
    :total="productList.totalCount"
    :pageNo="formData.pageNo"
    :pageSize="formData.pageSize"
    @onPagination="onPagination"
    @onSizePagination="onSizePagination"
  >
      <el-table-column label="产品编码" property="productId">
      </el-table-column>
      <el-table-column label="产品名称" property="productName">
      </el-table-column>
      <el-table-column label="产品类别" property="productType">
      </el-table-column>
      <el-table-column label="创建时间" property="insertdate">
      </el-table-column>
      <el-table-column label="最近更新时间" property="updatedate">
      </el-table-column>
      <el-table-column label="操作" property="">
        <template slot-scope="operation">
          <span class="blue hand" @click="toPageDetail(operation.row)">详情</span>
          <span class="blue hand" @click="toPageModefiy(operation.row)">修改</span>
          <span class="blue hand" @click="deleteProduct(operation.row)">删除</span>
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
        pageNo: '1',
        pageSize: '20'
      }
    };
  },
  beforeMount() {
    var data = { pageNo: '1', pageSize: '20' };
    this.getProductCreatList(data);
    // this.getComposedProduct();
  },
  computed: {
    ...mapState({
      productList: ({ product }) => product.productCreatList,
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
    getTimeRange(time) {
      console.log(time);
      this.formData.startDate = time[0];
      this.formData.endDate = time[1];
    },
    query() {
      // 产品数据查询方法
      this.getProductCreatList(this.formData);
    },
    onSubmit() {
      console.log(this.formData);
    },
    toCreatProduct() {
      this.$router.push({path: '/product/create-base-info'});
    },
    toPageDetail(row) {
      const path = `/product/product-detail/${row.productId}`;
      this.$router.push(path);
    },
    toPageModefiy(row) {
      const path = `/product/create-base-info/${row.productId}`;
      this.$router.push(path);
    },
    deleteProduct(row) {
      var productId = row.productId;
      // 校验商机和订单是否有用到
      this.$confirm('删除该产品数据, 是否继续?', ' ', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var _this = this;
        this.setdeleteProduct({'productId': productId}).then((res) => {
          console.log(res);
          if (res.data && res.errorInfo.code === '200') {
            _this.$message({showClose: true, message: '恭喜您，产品创建成功！', type: 'success'});
          }
        });
      }).catch(() => {
        this.$message('已取消删除');
      });
    },
    ...mapActions([
      'getProductCreatList',
      'getComposedProduct',
      'setdeleteProduct'
    ])
  },
  onload() {
    console.log(this.productList);
  }
};
</script>

<style lang="scss">
.p-manage {
  padding: 24px; background: #fff;
}

</style>
