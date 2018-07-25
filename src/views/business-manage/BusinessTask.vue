<template>
  <div>
    <div class="m-container">
      <el-form class="task-form" ref="taskManageForm" :rules="taskManageRules">
        <div class="flex">
          <el-form-item>
            <el-date-picker v-model="businessTaskForm.date" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>

          <el-form-item class="task-form-item__input group-form-item__lable">
            <el-input clearable v-model="businessTaskForm.organizeNameOrCode" placeholder="合作集团/编码" />
            <!--<el-autocomplete clearable v-model="businessTaskForm.organizeNameOrCode" :fetch-suggestions="querySearchAsync" placeholder="合作集团/编码" @select="handleSelect"></el-autocomplete>-->
          </el-form-item>
          <el-form-item class="task-form-item__input group-form-item__lable">
            <el-input clearable v-model="businessTaskForm.opporCode" placeholder="商机编码" />
          </el-form-item>
        </div>
        <div class="flex">
          <el-form-item class="task-form-item group-form-item__lable">
            <el-button type="primary" @click="query">查询</el-button>
          </el-form-item>
        </div>
      </el-form>
      <el-tabs v-model="businessTaskForm.taskHasComplete" @tab-click="tabChange">
        <el-tab-pane label="待处理" :name="0"></el-tab-pane>
        <el-tab-pane label="已处理" :name="1"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="m-container table-container">
      <wm-table :source="businessTaskList.list" :pageNo="businessTaskForm.pageNo" :pageSize="businessTaskForm.pageSize" :total="businessTaskList.totalCount" @onPagination="onPagination" @onSizePagination="onSizePagination">
        <el-table-column label="商机编号" show-overflow-tooltip property="opporCode" />
        <el-table-column label="商机描述" show-overflow-tooltip property="busiDesc" />
        <el-table-column label="合作集团" show-overflow-tooltip property="organizeName" />
        <el-table-column label="创建时间" show-overflow-tooltip property="createDate" />
        <el-table-column label="联系人" show-overflow-tooltip property="contactName" />
        <!--<el-table-column v-if="businessTaskForm.taskHasComplete === 1" label="处理人" property="contactName" />-->
        <el-table-column label="处理结果" v-if="businessTaskForm.taskHasComplete === 1" property="businessStatusName" />
        <!--<el-table-column v-if="businessTaskForm.opporCode === '1'" label="处理结果" property="businessStatus" />-->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button v-if="businessTaskForm.taskHasComplete === '0'" type="text" @click="handleTrans(scope.row)">
              转订单
            </el-button>
            <template v-if="businessTaskForm.taskHasComplete === '0'">
              <el-dropdown @command="handleCommand(scope.row, $event)">
                <el-button type="text">
                  更多<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item class="el-dropdown-link" command="detail">详情</el-dropdown-item>
                  <el-dropdown-item class="el-dropdown-link" command="send">分派</el-dropdown-item>
                  <el-dropdown-item class="el-dropdown-link" command="cancel">作废</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
            <el-button v-else type="text" class="table-button" @click="handleDetail(scope.row)">
              详情
            </el-button>
          </template>
        </el-table-column>
      </wm-table>
    </div>
    <el-dialog class="business-task-dialog" width="433px" height="312px" title="分派" :visible.sync="sendDialogVisible">
      <el-form ref="form" :model="sendForm">
        <el-form-item label="指派处理人：" prop="">
          <el-cascader style="width: 392px;" v-if="assignHandlers"
            :options="assignHandlers"
            v-model="sendForm.person"
            @change="handleChange">
          </el-cascader>
        </el-form-item>
        <el-form-item label="分派的原因：">
          <el-input maxlength="500" resize="none" type="textarea" v-model="sendForm.reason" placeholder="请输入优势能力"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="sendCancel">取 消</el-button>
        <el-button type="primary" @click="sendConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog class="business-task-dialog" width="433px" height="312px" title="作废" :visible.sync="cancelDialogVisible">
      <el-form ref="form" :model="cancelForm">
        <el-form-item label="作废原因：">
          <el-input maxlength="500" resize="none" type="textarea" v-model="cancelForm.reason" placeholder="请输入优势能力"></el-input>
        </el-form-item>
        <p class="tipsText">*如确定要作废该商机，请填写原因供创建者查看</p>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelCancel">取 消</el-button>
        <el-button type="primary" @click="cancelConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import WmTable from 'components/Table.vue';
