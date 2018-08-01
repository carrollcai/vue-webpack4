<template>
<div>
<div class="m-container">
  <el-form class="form-manage" v-model="downloadForm">
    <div class="flex">
      <el-form-item>
        <el-date-picker v-model="timeRange" @change="getTimeRange" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
      </el-form-item>

      <el-form-item class="form-query-input-width form-left-width">
        <el-select v-model="downloadForm.name" filterable placeholder="任务名称">
          <el-option label="1" value="任务名称1"></el-option>
          <el-option label="2" value="任务名称2"></el-option>
        </el-select>
      </el-form-item>
    </div>
    <div class="flex">
      <el-form-item class="form-left-width">
        <el-button type="primary" @click="query">查询</el-button>
      </el-form-item>
      <el-form-item class="form-left-width">
        <el-button class="el-button--have-icon" @click="toDataApply" icon="el-icon-plus">数据提取申请</el-button>
      </el-form-item>
    </div>
  </el-form>
  <el-tabs v-model="downloadForm.status" @tab-click="getState">
    <el-tab-pane label="审核中" :name="0"></el-tab-pane>
    <el-tab-pane label="数据提取中" :name="1"></el-tab-pane>
    <el-tab-pane label="提取成功" :name="2"></el-tab-pane>
    <el-tab-pane label="审核不通过" :name="3"></el-tab-pane>
    <el-tab-pane label="已取消" :name="4"></el-tab-pane>
  </el-tabs>
</div>
<div class="m-container table-container">
  <wm-table v-if="dataDownloadList && dataDownloadList.list"
    :source="dataDownloadList.list"
    :total="dataDownloadList.total"
    :pageNo="downloadForm.pageNo"
    :pageSize="downloadForm.pageSize"
    @onPagination="onPagination"
    @onSizePagination="onSizePagination">
    <el-table-column label="任务名称" property="productName" width="350" />
    <el-table-column label="提交时间" property="insertdate" width="210" />
    <el-table-column label="审核状态" property="state" width="210" :formatter="stateformatter" />
    <el-table-column label="操作" width="280">
      <template slot-scope="scope">
        <el-button v-if="scope.row.state === 0" class="table-button" type="text" @click="viewDetail(scope.row)">查看详情</el-button>
        <el-button v-if="scope.row.state === 0" class="table-button" type="text" @click="revoke(scope.row)">撤销</el-button>

        <el-button v-if="scope.row.state === 1" class="table-button" type="text" @click="viewDetail(scope.row)">查看详情</el-button>

        <el-button v-if="scope.row.state === 2" class="table-button" type="text" @click="viewDetail(scope.row)">查看详情</el-button>
        <el-button v-if="scope.row.state === 2" class="table-button" type="text" @click="downloadFile(scope.row)">数据下载</el-button>

        <el-button v-if="scope.row.state === 3" class="table-button" type="text" @click="viewDetail(scope.row)">查看详情</el-button>
        <el-button v-if="scope.row.state === 3" class="table-button" type="text" @click="viewDetail(scope.row)">审核不通过的原因</el-button>

        <el-button v-if="scope.row.state === 4" class="table-button" type="text" @click="viewDetail(scope.row)">查看详情</el-button>
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
      downloadForm: ({ dataExtraction }) => dataExtraction.downloadForm,
      dataDownloadList: ({ dataExtraction }) => dataExtraction.dataDownloadList
    })
  },
  beforeMount() {
    this.$nextTick(() => {
      this.query();
    });
  },
  methods: {
    revoke(row) {
      let info = '数据提取任务将被取消，是否确认撤销?';
      let name = '撤销';
      let fn = this.deleteDownLoadData;
      this.confirm(info, name, fn);
    },
    downloadFile(row) {
      let name = 'esop产品安装清单.xlsx';
      let path = '20180730103257_c2c7aa0c-bf1a-47c5-b056-f21c590a18c6';
      let data = {
        fileTypeId: 502,
        fileSaveName: path,
        fileName: name
      };
      this.dataDownLoadFile(data);
    },
    viewDetail(row) {},
    toDataApply() {
      this.$router.push({path: '/data-extraction/data-apply'});
    },
    stateformatter(row, column, columnValue) {
      if (columnValue === 0) {
        return '审核中';
      } else if (columnValue === 1) {
        return '数据提取中';
      } else if (columnValue === 2) {
        return '提取成功';
      } else if (columnValue === 3) {
        return '审核不通过';
      } else if (columnValue === 4) {
        return '已取消';
      }
    },
    getTimeRange(time) {
      if (time) {
        this.downloadForm.startTime = time[0];
        this.downloadForm.endTime = time[1];
      } else {
        this.downloadForm.startTime = '';
        this.downloadForm.endTime = '';
      }
    },
    getState() {
      this.downloadForm.pageNo = this.pageNo;
      this.downloadForm.pageSize = this.pageSize;
      this.query();
    },
    onPagination(value) {
      this.downloadForm.pageNo = value;
      this.query();
    },
    onSizePagination(value) {
      this.downloadForm.pageSize = value;
      this.query();
    },
    query() {
      this.queryDataDownload();
    },
    confirm(info, name, fn) {
      this.$confirm(info, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (fn) {
          fn();
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: `已取消${name}`
        });
      });
    },
    ...mapActions([
      'queryDataDownload',
      'deleteDownLoadData',
      'dataDownLoadFile'
    ])
  }
};
</script>

<style>

</style>
