<template>
  <div>
    <div class="m-container">
      <el-form class="o-overview-form" ref="orderOverview" :rules="overviewRules" :model="orderOverviewForm">
        <div class="flex">
          <el-form-item prop="date">
            <el-date-picker v-model="orderOverviewForm.date" type="daterange" start-placeholder="创建开始日期" end-placeholder="创建结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item class="form-query-input-width form-left-width">
            <el-input clearable v-model="orderOverviewForm.ordNameOrCode" placeholder="订单名称/编码" />
          </el-form-item>
          <el-form-item class="form-query-input-width form-left-width">
            <el-input clearable v-model="orderOverviewForm.organizeNameOrCode" placeholder="集团名称/编码" />
          </el-form-item>
        </div>
        <div class="flex">
          <el-form-item class="task-form-item">
            <el-button type="primary" @click="query">查询</el-button>
          </el-form-item>
        </div>
      </el-form>
      <el-tabs v-model="orderOverviewForm.ordStatus" @tab-click="tabChange">
        <el-tab-pane label="全部" :name="0"></el-tab-pane>
        <el-tab-pane label="待签约" :name="2"></el-tab-pane>
        <el-tab-pane label="待付款" :name="3"></el-tab-pane>
        <el-tab-pane label="已完成" :name="4"></el-tab-pane>
        <el-tab-pane label="已取消" :name="5"></el-tab-pane>
      </el-tabs>
    </div>

    <div class="m-container table-container">
      <wm-table :source="orderOverviewObj.list" :pageNo="orderOverviewForm.pageNo" :pageSize="orderOverviewForm.pageSize" :total="orderOverviewObj.totalCount" @onPagination="onPagination" @onSizePagination="onSizePagination">
        <el-table-column label="订单编号" property="ordCode" />
        <el-table-column label="订单名称" property="ordName" />
        <el-table-column label="创建时间" property="createDate" />
        <el-table-column label="合作集团" property="organizeName" />
        <el-table-column label="处理人" property="processorName" />
        <el-table-column label="订单状态">
          <template slot-scope="scope">
            {{orderStatus[scope.row.ordStatus]}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button class="table-button" type="text" @click="handleDetail(scope.row)">
              详情
            </el-button>
          </template>
        </el-table-column>
      </wm-table>
    </div>
  </div>
</template>

<script>
import WmTable from 'components/Table.vue';
import { mapActions, mapState, mapMutations } from 'vuex';
import { ORDER_STATUS } from '@/config/index.js';
import moment from 'moment';

export default {
  data() {
    return {
      orderStatus: ORDER_STATUS,
      overviewRules: {},
      isNotPageChange: true
    };
  },
  components: {
    WmTable
  },
  computed: {
    ...mapState({
      orderOverviewObj: ({ order }) => order.orderOverviewObj,
      orderOverviewForm: ({ order }) => order.orderOverviewForm
    })
  },
  beforeMount() {
    this.$nextTick(() => {
      this.query();
    });
  },
  methods: {
    tabChange() {
      this.pageChange();
      this.query();
    },
    handleDetail(row) {
      const path = `/order/overview/detail/${row.ordId}/${row.processInsId}`;
      this.$router.push(path);
    },
    async onPagination(value) {
      this.isNotPageChange = false;
      this.pageChange({ pageNo: value });
      await this.query();
      this.isNotPageChange = true;
    },
    onSizePagination(value) {
      this.pageChange({ pageSize: value });
      this.query();
    },
    query() {
      // 查询的时候，需要将pageNo置为1
      this.isNotPageChange && this.pageChange({ pageNo: 1 });
      const params = Object.cloneDeep(this.orderOverviewForm);

      if (params.date && params.date.length) {
        params.startDate = moment(params.date[0]).format('YYYY-MM-DD');
        params.endDate = moment(params.date[1]).format('YYYY-MM-DD');
      } else {
        params.startDate = '';
        params.endDate = '';
      }
      let { date, ..._params } = params;
      this.$refs['orderOverview'].validate(valid => {
        if (!valid) return false;

        return this.getOrderOverviewList(_params);
      });
    },
    ...mapMutations({
      pageChange: 'ORDER_OVERVIEW_PAGE_CHANGE'
    }),
    ...mapActions([
      'getOrderOverviewList'
    ])
  }
};
</script>

<style lang="scss">
@import "scss/variables.scss";
.o-overview-table {
  margin-top: $blockWidth;
}
.o-overview-form {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
