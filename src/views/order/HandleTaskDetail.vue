<template>
  <div>
    <div class="m-container">
      <div class="breadcrumb">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/order/handle-task' }">订单处理任务</el-breadcrumb-item>
          <el-breadcrumb-item v-if="routeType === 'sign'">签约处理</el-breadcrumb-item>
          <el-breadcrumb-item v-else-if="routeType === 'pay'">付款处理</el-breadcrumb-item>
          <el-breadcrumb-item v-else>详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="m-container o-overview-detail">

      <div class="task-detail-content" v-if="Object.keys(handleTaskDetail).length">
        <detail-bar v-if="routeType === 'detail' && getPayContent()" :title="['处理结果：', '付款金额：']" :content="getPayContent()" />

        <detail-bar v-if="routeType === 'detail' && getProcessContent()" :title="['指派人：', '指派原因：']" :content="getProcessContent()" />
        <detail-content :orderOverviewDetail="handleTaskDetail" />
      </div>

      <div class="line"></div>

      <el-form class="handle-task-detail-form" label-width="112px" ref="assign" v-if="routeType === 'sign'" :model="assignForm" :rules="assignRules">
        <el-form-item label="处理结果：">
          <el-radio v-model="assignForm.status" :label="1">完成签约</el-radio>
          <el-radio v-model="assignForm.status" :label="0">客户取消</el-radio>
        </el-form-item>
        <el-form-item v-if="assignForm.status === 1" label="签约合同：" prop="files">
          <el-upload class="upload-demo" :auto-upload="false" :on-change="fileChange" :multiple="false" :on-remove="removeFile" :file-list="assignForm.files">
            <el-button slot="trigger" size="small">
              <i class="icon-up margin-right-8"></i>上传文件</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitAssignForm()">确定</el-button>
          <form-cancel :path="'/order/handle-task'">取消</form-cancel>
        </el-form-item>
      </el-form>

      <el-form class="handle-task-detail-form" label-width="112px" v-if="routeType === 'pay'" ref="pay" :model="payForm" :rules="payRules">
        <el-form-item label="付款金额：" prop="money">
          <el-input class="form-input-medium" type="number" v-model.number="payForm.money" placeholder="请输入合同金额" @onmousewheel="cancelNumberScroll">
            <template slot="append">万元/月</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitPayForm()">确定</el-button>
          <form-cancel :path="'/order/handle-task'">取消</form-cancel>
        </el-form-item>
      </el-form>

      <div class="task-submit-button" v-if="routeType === 'detail-sign' || routeType === 'detail-pay'">
        <el-button type="primary" @click="submitSign">签约处理</el-button>
      </div>

    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import AuditSteps from 'components/AuditSteps.vue';
import DetailContent from 'components/order/DetailContent.vue';
import DetailBar from 'components/order/DetailBar.vue';
import { multFileValid, inte5Deci4 } from '@/utils/rules.js';
import { cancelNumberScroll } from '@/utils/common.js';

