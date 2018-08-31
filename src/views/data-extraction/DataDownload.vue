<template>
<div>
  <div class="m-container">
    <el-form class="form-manage" ref="downloadForm" v-model="downloadForm">
      <div class="flex">
        <el-form-item>
          <el-date-picker clearable v-model="downloadForm.timeRange" @change="getTimeRange" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item class="form-query-input-width form-left-width">
          <el-autocomplete class="form-input-half"
            clearable
            v-model="downloadForm.name"
            :fetch-suggestions="querySearchAsync"
            placeholder="任务名称"
            :trigger-on-focus="false" />
        </el-form-item>
      </div>
      <div class="flex">
        <el-form-item class="form-left-width">
          <el-button type="primary" @click="searchQuery">查询</el-button>
        </el-form-item>
        <el-form-item class="form-left-width">
          <el-button class="el-button--have-icon" @click="toDataApply" icon="el-icon-plus">数据提取申请</el-button>
        </el-form-item>
      </div>
    </el-form>
    <div class="tab-bar">
      <el-tabs v-model="downloadForm.status" @tab-click="getState">
        <el-tab-pane label="全部" :name="100"></el-tab-pane>
        <el-tab-pane label="审核中" :name="1"></el-tab-pane>
        <el-tab-pane label="数据生成中" :name="2"></el-tab-pane>
        <el-tab-pane label="生成成功" :name="3"></el-tab-pane>
      </el-tabs>
      <more-tabs :statusData.sync="downloadForm.status" :isOpen.sync="isOpenData" @getStateFn="getStateFn"></more-tabs>
    </div>
  </div>
  <div class="m-container table-container">
    <wm-table v-if="dataDownloadList && dataDownloadList.list"
      :source="dataDownloadList.list"
      :total="dataDownloadList.totalCount"
      :pageNo="downloadForm.pageNo"
      :pageSize="downloadForm.pageSize"
      @onPagination="onPagination"
      @onSizePagination="onSizePagination">
      <el-table-column label="任务名称" show-overflow-tooltip property="name" />
      <el-table-column label="提交时间" property="createTime" width="210" />
      <el-table-column label="审核状态" property="extractBusinessStatusName" width="210">
        <template slot-scope="scope">
          {{scope.row.extractBusinessStatusName}}
          <span v-if="scope.row.extractBusinessStatusName === '数据生成中'">
            <el-popover
              ref="popover"
              placement="top"
              title="温馨提示"
              width="100"
              trigger="hover"
              content="数据生成中，请耐心等待">
              <i slot="reference" class="el-icon-info"></i>
            </el-popover>
          </span>
          <span v-if="scope.row.extractBusinessStatusName === '审核不通过'">
            <el-popover
              placement="top"
              width="200"
              trigger="hover">
              <div>
                <p>{{scope.row.upApproveDate}}</p>
                <p>{{scope.row.upApproveOpName}} <b>审核不通过</b></p>
                <p>原因：{{scope.row.upApprovedealResult}}</p>
              </div>
              <i slot="reference" class="el-icon-info"></i>
            </el-popover>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button class="table-button" type="text" @click="viewDetail(scope.row)">查看详情</el-button>
          <el-button v-if="scope.row.extractBusinessStatus === '1'" class="table-button" type="text" @click="revoke(scope.row)">撤销</el-button>
          <!-- <el-button v-if="scope.row.extractBusinessStatus === '3'" class="table-button" type="text" @click="downloadFile(scope.row)">数据下载</el-button> -->
        </template>
      </el-table-column>
    </wm-table>
  </div>
</div>
</template>

<script>
import WmTable from 'components/Table.vue';
import MoreTabs from 'components/data-extraction/MoreTabs.vue';
import { mapState, mapActions } from 'vuex';
import {PAGE_NO, PAGE_SIZE} from '@/config/index.js';
export default {
  components: {
    WmTable,
    MoreTabs
  },
  data() {
    return {
      pageNo: PAGE_NO,
      pageSize: PAGE_SIZE,
      extractBusinessStatus: 0
    };
  },
  computed: {
    isOpenData() {
      let _this = this;
      let state = this.downloadForm.extractBusinessStatus;
      if (state === 4 || state === 5 || state === 6) {
        _this.downloadForm.isOpen = true;
      }
      return this.downloadForm.isOpen;
    },
    ...mapState({
      downloadForm: ({ dataExtraction }) => dataExtraction.downloadForm,
      dataDownloadList: ({ dataExtraction }) => dataExtraction.dataDownloadList,
      dataTaskList: ({ dataExtraction }) => dataExtraction.dataTaskList.list,
      hasSignedFile: ({ order }) => order.hasSignedFile
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
    revoke(row) {
      let info = '数据生成任务将被取消，是否确认撤销?';
      let name = '撤销';
      let params = {id: row.id};
      this.confirm(info, name, params);
    },
    downloadFile(row) {
      this.gethasSignedFile({fileInputId: Number(row.fileId)}).then(res => {
        if (this.hasSignedFile && this.hasSignedFile.length > 0) {
          let res = this.hasSignedFile[0];
          this.orderDownloadFile({
            fileTypeId: res.fileTypeId,
            fileSaveName: res.fileSaveName,
            fileName: res.fileName
          });
        }
      });
    },
    viewDetail(row) {
      let path = `/data-extraction/data-detail/${row.id}?processInsId=${row.processInsId}&businessStatus=${row.extractBusinessStatus}&isAudit=false`;
      this.$router.push({path: path});
    },
    toDataApply(row) {
      this.$router.push({path: '/data-extraction/data-apply'});
    },
    getTimeRange(time) {
      if (time) {
        this.downloadForm.startDate = time[0];
        this.downloadForm.endDate = time[1];
      } else {
        this.downloadForm.startDate = '';
        this.downloadForm.endDate = '';
      }
    },
    getStateFn(value) {
      this.downloadForm.status = value;
      this.downloadForm.pageNo = this.pageNo;
      this.downloadForm.pageSize = this.pageSize;
      this.downloadForm.isOpen = true;
      this.query();
    },
    getState(value) {
      this.downloadForm.status = value.name;
      this.downloadForm.pageNo = this.pageNo;
      this.downloadForm.pageSize = this.pageSize;
      this.downloadForm.isOpen = false;
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
    searchQuery() {
      this.downloadForm.pageNo = '1';
      this.query();
    },
    async query() {
      if (this.downloadForm.status === 100 || this.downloadForm.status === '100') {
        this.downloadForm.extractBusinessStatus = null;
      } else {
        this.downloadForm.extractBusinessStatus = this.downloadForm.status;
      }
      let { ...data } = this.downloadForm;
      delete data.status;
      delete data.timeRange;
      delete data.isOpen;
      await this.queryDataDownload(data);
    },
    confirm(info, name, id) {
      this.$confirm(info, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then((res) => {
        this.deleteDownLoadData(id).then((res) => {
          this.query();
          this.$message({
            message: '撤销成功',
            type: 'success'
          });
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: `已取${name}`
        });
      });
    },
    ...mapActions([
      'queryDataDownload',
      'deleteDownLoadData',
      'gethasSignedFile',
      'orderDownloadFile',
      'queryDataTask'
    ])
  }
};
</script>
