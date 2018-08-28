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
      <div class="task-detail-content"
        v-if="handleTaskDetail && Object.keys(handleTaskDetail).length">
        <detail-content :orderOverviewDetail="handleTaskDetail" />

        <order-product-list v-if="routeType === 'detail'"
          :processList="processList"
          :isShowAll="true" />
      </div>
      <!-- 待签约 -->
      <div class="detail-line"
        v-if="routeType === 'pay' || routeType === 'sign'"></div>
      <div v-if="routeType === 'sign'">
        <div class="p-table"
          v-if="handleTaskDetail && handleTaskDetail.ordProductDtoList">
          <dl class="tHead">
            <dt class="tH01">订购产品</dt>
            <dd class="tH02">处理意见</dd>
          </dl>
          <dl class="tTr"
            v-for="(item, index) in handleTaskDetail.ordProductDtoList"
            :key="index">
            <dt class="tH01">{{item.productName}}</dt>
            <dd class="tH02"
              v-if="premissionDenied(item)">
              <el-form class="handle-task-detail-form"
                label-width="112px"
                ref="assign"
                :model="assignForm"
                :rules="assignRules">
                <el-form-item label-width="130px"
                  label="处理结果："
                  required>
                  <el-radio v-model="assignForm.status"
                    :label="1">完成签约</el-radio>
                  <el-radio v-model="assignForm.status"
                    :label="0">客户取消</el-radio>
                </el-form-item>
                <el-form-item label-width="130px"
                  label="签约时间："
                  v-if="assignForm.status === 1"
                  required
                  prop="time">
                  <el-date-picker class="form-input-large"
                    v-model="assignForm.time"
                    type="date"
                    format="yyyy-MM-dd"
                    :editable="false" />
                </el-form-item>
                <el-form-item label-width="130px"
                  v-if="assignForm.status === 1"
                  label="签约合同："
                  prop="files">
                  <!-- accept属性不能完全支持 -->
                  <el-upload class="upload-demo"
                    :auto-upload="false"
                    :on-change="fileChange"
                    :multiple="false"
                    :on-remove="removeFile"
                    :file-list="assignForm.files">
                    <el-button slot="trigger"
                      size="small">
                      <i class="icon-up margin-right-8"></i>上传文件
                    </el-button>
                    <div slot="tip"
                      class="el-upload__tip">
                      <p class="lh1-5">{{FILE_TIP[0]}}</p>
                      <p class="lh1-5">{{FILE_TIP[1]}}</p>
                    </div>
                  </el-upload>
                </el-form-item>
                <el-form-item label-width="130px"
                  label="是否落收反馈："
                  v-if="assignForm.status === 1"
                  required
                  prop="isFeedBack">
                  <el-radio v-model="assignForm.isFeedBack"
                    :label="1">是</el-radio>
                  <el-radio v-model="assignForm.isFeedBack"
                    :label="0">否</el-radio>
                </el-form-item>
                <el-form-item label-width="130px"
                  v-if="assignForm.status === 1"
                  label="备注："
                  prop="dealResult">
                  <el-input type="textarea"
                    class="form-input-large"
                    v-model="assignForm.dealResult" />
                </el-form-item>
                <el-form-item label-width="130px"
                  v-if="assignForm.status !== 1"
                  label="取消原因："
                  prop="dealResult">
                  <el-input type="textarea"
                    class="form-input-large"
                    v-model="assignForm.dealResult" />
                </el-form-item>
              </el-form>
            </dd>
            <dd class="tH02 p-table-denied"
              v-if="!premissionDenied(item)">您暂无权限处理~</dd>
          </dl>
        </div>
        <el-form>
          <el-form-item class="btn">
            <el-button type="primary"
              @click="submitAssignForm()"
              :loading="submitAssignButton">{{!submitAssignButton ? '确定' : '加载中'}}</el-button>
            <form-cancel :path="'/order/handle-task'">取消</form-cancel>
          </el-form-item>
        </el-form>
      </div>

      <!-- 待支付 -->
      <div v-if="routeType === 'pay'">
        <div class="p-table"
          v-if="handleTaskDetail && handleTaskDetail.ordProductDtoList">
          <dl class="tHead">
            <dt class="tH01">订购产品</dt>
            <dd class="tH02">处理意见</dd>
          </dl>
          <dl class="tTr"
            v-for="(item, index) in handleTaskDetail.ordProductDtoList"
            :key="index">
            <dt class="tH01">{{item.productName}}</dt>
            <dd class="tH02"
              v-if="premissionDenied(item)">
              <el-form class="handle-task-detail-form"
                label-width="112px"
                ref="pay"
                :model="payForm"
                :rules="payRules">
                <el-form-item label="签约合同：">
                  <div>
                    <span class="blue"
                      v-for="(file, k) in hasSignedFile"
                      :key="k"
                      @click="downloadFile(file)">
                      {{file.fileName}}
                    </span>
                  </div>
                </el-form-item>
                <el-form-item label="付款金额："
                  prop="money">
                  <el-input class="form-input-medium"
                    type="text"
                    maxlength="10"
                    v-model="payForm.money"
                    placeholder="请输入合同金额">
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="备注："
                  prop="dealResult">
                  <el-input type="textarea"
                    class="form-input-large"
                    v-model="payForm.dealResult" />
                </el-form-item>
              </el-form>
            </dd>
            <dd class="tH02 p-table-denied"
              v-if="!premissionDenied(item)">您暂无权限处理~</dd>
          </dl>
        </div>
        <el-form>
          <el-form-item class="btn">
            <el-button type="primary"
              @click="submitPayForm">确定</el-button>
            <form-cancel :path="'/order/handle-task'">取消</form-cancel>
          </el-form-item>
        </el-form>
      </div>

      <!-- 待签约处理、待付款处理详情 -->
      <div class="task-submit-button">
        <el-button type="primary"
          @click="submitSign"
          v-if="routeType === 'detail-sign'">签约处理</el-button>
        <el-button type="primary"
          @click="submitSign"
          v-if="routeType === 'detail-pay'">付款处理</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import AuditSteps from 'components/AuditSteps.vue';
