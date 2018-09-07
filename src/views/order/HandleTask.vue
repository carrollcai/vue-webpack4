<template>
  <div>
    <div class="m-container">
      <!-- <el-dialog title="分派" :visible.sync="dialogVisible" width="360px" :before-close="handleClose" center>
        <el-form ref="assignHandle" :rules="assignHandleRules" :model="assignHandle">
          <div class="handler">指派处理人：</div>
          <el-form-item prop="dealPerson">
            <el-cascader class="form-input-large" expand-trigger="hover" :options="assignHandlers" v-model="assignHandle.dealPerson" placeholder="请选择"></el-cascader>
          </el-form-item>
          <div class="reason">分派的原因：</div>
          <el-form-item prop="dealResult">
            <el-input v-model="assignHandle.dealResult" class="form-input-large" type="textarea" placeholder="请输入优势能力" />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitAssign">确 定</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </span>
      </el-dialog> -->

      <el-form class="form-manage"
        ref="orderHandleTask"
        :rules="orderHandleTaskRules"
        :model="orderHandleTaskForm">
        <div class="flex">
          <el-form-item prop="date">
            <el-date-picker v-model="orderHandleTaskForm.date"
              type="daterange"
              start-placeholder="创建开始日期"
              end-placeholder="创建结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item class="form-query-input-width form-left-width">
            <el-input clearable
              v-model="orderHandleTaskForm.ordNameOrCode"
              placeholder="订单名称/编号" />
          </el-form-item>
          <el-form-item class="form-query-input-width form-left-width">
            <el-input clearable
              v-model="orderHandleTaskForm.organizeNameOrCode"
              placeholder="合作集团/编码" />
          </el-form-item>
          <el-form-item class="form-query-input-width form-left-width">
            <el-input clearable
              v-model="orderHandleTaskForm.staffName"
              placeholder="创建人" />
          </el-form-item>
        </div>
        <div class="flex">
          <el-form-item class="form-left-width">
            <el-button type="primary"
              @click="query">查询</el-button>
          </el-form-item>
        </div>
      </el-form>

      <el-tabs v-model="orderHandleTaskForm.businessStatus"
        @tab-click="tabChange">
        <el-tab-pane label="待签约处理"
          name="0"></el-tab-pane>
        <el-tab-pane label="待付款处理"
          name="4"></el-tab-pane>
        <el-tab-pane label="已处理"
          name="1"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="m-container table-container">
      <wm-table :source="orderHandleTaskObj.list"
        :pageNo="orderHandleTaskForm.pageNo"
        :pageSize="orderHandleTaskForm.pageSize"
        :total="orderHandleTaskObj.totalCount"
        @onPagination="onPagination"
        @onSizePagination="onSizePagination">
        <el-table-column label="订单编号"
          property="ordCode" />
        <el-table-column label="订单名称"
          property="ordName" />
        <el-table-column label="创建时间"
          property="createDate" />
        <el-table-column label="合作集团"
          property="organizeName" />
        <el-table-column label="创建人"
          property="staffName" />
        <el-table-column v-if="orderHandleTaskForm.businessStatus === '1'"
          label="处理结果"
          property="businessStatusName" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button v-if="orderHandleTaskForm.businessStatus === '0'"
              class="table-button"
              type="text"
              @click="handleSign(scope.row)">
              签约处理
            </el-button>
            <el-button v-if="orderHandleTaskForm.businessStatus === '4'"
              class="table-button"
              type="text"
              @click="handlePay(scope.row)">
              付款处理
            </el-button>
            <!-- 830版本去掉分派功能 -->
            <el-button class="table-button"
              type="text"
              @click="handleDetail(scope.row)">
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
import dayjs from 'dayjs';

export default {
  data() {
    return {
      isNotPageChange: true,
      orderHandleTaskRules: {},
      currentRow: {}
    };
  },
  components: {
    WmTable
  },
  computed: {
    ...mapState({
      orderHandleTaskObj: ({ order }) => order.orderHandleTaskObj,
      orderHandleTaskForm: ({ order }) => order.orderHandleTaskForm
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
    handlePay(row) {
      const path = `/order/handle-task/pay/${row.ordCode}?ordId=${row.ordId}&taskInsId=${row.taskInsId}`;
      this.$router.push(path);
    },
    handleSign(row) {
      const path = `/order/handle-task/sign/${row.ordCode}?ordId=${row.ordId}&taskInsId=${row.taskInsId}`;
      this.$router.push(path);
    },
    handleDetail(row) {
      const { businessStatus } = this.orderHandleTaskForm;
      let path = '';
      // 不同状态，详情页展示不一样
      if (businessStatus === '0') {
        path = `/order/handle-task/detail-sign/${row.ordCode}?ordId=${row.ordId}&taskInsId=${row.taskInsId}`;
      } else if (businessStatus === '4') {
        path = `/order/handle-task/detail-pay/${row.ordCode}?ordId=${row.ordId}&taskInsId=${row.taskInsId}`;
      } else {
        path = `/order/handle-task/detail/${row.ordCode}?ordId=${row.ordId}&taskInsId=${row.taskInsId}&businessStatus=${businessStatus}`;
      }
      this.$router.push(path);
    },
    handleCreate() {
      const path = `/order/manage/create`;
      this.$router.push(path);
    },
    query() {
      // 查询的时候，需要将pageNo置为1
      this.isNotPageChange && this.pageChange({ pageNo: 1 });
      const params = Object.cloneDeep(this.orderHandleTaskForm);
      if (params.date && params.date.length) {
        params.startDate = dayjs(params.date[0]).format('YYYY-MM-DD');
        params.endDate = dayjs(params.date[1]).format('YYYY-MM-DD');
      } else {
        params.startDate = '';
        params.endDate = '';
      }

      let { date, ..._params } = params;
      this.$refs['orderHandleTask'].validate(valid => {
        if (!valid) return false;

        this.getHandleTaskList(_params);
      });
    },
    ...mapMutations({
      pageChange: 'ORDER_HT_PAGE_CHANGE'
    }),
    ...mapActions([
      'getHandleTaskList',
      'getAssignhandler'
    ])
  }
};
</script>

<style lang="scss">
@import "scss/variables.scss";
.el-dropdown-link {
  color: $buttonColor;
  cursor: pointer;
}
.handler,
.reason {
  height: 32px;
  line-height: 32px;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
}
</style>
