<template>
<div>
  <div class="m-container">
    <el-form :model="productAuditManageForm" class="form-manage">
      <div class="flex">
        <el-form-item>
          <el-col>
            <el-date-picker v-model="productAuditManageForm.date" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item class="form-query-input-width form-left-width">
          <el-input clearable v-model="productAuditManageForm.staffName" placeholder="提交人"></el-input>
        </el-form-item>
        <el-form-item class="form-query-input-width form-left-width">
          <el-input clearable v-model="productAuditManageForm.productNameOrCode" @change="checkProductName" placeholder="产品名称/编码"></el-input>
        </el-form-item>
      </div>
      <div class="flex">
        <el-form-item class="form-left-width">
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </div>
    </el-form>
    <el-tabs v-model="productAuditManageForm.taskHasComplete" @tab-click="tabChange">
      <el-tab-pane label="待审核" :name="'0'"></el-tab-pane>
      <el-tab-pane label="已审核" :name="'1'"></el-tab-pane>
    </el-tabs>
  </div>
  <div class="m-container table-container">
    <wm-table
      :source="productTaskInfoList.list"
      :total="productTaskInfoList.totalCount"
      :pageNo="productAuditManageForm.pageNo"
      :pageSize="productAuditManageForm.pageSize"
      @onPagination="onPagination"
      @onSizePagination="onSizePagination">
        <el-table-column label="产品名称" show-overflow-tooltip property="productName">
        </el-table-column>
        <el-table-column label="操作类型" show-overflow-tooltip property="opTypeName">
        </el-table-column>
        <el-table-column label="提交时间" property="insertDate">
        </el-table-column>
        <el-table-column label="提交人" show-overflow-tooltip property="staffName">
        </el-table-column>
        <el-table-column label="用户归属" show-overflow-tooltip property="opRegionName">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="operation">
            <el-button v-if="productAuditManageForm.taskHasComplete === '1'" class="table-button" type="text" @click="toPageDetail(operation.row)">
              详情
            </el-button>
            <el-button v-if="productAuditManageForm.taskHasComplete === '0'" class="table-button" type="text" @click="toPageAudit(operation.row)">
              去审核
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
import moment from 'moment';
export default {
  components: {
    WmTable
  },
  data() {
    return {
    };
  },
  beforeMount() {
    let { date, ..._params } = this.productAuditManageForm;
    this.getProductTaskInfo(_params);
  },
  computed: {
    ...mapState({
      productAuditManageForm: ({ product }) => product.productAuditManageForm,
      productTaskInfoList: ({ product }) => product.productTaskInfoList
    })
  },
  methods: {
    tabChange() {
      this.productAuditManageForm.pageNo = 1;
      this.productAuditManageForm.pageSize = 20;
      this.query();
    },
    onPagination(value) {
      this.productAuditManageForm.pageNo = value;
      this.query();
    },
    onSizePagination(value) {
      this.productAuditManageForm.pageSize = value;
      this.query();
    },
    checkProductName(value) {
      this.productAuditManageForm.productNameOrCode = String(value).trim();
    },
    query() {
      const params = this.productAuditManageForm;

      if (params.date !== null && params.date.length === 2) {
        params.startDate = moment(params.date[0]).format('YYYY-MM-DD');
        params.endDate = moment(params.date[1]).format('YYYY-MM-DD');
      } else {
        params.startDate = '';
        params.endDate = '';
      }
      let { date, ..._params } = this.productAuditManageForm;
      this.getProductTaskInfo(_params);
    },
    onSubmit() {
      this.query();
    },
    toCreatProduct() {
      this.$router.push({path: '/product/create'});
    },
    toPageDetail(row) {
      this.$router.push(`/product/product-audit-detail/${row.productId}?isDetail=1`);
    },
    toPageAudit(row) {
      this.$router.push(`/product/product-audit/${row.productId}/${row.taskInsId}/${row.businessStatus}`);
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
    ...mapActions([
      'getProductTaskInfo',
      'getProductCreatList',
      'setdeleteProduct'
    ])
  }
};
</script>

<style lang="scss">
@import "scss/variables.scss";
// .p-manage {
//   padding: 24px; background: #fff;
// }
</style>
