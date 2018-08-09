<template>
<div>
  <div class="m-container">
    <el-form :model="formData" class="form-manage">
      <div class="flex">
        <el-form-item>
          <el-select v-model="formData.productType" clearable placeholder="产品类型">
            <el-option label="全部" value=""></el-option>
            <el-option label="个人市场" value="0"></el-option>
            <el-option label="政企市场" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form-query-input-width form-left-width">
          <el-select v-model="formData.ownerCompany" clearable placeholder="归属公司">
            <el-option label="全部" value=""></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form-query-input-width form-left-width">
          <el-select v-model="formData.mainMarket" clearable placeholder="主营市场">
            <el-option label="全部" value=""></el-option>
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
          <el-button class="el-button--have-icon" @click="toCreatProduct" icon="el-icon-plus">新增销售产品</el-button>
        </el-form-item>
      </div>
    </el-form>
    <el-dialog class="new-product-dialog" title="新增销售产品" :visible.sync="newProductVisible">
      <el-form :model="newForm" class="form-manage">
        <div class="flex">
        <el-form-item class="form-input-128">
          <el-select v-model="newForm.productType" clearable placeholder="产品类型">
            <el-option label="全部" value=""></el-option>
            <el-option label="个人市场" value="0"></el-option>
            <el-option label="政企市场" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form-input-128 form-left-width">
          <el-select v-model="newForm.ownerCompany" clearable placeholder="归属公司">
            <el-option label="全部" value=""></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form-input-128 form-left-width">
          <el-select v-model="newForm.mainMarket" clearable placeholder="主营市场">
            <el-option label="全部" value=""></el-option>
          </el-select>
        </el-form-item>
        </div>
        <div class="flex">
        <el-form-item class="form-left-width">
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
        </div>
      </el-form>
      <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column label="产品名称" show-overflow-tooltip property="productName">
        </el-table-column>
        <el-table-column label="产品类型" show-overflow-tooltip property="productType" :formatter="productTypeFn">
        </el-table-column>
        <el-table-column label="主营市场" show-overflow-tooltip property="mainMarket">
        </el-table-column>
        <el-table-column label="归属公司" show-overflow-tooltip property="ownershipCompany">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="createProduct()">确 定</el-button>
        <el-button @click="cancelCreate()">取 消</el-button>
      </span>
    </el-dialog>
    <wm-table
      :source="productList.list"
      :total="productList.totalCount"
      :pageNo="formData.pageNo"
      :pageSize="formData.pageSize"
      @onPagination="onPagination"
      @onSizePagination="onSizePagination">
        <el-table-column label="产品编码" show-overflow-tooltip property="productCode">
        </el-table-column>
        <el-table-column label="产品名称" show-overflow-tooltip property="productName">
        </el-table-column>
        <el-table-column label="主营市场" property="mainMarket">
        </el-table-column>
        <el-table-column label="产品类型" property="productType" :formatter="productTypeFn">
        </el-table-column>
        <el-table-column label="归属公司" property="ownershipCompany">
        </el-table-column>
        <el-table-column label="对接人" show-overflow-tooltip property="connectName">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="operation">
            <el-button class="table-button" type="text" @click="toPageCase(operation.row)">
              案例管理
            </el-button>
            <el-button class="table-button" type="text" @click="toPageModefiy(operation.row)">
              下架
            </el-button>
          </template>
        </el-table-column>
    </wm-table>
  </div>
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
        createName: '',
        pageNo: 1,
        pageSize: 20,
        opporStatus: '0'
      },
      newProductVisible: false,
      newForm: {
        productType: '',
        ownerCompany: '',
        mainMarket: ''
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
      this.newProductVisible = true;
    },
    createProduct() {
      this.newProductVisible = false;
    },
    cancelCreate() {
      this.newProductVisible = false;
    },
    toPageCase(row) {
      this.$router.push(`/product/case-management/${row.productId}`);
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
.new-product-dialog {
  .el-dialog__header {
    background: #3778FF;
  }
  .el-dialog__title, .el-dialog__headerbtn, .el-dialog__close {
    color: #fff;
  }
  .el-dialog__footer {
    text-align: right !important;
  }
}
</style>
