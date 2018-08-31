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
  <!-- 详情 -->
  <div v-if="isExecute !== 'true' || (isExecute === 'true' && visitResource === '1')" class="m-container container-mt16">
    <Vdetail :visitDetail="visitDetailData" :filesArr="filesArrList"></Vdetail>
  </div>
  <!-- 详情编辑 -->
  <div v-if="isExecute === 'true' && visitResource === '2'" class="m-container container-mt16 visit-create">
    <el-form :label-position="'right'" :model="editVisitFromHandle" ref="visitEditRef" :rules="createVisitVaild">
      <el-form-item label="走访主题：" label-width="140px" required prop="visitTheme">
        <el-input maxlength="25" v-model="editVisitFromHandle.visitTheme" :disabled="true" class="form-input-medium" placeholder="请输入主题" />
      </el-form-item>
      <el-form-item label="走访公司：" label-width="140px" required>
        <el-form-item prop="organizeName">
          <el-input maxlength="25" v-model="editVisitFromHandle.organizeName" :disabled="true" class="form-input-260" style=" margin-right: 20px;" placeholder="集团名称"></el-input>
          <!-- <el-autocomplete class="form-input-half" v-model="editVisitFromHandle.organizeName" :fetch-suggestions="querySearchAsync" placeholder="集团名称" @select="handleSelect" :trigger-on-focus="false" /> -->
        </el-form-item>
        <div class="form-input-sep">-</div>
        <el-form-item prop="visitAddress">
          <el-input maxlength="50" v-model="editVisitFromHandle.visitAddress" class="form-input-260" style=" margin-right: 20px;" placeholder="办公地址"></el-input>
        </el-form-item>
      </el-form-item>
      <el-form-item label="走访对象：" label-width="140px" required>
        <el-form-item prop="intervieweeName">
          <el-input maxlength="50" v-model="editVisitFromHandle.intervieweeName" class="form-input-half" placeholder="姓名"></el-input>
        </el-form-item>
        <div class="form-input-sep">-</div>
        <el-form-item prop="intervieweeMobile">
          <el-input v-model="editVisitFromHandle.intervieweeMobile" maxlength="11" class="form-input-260" style=" margin-right: 20px;" placeholder="联系电话"></el-input>
        </el-form-item>
      </el-form-item>
      <el-form-item label="我方出席人员：" label-width="140px" required prop="visitPresentMembers">
        <el-input maxlength="50" v-model="editVisitFromHandle.visitPresentMembers" class="form-input-large" placeholder="可输入多个人员，用“;”隔开" />
      </el-form-item>
      <el-form-item label="计划走访时间：" label-width="140px" required prop="visitTime">
        <el-date-picker v-model="editVisitFromHandle.visitTime" @change="getTimeRange" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00','23:59:59']"></el-date-picker>
      </el-form-item>
      <el-form-item label="涉及商机编码：" label-width="140px" prop="relOpporCode">
        <el-autocomplete
          class="form-input-260"
          v-model="editVisitFromHandle.relOpporCode"
          :fetch-suggestions="getRelOpporId"
          placeholder="涉及商机编码"
          :value-key="opporId"
          @select="relOpporValue"
          @blur="hasOpporExist"
          :trigger-on-focus="false" />
      </el-form-item>
      <el-form-item label="走访内容：" label-width="140px" prop="visitContent">
        <el-input maxlength="500" v-model="editVisitFromHandle.visitContent" type="textarea" class="form-input-large" placeholder="请输入走访内容" />
      </el-form-item>
      <el-form-item label="问题协调：" label-width="140px" prop="problemCoordinate">
        <el-input maxlength="500" v-model="editVisitFromHandle.problemCoordinate" type="textarea" class="form-input-large" placeholder="请输入问题协调内容" />
      </el-form-item>
      <el-form-item label="是否首客走访：" label-width="140px" required prop="isFirstVisit">
        <el-radio style="margin-top: 14px;" v-model="editVisitFromHandle.isFirstVisit" :value="1" :label="1">是</el-radio>
        <el-radio style="margin-top: 14px;" v-model="editVisitFromHandle.isFirstVisit" :value="0" :label="0">否</el-radio>
      </el-form-item>
    </el-form>
  </div>
  <!-- 执行处理 -->
  <div v-if="isExecute === 'true'" class="m-container visit-create">
    <el-form
      :model="formData"
      :rules="formDataValid"
      ref="visitRef">
      <el-form-item label="走访结果：" label-width="140px" required prop="isCancle">
        <el-radio v-model="formData.isCancle" label="2">走访汇报</el-radio>
        <el-radio v-model="formData.isCancle" label="3">取消走访</el-radio>
      </el-form-item>
      <el-form-item v-if="formData.isCancle === '2'" label="走访汇报：" label-width="130px" prop="feedback">
        <el-input maxlength="500" v-model="formData.feedback" placeholder="简要描述一下处理方案" type="textarea" :rows="4"></el-input>
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
import mixins from '../create/mixins';
import WmTable from 'components/Table.vue';
import Vdetail from 'components/visit/VisitDetail.vue';
import { mapState, mapActions, mapMutations } from 'vuex';
import { textareaMaxLimit, fileValidLen } from '@/utils/rules.js';
import { FILE_TIP, FILE_TYPE_ID } from '@/config/index.js';
import { fileBeforeUpload } from '@/utils/common.js';

