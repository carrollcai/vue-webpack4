<template>
<div>
  <div class="m-container">
    <el-dialog title="分派" :visible.sync="dialogVisible" width="360px" :before-close="handleClose" center>
      <el-form ref="assignHandle" :rules="assignHandleRules" :model="assignHandle">
        <div class="handler">指派处理人：</div>
        <el-form-item prop="handler">
          <el-select class="form-input-large" v-model="assignHandle.handler" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <div class="reason">分派的原因：</div>
        <el-form-item prop="desc">
          <el-input v-model="assignHandle.desc" class="form-input-large" type="textarea" placeholder="请输入优势能力" />
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
          <el-input v-model="orderHandleTaskForm.name" placeholder="合作集团/编码" />
        </el-form-item>
      </div>
      <div class="flex">
        <el-form-item class="task-form-item">
          <el-button type="primary" @click="query">查询</el-button>
        </el-form-item>
      </div>
    </el-form>

    <el-tabs v-model="orderHandleTaskForm.status" @tab-click="tabChange">
      <el-tab-pane label="待签约处理" :name="2"></el-tab-pane>
      <el-tab-pane label="待付款处理" :name="3"></el-tab-pane>
      <el-tab-pane label="已处理" :name="4"></el-tab-pane>
    </el-tabs>
  </div>
  <div class="m-container table-container">
    <wm-table :source="orderHandleTaskObj.list" :pageNo="orderHandleTaskForm.pageNo" :pageSize="orderHandleTaskForm.pageSize" :total="orderHandleTaskObj.totalcount" @onPagination="onPagination" @onSizePagination="onSizePagination">
      <el-table-column label="订单编号" property="code" />
      <el-table-column label="订单名称" property="name" />
      <el-table-column label="创建时间" property="date" />
      <el-table-column label="合作集团" property="cooperationCompany" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button v-if="orderHandleTaskForm.status === 2" class="table-button" type="text" @click="handleSign(scope.row)">
            签约处理
          </el-button>
          <el-button v-if="orderHandleTaskForm.status === 3" class="table-button" type="text" @click="handlePay(scope.row)">
            付款处理
          </el-button>
          <el-button v-if="orderHandleTaskForm.status === 4" class="table-button" type="text" @click="handleDetail(scope.row)">
            详情
          </el-button>

          <el-dropdown v-if="orderHandleTaskForm.status !== 4" @command="handleCommand(scope.row, $event)">
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
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      orderHandleTaskRules: {},
      dialogVisible: false,
      currentRow: {},
      assignHandle: {
        handler: '',
        desc: ''
      },
      assignHandleRules: {
        handler: [
          { required: true, message: '请选择指派处理人', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请输入分派的原因', trigger: 'blur' }
        ]
      },
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        }
      ]
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
    this.getHandleTaskList(this.orderHandleTaskForm);
  },
  methods: {
    submitAssign() {
      this.$refs.assignHandle.validate(valid => {
        if (!valid) return false;

        this.createAssign().then(() => {
          this.query();
          this.dialogVisible = false;
        });
      });
    },
    tabChange() {
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
      this.orderHandleTaskForm.pageNo = value;
      this.query();
    },
    onSizePagination(value) {
      this.orderHandleTaskForm.pageSize = value;
      this.query();
    },
    handlePay() {
      const path = `/order/handle-task/pay/${this.id}`;
      this.$router.push(path);
    },
    handleSign(row) {
      const path = `/order/handle-task/sign/${row.id}`;
      this.$router.push(path);
    },
    handleDispatch(row) {
      this.dialogVisible = true;
      this.currentRow = row;
      // 初始化输入框内容部数据
      this.getAssignhandler(row.id);
    },
    handleDetail(row) {
      const { status } = this.orderHandleTaskForm;
      let path = '';
      // 不同状态，详情页展示不一样
      if (status === 2) {
        path = `/order/handle-task/detail-sign/${row.id}`;
      } else if (status === 3) {
        path = `/order/handle-task/detail-pay/${row.id}`;
      } else {
        path = `/order/handle-task/detail/${row.id}`;
      }
      this.$router.push(path);
    },
    handleCreate() {
      const path = `/order/manage/create`;
      this.$router.push(path);
    },
    query() {
      const params = this.orderHandleTaskForm;
      this.$refs['orderHandleTask'].validate(valid => {
        if (!valid) return false;

        this.getHandleTaskList(params);
      });
    },
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
