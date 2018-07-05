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
      </div>
    </el-form>

    <el-tabs v-model="status">
      <el-tab-pane label="待签约处理"></el-tab-pane>
      <el-tab-pane label="待付款处理"></el-tab-pane>
      <el-tab-pane label="已处理"></el-tab-pane>
    </el-tabs>

    <wm-table :source="orderOverviewObj.list" :pageNo="orderOverviewForm.pageNo" :pageSize="orderOverviewForm.pageSize" :total="orderOverviewObj.totalcount" @onPagination="onPagination" @onSizePagination="onSizePagination">
      <el-table-column label="订单编号" property="code" />
      <el-table-column label="订单名称" property="name" />
      <el-table-column label="创建时间" property="date" />
      <el-table-column label="合作集团" property="cooperationCompany" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="handleSign(scope.row)">
            签约处理
          </el-button>
          <el-dropdown @command="handleCommand(scope.row, $event)">
            <span class="el-dropdown-link">
              更多
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item class="el-dropdown-link" command="dispatch">分派</el-dropdown-item>
              <el-dropdown-item class="el-dropdown-link" command="detail">详情</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </wm-table>
    <el-dialog title="分派" :visible.sync="dialogVisible" width="360px" :before-close="handleClose" center>
      <el-form>
        <div class="handler">指派处理人：</div>
        <el-form-item prop="handler">
          <el-select class="form-input-large" v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <div class="reason">分派的原因：</div>
        <el-form-item prop="reason">
          <el-input class="form-input-large" type="textarea" placeholder="请输入优势能力"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import WmTable from 'components/Table.vue';
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      overviewRules: {},
      dialogVisible: false,
      currentRow: {},
      status: 0,
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
      orderOverviewObj: ({ order }) => order.orderOverviewObj,
      orderOverviewForm: ({ order }) => order.orderOverviewForm
    })
  },
  beforeMount() {
    this.getOrderList(this.orderOverviewForm);
  },
  methods: {
    handleCommand(row, command) {
      let COMMANDS = {
        'dispatch': 'handleDispatch',
        'detail': 'handleDetail'
      };
      this[COMMANDS[command]](row);
    },
    onPagination(value) {
      this.orderOverviewForm.pageNo = value;
      this.query();
    },
    onSizePagination(value) {
      this.orderOverviewForm.pageSize = value;
      this.query();
    },
    handleSign(row) {
      const path = `/order/handle-task/sign/${row.id}`;
      this.$router.push(path);
    },
    handleDispatch(row) {
      this.dialogVisible = true;
      this.currentRow = row;
    },
    handleDetail(row) {
      const path = `/order/handle-task/detail/${row.id}`;
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
