<template>
  <div>
    <div class="m-container">
      <div class="breadcrumb">
        <el-breadcrumb v-if="this.$route.params.type === '0'">
          <el-breadcrumb-item :to="{ path: '/business-manage/business' }">商机总览</el-breadcrumb-item>
          <el-breadcrumb-item>商机详情</el-breadcrumb-item>
        </el-breadcrumb>
        <el-breadcrumb v-if="this.$route.params.type === '1'">
          <el-breadcrumb-item :to="{ path: '/business-manage/business-create-manage' }">商机创建管理</el-breadcrumb-item>
          <el-breadcrumb-item>商机详情</el-breadcrumb-item>
        </el-breadcrumb>
        <el-breadcrumb v-if="this.$route.params.type === '2'">
          <el-breadcrumb-item :to="{ path: '/business-manage/business-task' }">商机处理任务</el-breadcrumb-item>
          <el-breadcrumb-item>商机详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="m-container o-overview-detail">
      <div class="task-detail-content">
        <detail-head v-if="this.$route.params.taskHasComplete === '1' && queryTask[0] && queryTask[0].businessStatusName === '已分派'" :type="queryTask[0].businessStatusName" :headData="queryTask[0]"></detail-head>
        <detail-head v-else-if="this.$route.params.taskHasComplete === '1' && queryTask[0] && !queryTask[0].businessStatusName === '已分派'" :type="queryTask[0].businessStatusName" :headData="businessDetail"></detail-head>
        <detail-head v-else :type="businessDetail.opporStatusName" :headData="businessDetail"></detail-head>
        <detail-body :detailData="businessDetail"></detail-body>
        <div class="pl" v-if="businessDetail.opporStatusName === '草稿'">
          <el-button type="primary" @click="handleSubmit()">提交处理</el-button>
        </div>
        <div class="pl" v-if="this.$route.params.taskHasComplete === '0' && this.$route.params.taskInsId !== '0'">
          <el-button type="primary" @click="handleTrans()">转订单</el-button>
          <el-button plain @click="handleSend()">分派</el-button>
          <el-button plain @click="handleCancel()">作废</el-button>
        </div>
      </div>
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
import { mapState, mapActions } from 'vuex';
import DetailHead from 'components/business/DetailHead.vue';
import DetailBody from 'components/business/DetailBody.vue';
export default {
  components: {
    DetailHead,
    DetailBody
  },
  data() {
    return {
      types: '',
      sendDialogVisible: false,
      cancelDialogVisible: false,
      sendForm: {
        person: [],
        reason: ''
      },
      cancelForm: {
        reason: ''
      },
      designPerson: [],
      sendParam: {},
      cancelParam: {}
    };
  },
  beforeMount() {
    let opprparam = {};
    opprparam.opporId = this.$route.params.opporId;
    this.types = this.$route.params.taskInsId;
    let taskparam = {};
    taskparam.taskInsId = parseInt(this.$route.params.taskInsId);
    this.getBusinessDetail(opprparam);
    if (this.$route.params.taskHasComplete === '1') {
      this.getQueryTask(taskparam);
    }
  },
  computed: {
    ...mapState({
      businessDetail: ({ business }) => business.businessDetail,
      designatePerson: ({business}) => business.designatePerson,
      queryTask: ({business}) => business.queryTask,
      assignHandlers: ({ order }) => order.assignHandlers
    })
  },
  methods: {
    // 商机转订单
    handleTrans() {
      this.$router.push(`/business-manage/transfor-order/${this.$route.params.opporId}/${this.$route.params.taskInsId}`);
    },
    // 商机提交处理
    handleSubmit() {
      const param = {};
      param.id = this.businessDetail.opporId;
      this.submitBusinessDraft(param).then(res => {
        if (res.data) {
          this.$message({ showClose: true, message: '您已成功提交该条商机！', type: 'success' });
          const path = `/business-manage/business-create-manage`;
          this.$router.push(path);
        } else {
          this.$message({ showClose: true, message: '提交失败！', type: 'error' });
        }
      });
    },
    // 点击分派
    handleSend(row) {
      this.sendDialogVisible = true;
      this.sendParam.taskInsId = this.$route.params.taskInsId;
      this.sendParam.resultStatus = '0';
      this.sendParam.id = this.$route.params.opporId;
      // 初始化输入框内容部数据
      this.getAssignhandler();
    },
    // 点击作废
    handleCancel(row) {
      this.cancelDialogVisible = true;
      this.cancelParam.taskInsId = this.$route.params.taskInsId;
      this.cancelParam.resultStatus = '3';
      this.cancelParam.id = this.$route.params.opporId;
      this.cancelParam.dealPerson = '';
      this.cancelForm.reason = '';
    },
    // 分派取消
    sendCancel() {
      this.sendDialogVisible = false;
      this.sendForm.person = [];
      this.sendForm.reason = '';
    },
    // 分派确定
    sendConfirm() {
      let params = this.sendParam;
      if (this.sendForm.person.length !== 0) {
        if (this.sendForm.reason.trim() !== '') {
          params.dealResult = this.sendForm.reason;
          params.dealPerson = this.sendForm.person.pop();
          this.submitBusinessSend(params).then(res => {
            if (res.data) {
              this.sendDialogVisible = false;
              this.sendForm.person = '';
              this.sendForm.reason = '';
              this.$message({ showClose: true, message: '您已成功分派！', type: 'success' });
              const path = `/business-manage/business-task`;
              this.$router.push(path);
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
            this.cancelForm.person = '';
            this.cancelForm.reason = '';
            this.$message({ showClose: true, message: '作废成功！', type: 'success' });
            const path = `/business-manage/business-task`;
            this.$router.push(path);
          } else {
            this.$message({ showClose: true, message: '作废失败！', type: 'error' });
          }
        });
      } else {
        this.$message({ showClose: true, message: '请填写作废原因！' });
      }
    },
    ...mapActions([
      'getBusinessDetail', 'getDesignatePerson', 'submitBusinessSend', 'submitBusinessCancel', 'submitBusinessDraft', 'getQueryTask', 'getAssignhandler'
    ])
  }
};
</script>

<style lang="scss">
@import "scss/variables.scss";
.o-overview-detail {
  margin-top: 16px;
}
.pl {
    padding: 30px 0px 40px 112px;
    background: #fff;
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
.business-container {
  background:#fff;
  padding:24px;
  margin-top:16px;
}
</style>