import { mapState, mapActions } from 'vuex';
import moment from 'moment';
export default {
  components: {
    WmTable
  },
  computed: {
    cooperNumList() {
      if (this.cooperationGroupList) {
        return this.cooperationGroupList;
      }
    },
    ...mapState({
      cooperationGroupList: ({ business }) => business.cooperationGroupList,
      businessTaskForm: ({ business }) => business.businessTaskForm,
      businessTaskList: ({ business }) => business.businessTaskList,
      remindPerson: ({business}) => business.remindPerson,
      assignHandlers: ({ order }) => order.assignHandlers
    })
  },
  data() {
    return {
      timeRange: '',
      status: 0,
      taskManageRules: {
      },
      cooperNum: '',
      cancelReason: '',
      sendDialogVisible: false,
      cancelDialogVisible: false,
      sendForm: {
        person: '',
        reason: ''
      },
      cancelForm: {
        reason: ''
      },
      largeArea: [
        { 'label': '总部', 'value': '0' },
        { 'label': '咪咕子公司', 'value': '1' },
        { 'label': '销售大区', 'value': '2' }
      ],
      selectedDesignPerson: '',
      sendParam: {},
      cancelParam: {}
    };
  },
  watch: {
    status(newValue) {
      this.query();
    }
  },
  beforeMount() {
    // this.getCooperationGroupList();
    // this.query();
    let { date, ..._params } = this.businessTaskForm;
    // if (_params.opporStatus > 0) {
    //   _params.opporStatus = _params.opporStatus - 1;
    // } else {
    //   _params.opporStatus = '';
    // }
    this.getBusinessTaskList(_params);
    // const params = this.businessTaskForm;
    // params.taskHasComplete = this.status;
    // this.getBusinessTaskList(params);
  },
  methods: {
    tabChange(val) {
      this.businessTaskForm.pageNo = 1;
      this.businessTaskForm.pageSize = 20;
      this.query();
    },
    getTimeRange(time) {
      if (time) {
        this.businessTaskForm.startDate = time[0];
        this.businessTaskForm.endDate = time[1];
      } else {
        this.businessTaskForm.startDate = '';
        this.businessTaskForm.endDate = '';
      }
    },
    // 分页
    onPagination(value) {
      this.businessTaskForm.pageNo = value;
      this.query();
    },
    // 改变页面展示条数
    onSizePagination(value) {
      this.businessTaskForm.pageSize = value;
      this.query();
    },
    // 查看详情
    handleDetail(row) {
      const path = `/business-manage/business-detail/${row.opporId}/${row.taskInsId}/${this.businessTaskForm.taskHasComplete}/2`;
      this.$router.push(path);
    },
    // 点击转订单
    handleTrans(row) {
      this.$router.push(`/business-manage/transfor-order/${row.opporId}/${row.taskInsId}`);
    },
    // 点击分派
    handleSend(row) {
      this.sendDialogVisible = true;
      this.sendParam.taskInsId = row.taskInsId;
      this.sendParam.resultStatus = '0';
      this.sendParam.id = row.opporId;
      // 初始化输入框内容部数据
      this.getAssignhandler();
    },
    // 点击作废
    handleCancel(row) {
      this.cancelDialogVisible = true;
      this.cancelParam.taskInsId = row.taskInsId;
      this.cancelParam.resultStatus = '3';
      this.cancelParam.id = row.opporId;
      this.cancelParam.dealPerson = '';
      this.cancelForm.reason = '';
    },
    // 分派取消
    sendCancel() {
      this.sendDialogVisible = false;
      this.sendForm.person = '';
      this.sendForm.reason = '';
    },
    // 分派确定
    sendConfirm() {
      let params = this.sendParam;
      if (this.sendForm.person !== '') {
        if (this.sendForm.reason.trim() !== '') {
          params.dealPerson = this.sendForm.person.pop();
          params.dealResult = this.sendForm.reason.trim();
          this.submitBusinessSend(params).then(res => {
            if (res.data) {
              this.sendDialogVisible = false;
              this.sendForm.person = '';
              this.sendForm.reason = '';
              this.$message({ showClose: true, message: '您已成功分派！', type: 'success' });
              this.query();
            } else {
              this.$message({ showClose: true, message: '分派失败！', type: 'error' });
            }
          });
        } else {
          this.$message({ showClose: true, message: '请填写分派的原因！' });
        }
      } else {
        this.$message({ showClose: true, message: '请选择指派处理人！' });
      }
    },
    // 作废取消
    cancelCancel() {
      this.cancelDialogVisible = false;
      this.cancelForm.reason = '';
    },
    // 作废确定
    cancelConfirm() {
      let params = this.cancelParam;
      params.dealResult = this.cancelForm.reason.trim();
      if (params.dealResult !== '') {
        this.submitBusinessCancel(params).then(res => {
          if (res.data) {
            this.cancelDialogVisible = false;
            this.cancelForm.reason = '';
            this.$message({ showClose: true, message: '作废成功！', type: 'success' });
            this.query();
          } else {
            this.$message({ showClose: true, message: '作废失败！', type: 'error' });
          }
        });
      } else {
        this.$message({ showClose: true, message: '请填写作废原因！' });
      }
    },
    query() {
      const params = this.businessTaskForm;

      if (params.date !== null && params.date.length === 2) {
        params.startDate = moment(params.date[0]).format('YYYY-MM-DD');
        params.endDate = moment(params.date[1]).format('YYYY-MM-DD');
      } else {
        params.startDate = '';
        params.endDate = '';
      }
      let { date, ..._params } = this.businessTaskForm;
      this.getBusinessTaskList(_params);
    },
    async querySearchAsync(queryString, cb) {
      if (!queryString) return false;
      let params = {
        pageSize: 20,
        organizeName: queryString
      };
      await this.getCooperationGroupList(params);
      await clearTimeout(this.timeout);
      this.timeout = await setTimeout(() => {
        var results = this.cooperationGroupList;
        if (results.length === 0) {
          this.noData = true;
        } else {
          this.noData = false;
        };
        cb(results);
      }, 1000);
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
    },
    handleCommand(row, command) {
      let COMMANDS = {
        'detail': 'handleDetail',
        'send': 'handleSend',
        'cancel': 'handleCancel'
      };
      this[COMMANDS[command]](row);
    },
    handleChange(value) {
    },
    ...mapActions([
      'getCooperationGroupList', 'getBusinessTaskList', 'getRemindPerson', 'submitBusinessSend', 'submitBusinessCancel', 'getAssignhandler'
    ])
  }
};
</script>

<style lang="scss">
@import "scss/variables.scss";
.group-form-item__lable {
  margin-left: $blockWidth;
}
.task-form {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.task-form-item__input {
  width: $inputWidthQuery;
}
.task-form-item {
  margin-left: $formWidth;
}
// 弹出框样式设置
.business-task-dialog {
  .el-dialog__body {
    padding: 0px 20px;
  }
  .el-form-item {
    margin-bottom: 13px;
  }
  .el-textarea__inner {
    height: 88px;
  }
}
.tipsText {
  height: 20px;
  line-height: 20px;
  color: rgba(0, 0, 0, 0.25);
  font-size: 14px;padding-bottom:0px;
}
</style>