export default {
  mixins: [mixins],
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
      visitAppointDetail: ({ visit }) => visit.visitAppointDetail,
      registerList: ({ visit }) => visit.registerList,
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
      visitResource: this.$route.query.visitResource,
      routeName: this.$route.name,
      checkTime: true,
      fileList: [],
      filesArrList: [],
      editVisitFromHandle: {
        visitId: this.$route.params.id,
        visitTheme: '',
        organizeId: '',
        organizeName: '',
        visitAddress: '',
        intervieweeName: '',
        intervieweeMobile: '',
        visitPresentMembers: '',
        visitContent: '',
        relOpporId: '',
        relOpporCode: '',
        problemCoordinate: '',
        visitAuditor: '',
        isFirstVisit: 0,
        visitStartTime: '',
        visitEndTime: '',
        isSubmit: 1,
        visitTime: null
      },
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
      this.editVisitFromHandle.visitTime = [this.visitAppointDetail.visitStartTime, this.visitAppointDetail.visitEndTime];
      if (this.visitResource === '2') {
        this.editVisitFromHandle.isFirstVisit = this.visitAppointDetail.isFirstVisit;
      } else {
        this.editVisitFromHandle.isFirstVisit = this.visitAppointDetail.isFirstVisit ? Number(this.visitAppointDetail.isFirstVisit) : 0;
      }
      this.editVisitFromHandle.visitTheme = this.visitAppointDetail.visitTheme;
      this.editVisitFromHandle.organizeId = this.visitAppointDetail.organizeId;
      this.editVisitFromHandle.organizeName = this.visitAppointDetail.organizeName;
      this.editVisitFromHandle.visitAddress = this.visitAppointDetail.visitAddress;
      this.editVisitFromHandle.intervieweeName = this.visitAppointDetail.intervieweeName;
      this.editVisitFromHandle.intervieweeMobile = this.visitAppointDetail.intervieweeMobile;
      this.editVisitFromHandle.visitPresentMembers = this.visitAppointDetail.visitPresentMembers;
      this.editVisitFromHandle.visitContent = this.visitAppointDetail.visitContent;
      this.editVisitFromHandle.relOpporId = this.visitAppointDetail.relOpporId;
      this.editVisitFromHandle.relOpporCode = this.visitAppointDetail.relOpporCode;
      this.editVisitFromHandle.problemCoordinate = this.visitAppointDetail.problemCoordinate;
      this.editVisitFromHandle.visitEndTime = this.visitAppointDetail.visitEndTime;
      this.editVisitFromHandle.visitStartTime = this.visitAppointDetail.visitStartTime;
    });
  },
  beforeDestroy() {
    // 组件注销的时候，需要清空表单数据
    this.clearApplicationCreate();
  },
  methods: {
    hasOpporExist(item) {
      this.relOpporCode = this.editVisitFromHandle.relOpporCode;
      if (this.relOpporCode) {
        this.isOpporExist({opporCode: this.relOpporCode}).then(res => {
          if (res <= 0) {
            this.editVisitFromHandle.relOpporCode = '';
            this.editVisitFromHandle.relOpporId = '';
          } else {
            this.registerList.filter((item, index, array) => {
              if (item.opporCode === this.relOpporCode) {
                this.editVisitFromHandle.relOpporId = item.opporId;
              }
            });
          }
        });
      } else {
        this.editVisitFromHandle.relOpporCode = '';
        this.editVisitFromHandle.relOpporId = '';
      };
    },
    relOpporValue(element) {
      this.registerList.filter((item, index, array) => {
        if (item.opporCode === element.value) {
          this.editVisitFromHandle.relOpporId = item.opporId;
        }
      });
    },
    async getRelOpporId(item, cb) {
      let data = {
        opporCode: item,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      };
      await this.queryRegisterList(data);

      await clearTimeout(this.timeout);
      this.timeout = await setTimeout(() => {
        this.registerList = this.registerList.map(val => Object.assign(val, { value: val.opporCode }));
        cb(this.registerList);
      }, 1000);
    },
    getTimeRange(time) {
      if (time) {
        this.editVisitFromHandle.visitStartTime = time[0];
        this.editVisitFromHandle.visitEndTime = time[1];
      } else {
        this.editVisitFromHandle.visitStartTime = '';
        this.editVisitFromHandle.visitEndTime = '';
      }
    },
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
    onSubmit() {
      if (this.visitAppointDetail.fileInputId) {
        this.uploadData.fileInputId = this.visitAppointDetail.fileInputId;
        this.formData.fileInputId = this.visitAppointDetail.fileInputId;
        if (this.uploadData.files.length > 0) {
          this.uploadProductScheme(this.uploadData);
        }
        this.query();
      } else {
        this.getProductFileId().then((res) => {
          this.uploadData.fileInputId = res.data;
          this.formData.fileInputId = res.data;
          if (this.uploadData.files.length > 0) {
            this.uploadProductScheme(this.uploadData);
          }
          this.query();
        });
      }
    },
    query() {
      let params = Object.assign({}, this.formData, this.editVisitFromHandle);
      delete params.visitTheme;
      delete params.organizeName;
      delete params.organizeId;
      delete params.visitAuditor;
      delete params.isSubmit;
      delete params.visitTime;
      if (this.visitResource === '2') {
        this.$refs.visitEditRef.validate((valid) => {
          if (valid) {
            this.$refs.visitRef.validate((valids) => {
              if (valids) {
                this.addApproveVisit(params);
              }
            });
          }
        });
      } else if (this.visitResource === '1') {
        this.$refs.visitRef.validate((valids) => {
          if (valids) {
            this.addApproveVisit(params);
          }
        });
      }
    },
    ...mapMutations({
      clearApplicationCreate: 'APPLICATION_CREATE'
    }),
    ...mapActions([
      'queryVisitAppointDetail',
      'addApproveVisit',
      'getProductFileId',
      'uploadProductScheme',
      'queryElec',
      'editVisitApp',
      'queryRegisterList',
      'isOpporExist'
    ])
  }
};
</script>

<style lang="scss">
@import "../create/style.scss";
@import "scss/variables.scss";
.container-mt16 {margin-top: 16px;}
.transfer-out {
  margin-top: 20px;
  form {
    width: 50%;
  }
}
</style>
