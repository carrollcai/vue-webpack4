<template>
  <div class="m-container">
    <el-form class="task-form" ref="taskManageForm">
      <el-form-item>查询时间：</el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="taskForm.date"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>

      <el-form-item class="task-form-item__lable">提交人：</el-form-item>
      <el-form-item class="task-form-item__input">
        <el-input v-model="taskForm.name" />
      </el-form-item>

      <el-form-item class="task-form-item__lable">任务名称：</el-form-item>
      <el-form-item class="task-form-item__input">
        <el-input v-model="taskForm.name" />
      </el-form-item>

      <el-form-item class="task-form-item">
        <el-button type="primary" @click="query">查询</el-button>
      </el-form-item>
    </el-form>
    <el-tabs v-model="status">
      <el-tab-pane label="全部"></el-tab-pane>
      <el-tab-pane label="处理中"></el-tab-pane>
      <el-tab-pane label="已处理"></el-tab-pane>
    </el-tabs>

    <wm-table :source="taskList.list" :pageNo="pageNo" :pageSize="pageSize" :total="totalcount" @onPagination="onPagination" @onSizePagination="onSizePagination">
      <el-table-column label="任务名称" property="name" />
      <el-table-column label="任务类型" property="account" />
      <el-table-column label="提交时间" property="role" />
      <el-table-column label="提交人" property="role" />
      <el-table-column label="处理状态" property="role" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <span class="btnLists">
            <el-tooltip effect="dark" content="查看详情" placement="bottom">
              <i class="el-icon-edit-outline" @click="handleDetail(scope.row)"></i>
            </el-tooltip>
          </span>
        </template>
      </el-table-column>
    </wm-table>
  </div>
</template>

<script>
import WmTable from 'components/Table.vue';
import { mapState, mapActions } from 'vuex';
export default {
  components: {
    WmTable
  },
  computed: {
    ...mapState({
      taskList: ({ task }) => task.taskList
    })
  },
  data() {
    return {
      taskForm: {
        date: [],
        name: ''
      },
      pageNo: 1,
      pageSize: 10,
      totalcount: 1,
      status: 0
    };
  },
  watch: {
    status(newValue) {
      this.query();
    }
  },
  beforeMount() {
    this.query();
  },
  methods: {
    onPagination(value) {
      this.pageNo = value;
    },
    onSizePagination(value) {
      this.pageSize = value;
    },
    handleDetail(row) {
      const path = `/system/user/edit/${row.id}`;
      this.$router.push(path);
    },
    getParams() {
      let params = Object.assign({}, this.taskForm);
      params.pageNo = this.pageNo;
      params.pageSize = this.pageSize;
      params.status = this.status;

      return params;
    },
    query() {
      this.queryTaskList(this.getParams());
    },
    ...mapActions([
      'queryTaskList'
    ])
  }
};
</script>

<style lang="scss">
@import "scss/variables.scss";
.task-header{
  margin-bottom: 16px;
}
.task-form-item__lable {
  margin-left: $blockWidth;
}
.task-form {
  display: flex;
  align-items: center;
}
.task-form-item__input {
  width: $inputWidthQuery;
}
.task-form-item {
  margin-left: $formWidth;
}
</style>
