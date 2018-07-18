<template>
  <div>
    <div class="m-container">
      <el-dialog title="分派" :visible.sync="dialogVisible" width="360px" :before-close="handleClose" center>
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
      </el-dialog>

      <el-form class="o-overview-form" ref="orderHandleTask" :rules="orderHandleTaskRules" :model="orderHandleTaskForm">
        <div class="flex">
          <el-form-item prop="date">
            <el-date-picker v-model="orderHandleTaskForm.date" type="daterange" start-placeholder="创建开始日期" end-placeholder="创建结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item class="o-form-item__input">
            <el-input clearable v-model="orderHandleTaskForm.ordNameOrCode" placeholder="订单名称/编码" />
          </el-form-item>
          <el-form-item class="o-form-item__input">
            <el-input clearable v-model="orderHandleTaskForm.organizeNameOrCode" placeholder="合作集团/编码" />
          </el-form-item>
        </div>
        <div class="flex">
          <el-form-item class="task-form-item">
            <el-button type="primary" @click="query">查询</el-button>
          </el-form-item>
        </div>
      </el-form>

      <el-tabs v-model="orderHandleTaskForm.businessStatus" @tab-click="tabChange">
        <el-tab-pane label="待签约处理" name="0"></el-tab-pane>
        <el-tab-pane label="待付款处理" name="4"></el-tab-pane>
        <el-tab-pane label="已处理" name="1"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="m-container table-container">
      <wm-table :source="orderHandleTaskObj.list" :pageNo="orderHandleTaskForm.pageNo" :pageSize="orderHandleTaskForm.pageSize" :total="orderHandleTaskObj.totalCount" @onPagination="onPagination" @onSizePagination="onSizePagination">
        <el-table-column label="订单编号" property="ordCode" />
        <el-table-column label="订单名称" property="ordName" />
        <el-table-column label="创建时间" property="createDate" />
        <el-table-column label="合作集团" property="organizeName" />
        <el-table-column v-if="orderHandleTaskForm.businessStatus === '1'" label="处理结果" property="businessStatusName" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button v-if="orderHandleTaskForm.businessStatus === '0'" class="table-button" type="text" @click="handleSign(scope.row)">
              签约处理
            </el-button>
            <el-button v-if="orderHandleTaskForm.businessStatus === '4'" class="table-button" type="text" @click="handlePay(scope.row)">
              付款处理
            </el-button>
            <el-button v-if="orderHandleTaskForm.businessStatus !== '0'" class="table-button" type="text" @click="handleDetail(scope.row)">
              详情
            </el-button>

            <el-dropdown v-if="orderHandleTaskForm.businessStatus === '0'" @command="handleCommand(scope.row, $event)">
              <span class="el-dropdown-link">
                更多
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item class="el-dropdown-link" command="handleDispatch">分派</el-dropdown-item>
                <el-dropdown-item class="el-dropdown-link" command="handleDetail">详情</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </wm-table>
    </div>
  </div>
</template>

<script>
import WmTable from 'components/Table.vue';
import { mapActions, mapState, mapMutations } from 'vuex';
import moment from 'moment';

export default {
  data() {
    return {
      orderHandleTaskRules: {},
      dialogVisible: false,
      currentRow: {},
      assignHandle: {
        id: null,
        dealPerson: null,
        dealResult: '',
        resultStatus: '0', // 写死
        taskInsId: null
      },
      assignHandleRules: {
        dealPerson: [
          { required: true, message: '请选择指派处理人', trigger: 'change' }
        ],
        dealResult: [
          { required: true, message: '请输入分派的原因', trigger: 'blur' }
        ]
      }
    };
  },
  components: {
    WmTable
  },
  computed: {
    ...mapState({
      orderHandleTaskObj: ({ order }) => order.orderHandleTaskObj,
      orderHandleTaskForm: ({ order }) => order.orderHandleTaskForm,
      assignHandlers: ({ order }) => order.assignHandlers
    })
  },
  beforeMount() {
    this.$nextTick(() => {
      this.query();
    });
  },
  methods: {
    submitAssign() {
      let params = Object.cloneDeep(this.assignHandle);
      params.dealPerson = params.dealPerson.pop();
      params.taskInsId = this.currentRow.taskInsId;
      params.id = this.currentRow.ordId;

      this.$refs.assignHandle.validate(valid => {
        if (!valid) return false;

        this.createAssign(params).then(() => {
          this.query();
          this.dialogVisible = false;
        });
      });
    },
    tabChange() {
      this.pageChange();
      this.query();
    },
    handleCommand(row, command) {
      let COMMANDS = {
        'handleDispatch': 'handleDispatch',
        'handleDetail': 'handleDetail'
      };
      this[COMMANDS[command]](row);
    },
    onPagination(value) {
      this.pageChange({ pageNo: value });
      this.query();
    },
    onSizePagination(value) {
      this.pageChange({ pageSize: value });
      this.query();
    },
    handlePay(row) {
      const path = `/order/handle-task/pay/${row.ordId}?taskInsId=${row.taskInsId}`;
      this.$router.push(path);
    },
    handleSign(row) {
      const path = `/order/handle-task/sign/${row.ordId}?taskInsId=${row.taskInsId}`;
      this.$router.push(path);
    },
    handleDispatch(row) {
      this.dialogVisible = true;
      this.currentRow = row;
      // 初始化输入框内容部数据
      this.getAssignhandler();
    },
    handleDetail(row) {
      const { businessStatus } = this.orderHandleTaskForm;
      let path = '';
      // 不同状态，详情页展示不一样
      if (businessStatus === '0') {
        path = `/order/handle-task/detail-sign/${row.ordId}?taskInsId=${row.taskInsId}&businessStatus=${encodeURIComponent(businessStatus)}`;
      } else if (businessStatus === '4') {
        path = `/order/handle-task/detail-pay/${row.ordId}?taskInsId=${row.taskInsId}&businessStatus=${encodeURIComponent(businessStatus)}`;
      } else {
        path = `/order/handle-task/detail/${row.ordId}?taskInsId=${row.taskInsId}&businessStatus=${encodeURIComponent(businessStatus)}`;
      }
      this.$router.push(path);
    },
    handleCreate() {
      const path = `/order/manage/create`;
      this.$router.push(path);
    },
    query() {
      const params = Object.cloneDeep(this.orderHandleTaskForm);
      if (params.date && params.date.length) {
        params.startDate = moment(params.date[0]).format('YYYY-MM-DD');
        params.endDate = moment(params.date[1]).format('YYYY-MM-DD');
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
      pageChange: 'ORDER_CM_PAGE_CHANGE'
    }),
    ...mapActions([
      'getHandleTaskList',
      'getAssignhandler',
      'createAssign',
      'createAssign'
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
