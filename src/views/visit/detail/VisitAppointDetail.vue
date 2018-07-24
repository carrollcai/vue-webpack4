<template>
<div>
  <div class="m-container">
    <Vdetail :visitDetail="visitDetailData" :isPoint="isPoint"></Vdetail>
  </div>
  <div v-if="isExecute === 'true'" class="m-container transfer-out">
    <el-form
      :model="formData"
      :rules="formDataValid"
      ref="visitRef">
      <el-form-item label="转发人：" label-width="130px" required prop="visitEvaluator">
        <el-select
          v-if="processorList"
          v-model="formData.visitEvaluator"
          filterable placeholder="请选择">
          <el-option
            v-for="item in processorList"
            :key="item.operatorId"
            :label="item.staffName"
            :value="item.operatorId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="转发说明：" label-width="130px" required prop="feedbackNote">
        <el-input v-model="formData.feedbackNote" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="走访汇报：" label-width="130px" prop="feedback">
        <el-input v-model="formData.feedback" placeholder="简要描述一下处理方案" type="textarea" :rows="4"></el-input>
      </el-form-item>
      <el-form-item label="物料上传：" label-width="130px" prop="files">
        <el-upload class="upload-demo" action=""
          :auto-upload="false"
          :on-change="fileChange"
          :multiple="false"
          :on-remove="removeFile"
          :file-list="fileList">
          <el-button slot="trigger" size="small">
            <i class="icon-up margin-right-8"></i>上传文件
          </el-button>
          <div slot="tip" class="el-upload__tip">
            <p class="lh1-5">{{FILE_TIP[0]}}</p>
            <p class="lh1-5">{{FILE_TIP[1]}}</p>
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item class="mt28 mb10" label-width="130px">
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>

<script>
import WmTable from 'components/Table.vue';
import Vdetail from 'components/visit/VisitDetail.vue';
import { mapState, mapActions } from 'vuex';
import { FILE_ACCEPT, FILE_MAX_SIZE, FILE_ERROR_TIP, FILE_TIP } from '@/config/index.js';
import { textareaLimit, textareaMaxLimit } from '@/utils/rules.js';
export default {
  components: {
    WmTable,
    Vdetail
  },
  computed: {
    visitDetailData() {
      if (this.visitAppointDetail) {
        return this.visitAppointDetail;
      }
    },
    ...mapState({
      processorList: ({ visit }) => visit.regionManageList,
      visitAppointDetail: ({ visit }) => visit.visitAppointDetail
    })
  },
  data() {
    const fileCheck = (rule, value, callback) => {
      // multFileValid(this.uploadData.files, callback);
    };
    return {
      FILE_TIP,
      visitId: this.$route.params.id,
      isExecute: this.$route.query.isExecute,
      isPoint: this.$route.query.point,
      fileList: [],
      uploadData: {
        fileInputId: '',
        fileTypeId: 502,
        moduleId: 1,
        expireDate: '',
        effectiveDate: '',
        files: []
      },
      formData: {
        visitEvaluator: '',
        feedbackNote: '',
        feedback: '',
        visitId: this.$route.params.id,
        fileInputId: ''
      },
      formDataValid: {
        visitEvaluator: [
          { required: true, message: '请选择转发人', trigger: 'blur' }
        ],
        feedbackNote: [
          { required: true, message: '请输入转发说明', trigger: ['change', 'blur'] },
          { validator: textareaLimit, trigger: 'blur' }
        ],
        feedback: [
          { required: true, message: '请输入走访汇报', trigger: 'blur' },
          { validator: textareaMaxLimit, trigger: 'blur' }
        ],
        files: [
          { validator: fileCheck }
        ]
      }
    };
  },
  async beforeMount() {
    await this.queryVisitAppointDetail({visitId: this.visitId});
    await this.queryRegionManager({});
  },
  methods: {
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
      this.fileList.push(file.raw);
      this.uploadData.files.push(file.raw);
      this.$refs.visitRef.validateField('files');
    },
    removeFile(files, fileList) {
      let _this = this;
      if (files.elecInstId) {
        this.delUplodFile({elecInstId: files.elecInstId, fileTypeId: 502}).then((res) => {
          if (res.errorInfo.code === '200') {
            this.$message.success(`已删除成功!`);
            if (fileList.length === 0) {
              _this.uploadData.fileInputId = '';
              _this.formData.fileInputId = '';
            }
          }
        });
      } else {
        this.uploadData.files = null;
      }
      this.$refs.visitRef.validateField('files');
    },
    async submitAssignForm() {
      let _this = this;
      await this.getProductFileId().then((res) => {
        _this.uploadData.fileInputId = res.data;
        _this.formData.fileInputId = res.data;
      });
      this.uploadProductScheme(this.uploadData);
    },
    isAcceptable(fileName) {
      for (let accept of FILE_ACCEPT) {
        if (fileName.toLowerCase().endsWith(accept)) {
          return true;
        }
      }
      return false;
    },
    onSubmit() {
      this.submitAssignForm();
      this.query();
    },
    async query() {
      this.$refs.visitRef.validate((valid) => {
        if (valid) {
          this.addApproveVisit(this.formData);
        }
      });
    },
    ...mapActions([
      'queryVisitAppointDetail',
      'queryRegionManager',
      'addApproveVisit',
      'getProductFileId',
      'uploadProductScheme'
    ])
  }
};
</script>

<style lang="scss">
@import "scss/variables.scss";
.transfer-out {
  margin-top: 20px;
  form {
    width: 50%;
  }
}
</style>
