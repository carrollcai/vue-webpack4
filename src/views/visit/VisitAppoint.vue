<template>
  <div>
    <div class="m-container">
      <el-form class="form-manage"
        ref="myVisitManageForm"
        v-model="appointVisitForm">
        <div class="flex"
          style="flex-direction: column">
          <div class="flex">
            <el-form-item prop="date">
              <el-date-picker v-model="timeRange"
                @change="getTimeRange"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item class="form-query-input-width form-left-width">
              <el-input v-model="appointVisitForm.organizeName"
                clearable
                placeholder="走访公司名称" />
            </el-form-item>
            <el-form-item class="form-query-input-width form-left-width">
              <el-select v-model="appointVisitForm.visitStatusData"
                @change="getVisitStatus"
                clearable
                placeholder="走访状态">
                <el-option v-for="item in taskTypeList"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <el-form-item class="form-query-input-width">
            <el-input v-model="appointVisitForm.processorData"
              clearable
              placeholder="走访人" />
          </el-form-item>
        </div>
        <div class="overflow-hidden">
          <el-form-item class="form-left-width">
            <el-button type="primary"
              @click="query">查询</el-button>
          </el-form-item>
          <el-form-item class="form-left-width">
            <el-button class="el-button--have-icon"
              @click.prevent="createVisitApplication"
              icon="el-icon-plus">新建走访指派</el-button>
          </el-form-item>
        </div>
      </el-form>
      <el-tabs v-model="appointVisitForm.visitResource"
        @tab-click="getVisitResource">
        <el-tab-pane label="指派列表"
          name="2"></el-tab-pane>
        <el-tab-pane label="走访列表"
          name="1"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="m-container table-container">
      <wm-table :source="appointVisitList.list"
        :total="appointVisitList.totalCount"
        :pageNo="appointVisitForm.pageNo"
        :pageSize="appointVisitForm.pageSize"
        @onPagination="onPagination"
        @onSizePagination="onSizePagination">
        <el-table-column label="走访编号"
          property="visitCode"
          width="180" />
        <el-table-column label="走访时间"
          property="visitStartTime"
          width="190"
          :formatter="visitTimeFn" />
        <el-table-column label="走访公司"
          property="organizeName"
          show-overflow-tooltip />
        <el-table-column v-if="appointVisitForm.visitResource === '2'"
          label="指派走访人"
          property="processorCN" />
        <el-table-column v-if="appointVisitForm.visitResource === '1'"
          label="走访人"
          property="processorCN" />
        <el-table-column v-if="appointVisitForm.visitResource === '1'"
          label="走访状态"
          property="visitStatusCN" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button class="table-button"
              type="text"
              @click="viewDetail(scope.row, false)">
              查看
            </el-button>
            <el-button v-if="appointVisitForm.visitResource === '1' && scope.row.visitStatusCN === '已执行' && scope.row.isEvaluate !== 1 && scope.row.isOverDate === 0"
              class="table-button"
              type="text"
              @click="hageResource(scope.row)">
              评价
            </el-button>
            <el-button v-if="appointVisitForm.visitResource === '1' && scope.row.visitStatusCN === '已执行' && scope.row.isEvaluate === 1"
              class="table-button"
              style="color: #999"
              type="text">
              评价
            </el-button>
            <el-button v-if="appointVisitForm.visitResource === '1' && scope.row.visitStatusCN === '已执行' && scope.row.isEvaluate !== 1 && scope.row.isOverDate === 1"
              class="table-button"
              style="color: #999"
              type="text">
              评价
            </el-button>
          </template>
        </el-table-column>
      </wm-table>
    </div>
    <el-dialog title="评价"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-input v-model="visitEvaluate"
        clearable
        required
        :maxlength="500"
        placeholder="评价" />
      <span slot="footer"
        class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
          @click="submitEvaluate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import WmTable from 'components/Table.vue';
