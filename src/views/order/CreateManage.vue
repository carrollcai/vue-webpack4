<template>
  <div class="m-container">
    <el-form class="o-overview-form" ref="orderOverview" :rules="overviewRules" :model="orderOverviewForm">
      <div class="flex">
        <el-form-item prop="date">
          <el-date-picker v-model="orderOverviewForm.date" type="daterange" start-placeholder="创建开始日期" end-placeholder="创建结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item class="o-form-item__input">
          <el-input v-model="orderOverviewForm.name" placeholder="合作集团/编码" />
        </el-form-item>
      </div>
      <div class="flex">
        <el-form-item class="task-form-item">
          <el-button type="primary" @click="query">查询</el-button>
        </el-form-item>
        <el-form-item class="order-form-item">
          <el-button class="el-button--have-icon" @click.prevent="handleCreate" icon="el-icon-plus">新建订单</el-button>
        </el-form-item>
      </div>
    </el-form>

    <el-tabs v-model="status">
      <el-tab-pane label="全部"></el-tab-pane>
      <el-tab-pane label="待签约"></el-tab-pane>
      <el-tab-pane label="待付款"></el-tab-pane>
      <el-tab-pane label="已完成"></el-tab-pane>
      <el-tab-pane label="已取消"></el-tab-pane>
    </el-tabs>

    <wm-table :source="orderList" :pageNo="orderOverviewForm.pageNo" :pageSize="orderOverviewForm.pageSize" :total="orderOverviewForm.totalcount" @onPagination="onPagination" @onSizePagination="onSizePagination">
      <el-table-column label="订单编号" property="code" />
      <el-table-column label="订单名称" property="name" />
      <el-table-column label="创建时间" property="date" />
      <el-table-column label="合作集团" property="cooperationCompany" />
      <el-table-column label="处理人" property="submitter" />
      <el-table-column label="订单状态" property="status" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="handleDetail(scope.row)">
            详情
          </el-button>
        </template>
      </el-table-column>
    </wm-table>
  </div>
</template>

<script>
import WmTable from 'components/Table.vue';
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      overviewRules: {}
    };
  },
  components: {
    WmTable
  },
  computed: {
    ...mapState({
      orderList: ({ order }) => order.orderList,
      orderOverviewForm: ({ order }) => order.orderOverviewForm
    })
  },
  beforeMount() {
    this.getOrderList(this.orderOverviewForm);
  },
  methods: {
    onPagination(value) {
      this.orderOverviewForm.pageNo = value;
      this.query();
    },
    onSizePagination(value) {
      this.orderOverviewForm.pageSize = value;
      this.query();
    },
    handleDetail(row) {
      const path = `/order/overview/detail/${row.id}`;
      this.$router.push(path);
    },
    handleCreate() {
      const path = `/order/manage/create`;
      this.$router.push(path);
    },
    query() {
      const params = this.orderOverviewForm;
      this.$refs['orderOverview'].validate(valid => {
        if (!valid) return false;

        this.getOrderList(params);
      });
    },
    ...mapActions([
      'getOrderList'
    ])
  }
};
</script>

<style lang="scss">
@import "scss/variables.scss";
.o-overview-form {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.o-form-item__input {
  width: $inputWidthQuery;
  margin-left: $blockWidth;
}
.order-form-item {
  margin-left: $formWidth;
}
</style>
