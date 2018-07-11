<template>
  <div>
    <div class="m-container">
      <div class="breadcrumb">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/business-manage/business' }">商机总览</el-breadcrumb-item>
          <el-breadcrumb-item>商机详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <detail-head :type="businessDetail.opporStatusName" :headData="businessDetail"></detail-head>
    <detail-body :detailData="businessDetail"></detail-body>
    <div class="pl" v-if="businessDetail.opporStatusName === '草稿'">
      <el-button type="primary" @click="handleSubmit()">提交处理</el-button>
      <!--<el-button type="primary" @click="handleTrans()">转订单</el-button>
      <el-button plain @click="handleSend()">分派</el-button>
      <el-button plain @click="handleCancel()">作废</el-button>-->
    </div>
    <el-dialog class="business-task-dialog" width="433px" height="312px" title="分派" :visible.sync="sendDialogVisible">
      <el-form ref="form" :model="sendForm">
        <el-form-item label="指派处理人：" prop="">
          <el-cascader style="width: 392px;" v-if="designPerson"
            :options="designPerson"
            v-model="sendForm.person"
            @change="handleChange">
          </el-cascader>
        </el-form-item>
        <el-form-item label="分派的原因：">
          <el-input resize="none" type="textarea" v-model="sendForm.reason" placeholder="请输入优势能力"></el-input>
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
          <el-input resize="none" type="textarea" v-model="cancelForm.reason" placeholder="请输入优势能力"></el-input>
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
      designPerson: []
    };
  },
  beforeMount() {
    const { opporId } = this.$route.params;
    this.getBusinessDetail({ opporId });
  },
  computed: {
    ...mapState({
      businessDetail: ({ business }) => business.businessDetail
    })
  },
  methods: {
    // 商机转订单
    handleTrans() {
      const path = `/business-manage/transfor-order/${this.$route.params.opporId}`;
      this.$router.push(path);
    },
    // 商机提交处理
    handleSubmit() {
      const param = {};
      param.id = this.businessDetail.opporId;
      var _this = this;
      this.submitBusinessDraft(param).then(res => {
        if (res.data && res.errorInfo.code === '200') {
          _this.$message({ showClose: true, message: '您已成功提交该条商机！', type: 'success' });
          _this.reset();
          const path = `/business-manage/business-create-manage`;
          _this.$router.push(path);
        } else {
          _this.$message({ showClose: true, message: '提交失败！', type: 'error' });
        }
      });
    },
    // 点击分派
    handleSend(row) {
      this.sendDialogVisible = true;
      // 获取指派处理人
      this.getDesignatePerson().then((res) => {
        this.designPerson = res;
      });
    },
    // 点击作废
    handleCancel(row) {
      this.cancelDialogVisible = true;
    },
    // 分派取消
    sendCancel() {
      this.sendDialogVisible = false;
      this.sendForm.person = [];
      this.sendForm.reason = '';
    },
    // 分派确定
    sendConfirm() {
      let params = this.sendForm;
      this.submitBusinessSend(params).then(res => {
        this.$message({
          type: 'success',
          message: '您已成功分派！ '
        });
        // this.$message({
        //   type: 'error',
        //   message: '分派失败！ '
        // });
        this.sendDialogVisible = false;
        this.sendForm.person = [];
        this.sendForm.reason = '';
      });
    },
    // 作废取消
    cancelCancel() {
      this.cancelDialogVisible = false;
      this.cancelForm.reason = '';
    },
    // 作废确定
    cancelConfirm() {
      let params = this.cancelForm;
      this.submitBusinessCancel(params).then(res => {
        this.$message({
          type: 'success',
          message: '作废成功！ '
        });
        // this.$message({
        //   type: 'error',
        //   message: '作废失败！ '
        // });
        this.cancelDialogVisible = false;
        this.cancelForm.reason = '';
      });
    },
    ...mapActions([
      'getBusinessDetail', 'getDesignatePerson', 'submitBusinessSend', 'submitBusinessCancel', 'submitBusinessDraft'
    ])
  }
};
</script>

<style lang="scss">
@import "scss/variables.scss";
.pl {
    padding: 0px 0px 40px 135px;
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
</style>
