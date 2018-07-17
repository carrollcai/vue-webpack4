<template>
  <div class="requirement-detail-handle">
    <div class="m-container">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/requirement/list' }">需求任务管理</el-breadcrumb-item>
        <el-breadcrumb-item>处理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="m-container">
      <detail-info :requirement="requirement"></detail-info>
    </div>

    <div class="m-container info-block">
      <el-form
        ref="baseForm"
        :rules="rules"
        :model="form"
        label-width="130px"
        >
        <!--日常需求处理-->
        <template v-if="requirement.reqType === '0'">
          <el-form-item label="处理方案" required prop="plan" key="plan">
            <el-input class="col-input"
              type="textarea"
              v-model="form.plan"
              placeholder="简要描述一下处理方案"
              :maxlength="6"
              key="plan-input"></el-input>
          </el-form-item>
          <el-form-item label="备注" required prop="planDesc" key="plan-desc">
            <el-input class="col-input"
              v-model="form.planDesc"
              type="textarea"
              placeholder="备注"
              :maxlength="6"
              key="plan-desc-input"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">提交处理</el-button>
          </el-form-item>
        </template>

        <!-- 投诉需求处理  -->
        <template v-if="requirement.reqType === '1'">
          <el-form-item label="处理方式" required>
            <el-radio-group v-model="handleType" @change="handleChangeType">
              <el-radio label="1">本人处理</el-radio>
              <el-radio label="2">投诉升级 <span>（转交给更高级级别的人处理）</span></el-radio>
            </el-radio-group>
          </el-form-item>

          <template v-if="handleType === '1'">
            <el-form-item label="处理方案" required prop="reqScheme" key="plan">
              <el-input class="col-input"
                type="textarea"
                v-model="form.reqScheme"
                placeholder="简要描述一下处理方案"
                :maxlength="6"
                key="plan-input"></el-input>
            </el-form-item>
            <el-form-item label="备注" required prop="processorRemark" key="plan-desc">
              <el-input class="col-input"
                v-model="form.processorRemark"
                type="textarea"
                placeholder="备注"
                :maxlength="6"
                key="plan-desc-input"></el-input>
            </el-form-item>
          </template>

          <template v-if="handleType === '2'">
            <el-form-item label="指派处理人" required key="processor">
              <el-col :span="8">
                <el-form-item prop="processor" key="processor-item">
                  <el-cascader
                    expand-trigger="hover"
                    :options="processors"
                    clearable
                    v-model="processor" placeholder="请选择"></el-cascader>
                </el-form-item>
              </el-col>
              <el-col class="line-container" :span="8">
                <el-checkbox v-model="checked">短信提醒他</el-checkbox>
              </el-col>
            </el-form-item>
          </template>
          <el-form-item>
            <el-button type="primary" @click="submitForm">提交处理</el-button>
          </el-form-item>
        </template>

        <!-- 物料需求处理 -->
        <template v-if="requirement.reqType === '2'">
          <el-form-item label="物料上传" prop="uploadFiles" key="material-upload">
            <el-upload
              :limit="5"
              class="upload-demo"
              :on-change="handleChange"
              :on-remove="handleRemove"
              :auto-upload="false"
              :file-list="uploadFiles">
              <el-button size="small" type="primary">选择文件</el-button>
              <div slot="tip" class="el-upload__tip">
                1、附件格式支持word、excel、ppt、pdf、rar格式<br/>
                2、附件大小不超过20M。
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item label="备注" required prop="materialDesc" key="materialDesc">
            <el-input class="col-input"
              type="textarea"
              v-model="form.materialDesc"
              placeholder="备注"
              key="material-desc-input-desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitMaterial">提交处理</el-button>
          </el-form-item>
        </template>
      </el-form>
    </div>
  </div>
