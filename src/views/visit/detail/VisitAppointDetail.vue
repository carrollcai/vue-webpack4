<template>
<div>
  <div class="m-container">
    <div class="breadcrumb">
      <el-breadcrumb>
        <el-breadcrumb-item v-if="routeName === 'visit-application-detail'" :to="{ path: '/visit/my-visit-manage' }">我的走访管理</el-breadcrumb-item>
        <el-breadcrumb-item v-if="routeName === 'visit-appoint-detail'" :to="{ path: '/visit/visit-appoint' }">走访指派</el-breadcrumb-item>
        <el-breadcrumb-item v-if="routeName === 'visit-application-detail'">{{isExecute === 'false' ? '查看详情' : '执行处理'}}</el-breadcrumb-item>
        <el-breadcrumb-item v-if="routeName === 'visit-appoint-detail'">查看详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
  <div class="m-container container-mt16">
    <Vdetail :visitDetail="visitDetailData" :filesArr="filesArrList"></Vdetail>
  </div>
  <div v-if="isExecute === 'true'" class="m-container transfer-out">
    <el-form
      :model="formData"
      :rules="formDataValid"
      ref="visitRef">
      <el-form-item label="审核结果：" label-width="140px" required prop="isCancle">
        <el-radio v-model="formData.isCancle" label="2">走访汇报</el-radio>
        <el-radio v-model="formData.isCancle" label="3">取消走访</el-radio>
      </el-form-item>
      <el-form-item v-if="formData.isCancle === '2'" label="走访汇报：" label-width="130px" prop="feedback">
        <el-input v-model="formData.feedback" placeholder="简要描述一下处理方案" type="textarea" :rows="4"></el-input>
      </el-form-item>
      <el-form-item v-if="formData.isCancle === '3'" label="取消原因：" label-width="130px" prop="feedback">
        <el-input v-model="formData.feedback" placeholder="取消原因" type="textarea" :rows="4"></el-input>
      </el-form-item>
      <el-form-item v-if="formData.isCancle === '2'" label="物料上传：" label-width="130px" prop="files">
        <el-upload class="upload-demo" action=""
          :auto-upload="false"
          :on-change="fileChange"
          :multiple="false"
          :on-remove="removeFile"
          :file-list="uploadData.files">
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
import { textareaMaxLimit, fileValidLen } from '@/utils/rules.js';
import { FILE_TIP, FILE_TYPE_ID } from '@/config/index.js';
import { fileBeforeUpload } from '@/utils/common.js';

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
      visitAppointDetail: ({ visit }) => visit.visitAppointDetail
    })
  },
  data() {
    const fileCheck = (rule, value, callback) => {
      fileValidLen(this.uploadData.files, callback);
    };
    return {
      FILE_TIP,
      visitId: this.$route.params.id,
      isExecute: this.$route.query.isExecute,
      routeName: this.$route.name,
      fileList: [],
      filesArrList: [],
      uploadData: {
        fileInputId: '',
        fileTypeId: FILE_TYPE_ID.visit,
        moduleId: 1,
        expireDate: '',
        effectiveDate: '',
        files: []
      },
      formData: {
        feedback: '',
        visitId: Number(this.$route.params.id),
        fileInputId: '',
        isCancle: '2'
      },
      formDataValid: {
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
    this.queryVisitAppointDetail({visitId: this.visitId}).then((res) => {
      if (this.visitAppointDetail.fileInputId) {
        this.queryElec({
          fileInputId: this.visitAppointDetail.fileInputId
        }).then((res) => {
          (res.data).map(item => {
            let data = {
              path: item.fileSaveName,
              name: item.fileName
            };
            this.filesArrList.push(data);
          });
        });
      }
    });
  },
  methods: {
    removeFile(file, fileList) {
      let index = this.uploadData.files.findIndex(val => val.uid === file.uid);
      this.uploadData.files.splice(index, 1);
      this.$refs.visitRef.validateField('files');
    },
    fileChange(file, fileList) {
      if (fileBeforeUpload.call(this, file, fileList)) return false;
      this.uploadData.files.push(file.raw);
      this.$refs.visitRef.validateField('files');
    },
    async submitAssignForm() {
      await this.getProductFileId().then((res) => {
        this.uploadData.fileInputId = res.data;
        this.formData.fileInputId = res.data;
        this.uploadProductScheme(this.uploadData);
      });
    },
    onSubmit() {
      // this.submitAssignForm();
      this.getProductFileId().then((res) => {
        this.uploadData.fileInputId = res.data;
        this.formData.fileInputId = res.data;
        if (this.uploadData.files.length > 0) {
          this.uploadProductScheme(this.uploadData);
        }
        this.query();
      });
    },
    query() {
      this.$refs.visitRef.validate((valid) => {
        if (valid) {
          this.addApproveVisit(this.formData);
        }
      });
    },
    ...mapActions([
      'queryVisitAppointDetail',
      'addApproveVisit',
      'getProductFileId',
      'uploadProductScheme',
      'queryElec'
    ])
  }
};
</script>

<style lang="scss">
@import "scss/variables.scss";
.container-mt16 {margin-top: 16px;}
.transfer-out {
  margin-top: 20px;
  form {
    width: 50%;
  }
}
</style>
