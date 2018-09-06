<template>
  <div>
    <div class="m-container">
      <div class="breadcrumb">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/business-manage/business-create-manage' }">商机创建管理</el-breadcrumb-item>
          <el-breadcrumb-item>商机修改</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="container">
      <div>
        <el-form :rules="rules"
          ref="businessForm"
          :model="businessData"
          label-width="140px">
          <el-form-item label="商机类别："
            prop="opporType">
            <el-select class="form-input-medium"
              v-model="businessData.opporType"
              placeholder="请选择属性">
              <el-option v-for="item in BIZ_OPPOR_TYPE"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商机名称："
            prop="opporName">
            <el-input :maxlength="25"
              v-model="businessData.opporName"
              class="form-input-medium"
              placeholder="请输入商机名称" />
          </el-form-item>
          <el-form-item label="联系人员："
            prop="contactName">
            <el-input :maxlength="6"
              class="form-input-80"
              v-model="businessData.contactName"
              placeholder="姓名"></el-input>
            <span class="form-input-sep">-</span>
            <el-form-item prop="contactGender"
              style="display: inline-block;">
              <el-select class="form-input-80"
                v-model="businessData.contactGender"
                placeholder="性别">
                <el-option v-for="item in SEX"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <span class="form-input-sep">-</span>
            <el-form-item prop="contactMobile"
              style="display: inline-block;">
              <el-input :maxlength="11"
                class="form-input-120"
                v-model="businessData.contactMobile"
                placeholder="手机号"></el-input>
            </el-form-item>
          </el-form-item>
          <el-form-item label="联系邮箱："
            prop="contactEmail"
            style="display: inline-block;">
            <el-input :maxlength="35"
              class="form-input-320"
              v-model="businessData.contactEmail"
              placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="合作集团："
            prop="organizeName">
            <el-autocomplete :maxlength="25"
              class="form-input-half"
              v-model="businessData.organizeName"
              :fetch-suggestions="querySearchAsync"
              placeholder="合作集团/编码"
              @select="handleSelect"
              @blur="noData = false;"></el-autocomplete>
            <el-card class="create-business-box-card"
              v-if="noData">
              <div>
                系统暂未录入该集团，你可以暂时手动输入，建议后续尽快录入并同步关联修改！
              </div>
            </el-card>
            <span class="form-input-sep">-</span>
            <el-form-item prop="address"
              style="display:inline-block;">
              <el-input @focus="noData = false;"
                @blur="noData = false;"
                :maxlength="50"
                class="form-input-half"
                v-model="businessData.address"
                placeholder="办公地址"></el-input>
            </el-form-item>
          </el-form-item>
          <el-form-item label="业务描述："
            prop="busiDesc">
            <el-input :maxlength="500"
              resize="none"
              class="form-input-320"
              type="textarea"
              :rows="3"
              placeholder="请输入业务描述"
              v-model="businessData.busiDesc"></el-input>
          </el-form-item>
          <el-form-item label="合作建议："
            prop="busiOperating">
            <el-input class="form-input-320"
              type="textarea"
              :rows="3"
              placeholder="请输入合作建议"
              v-model="businessData.busiOperating"></el-input>
          </el-form-item>
          <el-form-item label="商机有效期："
            prop="busiValidity">
            <el-input v-model="businessData.busiValidity"
              class="form-input-medium"
              placeholder="请输入商机有效期">
              <template slot="append">月</template>
            </el-input>
          </el-form-item>
          <el-form-item label="附件："
            label-width="130px">
            <el-upload class="upload-demo"
              action=""
              :auto-upload="false"
              :on-change="handleChangeFile"
              :multiple="false"
              :on-remove="handleRemoveFile"
              :file-list="uploadFiles">
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
        </el-form>
      </div>
    </div>
    <div style="background: #fff;">
      <div class="hr"></div>
      <div class="b-container">
        <el-form label-width="140px"
          style="width: 545px;">
          <el-form-item label="提醒人设置：">
            <el-form-item class="business-linkage"
              prop="visitAuditor">
              <el-cascader v-if="remindPerson"
                @change="getProcessor"
                :options="remindPerson"
                v-model="processorData"
                :placeholder="''"
                :change-on-select="false">
              </el-cascader>
              <div class="tag-list">
                <el-tag :key="tag"
                  v-for="tag in regionData.processorList"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag)">
                  {{tag}}
                </el-tag>
              </div>
            </el-form-item>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary"
              @click="save">保存</el-button>
            <el-button plain
              @click="submit">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import _ from 'lodash';

