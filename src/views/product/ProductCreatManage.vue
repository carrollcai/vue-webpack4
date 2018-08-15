<template>
<div>
  <div class="m-container">
    <el-form :model="productCreateForm" class="form-manage">
      <div class="flex">
        <el-form-item>
          <el-select v-model="productCreateForm.productType" clearable placeholder="产品类型">
            <el-option label="卡类" value="1"></el-option>
            <el-option label="衍生品类" value="2"></el-option>
            <el-option label="活动类" value="3"></el-option>
            <el-option label="智能硬件类" value="4"></el-option>
            <el-option label="会员" value="5"></el-option>
            <el-option label="其他" value="6"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form-query-input-width form-left-width">
          <el-input clearable v-model="productCreateForm.operatorId" @change="checkOperatorId" placeholder="创建人"></el-input>
        </el-form-item>
        <el-form-item class="form-query-input-width form-left-width">
          <el-input clearable v-model="productCreateForm.productName" @change="checkProductName" placeholder="产品名称/编码"></el-input>
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
    <el-tabs v-model="productCreateForm.productStatus" @tab-click="tabChange">
      <el-tab-pane label="全部"></el-tab-pane>
      <el-tab-pane label="待审核" :name="'1'"></el-tab-pane>
      <el-tab-pane label="已发布" :name="'2'"></el-tab-pane>
      <el-tab-pane label="已下线" :name="'3'"></el-tab-pane>
      <el-tab-pane label="驳回" :name="'4'"></el-tab-pane>
    </el-tabs>
  </div>
  <div class="m-container table-container">
    <wm-table
      :source="productList.list"
      :total="productList.totalCount"
      :pageNo="productCreateForm.pageNo"
      :pageSize="productCreateForm.pageSize"
      @onPagination="onPagination"
      @onSizePagination="onSizePagination">
        <el-table-column label="产品编码" show-overflow-tooltip property="productCode">
        </el-table-column>
        <el-table-column label="产品名称" show-overflow-tooltip property="productName">
        </el-table-column>
        <el-table-column label="产品类别" property="productType" :formatter="productTypeFn">
        </el-table-column>
        <el-table-column label="创建人" show-overflow-tooltip property="operatorId">
        </el-table-column>
        <el-table-column label="产品状态" property="productStatusCN">
          <template slot-scope="scope">
            <div>
              {{scope.row.productStatusCN}}
              <el-popover v-if="scope.row.productStatus === 3" placement="top" width="200" trigger="hover">
                <div class="o-popover-title">
                  <p class="op-content">{{scope.row.dealResult.doneDate}}</p>
                  <p class="op-content">{{scope.row.dealResult.opName}}驳回</p>
                  <p class="op-content">原因：{{scope.row.dealResult.cancelReason}}</p>
                </div>
                <i slot="reference" class="el-icon-info"></i>
              </el-popover>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160">
          <template slot-scope="operation">
            <el-button class="table-button" type="text" @click="toPageDetail(operation.row)">
              详情
            </el-button>
            <el-button v-if="operation.row.productType === '1' || operation.row.productType === '4' || operation.row.productType === '2'" class="table-button" type="text" @click="toPageModefiy(operation.row)">
              修改
            </el-button>
            <el-button v-if="operation.row.productType === '2'" class="table-button" type="text" @click="downLine(operation.row)">
              下线
            </el-button>
            <!--<el-button class="table-button" type="text" @click="deleteProduct(operation.row)">
              删除
            </el-button>-->
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
    };
  },
  beforeMount() {
    this.query();
  },
  computed: {
    ...mapState({
      productCreateForm: ({ product }) => product.productCreateForm,
      productList: ({ product }) => product.productCreatList
    })
  },
  methods: {
    downLine(row) {
      this.setProductOff({'productId': row.productId});
      this.query();
    },
    tabChange() {
      this.productCreateForm.pageNo = 1;
      this.productCreateForm.pageSize = 20;
      this.query();
    },
    onPagination(value) {
      this.productList.pageNo = value;
      this.query();
    },
    onSizePagination(value) {
      this.productList.pageSize = value;
      this.query();
    },
    checkProductName(value) {
      this.productCreateForm.productName = String(value).trim();
    },
    checkOperatorId(value) {
      this.productCreateForm.operatorId = String(value).trim();
    },
    query() {
      let params = Object.cloneDeep(this.productCreateForm);
      switch (this.productCreateForm.productStatus) {
        case '':
          params.productStatus = [];
          break;
        case '0':
          params.productStatus = [];
          break;
        case '1':
          params.productStatus = [1, 2];
          break;
        case '2':
          params.productStatus = [4];
          break;
        case '3':
          params.productStatus = [6];
          break;
        case '4':
          params.productStatus = [3];
          break;
      }
      this.getProductCreatList(params);
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
      switch (columnValue) {
        case '1':
          return '卡类';
        case '2':
          return '衍生品类';
        case '3':
          return '活动类';
        case '4':
          return '智能硬件类';
        case '5':
          return '会员';
        case '6':
          return '其他';
      }
    },
    ...mapActions([
      'getProductCreatList',
      'getComposedProduct',
      'setdeleteProduct',
      'setProductOff'
    ])
  }
};
</script>

<style lang="scss">
@import "scss/variables.scss";
.p-manage {
  padding: 24px; background: #fff;
}
.o-popover-title {
  .op-content {
    height: 27px;
    line-height: 17px;
    color: rgba(0, 0, 0, 0.65);
    font-size: 12px;
  }
}
</style>
