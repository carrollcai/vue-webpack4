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
        <el-input v-model="auditForm.opName" placeholder="请输入提交人" />
      </el-form-item>
      <el-form-item class="form-query-input-width form-left-width">
        <el-select v-model="auditForm.name" filterable placeholder="任务名称">
          <el-option label="1" value="任务名称1"></el-option>
          <el-option label="2" value="任务名称2"></el-option>
        </el-select>
      </el-form-item>
    </div>
    <div class="flex">
      <el-form-item class="form-left-width">
        <el-button type="primary" @click="query">查询</el-button>
      </el-form-item>
    </div>
  </el-form>
  <el-tabs v-model="auditForm.status" @tab-click="getState">
    <el-tab-pane label="待审核" :name="0"></el-tab-pane>
    <el-tab-pane label="已审核" :name="1"></el-tab-pane>
  </el-tabs>
</div>
<div class="m-container table-container">
  <wm-table v-if="dataAuditList && dataAuditList.list"
    :source="dataAuditList.list"
    :total="dataAuditList.total"
    :pageNo="auditForm.pageNo"
    :pageSize="auditForm.pageSize"
    :default-sort = "{prop: 'insertdate', order: 'descending'}"
    @onPagination="onPagination"
    @onSizePagination="onSizePagination">
    <el-table-column label="任务名称" property="productName" width="350" />
    <el-table-column label="提交时间" sortable property="insertdate" width="180" />
    <el-table-column label="提交人" property="operatorId" width="170" />
    <el-table-column label="用户归属" property="productType" width="180"/>
    <el-table-column label="操作" width="200">
      <template slot-scope="scope">
        <el-button v-if="scope.row.state === 0" class="table-button" type="text" @click="toAudit(scope.row)">去审核</el-button>
        <el-button v-if="scope.row.state === 1" class="table-button" type="text" @click="viewDetail(scope.row)">查看详情</el-button>
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
      dataAuditList: ({ dataExtraction }) => dataExtraction.dataAuditList
    })
  },
  beforeMount() {
    this.$nextTick(() => {
      this.query();
    });
  },
  methods: {
    viewDetail(row) {
      let path = `/data-extraction/data-audit-detail/${row.id}?isAudit=false`;
      this.$router.push({path: path});
    },
    toAudit(row) {
      let path = `/data-extraction/data-audit-detail/${row.id}?isAudit=true`;
      this.$router.push({path: path});
    },
    getTimeRange(time) {
      if (time) {
        this.auditForm.startTime = time[0];
        this.auditForm.endTime = time[1];
      } else {
        this.auditForm.startTime = '';
        this.auditForm.endTime = '';
      }
    },
    getState() {
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
      'queryDataAudit'
    ])
  }
};
</script>