import {
  checkPhone,
  emailCheck,
  checkLeftRightSpace,
  textAccountLimit
} from '@/utils/rules.js';
import filters from '@/views/business-manage/filters';

import { FILE_TIP, FILE_TYPE_ID } from '@/config';

import { fileBeforeUpload } from '@/utils/common.js';

export default {
  mixins: [filters],
  components: {
  },
  data() {
    return {
      FILE_TIP,
      regionData: {
        regionList: [],
        processorList: [],
        processor: []
      },
      processorData: [],
      processors: [],
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
          { validator: emailCheck, trigger: 'blur' }
        ],
        busiOperating: [
          { required: true, message: '请输入合作建议', trigger: 'blur' }
        ],
        busiDesc: [
          { required: true, message: '请输入业务描述', trigger: 'blur' },
          { validator: checkLeftRightSpace, trigger: 'blur' }
        ],
        busiRequire: [
          { required: true, message: '请输入业务需求', trigger: 'blur' },
          { validator: checkLeftRightSpace, trigger: 'blur' }
        ],
        busiValidity: [
          { required: true, message: '请输入商机有效期', trigger: 'blur' }
        ],
      },
      noData: false,
      PRE_DATA_FIRST: {
      },
      PRE_DATA_SECOND: {
      },
      PRE_DATA_THIRD: {
      },
      ALL_NODES: [],
      uploadFiles: [],
      uploadData: {
        files: [],
        deleteFiles: []
      }
    };
  },
  beforeMount() {
    this.init();
  },
  computed: {
    businessData() {
      return this.$store.getters.businessDetail;
    },
    ...mapState({
      officeAddress: ({ business }) => business.officeAddress,
      submitBusinessStatus: ({ business }) => business.submitBusinessStatus,
      cooperationGroupList: ({ business }) => business.cooperationGroupList,
      designatePerson: ({ business }) => business.designatePerson,
      businessDetail: ({ business }) => business.businessDetail,
      remindPerson: ({ business }) => business.remindPerson,
      businessDetailApprove: ({ business }) => business.businessDetailApprove
    })
  },
  methods: {
    initData(list) {
      const { ALL_NODES } = this;
      this.PRE_DATA_FIRST = _.keyBy(list, 'value');
      this.PRE_DATA_SECOND = _.keyBy(_.flattenDeep(_.map(list, 'children')), 'value');
      this.PRE_DATA_THIRD = _.keyBy(_.flattenDeep(_.map(_.flattenDeep(_.map(list, 'children')), 'children')), 'value');

      for (let item of list) {
        let children = item.children;
        if (children && children.length) {
          for (let child of children) {
            ALL_NODES.push({
              label: child.label,
              value: child.value,
              parent: item.value
            });

            if (child.children && child.children.length) {
              for (let son of child.children) {
                ALL_NODES.push({
                  label: son.label,
                  value: son.value,
                  parent: child.value
                });
              }
            }
          }
        }

        ALL_NODES.push({
          label: item.label,
          value: item.value,
          parent: null
        });
      }

      this.ALL_NODES = _.keyBy(ALL_NODES, 'value');
    },
    init() {
      const { opporId } = this.$route.params;
      this.getRemindPerson().then(() => {
        this.initData(this.remindPerson);

        this.getBusinessDetail({ opporId }).then((business) => {
          if (business.fileInputId) {
            this.queryElec({ fileInputId: business.fileInputId }).then((res) => {
              this.uploadFiles = res.data;
              this.uploadFiles.map((item) => {
                item.name = item.fileName;
                return item;
              });
            });
          }

          const { ALL_NODES } = this;
          let processors = business.remindersArr;
          if (processors && processors.length) {
            for (let processor of processors) {
              let processorNode = ALL_NODES[processor];
              // 父节点
              let parentNode = ALL_NODES[processorNode.parent];
              if (parentNode && ALL_NODES[parentNode.parent]) {
                this.regionData.processorList.push(`${ALL_NODES[parentNode.parent].label}/${parentNode.label}/${processorNode.label}`);
                this.processors.push(processor);
              }
            }
          }
        });
      });
    },
    handleChangeFile(file, fileList) {
      if (!fileBeforeUpload.call(this, file, fileList)) {
        this.uploadData.files.push(file.raw);
      }
    },
    handleRemoveFile(file) {
      if (file.elecInstId) {
        this.uploadData.deleteFiles.push(file);
      } else {
        let index = this.uploadData.files.findIndex(val => val.uid === file.uid);
        this.uploadData.files.splice(index, 1);
      }
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
      this.businessData.address = item.orgAddress;
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    getProcessor(value) {
      const { PRE_DATA_FIRST, PRE_DATA_SECOND, PRE_DATA_THIRD, processors } = this;
      this.processorData = [];
      let processor = value[2] || null;

      if (_.indexOf(processors, processor) < 0) {
        this.regionData.processorList.push(`${PRE_DATA_FIRST[value[0]].label}/${PRE_DATA_SECOND[value[1]].label}/${PRE_DATA_THIRD[value[2]].label}`);
        this.processors.push(processor);
      }
    },
    // 删除
    handleClose(value) {
      let list = this.regionData.processorList;
      let index = list.indexOf(value);
      if (index >= 0) {
        list.splice(index, 1);
        this.processors.splice(index, 1);
      }
    },
    removeAttributes(business) {
      delete business.opporCode;
      delete business.contactGenderName;
      delete business.isProjectInvitationName;
      delete business.opporStatus;
      delete business.opporStatusName;
      delete business.opMobile;
      delete business.opId;
      delete business.createDate;
      delete business.doneDate;
      delete business.state;
      delete business.opporTypeName;
      delete business.predictAgreementTimeName;
    },
    handleFiles() {
      const that = this;
      const { uploadData } = that;
      const { fileInputId } = that.businessData;

      let promises = [];

      let deleteFiles = uploadData.deleteFiles;
      if (deleteFiles && deleteFiles.length) {
        for (let deleteFile of deleteFiles) {
          promises.push(new Promise((resolve, reject) => {
            that.delUplodFile({
              elecInstId: deleteFile.elecInstId,
              fileTypeId: FILE_TYPE_ID.business
            }).then((res) => {
              resolve();
            }, (err) => {
              reject(new Error(err));
            });
          }));
        }
      }

      let files = uploadData.files;

      if (files && files.length) {
        promises.push(new Promise((resolve, reject) => {
          that.uploadProductScheme({
            fileInputId,
            fileTypeId: FILE_TYPE_ID.business,
            moduleId: 1,
            expireDate: '',
            effectiveDate: '',
            files: files
          }).then(() => {
            resolve();
          }, (err) => {
            reject(new Error(err));
          });
        }));
      }

      return Promise.all(promises);
    },
    save() {
      this.$refs['businessForm'].validate(valid => {
        if (valid) {
          const params = this.businessData;
          params.remindersArr = this.processors;

          this.removeAttributes(params);

          this.handleFiles().then(() => {
            this.editBusinessDetail(params).then(res => {
              if (res.data) {
                this.$message({ showClose: true, message: '您已成功修改该条商机！', type: 'success' });
                const path = `/business-manage/business-create-manage`;
                this.$router.push(path);
              } else {
                this.$message({ showClose: true, message: '修改失败！', type: 'error' });
              }
            });
          });
        }
      });
    },
    submit() {
      this.$refs['businessForm'].validate(valid => {
        if (valid) {
          const params = this.businessData;
          params.remindersArr = this.processors;

          this.removeAttributes(params);

          this.handleFiles().then(() => {
            this.editBusinessDetailApprove(params).then(res => {
              if (res.data) {
                this.$message({ showClose: true, message: '您已成功提交该条商机！', type: 'success' });
                const path = `/business-manage/business-create-manage`;
                this.$router.push(path);
              } else {
                this.$message({ showClose: true, message: '提交失败！', type: 'error' });
              }
            });
          });
        }
      });
    },
    cancel() {
      const path = `/business-manage/business-create-manage`;
      this.$router.push(path);
    },
    ...mapActions([
      'getCooperationGroupList',
      'getBusinessDetail',
      'editBusinessDetail',
      'getRemindPerson',
      'editBusinessDetailApprove',
      'queryElec',
      'delUplodFile',
      'uploadProductScheme'
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
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  margin-top: 32px;
}
.el-input-group__append {
  background-color: #fff;
  padding: 0 5px;
}
.hr {
  height: 1px;
  background: #e5e5e5;
  margin: 0px 32px;
}
.create-business-box-card {
  position: absolute;
  z-index: 2;
  line-height: 20px;
  .el-card__body {
    padding: 10px;
    color: rgba(0, 0, 0, 0.45);
  }
}
</style>
