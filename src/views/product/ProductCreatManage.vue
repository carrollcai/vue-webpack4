<template>
<div class="p-manage">
  <el-form :model="formData" class="form-manage">
    <div class="flex">
      <el-form-item>
        <el-col>
          <el-date-picker v-model="timeRange" @change="getTimeRange" format="yyyy-MM-dd" value-format="yyyy-MM-dd HH:mm:ss" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00','23:59:59']">
          </el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item class="form-query-input-width form-left-width">
        <el-select v-model="formData.productType" clearable placeholder="产品类型">
          <el-option label="全部" value=""></el-option>
          <el-option label="个人市场" value="0"></el-option>
          <el-option label="政企市场" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="form-query-input-width form-left-width">
        <el-input clearable v-model="formData.productName" @change="checkProductName" placeholder="产品名称/编码"></el-input>
      </el-form-item>
    </div>
    <div class="flex">
      <el-form-item class="form-left-width">
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item class="form-left-width">
        <el-button class="el-button--have-icon" @click="toCreatProduct" icon="el-icon-plus">新建产品</el-button>
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
      <el-table-column label="产品编码" show-overflow-tooltip width="180" property="productCode">
      </el-table-column>
      <el-table-column label="产品名称" show-overflow-tooltip property="productName">
      </el-table-column>
      <el-table-column label="产品类别" property="productType" width="90" :formatter="productTypeFn">
      </el-table-column>
      <el-table-column label="创建时间" show-overflow-tooltip width="180" :formatter="dateFn" property="insertdate">
      </el-table-column>
      <el-table-column label="最近更新时间" show-overflow-tooltip width="180" :formatter="dateFn" property="updatedate">
      </el-table-column>
      <el-table-column label="操作" width="160">
        <template slot-scope="operation">
          <el-button class="table-button" type="text" @click="toPageDetail(operation.row)">
            详情
          </el-button>
          <el-button class="table-button" type="text" @click="toPageModefiy(operation.row)">
            修改
          </el-button>
          <el-button class="table-button" type="text" @click="deleteProduct(operation.row)">
            删除
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
      baseInfo: {
        productId: '',
        productName: '',
        productType: '',
        price: '',
        description: '',
        username: '',
        deptment: '',
        version: '',
        position: '',
        salesList: []
      },
      formData: {
        startDate: '',
        endDate: '',
        productType: null,
        productName: '',
        pageNo: 1,
        pageSize: 20
      }
    };
  },
  beforeMount() {
    this.getProductCreatList({ pageNo: 1, pageSize: 20 });
  },
  computed: {
    ...mapState({
      productList: ({ product }) => product.productCreatList
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
      if (time) {
        this.formData.startDate = time[0];
        this.formData.endDate = time[1];
      } else {
        this.formData.startDate = '';
        this.formData.endDate = '';
      }
    },
    checkProductName(value) {
      this.formData.productName = String(value).trim();
    },
    query() {
      // 产品数据查询方法
      this.getProductCreatList(this.formData);
    },
    onSubmit() {
      this.query();
    },
    toCreatProduct() {
      this.$router.push({path: '/product/create'});
    },
    toPageDetail(row) {
      this.$router.push(`/product/product-detail/${row.productId}?isDetail=1`);
    },
    toPageModefiy(row) {
      this.$router.push(`/product/edit/${row.productId}`);
    },
    deleteProduct(row) {
      let productId = row.productId;
      this.$confirm('删除该产品数据, 是否继续?', ' ', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var _this = this;
        this.setdeleteProduct({'productId': productId, 'state': 0}).then((res) => {
          if (res.data) {
            if (res.data > -1) {
              _this.$message({showClose: true, message: '已删除产品成功！', type: 'success'});
              var data = { pageNo: '1', pageSize: '20' };
              _this.getProductCreatList(data);
            } else {
              _this.$message({showClose: true, message: '该产品关联订单，不允许删除', type: 'warning'});
            }
          }
        });
      }).catch((res) => {
        this.$message('已取消删除');
      });
    },
    dateFn(row, column, columnValue) {
      let value = '';
      if (columnValue) {
        value = columnValue.split(' ')[0];
      }
      return value;
    },
    productTypeFn(row, column, columnValue) {
      return columnValue === '0' ? '个人市场' : '政企市场';
    },
    ...mapActions([
      'getProductCreatList',
      'getComposedProduct',
      'setdeleteProduct'
    ])
  }
};
</script>

<style lang="scss">
@import "scss/variables.scss";
.p-manage {
  padding: 24px; background: #fff;
}
</style>
