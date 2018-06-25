<template>
  <div class="m-container">
    <el-form class="push-form" ref="taskManageForm">
      <div class="flex">
        <el-form-item>查询时间：</el-form-item>
        <el-form-item>
          <el-date-picker v-model="pushForm.date" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item class="push-form-item__lable">任务名称：</el-form-item>
        <el-form-item class="push-form-item__input">
          <el-input v-model="pushForm.name" />
        </el-form-item>
      </div>
      <div class="flex">
        <el-form-item class="push-form-item">
          <el-button type="primary" @click="query">查询</el-button>
        </el-form-item>
      </div>
    </el-form>
    <el-tabs v-model="status">
      <el-tab-pane label="全部"></el-tab-pane>
      <el-tab-pane label="处理中"></el-tab-pane>
      <el-tab-pane label="通过"></el-tab-pane>
      <el-tab-pane label="不通过"></el-tab-pane>
      <el-tab-pane label="撤销"></el-tab-pane>
    </el-tabs>

    <wm-table :source="pushList" :pageNo="pushForm.pageNo" :pageSize="pushForm.pageSize" :total="pushForm.totalcount" @onPagination="onPagination" @onSizePagination="onSizePagination">
      <el-table-column label="任务名称" property="name" />
      <el-table-column label="任务类型" property="type" />
      <el-table-column label="提交时间" property="date" />
      <el-table-column label="提交人" property="submitter" />
      <el-table-column label="处理状态" property="status" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <span class="btnLists">
            <el-tooltip effect="dark" content="查看详情" placement="bottom">
              <i class="el-icon-edit-outline" @click="handleDetail(scope.row)"></i>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除" placement="bottom">
              <i class="el-icon-delete" @click="handleDelete(scope.row)"></i>
            </el-tooltip>
            <el-tooltip effect="dark" content="复制下载地址" placement="bottom">
              <!-- 复制暂时支持基本类型，不支持对象 -->
              <i class="el-icon-delete" v-clipboard:copy="scope.row.downloadUrl" v-clipboard:success="handleCopy" v-clipboard:error="handleErrorCopy"></i>
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
      pushList: ({ task }) => task.pushList,
      pushForm: ({ task }) => task.pushForm
    })
  },
  data() {
    return {
      status: 0
    };
  },
  watch: {
    status() {
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
      const path = `/task/todo/detail/${row.id}`;
      this.$router.push(path);
    },
    handleDelete(row) {
      this.$confirm('删除申请, 是否继续?', ' ', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deletePush({ id: row.id }).then(res => {
          this.query();
        });
      }).catch(() => {
        this.$message('已取消删除');
      });
    },
    handleCopy(e) {
      this.$message({
        message: `复制成功，内容为${e.text}`,
        type: 'success'
      });
    },
    handleErrorCopy() {
      this.$message('复制失败');
    },
    query() {
      const params = this.pushForm;
      params.status = this.status;
      this.queryPushList(params);
    },
    ...mapActions([
      'queryPushList',
      'deletePush'
    ])
  }
};
</script>

<style lang="scss">
@import "scss/variables.scss";
.push-form-item__lable {
  margin-left: $blockWidth;
}
.push-form {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.push-form-item__input {
  width: $inputWidthQuery;
}
.push-form-item {
  margin-left: $formWidth;
}
</style>
