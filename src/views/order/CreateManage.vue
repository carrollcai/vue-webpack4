<template>
  <div class="m-container">
    <el-form class="o-overview-form" ref="orderCreateManage" :rules="orderCreateManageRules" :model="orderCreateManageForm">
      <div class="flex">
        <el-form-item prop="date">
          <el-date-picker v-model="orderCreateManageForm.date" type="daterange" start-placeholder="创建开始日期" end-placeholder="创建结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item class="o-form-item__input">
          <el-input v-model="orderCreateManageForm.name" placeholder="合作集团/编码" />
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

    <el-tabs v-model="orderCreateManageForm.status" @tab-click="tabChange">
      <el-tab-pane label="全部" :name="0"></el-tab-pane>
      <el-tab-pane label="草稿" :name="1"></el-tab-pane>
      <el-tab-pane label="待签约" :name="2"></el-tab-pane>
      <el-tab-pane label="待付款" :name="3"></el-tab-pane>
      <el-tab-pane label="已完成" :name="4"></el-tab-pane>
      <el-tab-pane label="已取消" :name="5"></el-tab-pane>
    </el-tabs>

    <wm-table :source="orderCreateManageObj.list" :pageNo="orderCreateManageForm.pageNo" :pageSize="orderCreateManageForm.pageSize" :total="orderCreateManageObj.totalcount" @onPagination="onPagination" @onSizePagination="onSizePagination">
      <el-table-column label="订单编号" property="code" />
      <el-table-column label="订单名称" property="name" />
      <el-table-column label="创建时间" property="date" />
      <el-table-column label="合作集团" property="cooperationCompany" />
      <el-table-column label="处理人" property="submitter" />
      <el-table-column label="订单状态" property="status" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button class="table-button" type="text" @click="handleDetail(scope.row)">
            详情
          </el-button>
          <el-dropdown @command="handleCommand(scope.row, $event)">
            <span class="el-dropdown-link">
              更多
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item class="el-dropdown-link" command="submit">提交</el-dropdown-item>
              <el-dropdown-item class="el-dropdown-link" command="edit">修改</el-dropdown-item>
              <el-dropdown-item class="el-dropdown-link" command="delete">删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
      orderCreateManageRules: {}
    };
  },
  components: {
    WmTable
  },
  computed: {
    ...mapState({
      orderCreateManageObj: ({ order }) => order.orderCreateManageObj,
      orderCreateManageForm: ({ order }) => order.orderCreateManageForm
    })
  },
  beforeMount() {
    this.getCreateManageList(this.orderCreateManageForm);
  },
  methods: {
    tabChange(val) {
      this.query();
    },
    handleCommand(row, command) {
      let COMMANDS = {
        'edit': 'handleEdit',
        'delete': 'handleDelete',
        'submit': 'handleSubmit'
      };
      this[COMMANDS[command]](row);
    },
    onPagination(value) {
      this.orderCreateManageForm.pageNo = value;
      this.query();
    },
    onSizePagination(value) {
      this.orderCreateManageForm.pageSize = value;
      this.query();
    },
    handleEdit(row) {
      const path = `/order/manage/edit/${row.id}`;
      this.$router.push(path);
    },
    handleDelete(row) {
      this.$confirm('您确定要提交该条订单消息？', ' ', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRole({ roleId: row.roleId }).then(res => {
          this.query();
        });
      }).catch(() => {
        this.$message('已取消删除');
      });
    },
    handleSubmit(row) {
      this.$confirm('您确定要提交该条商机信息?', ' ', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          dangerouslyUseHTMLString: true,
          message: '<p>您已成功提交该条商机！</p><p>处理人：张三疯</p>'
        });
      }).catch(() => {
        this.$message('已取消提交');
      });
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
      const params = this.orderCreateManageForm;
      this.$refs['orderCreateManage'].validate(valid => {
        if (!valid) return false;

        this.getCreateManageList(params);
      });
    },
    ...mapActions([
      'getCreateManageList'
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
.el-dropdown-link{
  color: $buttonColor;
  cursor: pointer;
}
</style>