</template>
<script>
import {mapActions, mapState} from 'vuex';
import endsWith from 'lodash/endsWith';
import mixins from './mixins';
export default {
  name: 'RequirementHandle',
  mixins: [mixins],
  data() {
    const that = this;
    const filesValidator = function(rule, val, callback) {
      const {uploadFiles} = that;
      if (!uploadFiles.length) {
        callback(new Error('请上传需求附件'));
      } else {
        callback();
      }
    };

    const processorValidator = function(rule, val, callback) {
      const {form} = that;
      if (!form.processor) {
        callback(new Error('请选择指派处理人'));
      } else {
        callback();
      }
    };
    return {
      handleType: '1',
      checked: false,
      processor: [],
      uploadFiles: [],
      ACCEPT: [
        '.rar',
        '.docx',
        '.doc',
        '.ppt',
        '.pptx',
        '.xls',
        '.xlsx',
        '.pdf'
      ],
      form: {
        uploadFiles: [],
        processorRemark: '',
        reqScheme: '',
        materialDesc: ''
      },
      uploadData: {
        fileInputId: '',
        fileTypeId: 502,
        moduleId: 1,
        expireDate: '',
        effectiveDate: '',
        files: []
      },
      rules: {
        uploadFiles: [
          {
            required: true,
            validator: filesValidator,
            trigger: 'change'
          }
        ],
        materialDesc: [
          { required: true, message: '请输入备注', trigger: 'blur' }
        ],

        reqScheme: [
          { required: true, message: '请输入处理方案', trigger: 'blur' }
        ],
        processorRemark: [
          { required: true, message: '请输入备注', trigger: 'blur' }
        ],
        processor: [
          { validator: processorValidator, trigger: 'change' }
        ]
      }
    };
  },
  computed: {
    ...mapState({
      processors: ({ requirement }) => requirement.processors
    })
  },
  created() {
    this.queryRequirementProcessors();
  },
  watch: {
    processor(newVal) {
      this.form.processor = newVal && newVal.length ? newVal[newVal.length - 1] : '';
    }
  },
  methods: {
    isAcceptable(fileName) {
      const {ACCEPT} = this;

      for (let accept of ACCEPT) {
        if (endsWith(fileName, accept)) {
          return true;
        }
      }

      return false;
    },
    handleChange(file, fileList) {
      let fileName = file.name;
      let result = true;
      if (this.isAcceptable(fileName)) {
        let fileSize = file.size / (1024 * 1024);

        if (fileSize > 20) {
          this.$message({
            message: '附件超过20M',
            type: 'error'
          });

          result = false;
        } else {
          this.uploadFiles.push(file.raw);
        }
      } else {
        this.$message({
          message: '只支持word、excel、ppt、pdf、rar格式',
          type: 'error'
        });
        result = false;
      }

      if (!result) {
        fileList.pop();
      } else {
        this.$refs.baseForm.validateField('uploadFiles');
      }

      return result;
    },
    handleRemove(file, fileList) {
      const that = this;
      const {uploadFiles} = that;

      uploadFiles.splice(0, uploadFiles.length);

      for (let item of fileList) {
        uploadFiles.push(item.raw);
      }

      this.$refs.baseForm.validateField('uploadFiles');
    },
    handleChangeType(val) {
      const {form} = this;
      if (val === '2') {
        form.reqScheme = '';
        form.processorRemark = '';
      } else {
        form.processor = '';
        this.processor = '';
      }
    },
    submitForm() {
      const that = this;
      that.$refs.baseForm.validate((valid) => {
        if (valid) {
          const {
            processor,
            reqScheme,
            processorRemark
          } = that.form;

          let params = {
            reqId: '',
            taskInsId: '',
            handleType: that.handleType,
            processorRemark,
            reqScheme,
            processor
          };

          this.handleDailyComplain(params);
        }
      });
    },
    submitMaterial() {
      const that = this;
      that.$refs.baseForm.validate((valid) => {
        if (valid) {
          that.getProductFileId().then((res) => {
            let fileInputId = res.data;
            let {uploadData} = that;
            uploadData.files = that.uploadFiles;
            uploadData.fileInputId = fileInputId;

            that.uploadProductScheme(uploadData).then(() => {
              const {
                materialDesc
              } = that.form;

              let params = {
                reqId: '',
                taskInsId: '',
                processorRemark: materialDesc,
                fileInputId
              };

              that.handleRequirementMateriel(params);
            });
          });
        }
      });
    },
    ...mapActions([
      'queryRequirementProcessors',
      'handleDailyComplain',
      'handleRequirementMateriel',
      'getProductFileId',
      'uploadProductScheme'
    ])
  }
};
</script>
<style lang="scss">
  .requirement-detail-handle{
    .info-block{
      margin-top: 16px;
    }
  }
</style>