import DetailContent from 'components/order/DetailContent.vue';
import DetailBar from 'components/order/DetailBar.vue';
import OrderProductList from 'components/order/OrderProductList.vue';
import { fileValidLen, inte5Deci4, textareaLimit } from '@/utils/rules.js';
import { FILE_TIP, FILE_TYPE_ID } from '@/config/index.js';
import { fileBeforeUpload } from '@/utils/common.js';

export default {
  components: {
    AuditSteps,
    DetailContent,
    DetailBar,
    OrderProductList,
  },
  data() {
    const fileCheck = (rule, value, callback) => {
      fileValidLen(this.assignForm.files, callback);
    };
    return {
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
        time: '',
        isFeedBack: 1,
        status: 1,
        files: [],
        dealResult: ''
      },
      assignRules: {
        time: [
          { required: true, message: '请选择签约时间', trigger: ['blur', 'change'] }
        ],
        isFeedBack: [
          { required: true, message: '请选择是否落收反馈', trigger: 'change' }
        ],
        files: [
          { validator: fileCheck }
        ],
        dealResult: [
          { required: true, message: '请输入内容', trigger: 'blur' },
          { validator: textareaLimit, trigger: 'blur' }
        ]
      },
      routeType: '',
      ordCode: null,
      id: null,
      taskInsId: null,
      operatorId: '',
    };
  },
  created() {
    this.processCompleteStatus = 4; // 流程已完成状态
    this.dispatchSignStatus = 2; // 分派签约处理
    this.hasSignStatus = 3; // 已签约
    this.cancelStatus = 5; // 取消签约
    this.routeChange();
  },
  computed: {
    ...mapState({
      handleTaskDetail: ({ order }) => order.handleTaskDetail[0],
      processList: ({ order }) => order.processList,
      submitAssignButton: ({ order }) => order.submitAssignButton,
      hasSignedFile: ({ order }) => order.hasSignedFile,
      lastProcessInfo: ({ order }) => order.lastProcessInfo,
      opRegion: ({ root }) => root.currentUser.operator.opRegion,
    })
  },
  async beforeMount() {
    // 清空processList数据
    this.removeProcessList();

    this.getUserInfoSelf({}).then(res => {
      this.operatorId = res;
    });
    await this.getHandleTaskDetail({ ordCode: this.ordCode });

    // 获取流程信息
    await this.getOrderOverviewProcessList({
      ordProductDtoList: this.handleTaskDetail.ordProductDtoList
    });

    // 签约获取指派人流程
    // if (this.handleTaskDetail.assignReason && this.taskInsId) {
    //   await this.getOrderProcessInfo({ taskInsId: this.taskInsId });
    // }
    // 获取文件名和地址
    await this.handleTaskDetail.fileId && this.gethasSignedFile({ fileInputId: this.handleTaskDetail.fileId });
  },
  watch: {
    '$route'() {
      this.routeChange();
    }
  },
  methods: {
    premissionDenied(item) {
      // 如果当前用户所属归属地和流程归属地相同
      if (Number(this.opRegion) === item.companyBelong) {
        return true;
      }
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
    routeChange() {
      this.routeType = this.$route.params.type;
      this.ordCode = this.$route.params.id;
      this.id = this.$route.query.ordId;
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
    fileChange(file, fileList) {
      if (fileBeforeUpload.call(this, file, fileList)) return false;

      this.assignForm.files.push(file.raw);
      this.$refs.assign[0].validateField('files');
    },
    removeFile(file, fileList) {
      /**
      * 这里应该是element-ui的问题，如果不加file-list，file传的是多一层对象，取到uid需要file.raw.uid，如果加了file-list，删除文件，直接取到file文件，需要注意。
      */
      // 筛选选中的文件
      let index = this.assignForm.files.findIndex(val => val.uid === file.uid);
      this.assignForm.files.splice(index, 1);

      this.$refs.assign[0].validateField('files');
    },
    submitAssignForm() {
      // 当$refs在循环里，会变成一个数组
      this.$refs.assign[0].validate(valid => {
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
            fileTypeId: FILE_TYPE_ID.order,
            moduleId: 1,
            files: this.assignForm.files
          };

          let submitParams = {
            fileId: '',
            taskRequest: {
              id: this.id,
              taskInsId: this.taskInsId,
              resultStatus: this.processCompleteStatus,
              dealResult: this.assignForm.dealResult // 这个字段必传，可为空
            },
            isFeedBack: this.assignForm.isFeedBack
          };
          this.submitAssignContract({ params, submitParams });
        }
      });
    },
    submitPayForm() {
      const params = {
        ordPayAmount: Number(this.payForm.money),
        taskRequest: {
          id: Number(this.id),
          taskInsId: Number(this.taskInsId),
          resultStatus: '5',
          dealResult: this.payForm.dealResult,
          dealPerson: this.operatorId
        }
      };
      this.$refs.pay[0].validate(valid => {
        if (!valid) return false;
        this.submitPay(params);
      });
    },
    downloadFile(obj) {
      let params = {
        fileTypeId: obj.fileTypeId,
        fileSaveName: obj.fileSaveName,
        fileName: obj.fileName
      };
      this.orderDownloadFile(params);
    },
    ...mapMutations({
      removeProcessList: 'ORDER_REMOVE_PROCESS_LIST',
    }),
    ...mapActions([
      'getUserInfoSelf',
      'getNewFileInputId',
      'getHandleTaskDetail',
      'uploadOrderHandleTask',
      'cancelAssign',
      'submitAssignContract',
      'submitPay',
      'gethasSignedFile',
      // 'getOrderProcessInfo',
      'orderDownloadFile',
      'getOrderOverviewProcessList'
    ])
  }
};
</script>

<style lang="scss">
.btn {
  text-align: center;
  margin-top: 26px;
}
</style>
