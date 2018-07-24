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
        <!-- 签约处理，必须是指派任务才能显示 -->
        <detail-bar v-if="getSignHandleContent()" :title="['指派人：', '指派原因：']" :content="getSignHandleContent()" />
        <!-- 签约指派 -->
        <detail-bar v-if="getTodoSignContent()" :title="['处理结果：', '指派处理人：', '指派原因：']" :content="getTodoSignContent()" />
        <!-- 已签约 -->
        <detail-bar v-if="getHasSignContent()" :title="['处理结果：', '签约合同：']" :content="getHasSignContent()" />
        <!-- 已付款 -->
        <detail-bar v-if="getPayContent()" :title="['处理结果：', '付款金额：']" :content="getPayContent()" />
        <!-- 已取消 -->
        <detail-bar v-if="getProcessContent()" :title="['处理结果：', '取消原因：']" :content="getProcessContent()" />

        <detail-content :orderOverviewDetail="handleTaskDetail" />
      </div>
      <div v-if="routeType === 'pay' || routeType === 'sign'" class="detail-line"></div>

      <el-form class="handle-task-detail-form" label-width="112px" ref="assign" v-if="routeType === 'sign'" :model="assignForm" :rules="assignRules">
        <el-form-item label="处理结果：">
          <el-radio v-model="assignForm.status" :label="1">完成签约</el-radio>
          <el-radio v-model="assignForm.status" :label="0">客户取消</el-radio>
        </el-form-item>
        <el-form-item v-if="assignForm.status === 1" label="签约合同：" prop="files" required>
          <!-- accept属性不能完全支持 -->
          <el-upload class="upload-demo" :auto-upload="false" :on-change="fileChange" :multiple="false" :on-remove="removeFile" :file-list="assignForm.files">
            <el-button slot="trigger" size="small">
              <i class="icon-up margin-right-8"></i>上传文件
            </el-button>
            <div slot="tip" class="el-upload__tip">
              <p class="lh1-5">{{FILE_TIP[0]}}</p>
              <p class="lh1-5">{{FILE_TIP[1]}}</p>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item v-else label="取消原因：" prop="dealResult">
          <el-input type="textarea" class="form-input-large" v-model="assignForm.dealResult" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitAssignForm()" :loading="submitAssignButton">{{!submitAssignButton ? '确定' : '加载中'}}</el-button>
          <form-cancel :path="'/order/handle-task'">取消</form-cancel>
        </el-form-item>
      </el-form>

      <el-form class="handle-task-detail-form" label-width="112px" v-if="routeType === 'pay'" ref="pay" :model="payForm" :rules="payRules">
        <el-form-item label="付款金额：" prop="money">
          <el-input class="form-input-medium" type="text" maxlength="10" v-model="payForm.money" placeholder="请输入合同金额">
            <template slot="append">万元/月</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitPayForm">确定</el-button>
          <form-cancel :path="'/order/handle-task'">取消</form-cancel>
        </el-form-item>
      </el-form>

      <div class="task-submit-button">
        <el-button type="primary" @click="submitSign" v-if="routeType === 'detail-sign'">签约处理</el-button>
        <el-button type="primary" @click="submitSign" v-if="routeType === 'detail-pay'">付款处理</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import AuditSteps from 'components/AuditSteps.vue';
import DetailContent from 'components/order/DetailContent.vue';
import DetailBar from 'components/order/DetailBar.vue';
import { multFileValid, inte5Deci4, textareaLimit } from '@/utils/rules.js';
import { FILE_ACCEPT, FILE_MAX_SIZE, FILE_ERROR_TIP, FILE_TIP } from '@/config/index.js';

