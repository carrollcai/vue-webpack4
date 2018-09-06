<template>
  <div>
    <div class="order-p-table">
      <dl class="tHead">
        <dt class="tH01">订购产品</dt>
        <dd class="tH02 tHead-title">处理意见</dd>
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
      <el-form-item class="handle-task-btn">
        <el-button type="primary"
          @click="submitAssignForm()"
          :loading="submitAssignButton"
          v-loading.fullscreen.lock="submitAssignButton">
          {{!submitAssignButton ? '确定' : '加载中'}}
        </el-button>
        <form-cancel :path="'/order/handle-task'">取消</form-cancel>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { FILE_TIP, FILE_TYPE_ID } from '@/config/index.js';
import { fileValidLen, textareaLimit } from '@/utils/rules.js';
import { fileBeforeUpload } from '@/utils/common.js';
export default {
  props: {
    handleTaskDetail: {
      default: () => { },
      type: Object,
    },
    premissionDenied: Function,
    processCompleteStatus: String | Number,
    taskInsId: String | Number,
    id: String | Number,
  },
  data() {
    const fileCheck = (rule, value, callback) => {
      fileValidLen(this.assignForm.files, callback);
    };
    return {
      fullscreenLoading: false,
      FILE_TIP,
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
    };
  },
  computed: {
    ...mapState({
      submitAssignButton: ({ order }) => order.submitAssignButton,
    })
  },
  methods: {
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
    ...mapActions([
      'cancelAssign',
      'submitAssignContract',
    ])
  }
};
</script>

<style>
</style>