export default {
  data() {
    const fileCheck = (rule, value, callback) => {
      multFileValid(this.assignForm.files, callback);
    };
    return {
      payForm: {
        money: null
      },
      payRules: {
        money: [
          { required: true, message: '请输入合同金额', trigger: 'blur' },
          { validator: inte5Deci4, trigger: 'blur' }
        ]
      },
      assignForm: {
        status: 1,
        files: []
      },
      assignRules: {
        files: [
          { validator: fileCheck }
        ]
      },
      routeType: '',
      id: null,
      taskInsId: null
    };
  },
  components: {
    AuditSteps,
    DetailContent,
    DetailBar
  },
  created() {
    this.cancelNumberScroll = cancelNumberScroll;
    this.processComplete = 4; // 流程已完成状态
    this.routeChange();
  },
  computed: {
    ...mapState({
      handleTaskDetail: ({ order }) => order.handleTaskDetail,
      processList: ({ order }) => order.processList
    })
  },
  beforeMount() {
    const { id } = this.$route.params;
    this.getHandleTaskDetail({ ordId: id });
  },
  watch: {
    '$route'() {
      this.routeChange();
    }
  },
  methods: {
    getPayContent() {
      let contents = [];
      if (Number(this.handleTaskDetail.ordStatus) === this.processComplete) {
        contents.push('已付款');
        contents.push(`${this.handleTaskDetail.ordPayAmount}万元`);
        return contents;
      }
    },
    getProcessContent() {
      let contents = [];
      if (Number(this.handleTaskDetail.ordStatus) !== this.processComplete && this.handleTaskDetail.processor) {
        contents.push(this.handleTaskDetail.processName);
        contents.push(this.handleTaskDetail.assignReason);
        return contents;
      }
    },
    routeChange() {
      this.routeType = this.$route.params.type;
      this.id = this.$route.params.id;
      this.taskInsId = this.$route.query.taskInsId;
    },
    fileChange(file, fileList) {
      this.assignForm.files.push(file.raw);

      // 校验文件
      this.$refs.assign.validateField('files');
    },
    removeFile(file, fileList) {
      /**
      * 这里应该是element-ui的问题，如果不加file-list，file传的是多一层对象，取到uid需要file.raw.uid，如果加了file-list，删除文件，直接取到file文件，需要注意。
      */
      // 筛选选中的文件
      let index = this.assignForm.files.findIndex(val => val.uid === file.uid);

      this.assignForm.files.splice(index, 1);

      this.$refs.assign.validateField('files');
    },
    submitAssignForm() {
      // 客户取消
      if (!this.assignForm.status) {
        let params = {
          id: this.id,
          taskInsId: this.taskInsId,
          resultStatus: '3',
          dealResult: ''
        };
        this.cancelAssign(params);
        return false;
      }

      this.$refs.assign.validate(async valid => {
        if (!valid) return false;

        // 先获取附件id再上传,再提交表单。
        let fileInputId = await this.getNewFileInputId();
        let params = {
          fileInputId,
          fileTypeId: 502,
          moduleId: 1,
          files: this.assignForm.files
        };
        await this.uploadOrderHandleTask(params);

        let submitParams = {
          fileId: fileInputId,
          taskRequest: {
            id: this.id,
            taskInsId: this.taskInsId,
            resultStatus: this.processComplete,
            dealResult: '' // 这个字段必传，可为空
          }
        };
        await this.submitAssignContract(submitParams);
      });
    },
    submitSign() {
      // 跳转到付款的详情
      let path = '';
      if (this.routeType === 'detail-sign') {
        path = `/order/handle-task/sign/${this.id}?taskInsId=${this.taskInsId}`;
      } else {
        path = `/order/handle-task/pay/${this.id}?taskInsId=${this.taskInsId}`;
      }
      this.$router.push(path);
    },
    submitPayForm() {
      const params = {
        ordPayAmount: this.payForm.money,
        taskRequest: {
          id: this.id,
          taskInsId: this.taskInsId,
          resultStatus: '5'
        }
      };
      this.$refs.pay.validate(valid => {
        if (!valid) return false;
        this.submitPay(params);
      });
    },
    ...mapActions([
      'getNewFileInputId',
      'getHandleTaskDetail',
      'uploadOrderHandleTask',
      'cancelAssign',
      'submitAssignContract',
      'submitPay'
    ])
  }
};
</script>

<style lang="scss">
.o-overview-detail {
  margin-top: 16px;
}
.line {
  margin-top: 20px;
  margin-bottom: 20px;
  width: 100%;
  border: 1px solid rgba(229, 229, 229, 1);
}
.handle-task-detail-form {
  & .el-form-item__label {
    color: rgba(0, 0, 0, 0.45);
  }
}
.margin-right-8 {
  margin-right: 8px;
}
.upload-demo {
  width: 300px;
}
</style>