export default {
  components: {
    AuditSteps,
    DetailContent,
    DetailBar
  },
  data() {
    const fileCheck = (rule, value, callback) => {
      multFileValid(this.assignForm.files, callback);
    };
    return {
      FILE_MAX_SIZE,
      FILE_TIP,
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
        files: [],
        dealResult: ''
      },
      assignRules: {
        files: [
          { validator: fileCheck }
        ],
        dealResult: [
          { required: true, message: '请输入取消原因', trigger: 'blur' },
          { validator: textareaLimit, trigger: 'blur' }
        ]
      },
      routeType: '',
      id: null,
      taskInsId: null
    };
  },
  created() {
    this.processCompleteStatus = 4; // 流程已完成状态
    this.dispatchSignStatus = 2; // 分派签约处理
    this.hasSignStatus = 3;
    this.cancelStatus = 5;
    this.routeChange();
  },
  computed: {
    ...mapState({
      handleTaskDetail: ({ order }) => order.handleTaskDetail,
      processList: ({ order }) => order.processList,
      submitAssignButton: ({ order }) => order.submitAssignButton,
      hasSignedFile: ({ order }) => order.hasSignedFile,
      lastProcessInfo: ({ order }) => order.lastProcessInfo
    })
  },
  async beforeMount() {
    await this.getHandleTaskDetail({ ordId: this.id });
    // 签约获取指派人流程
    if (this.handleTaskDetail.assignReason && this.taskInsId) {
      await this.getOrderProcessInfo({ taskInsId: this.taskInsId });
    }
    // 获取文件名和地址
    await this.handleTaskDetail.fileId && this.gethasSignedFile({ fileInputId: this.handleTaskDetail.fileId });
  },
  watch: {
    '$route'() {
      this.routeChange();
    }
  },
  methods: {
    routeChange() {
      this.routeType = this.$route.params.type;
      this.id = this.$route.params.id;
      this.taskInsId = this.$route.query.taskInsId;
      this.businessStatus = this.$route.query.businessStatus;
    },
    pushArr(...args) {
      return [...args];
    },
    // 显示签约指派人，必须要有指派原因
    getSignHandleContent() {
      if (!this.businessStatus && this.handleTaskDetail.assignReason && this.lastProcessInfo.lastOpName) {
        return this.pushArr(this.lastProcessInfo.lastOpNamem, this.lastProcessInfo.lastDealResult);
      }
    },
    getHasSignContent() {
      if (this.businessStatus && Number(this.handleTaskDetail.ordStatus) === this.hasSignStatus) {
        return this.pushArr('已签约', { files: this.hasSignedFile });
      }
    },
    getTodoSignContent() {
      if (this.businessStatus && Number(this.handleTaskDetail.ordStatus) === this.dispatchSignStatus) {
        return this.pushArr('签约指派', this.handleTaskDetail.processName, this.handleTaskDetail.assignReason);
      }
    },
    getPayContent() {
      if (this.businessStatus && Number(this.handleTaskDetail.ordStatus) === this.processCompleteStatus) {
        return this.pushArr('已付款', `${this.handleTaskDetail.ordPayAmount}万元`);
      }
    },
    getProcessContent() {
      if (this.businessStatus && Number(this.handleTaskDetail.ordStatus) === this.cancelStatus) {
        return this.pushArr('已取消', this.handleTaskDetail.assignReason);
      }
    },
    isAcceptable(fileName) {
      for (let accept of FILE_ACCEPT) {
        if (fileName.toLowerCase().endsWith(accept)) return true;
      }
      return false;
    },
    beforeUpload(file, fileList) {
      const isOverLimit = file.size > (FILE_MAX_SIZE * 1024 * 1024);
      const isFormat = !this.isAcceptable(file.name);
      let index = fileList.findIndex(val => val.uid === file.raw.uid);
      if (isFormat) {
        this.$message.error(FILE_ERROR_TIP);
        fileList.splice(index, 1);
      }
      if (isOverLimit) {
        this.$message.error(`上传文件不能超过${FILE_MAX_SIZE}MB!`);
        fileList.splice(index, 1);
      }
      return isOverLimit || isFormat;
    },
    fileChange(file, fileList) {
      if (this.beforeUpload(file, fileList)) return false;

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
      this.$refs.assign.validate(valid => {
        if (!valid) return false;

        // 客户取消
        if (!this.assignForm.status) {
          let assignParams = {
            id: this.id,
            taskInsId: this.taskInsId,
            resultStatus: '3',
            dealResult: this.assignForm.dealResult
          };
          this.cancelAssign(assignParams);
        } else {
          let params = {
            fileInputId: '',
            fileTypeId: 502,
            moduleId: 1,
            files: this.assignForm.files
          };

          let submitParams = {
            fileId: '',
            taskRequest: {
              id: this.id,
              taskInsId: this.taskInsId,
              resultStatus: this.processCompleteStatus,
              dealResult: '' // 这个字段必传，可为空
            }
          };
          this.submitAssignContract({ params, submitParams });
        }
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
      'submitPay',
      'gethasSignedFile',
      'getOrderProcessInfo'
    ])
  }
};
</script>
