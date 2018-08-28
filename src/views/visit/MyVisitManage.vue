<template>
<div>
  <div class="m-container">
    <el-form class="form-manage" ref="myVisitManageForm" v-model="myVisitManageFrom">
      <div class="flex">
        <el-form-item prop="date">
          <el-col>
            <el-date-picker v-model="timeRange" @change="getTimeRange" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00','23:59:59']">
            </el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item class="form-query-input-width form-left-width">
          <el-input v-model="myVisitManageFrom.organizeName" clearable placeholder="走访公司名称"></el-input>
        </el-form-item>
        <el-form-item class="form-query-input-width form-left-width">
          <el-select v-model="myVisitManageFrom.visitResource" clearable placeholder="任务类型">
            <el-option v-for="item in visitResourceList" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="flex">
        <el-form-item class="form-left-width">
          <el-button type="primary" @click="query">查询</el-button>
        </el-form-item>
        <el-form-item class="form-left-width">
          <el-button class="el-button--have-icon" @click.prevent="createVisit" icon="el-icon-plus">新建走访计划</el-button>
        </el-form-item>
      </div>
    </el-form>
    <el-tabs v-model="myVisitManageFrom.state" @tab-click="getState">
      <el-tab-pane label="全部" name=""></el-tab-pane>
      <el-tab-pane label="待执行" name="1"></el-tab-pane>
      <el-tab-pane label="已执行" name="2"></el-tab-pane>
    </el-tabs>
  </div>
  <div class="m-container table-container">
    <wm-table
      :source="myVisitManageList.list"
      :total="myVisitManageList.totalCount"
      :pageNo="myVisitManageFrom.pageNo"
      :pageSize="myVisitManageFrom.pageSize"
      @onPagination="onPagination"
      @onSizePagination="onSizePagination">
      <el-table-column label="走访编号" property="visitCode" width="180"/>
      <el-table-column label="走访时间" property="visitStartTime" :formatter="visitTimeFn" />
      <el-table-column label="走访公司" property="organizeName" show-overflow-tooltip />
      <el-table-column label="任务类型" property="visitResource" :formatter="visitResourceFn"/>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button class="table-button" type="text" @click="viewDetail(scope.row, false)">
            查看
          </el-button>
          <el-button class="table-button" v-if="scope.row.visitStatus === '1'" type="text" @click="viewDetail(scope.row, true)">
            走访汇报
          </el-button>
          <!-- 自建的则支持修改 -->
          <el-button v-if="scope.row.visitStatus === '1'" type="text" @click="createVisit(scope.row)">
            编辑
          </el-button>
          <!-- <el-button v-if="scope.row.visitStatus === '0'" type="text" @click="deleteVisite(scope.row)">
            删除
          </el-button> -->
          <el-button v-if="scope.row.visitStatus === '2' && (scope.row.isOverDate === '0' || scope.row.isOverDate === 0)" class="table-button" type="text" @click="hageResource(scope.row)">
            评价
          </el-button>
        </template>
      </el-table-column>
    </wm-table>
  </div>
  <el-dialog
    title="评价"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">
    <el-input v-model="visitEvaluate" clearable placeholder="评价" />
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitEvaluate">确 定</el-button>
    </span>
  </el-dialog>
</div>
</template>

<script>
import WmTable from 'components/Table.vue';
import { mapState, mapActions } from 'vuex';
import {PAGE_NO, PAGE_SIZE} from '@/config/index.js';
export default {
  components: {
    WmTable
  },
  computed: {
    visitStatus() {
      return this.myVisitManageFrom.visitStatus.toString();
    },
    ...mapState({
      myVisitManageFrom: ({ visit }) => visit.myVisitManageFrom,
      myVisitManageList: ({ visit }) => visit.myVisitManageList
    })
  },
  data() {
    return {
      pageNo: PAGE_NO,
      pageSize: PAGE_SIZE,
      dialogVisible: false,
      visitEvaluate: '',
      visitId: '',
      timeRange: '',
      visitResourceList: [{value: '1', label: '自建'}, {value: '2', label: '指派'}]
    };
  },
  beforeMount() {
    this.query();
  },
  methods: {
    hageResource(row) {
      this.visitId = row.visitId;
      this.dialogVisible = true;
    },
    submitEvaluate() {
      this.judgeVisit({
        visitId: this.visitId,
        visitEvaluate: this.visitEvaluate
      }).then(res => {
        this.dialogVisible = false;
        this.$message({ showClose: true, message: '评价成功！', type: 'success' });
      });
    },
    visitTimeFn(row, clo, value) {
      if (row.visitStartTime) {
        let start = row.visitStartTime.split(' ')[0];
        let end = row.visitEndTime ? '-' + row.visitEndTime.split(' ')[0] : '';
        return start + end;
      }
    },
    visitResourceFn(row, clo, value) {
      if (value === 1) {
        return '自建';
      } else if (value === 2) {
        return '指派';
      }
    },
    getTimeRange(time) {
      if (time) {
        this.myVisitManageFrom.visitStartTime = time[0];
        this.myVisitManageFrom.visitEndTime = time[1];
      } else {
        this.myVisitManageFrom.visitStartTime = '';
        this.myVisitManageFrom.visitEndTime = '';
      }
    },
    getState(value) {
      this.myVisitManageFrom.pageNo = this.pageNo;
      this.myVisitManageFrom.pageSize = this.pageSize;
      if (value.name !== '') {
        this.myVisitManageFrom.visitStatus = [value.name];
      } else {
        this.myVisitManageFrom.visitStatus = [];
      }
      this.query();
    },
    onPagination(value) {
      this.myVisitManageFrom.pageNo = value;
      this.query();
    },
    onSizePagination(value) {
      this.myVisitManageFrom.pageSize = value;
      this.query();
    },
    viewDetail(row, execution) {
      let path = `/visit/visit-application-detail/${row.visitId}?isExecute=${execution}`;
      this.$router.push(path);
    },
    query() {
      let { state, ...params } = this.myVisitManageFrom;
      this.getMyVisitManageList(params);
    },
    createVisit(row) {
      let path = '/visit/create-visit-application';
      if (row.visitId) {
        path = `/visit/create-visit-application/${row.visitId}`;
      }
      this.$router.push(path);
    },
    async deleteVisite(row) {
      await this.deleteVisitApp({visitId: row.visitId});
      this.query();
    },
    ...mapActions([
      'getMyVisitManageList',
      'judgeVisit',
      'deleteVisitApp'
    ])
  }
};
</script>

<style lang="scss">
@import "scss/variables.scss";
.table-container {
  .el-button + .el-button {margin-left: 0}
}
</style>
