<template>
  <div>
    <div class="m-container">
      <el-form :model="salesProductStoreForm"
        class="form-manage">
        <div class="flex">
          <el-form-item>
            <el-select v-model="salesProductStoreForm.productType"
              clearable
              placeholder="产品类型">
              <el-option label="卡类"
                value="1"></el-option>
              <el-option label="衍生品类"
                value="2"></el-option>
              <el-option label="活动类"
                value="3"></el-option>
              <el-option label="智能硬件类"
                value="4"></el-option>
              <el-option label="会员"
                value="5"></el-option>
              <el-option label="其他"
                value="6"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-query-input-width form-left-width">
            <el-select v-model="salesProductStoreForm.codeValue"
              clearable
              placeholder="归属公司">
              <el-option v-for="item in ownerShipCompanyList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-query-input-width form-left-width">
            <el-select v-model="salesProductStoreForm.mainMarket"
              clearable
              placeholder="主营市场">
              <el-option label="全部"
                value=""></el-option>
              <el-option label="政企市场"
                value="3"></el-option>
              <el-option label="家庭市场"
                value="2"></el-option>
              <el-option label="个人市场"
                value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="form-query-input-width form-left-width">
            <el-input clearable
              v-model="salesProductStoreForm.productName"
              @change="checkProductName"
              placeholder="产品名称/编码"></el-input>
          </el-form-item>
        </div>
        <div class="flex">
          <el-form-item class="form-left-width">
            <el-button type="primary"
              @click="onSubmit">查询</el-button>
          </el-form-item>
          <el-form-item class="form-left-width">
            <el-button class="el-button--have-icon"
              @click="toCreatProduct"
              icon="el-icon-plus">新增销售产品</el-button>
          </el-form-item>
        </div>
      </el-form>
      <el-dialog class="new-product-dialog"
        title="新增销售产品"
        :visible.sync="newProductVisible">
        <el-form :model="newForm"
          class="form-manage">
          <div class="flex">
            <el-form-item class="form-input-128">
              <el-select v-model="newForm.productType"
                clearable
                placeholder="产品类型">
                <el-option label="卡类"
                  value="1"></el-option>
                <el-option label="衍生品类"
                  value="2"></el-option>
                <el-option label="活动类"
                  value="3"></el-option>
                <el-option label="智能硬件类"
                  value="4"></el-option>
                <el-option label="会员"
                  value="5"></el-option>
                <el-option label="其他"
                  value="6"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="form-input-128 form-left-width">
              <el-select v-model="newForm.codeValue"
                clearable
                placeholder="归属公司">
                <el-option v-for="item in ownerShipCompanyList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="form-input-128 form-left-width">
              <el-select v-model="newForm.mainMarket"
                clearable
                placeholder="主营市场">
                <el-option label="全部"
                  value=""></el-option>
                <el-option label="政企市场"
                  value="3"></el-option>
                <el-option label="家庭市场"
                  value="2"></el-option>
                <el-option label="个人市场"
                  value="1"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="flex">
            <el-form-item class="form-left-width">
              <el-button type="primary"
                @click="onSubmitOut">查询</el-button>
            </el-form-item>
          </div>
        </el-form>
        <wm-table :source="productOutofLibraryList.list"
          :total="productOutofLibraryList.totalCount"
          :pageNo="newForm.pageNo"
          :pageSize="newForm.pageSize"
          @onPagination="onPaginationOut"
          @onSizePagination="onSizePaginationOut"
          @onSelected="handleSelectionChange">
          <el-table-column type="selection"
            width="55">
          </el-table-column>
          <el-table-column label="产品名称"
            show-overflow-tooltip
            property="productName">
          </el-table-column>
          <el-table-column label="产品类型"
            show-overflow-tooltip
            property="productTypeCN">
          </el-table-column>
          <el-table-column label="主营市场"
            show-overflow-tooltip
            property="mainMarketArrCN">
          </el-table-column>
          <el-table-column label="归属公司"
            show-overflow-tooltip
            property="region">
          </el-table-column>
        </wm-table>
        <!--<el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
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
      </el-table>-->
        <span slot="footer"
          class="dialog-footer">
          <el-button type="primary"
            @click="createProduct()">确 定</el-button>
          <el-button @click="cancelCreate()">取 消</el-button>
        </span>
      </el-dialog>
      <wm-table :source="productLibraryList.list"
        :total="productLibraryList.totalCount"
        :pageNo="salesProductStoreForm.pageNo"
        :pageSize="salesProductStoreForm.pageSize"
        @onPagination="onPagination"
        @onSizePagination="onSizePagination">
        <el-table-column label="产品编码"
          show-overflow-tooltip
          property="productCode">
        </el-table-column>
        <el-table-column label="产品名称"
          show-overflow-tooltip
          property="productName">
        </el-table-column>
        <el-table-column label="主营市场"
          show-overflow-tooltip
          property="mainMarketArrCN">
        </el-table-column>
        <el-table-column label="产品类型"
          show-overflow-tooltip
          property="productTypeCN">
        </el-table-column>
        <el-table-column label="归属公司"
          show-overflow-tooltip
          property="region">
        </el-table-column>
        <el-table-column label="对接人"
          show-overflow-tooltip
          property="broker">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="operation">
            <el-button class="table-button"
              type="text"
              @click="toPageCase(operation.row)">
              案例管理
            </el-button>
            <el-button class="table-button"
              type="text"
              @click="under(operation.row)">
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
      isNotPageChange: true,
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
        productType: null,
        productName: '',
        pageNo: 1,
        pageSize: 20,
        codeType: '',
        codeValue: null
      },
      newProductVisible: false,
      newForm: {
        productType: null,
        codeValue: null,
        codeType: '',
        mainMarket: null,
        pageNo: 1,
        pageSize: 20
      },
      multipleSelection: []
    };
  },
  beforeMount() {
    this.getOwnershipCompany({ codeType: 'REGION', parentCode: '100002' });
    this.getProductLibrary(this.salesProductStoreForm);
    this.getProductOutOfLibrary({ pageNo: 1, pageSize: 20 });
  },
  computed: {
    ...mapState({
      salesProductStoreForm: ({ product }) => product.salesProductStoreForm,
      productLibraryList: ({ product }) => product.productLibraryList,
      productOutofLibraryList: ({ product }) => product.productOutofLibraryList,
      ownerShipCompanyList: ({ product }) => product.ownerShipCompanyList
    })
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = [];
      for (let i = 0; i < val.length; i++) {
        this.multipleSelection.push(val[i].productId);
      }
    },
    async onPagination(value) {
      this.isNotPageChange = false;
      this.salesProductStoreForm.pageNo = value;
      await this.query();
      this.isNotPageChange = true;
    },
    onSizePagination(value) {
      this.salesProductStoreForm.pageSize = value;
      this.query();
    },
    onPaginationOut(value) {
      this.newForm.pageNo = value;
      this.queryOut();
    },
    onSizePaginationOut(value) {
      this.newForm.pageSize = value;
      this.queryOut();
    },
    checkProductName(value) {
      this.salesProductStoreForm.productName = String(value).trim();
    },
    query() {
      this.salesProductStoreForm.pageNo = this.isNotPageChange ? 1 : this.salesProductStoreForm.pageNo;

      if (this.salesProductStoreForm.codeValue) {
        this.salesProductStoreForm.codeType = 'REGION';
      } else {
        this.salesProductStoreForm.codeType = '';
      }
      this.getProductLibrary(this.salesProductStoreForm);
    },
    queryOut() {
      if (this.newForm.codeValue) {
        this.newForm.codeType = 'REGION';
      } else {
        this.newForm.codeType = '';
      }
      this.getProductOutOfLibrary(this.newForm);
    },
    onSubmit() {
      this.query();
    },
    onSubmitOut() {
      this.queryOut();
    },
    toCreatProduct() {
      this.getProductOutOfLibrary({ pageNo: 1, pageSize: 20 });
      this.newProductVisible = true;
    },
    createProduct() {
      this.addSalesProducts({ 'productIdList': this.multipleSelection }).then(res => {
        this.$message({ showClose: true, message: '上架成功！', type: 'success' });
        this.query();
        this.newProductVisible = false;
      });
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
    under(row) {
      this.$confirm('您确定要下架该商品?', ' ', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let id = [];
        id.push(row.productId);
        this.underCarriageProduct({ 'productIdList': id }).then(res => {
          this.$message({ showClose: true, message: '下架成功！', type: 'success' });
          this.query();
        });
      }).catch(() => {
        this.$message('已取消下架');
      });
    },
    deleteProduct(row) {
      let productId = row.productId;
      this.$confirm('删除该产品数据, 是否继续?', ' ', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var _this = this;
        this.setdeleteProduct({ 'productId': productId, 'state': 0 }).then((res) => {
          if (res.data) {
            if (res.data > -1) {
              _this.$message({ showClose: true, message: '已删除产品成功！', type: 'success' });
              var data = { pageNo: '1', pageSize: '20' };
              _this.getProductLibrary(data);
            } else {
              _this.$message({ showClose: true, message: '该产品关联订单，不允许删除', type: 'warning' });
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
      'getProductLibrary',
      'getProductOutOfLibrary',
      'getComposedProduct',
      'setdeleteProduct',
      'getOwnershipCompany',
      'underCarriageProduct',
      'addSalesProducts'
    ])
  }
};
</script>

<style lang="less">
@import "~scss/variables.less";
.p-manage {
  padding: 24px;
  background: #fff;
}
.new-product-dialog {
  .el-dialog__header {
    background: #3778ff;
  }
  .el-dialog__title,
  .el-dialog__headerbtn,
  .el-dialog__close {
    color: #fff;
  }
  .el-dialog__footer {
    text-align: right !important;
  }
}
</style>
