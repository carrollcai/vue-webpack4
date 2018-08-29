<template>
  <div>
    <div class="m-container">
      <div class="breadcrumb">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/business-manage/business-create-manage' }">商机创建管理</el-breadcrumb-item>
          <el-breadcrumb-item>新建商机</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="container">
      <div>
      <el-form :rules="rules" ref="businessForm" :model="form" label-width="140px">
        <el-form-item label="商机类别：" prop="opporType">
          <el-select class="form-input-medium" v-model="form.opporType" placeholder="请选择属性">
              <el-option
              v-for="item in BIZ_OPPOR_TYPE"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商机名称：" prop="opporName">
          <el-input v-model="form.opporName" class="form-input-medium" placeholder="请输入商机名称" />
        </el-form-item>
        <!-- <el-form-item label="预计收入：" prop="predictContractAmount">
          <el-input v-model="form.predictContractAmount" class="form-input-medium" placeholder="请输入预计收入">
            <template slot="append">万元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="预计签约时间：" prop="predictSignTime">
          <el-date-picker class="form-input-medium" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" v-model="form.predictSignTime" placeholder="请选择时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="预计协议期：" prop="predictAgreementTime">
          <el-select class="form-input-medium" v-model="form.predictAgreementTime" placeholder="请选择">
              <el-option
              v-for="item in PREDICT_AGREEMENT_TIME"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目是否招标：" prop="isProjectInvitation">
          <el-radio v-model="form.isProjectInvitation" label="1">是</el-radio>
          <el-radio v-model="form.isProjectInvitation" label="0">否</el-radio>
        </el-form-item> -->
        <el-form-item label="联系人员：" prop="contactName">
          <el-input maxlength="6" class="form-input-80" v-model="form.contactName" placeholder="姓名"></el-input>
          <span class="form-input-sep">-</span>
          <el-form-item prop="contactGender" style="display: inline-block;">
            <el-select class="form-input-80" v-model="form.contactGender" placeholder="性别">
              <el-option v-for="item in SEX"
                    :key="item.value"
                    :value="item.value"
                    :label="item.label" ></el-option>
            </el-select>
          </el-form-item>
          <span class="form-input-sep">-</span>
          <el-form-item prop="contactMobile" style="display: inline-block;">
            <el-input maxlength="11" class="form-input-120" v-model="form.contactMobile" placeholder="手机号"></el-input>
          </el-form-item>
        </el-form-item>
        <el-form-item label="联系邮箱：" prop="contactEmail">
            <el-input maxlength="35" class="form-input-320" v-model="form.contactEmail" placeholder="请输入邮箱"></el-input>
          </el-form-item>
        <el-form-item label="合作集团：" prop="organizeName">
          <el-autocomplete maxlength="25" class="form-input-half" v-model="form.organizeName" :fetch-suggestions="querySearchAsync" placeholder="合作集团/编码" @select="handleSelect" @blur="noData = false;"></el-autocomplete>
          <el-card class="create-business-box-card" v-if="noData">
            <div>
              系统暂未录入该集团，你可以暂时手动输入，建议后续尽快录入并同步关联修改！
            </div>
          </el-card>
          <span class="form-input-sep">-</span>
          <el-form-item prop="address" style="display:inline-block;">
            <el-input @focus="noData = false;" @blur="noData = false;" maxlength="50" class="form-input-half" v-model="form.address" placeholder="办公地址"></el-input>
          </el-form-item>
        </el-form-item>
        <el-form-item label="业务描述：" prop="busiDesc">
          <el-input maxlength="500" resize="none" class="form-input-320" type="textarea" :rows="3" placeholder="请输入业务描述" v-model="form.busiDesc"></el-input>
        </el-form-item>
        <el-form-item label="合作建议：" prop="busiOperating">
          <el-input maxlength="500" class="form-input-320" type="textarea" :rows="3" placeholder="请输入合作建议" v-model="form.busiOperating"></el-input>
        </el-form-item>
        <el-form-item label="商机有效期：" prop="busiValidity">
          <el-input v-model="form.busiValidity" class="form-input-medium" placeholder="请输入商机有效期">
            <template slot="append">月</template>
          </el-input>
          <!-- <el-select v-model="form.busiValidity" placeholder="请选择">
            <el-option
              v-for="item in busiValidityList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item label="附件：" label-width="130px" prop="files">
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
      </el-form>
      </div>
    </div>
    <div style="background: #fff;">
      <div class="hr"></div>
      <div class="b-container">
          <el-form label-width="140px" style="width: 545px;">
            <el-form-item label="提醒人设置：">
              <el-form-item class="business-linkage" prop="visitAuditor">
                <el-cascader v-if="remindPerson"
                  @change="getProcessor"
                  :options="remindPerson"
                  v-model="form.processorData"
                  :placeholder="''"
                  :change-on-select="false">
                </el-cascader>
                <div class="tag-list">
                  <el-tag
                    :key="tag"
                    v-for="tag in form.regionData.processorList"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tag)">
                    {{tag}}
                  </el-tag>
                </div>
              </el-form-item>
            </el-form-item>
            <!-- <el-form-item label="提醒人设置：">
              <el-select class="form-input-medium" v-model="form.remindersArr" placeholder="请选择提醒人" multiple>
                  <el-option
                  v-for="item in remindPerson"
                  :key="item.operatorId"
                  :label="item.staffName"
                  :value="item.operatorId">
                  </el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item label="">
              <el-button type="primary" @click="submit">提交</el-button>
              <el-button plain @click="save">保存为草稿</el-button>
            </el-form-item>
          </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { checkPhone, emailCheck, checkLeftRightSpace, textAccountLimit, fileValidLen } from '@/utils/rules.js';