import { mapState, mapActions } from 'vuex';
import { PAGE_NO, PAGE_SIZE } from '@/config/index.js';
const visitList = [{ value: '', label: '全部' }, { value: '1', label: '未完成' }, { value: '2', label: '已完成' }];
const appointList = [{ value: '', label: '全部' }, { value: '1', label: '待执行' }, { value: '2', label: '已执行' }, { value: '3', label: '已取消' }];
export default {
  components: {
    WmTable
  },
  computed: {
    ...mapState({
      appointVisitForm: ({ visit }) => visit.appointVisitForm,
      appointVisitList: ({ visit }) => visit.appointVisitList
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
      firstGuestOption: [{ value: '0', label: '否' }, { value: '1', label: '是' }],
      taskTypeList: appointList
    };
  },
  beforeMount() {
    this.query();
  },
  methods: {
    hageResource(row) {
      this.visitId = row.visitId;
      this.visitEvaluate = '';
      this.dialogVisible = true;
    },
    submitEvaluate() {
      if (this.visitEvaluate.trim() !== '') {
        this.judgeVisit({
          visitId: this.visitId,
          visitEvaluate: this.visitEvaluate
        }).then(res => {
          this.dialogVisible = false;
          this.query();
        });
      } else {
        this.$message({ showClose: true, message: '请输入评价内容！', type: 'info' });
      }
    },
    visitTimeFn(row, clo, value) {
      if (row.visitStartTime) {
        let start = row.visitStartTime.split(' ')[0];
        let end = row.visitEndTime ? '-' + row.visitEndTime.split(' ')[0] : '';
        return start + end;
      }
    },
    getVisitStatus(value) {
      if (value !== '') {
        this.appointVisitForm.visitStatus = [value];
      } else {
        this.appointVisitForm.visitStatus = [];
      }
    },
    getTimeRange(time) {
      if (time) {
        this.appointVisitForm.visitStartTime = time[0];
        this.appointVisitForm.visitEndTime = time[1];
      } else {
        this.appointVisitForm.visitStartTime = '';
        this.appointVisitForm.visitEndTime = '';
      }
    },
    onPagination(value) {
      this.isNotPageChange = false;
      this.appointVisitForm.pageNo = value;
      this.query().then(() => {
        this.isNotPageChange = true;
      });
    },
    onSizePagination(value) {
      this.appointVisitForm.pageSize = value;
      this.query();
    },
    getVisitResource(value) {
      this.appointVisitForm.pageNo = this.pageNo;
      this.appointVisitForm.pageSize = this.pageSize;
      if (value.name === '1') {
        this.taskTypeList = appointList;
      } else {
        this.taskTypeList = visitList;
      }
      this.appointVisitForm.visitStatusData = '';
      this.appointVisitForm.visitStatus = [];
      this.query();
    },
    viewDetail(row, execution) {
      let path = '';
      let resource = this.appointVisitForm.visitResource;
      if (resource === '2') {
        this.appointVisitForm.visitResource = '1';
        this.queryVisitAssignDetail({
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          visitCode: row.visitCode,
          visitResource: 1,
          visitStatus: []
        });
      } else {
        path = `/visit/visit-appoint-detail/${row.visitId}?isExecute=${execution}`;
        this.$router.push(path);
      }
    },
    editApp(row) {
      const path = `visit/edit-visit-appoint/${row.visitId}`;
      this.$router.push(path);
    },
    query() {
      this.appointVisitForm.pageNo = this.isNotPageChange ? 1 : this.appointVisitForm.pageNo;

      if (!this.appointVisitForm.processorData) {
        this.appointVisitForm.processor = [];
      } else {
        this.appointVisitForm.processor = [this.appointVisitForm.processorData];
      }
      let { state, ...params } = this.appointVisitForm;
      delete params.visitStatusData;
      delete params.processorData;
      return this.getAppointVisitList(params);
    },
    createVisitApplication() {
      const path = '/visit/create-visit-appoint';
      this.$router.push(path);
    },
    handleClose(done) {
      this.$confirm('确认关闭？').then(_ => {
        done();
      }).catch(_ => {
        console.log(_);
      });
    },
    ...mapActions([
      'getAppointVisitList',
      'judgeVisit',
      'queryVisitAssignDetail'
    ])
  }
};
</script>

<style lang="less">
@import "~scss/variables.less";
.overflow-hidden .el-form-item {
  margin-left: 48px;
}
</style>
