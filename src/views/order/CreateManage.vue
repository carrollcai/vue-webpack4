<template>
  <div>
    <div class="m-container">
      <el-form class="o-overview-form" ref="orderCreateManage" :rules="orderCreateManageRules" :model="orderCreateManageForm">
        <div class="flex">
          <el-form-item prop="date">
            <el-date-picker v-model="orderCreateManageForm.date" type="daterange" start-placeholder="创建开始日期" end-placeholder="创建结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item class="o-form-item__input">
            <el-input v-model="orderCreateManageForm.ordNameOrCode" placeholder="订单名称/编码" />
          </el-form-item>
          <el-form-item class="o-form-item__input">
            <el-input v-model="orderCreateManageForm.organizeNameOrCode" placeholder="合作集团/编码" />
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

      <el-tabs v-model="orderCreateManageForm.ordStatus" @tab-click="tabChange">
        <el-tab-pane label="全部" :name="0"></el-tab-pane>
        <el-tab-pane label="草稿" :name="1"></el-tab-pane>
        <el-tab-pane label="待签约" :name="2"></el-tab-pane>
        <el-tab-pane label="待付款" :name="3"></el-tab-pane>
        <el-tab-pane label="已完成" :name="4"></el-tab-pane>
        <el-tab-pane label="已取消" :name="5"></el-tab-pane>
      </el-tabs>
    </div>

    <div class="m-container table-container">
      <wm-table :source="orderCreateManageObj.list" :pageNo="orderCreateManageForm.pageNo" :pageSize="orderCreateManageForm.pageSize" :total="orderCreateManageObj.totalCount" @onPagination="onPagination" @onSizePagination="onSizePagination">
        <el-table-column label="订单编号" property="ordCode" />
        <el-table-column label="订单名称" property="ordName" />
        <el-table-column label="创建时间" property="createDate" />
        <el-table-column label="合作集团" property="organizeName">
          <template slot-scope="scope">
            <div>
              {{scope.row.organizeName}}
              <el-popover v-if="!scope.row.organizeId" placement="bottom" width="248" trigger="hover">
                <div class="o-popover-title">
                  系统暂未录入该集团，请尽快关联已录入集团！
                </div>
                <div class="o-popover-button">
                  <el-button type="text" @click="connectOrganize(scope.row)">立即关联</el-button>
                </div>
                <i slot="reference" class="el-icon-info"></i>
              </el-popover>
            </div>

          </template>
        </el-table-column>
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
  </div>
</template>

<script>
import WmTable from 'components/Table.vue';
import { mapActions, mapState } from 'vuex';
import { ORDER_STATUS } from '@/config/index.js';

export default {
  data() {
    return {
      orderStatus: ORDER_STATUS,
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
    let { date, ..._params } = this.orderCreateManageForm;
    this.getCreateManageList(_params);
  },
  methods: {
    async connectOrganize(row) {
      await this.setConnectOriganize({
        ordId: row.ordId,
        organizeId: row.organizeId || '',
        organizeName: row.organizeName
      });
      await this.$message({
        type: 'success',
        message: '关联集团成功'
      });
      await this.query();
    },
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
      const path = `/order/manage/edit/${row.ordId}`;
      this.$router.push(path);
    },
    handleDelete(row) {
      this.$confirm('您确定要删除该条订单消息？', ' ', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.deleteOrderRow({ ordId: row.ordId });
        await this.$message({
          type: 'success',
          message: '删除成功'
        });
        await this.query();
      }).catch(() => {
        this.$message('已取消删除');
      });
    },
    handleSubmit(row) {
      this.$confirm('您确定要提交该条订单消息？', ' ', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 提交订单
        await this.submitOrderRow({ id: row.ordId });
        await this.$message({
          type: 'success',
          dangerouslyUseHTMLString: true,
          message: `<p>您已成功提交该订单！</p><p>处理人：${row.processorName}</p>`
        });
        await this.query();
      }).catch(() => {
        this.$message('已取消提交');
      });
    },
    handleDetail(row) {
      const path = `/order/create-manage/detail/${row.ordId}/${row.processInsId}`;
      this.$router.push(path);
    },
    handleCreate() {
      const path = `/order/manage/create`;
      this.$router.push(path);
    },
    query() {
      const params = this.orderCreateManageForm;

      if (params.date.length === 2) {
        params.startDate = params.date[0];
        params.endDate = params.date[1];
      }
      let { date, ..._params } = params;
      this.$refs['orderCreateManage'].validate(valid => {
        if (!valid) return false;

        this.getCreateManageList(_params);
      });
    },
    ...mapActions([
      'getCreateManageList',
      'submitOrderRow',
      'deleteOrderRow',
      'setConnectOriganize'
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
.o-popover-title {
  margin: 8px;
}
.o-popover-button {
  margin: 8px 0;
  width: 100%;
  text-align: center;
}
</style>