import filters from '@/views/business-manage/filters';
import { FILE_TIP, FILE_TYPE_ID } from '@/config/index.js';
import { fileBeforeUpload } from '@/utils/common.js';
const busiValidityList = [{value: 1, label: '一个月'}, {value: 3, label: '三个月'}, {value: 6, label: '半年'}];
export default {
  mixins: [filters],
  components: {
  },
  data() {
    const fileCheck = (rule, value, callback) => {
      fileValidLen(this.uploadData.files, callback);
    };
    return {
      FILE_TIP,
      busiValidityList: busiValidityList,
      fileList: [],
      filesArrList: [],
      uploadData: {
        fileInputId: '',
        fileTypeId: FILE_TYPE_ID.business,
        moduleId: 1,
        expireDate: '',
        effectiveDate: '',
        files: []
      },
      form: {
        opporType: '',
        opporName: '',
        organizeId: '',
        organizeName: '',
        // predictContractAmount: '',
        // predictSignTime: '',
        // predictAgreementTime: '',
        // isProjectInvitation: '0',
        contactName: '',
        contactGender: '',
        contactMobile: '',
        contactEmail: '',
        address: '',
        busiDesc: '',
        // busiRequire: '',
        // needCoordinationIssue: '',
        remindersArr: [],
        // processor: [],
        processorData: [],
        regionData: {
          regionList: [],
          processorList: [],
          processor: []
        },
        busiOperating: '',
        busiValidity: '',
        fileInputId: ''
      },
      organizeNameList: [],
      resetForm: {},
      rules: {
        opporName: [
          { required: true, message: '请输入商机名称', trigger: 'blur' },
          { validator: textAccountLimit, trigger: 'blur' }
        ],
        opporType: [
          { required: true, message: '请选择商机类别', trigger: ['blur', 'change'] }
        ],
        organizeName: [
          { required: true, message: '请输入合作集团/编码', trigger: 'blur' },
          { validator: checkLeftRightSpace, trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入办公地址', trigger: ['change', 'blur'] },
          { validator: checkLeftRightSpace, trigger: ['change', 'blur'] }
        ],
        contactName: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { validator: checkLeftRightSpace, trigger: 'blur' }
        ],
        contactGender: [
          { required: true, message: '请选择性别', trigger: ['blur', 'change'] }
        ],
        contactMobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ],
        contactEmail: [
          { message: '请输入电子邮箱', trigger: 'blur' },
          { validator: emailCheck, trigger: 'blur' }
        ],
        busiDesc: [
          { required: true, message: '请输入业务描述', trigger: 'blur' },
          { validator: checkLeftRightSpace, trigger: 'blur' }
        ],
        busiOperating: [
          { required: true, message: '请输入合作建议', trigger: 'blur' }
        ],
        busiValidity: [
          { required: true, message: '请输入商机有效期', trigger: 'blur' }
        ],
        /* busiRequire: [
          { required: true, message: '请输入业务需求', trigger: 'blur' },
          { validator: checkLeftRightSpace, trigger: 'blur' }
        ],
        predictContractAmount: [
          { required: true, message: '请输入预计收入', trigger: 'blur' },
          { validator: inte5Deci4, trigger: ['blur', 'change'] }
        ],
        predictSignTime: [
          { required: true, message: '请选择预计签约时间', trigger: ['blur', 'change'] }
        ],
        predictAgreementTime: [
          { required: true, message: '请选择预计协议期', trigger: ['blur', 'change'] }
        ],
        isProjectInvitation: [
          { required: true, message: '请选择项目是否招标', trigger: ['blur', 'change'] }
        ] */
      },
      files: [
        { validator: fileCheck }
      ],
      noData: false
    };
  },
  beforeMount() {
    this.resetForm = Object.cloneDeep(this.form);
    this.getRemindPerson();
  },
  computed: {
    ...mapState({
      submitBusinessStatus: ({ business }) => business.submitBusinessStatus,
      cooperationGroupList: ({ business }) => business.cooperationGroupList,
      remindPerson: ({ business }) => business.remindPerson
    })
  },
  methods: {
    removeFile(file, fileList) {
      let index = this.uploadData.files.findIndex(val => val.uid === file.uid);
      this.uploadData.files.splice(index, 1);
      this.$refs.businessForm.validateField('files');
    },
    fileChange(file, fileList) {
      if (fileBeforeUpload.call(this, file, fileList)) return false;
      this.uploadData.files.push(file.raw);
      this.$refs.businessForm.validateField('files');
    },
    getProcessor(value) {
      this.form.processorData = [];
      let list = this.remindPerson || null;
      let region = value[0] || null;
      let province = value[1] || null;
      let processor = value[2] || null;
      let regionName = '';

      list && list.filter(res => {
        if (res.value === region) {
          res.children && res.children.filter(item => {
            if (item.value === province) {
              item.children && item.children.filter(val => {
                if (val.value === processor) {
                  regionName = res.label + '/' + item.label + '/' + val.label;
                  let obj = {
                    regionValue: res.value,
                    regionLabel: res.label,
                    provinceValue: item.value,
                    provinceLabel: item.label,
                    processorValue: val.value,
                    processorLabel: val.label,
                    regionName: regionName
                  };
                  this.form.regionData.regionList.push(obj);
                  return regionName;
                }
              });
            }
          });
        }
      });
      this.form.regionData.processorList.push(regionName);
    },
    // 删除
    handleClose(value) {
      let list = this.form.regionData.processorList;
      let index = list.indexOf(value);
      this.delArray(value);
      if (index >= 0) {
        list.splice(index, 1);
      }
    },
    delArray(value) {
      value = value.split('/')[value.split('/').length - 1];
      this.form.regionData.regionList.filter((item, index, array) => {
        if (item.processorLabel === value) {
          return array.splice(index, 1);
        }
      });
    },
    async querySearchAsync(queryString, cb) {
      this.noData = false;
      if (!queryString) return false;
      let params = {
        pageSize: 20,
        organizeName: queryString
      };
      await this.getCooperationGroupList(params);
      await clearTimeout(this.timeout);
      this.timeout = await setTimeout(() => {
        var results = this.cooperationGroupList;
        if (results.length === 0) {
          this.noData = true;
        } else {
          this.noData = false;
        };
        cb(results);
      }, 1000);
    },
    handleSelect(item) {
      this.form.organizeId = item.organizeId;
      this.form.address = item.orgAddress;
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    async getFileId() {
      await this.getNewFileInputId().then((res) => {
        this.uploadData.fileInputId = res;
        this.form.fileInputId = res;
        if (this.uploadData.files.length > 0) {
          this.uploadOrderHandleTask(this.uploadData);
        }
        return this.form;
      });
    },
    async submit() {
      await this.getFileId();
      this.form.regionData.regionList.filter((item, index, array) => {
        this.form.remindersArr.push(item.processorValue);
      });
      let {...params} = this.form;
      this.$refs['businessForm'].validate(valid => {
        delete params.regionData;
        delete params.processorData;
        if (!valid) return false;
        this.submitBusinessOppority(params).then(res => {
          if (res.data) {
            this.$message({ showClose: true, message: '您已成功提交该条商机！', type: 'success' });
            this.reset();
            const path = `/business-manage/business-create-manage`;
            this.$router.push(path);
          } else {
            this.$message({ showClose: true, message: '提交失败！', type: 'error' });
          }
        });
      });
    },
    async save() {
      await this.getFileId();
      this.form.regionData.regionList.filter((item, index, array) => {
        this.form.remindersArr.push(item.processorValue);
      });
      let {...params} = this.form;
      this.$refs['businessForm'].validate(valid => {
        if (!valid) return false;
        delete params.regionData;
        delete params.processorData;
        this.saveBusinessDraft(params).then(res => {
          if (res.data) {
            this.$message({ showClose: true, message: '您已成功保存该条商机！', type: 'success' });
            this.reset();
            const path = `/business-manage/business-create-manage`;
            this.$router.push(path);
          } else {
            this.$message({ showClose: true, message: '保存失败！', type: 'error' });
          }
        });
      });
    },
    reset() {
      this.form = this.resetForm;
    },
    ...mapActions([
      'submitBusinessOppority', 'getCooperationGroupList', 'saveBusinessDraft', 'getRemindPerson',
      'getNewFileInputId', 'uploadOrderHandleTask'
    ])
  }
};
</script>

<style lang="scss">
@import "scss/variables.scss";
.container {
  padding: 16px;
  margin-top: 16px;
  background: #fff;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
}
.b-container {
  display: flex;-webkit-box-pack: center;justify-content: center;margin-top:32px;
}
.el-input-group__append {
    background-color: #fff;
    padding: 0 5px;
}
.hr {
  height:1px;background:#e5e5e5;margin: 0px 32px;
}
.create-business-box-card {
  position:absolute;z-index:2;line-height:20px;
  .el-card__body {
    padding: 10px;
    color: rgba(0,0,0,0.45);
  }
}
.business-linkage {
  position: relative;
  border: 1px #E7E7E7 solid;
  border-radius: 3px;
  .el-cascader {
    width: 395px;
    .el-input input {border: 0;}
  }
  .tag-list {
    margin-top: -40px;
    width: 300px;
    position: relative;
    z-index: 2;
    .el-tag {margin-left: 8px;}
  }
}
</style>
