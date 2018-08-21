<template>
<div>
<div class="m-container">
  <el-form class="form-manage" v-model="auditForm">
    <div class="flex">
      <el-form-item>
        <el-date-picker v-model="timeRange" @change="getTimeRange" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
      </el-form-item>
      <el-form-item class="form-query-input-width form-left-width">
        <el-input v-model="auditForm.staffName" placeholder="请输入提交人" />
      </el-form-item>
      <el-form-item class="form-query-input-width form-left-width">
        <el-autocomplete class="form-input-half"
          v-model="auditForm.name"
          :fetch-suggestions="querySearchAsync"
          placeholder="任务名称"
          :trigger-on-focus="false" />
      </el-form-item>
    </div>
    <div class="flex">
      <el-form-item class="form-left-width">
        <el-button type="primary" @click="query">查询</el-button>
      </el-form-item>
    </div>
  </el-form>
  <el-tabs v-model="auditForm.taskHasComplete" @tab-click="getState">
    <el-tab-pane label="待审核" :name="0" :value="0"></el-tab-pane>
    <el-tab-pane label="已审核" :name="1" :value="1"></el-tab-pane>
  </el-tabs>
</div>
<div class="m-container table-container">
  <wm-table v-if="dataAuditList && dataAuditList.list"
    :source="dataAuditList.list"
    :total="dataAuditList.list.length"
    :pageNo="auditForm.pageNo"
    :pageSize="auditForm.pageSize"
    :defaultSort = "{prop: 'insertdate', order: 'descending'}"
    @onPagination="onPagination"
    @onSizePagination="onSizePagination">
    <el-table-column label="任务名称" show-overflow-tooltip property="name" width="350" />
    <el-table-column label="提交时间" sortable property="createTime" width="180" />
    <el-table-column label="提交人" property="staffName" width="170" />
    <el-table-column label="用户归属" property="opRegion" width="180"/>
    <el-table-column label="操作" width="200">
      <template slot-scope="scope">
        <el-button v-if="scope.row.businessStatus === '1'" class="table-button" type="text" @click="toAudit(scope.row)">去审核</el-button>
        <el-button v-if="scope.row.businessStatus === '2'" class="table-button" type="text" @click="viewDetail(scope.row)">查看详情</el-button>
      </template>
    </el-table-column>
  </wm-table>
</div>
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
  data() {
    return {
      pageNo: PAGE_NO,
      pageSize: PAGE_SIZE,
      timeRange: ''
    };
  },
  computed: {
    ...mapState({
      auditForm: ({ dataExtraction }) => dataExtraction.auditForm,
      dataAuditList: ({ dataExtraction }) => dataExtraction.dataAuditList,
      dataTaskList: ({ dataExtraction }) => dataExtraction.dataTaskList.list
    })
  },
  beforeMount() {
    this.$nextTick(() => {
      this.query();
    });
  },
  methods: {
    async querySearchAsync(queryString, cb) {
      if (!queryString.trim()) return false;
      let params = {
        name: queryString,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      };
      await this.queryDataTask(params);

      await clearTimeout(this.timeout);
      this.timeout = await setTimeout(() => {
        let arr = [];
        this.dataTaskList.filter(item => {
          arr.push({value: item.name});
        });
        cb(arr);
      }, 1000);
    },
    viewDetail(row) {
      let path = `/data-extraction/data-audit-detail/${row.id}?processInsId=${row.processInsId}&isAudit=false`;
      this.$router.push({path: path});
    },
    toAudit(row) {
      let data = {
        id: row.id,
        taskInsId: row.taskInsId
      };
      let path = `/data-extraction/data-audit-detail/${row.id}?processInsId=${row.processInsId}&data=${JSON.stringify(data)}&isAudit=true`;
      this.$router.push({path: path});
    },
    getTimeRange(time) {
      if (time) {
        this.auditForm.startDate = time[0];
        this.auditForm.endDate = time[1];
      } else {
        this.auditForm.startDate = '';
        this.auditForm.endDate = '';
      }
    },
    getState(e) {
      this.auditForm.taskHasComplete = Number(e.$attrs.value);
      this.auditForm.pageNo = this.pageNo;
      this.auditForm.pageSize = this.pageSize;
      this.query();
    },
    onPagination(value) {
      this.auditForm.pageNo = value;
      this.query();
    },
    onSizePagination(value) {
      this.auditForm.pageSize = value;
      this.query();
    },
    query() {
      this.queryDataAudit(this.auditForm);
    },
    ...mapActions([
      'queryDataAudit',
      'queryDataTask'
    ])
  }
};
</script>
