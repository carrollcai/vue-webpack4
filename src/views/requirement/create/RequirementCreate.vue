<template>
  <div class="requirement-create">
    <div class="m-container">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/requirement/manage' }">需求创建管理</el-breadcrumb-item>
        <el-breadcrumb-item>新增需求</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="m-container info-block">
      <el-form :model="requirement"
        ref="baseForm"
        :rules="baseInfoRules"
        label-width="130px"
        key="baseForm">
          <div class="block">
            <el-form-item label="需求客户" required key="org-group">
              <el-autocomplete
                key="org-group_code-input"
                v-model="requirement.orgCode"
                :fetch-suggestions="querySearchAsync"
                placeholder="集团名称"
                :trigger-on-focus="false"
                value-key="staffName"
                label="operatorId"
                @select="handleSelect"
              ></el-autocomplete>
            </el-form-item>
            <el-form-item label="需求类型" prop="type" required key="requirement-type">
              <el-radio-group v-model="requirement.type">
                <el-radio label="3">日常需求</el-radio>
                <el-radio label="6">投诉需求</el-radio>
                <el-radio label="9">物料需求</el-radio>
              </el-radio-group>
            </el-form-item>
            <template v-if="requirement.type === '3' || requirement.type === '6'">
              <el-form-item label="需求描述" prop="requirementDesc" required key="requirementDesc">
                <el-input v-model="requirement.requirementDesc"
                  :maxlength="500"
                  type="textarea"
                  placeholder="请输入经营范围"
                  key="requirementDesc-input"></el-input>
              </el-form-item>
              <el-form-item label="需求附件" prop="uploadFiles" required key="provinceId1">
                <el-upload
                  :limit="1"
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :data="extraData"
                  :before-upload="handleBeforeUpload"
                  :on-success="handleSuccess"
                  :on-remove="handleRemove"
                  :file-list="requirement.uploadFiles">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">
                    1、附件格式支持word、excel、ppt、pdf、rar格式<br/>
                    2、附件大小不超过20M。
                  </div>
                </el-upload>
              </el-form-item>
            </template>
            <!-- 物料需求 -->
            <template v-if="requirement.type === '9'">
              <el-form-item label="物料名称" prop="materialName" required key="materialName">
                <el-input v-model="requirement.materialName"
                  :maxlength="20"
                  placeholder="请输入物料名称"
                  key="materialName-input"></el-input>
              </el-form-item>
              <el-form-item label="物料格式要求" prop="materialType" required key="materialType">
                <el-input
                    class="col-input"
                    v-model="requirement.materialType"
                    placeholder="物料格式要求"
                    :maxlength="50"
                    key="materialType-input">
                  </el-input>
              </el-form-item>
              <el-form-item label="物料使用时间" required key="materialTime">
                <el-col :span="11">
                  <el-form-item prop="materialStart">
                    <el-date-picker type="date"
                      :editable="false"
                      placeholder="选择日期"
                      v-model="requirement.materialStart"
                      style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="2"></el-col>
                <el-col :span="11">
                  <el-form-item prop="materialEnd">
                    <el-date-picker type="date"
                      :editable="false"
                      placeholder="选择日期"
                      v-model="requirement.materialEnd"
                      style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <el-form-item label="物料描述" prop="materialDesc" required key="materialDesc">
                <el-input v-model="requirement.materialDesc"
                  :maxlength="500"
                  type="textarea"
                  placeholder="请输入物料描述"
                  key="materialDesc-input"></el-input>
              </el-form-item>
            </template>
            <el-form-item label="联系人" required key="contact">
              <el-col :span="7">
                <el-form-item prop="contactName" key="contactName">
                  <el-input class="col-input"
                    v-model="requirement.contactName"
                    placeholder="姓名"
                    :maxlength="6"
                    key="contact-name-input"></el-input>
                </el-form-item>
              </el-col>
              <el-col class="line-container" :span="1">
                <div class="line">
                </div>
              </el-col>
              <el-col :span="7">
                <el-form-item prop="contactMobile" key="contactMobile">
                  <el-input class="col-input"
                    v-model="requirement.contactMobile"
                    placeholder="手机号"
                    :maxlength="11"
                    key="contactMobile-input"></el-input>
                </el-form-item>
              </el-col>
              <el-col class="line-container" :span="1">
                <div class="line">
                </div>
              </el-col>
              <el-col :span="8">
                <el-form-item prop="contactEmail" key="contact-email">
                  <el-input class="col-input"
                    v-model="requirement.contactEmail"
                    placeholder="邮箱"
                    :maxlength="35"
                    key="contact-email-input"></el-input>
                </el-form-item>
              </el-col>
            </el-form-item>
          </div>
          <div class="line"></div>
          <div class="block processor-info">
            <el-form-item label="指派处理人" required key="processor-group">
              <el-col :span="8">
                <el-form-item prop="processor" key="processor">
                  <el-input class="processor"
                    v-model="requirement.processor"
                    placeholder="姓名"
                    :maxlength="6"
                    key="processor-input"></el-input>
                </el-form-item>
              </el-col>
              <el-col class="line-container" :span="8">
                <el-checkbox v-model="checked">短信提醒他</el-checkbox>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitRequirement">提交处理</el-button>
            </el-form-item>
          </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import endsWith from 'lodash/endsWith';
import mixins from './mixins';
export default {
  name: 'RequirementCreate',
  mixins: [mixins],
  data() {
    return {
      requirement: {
        type: '3',
        uploadFiles: []
      },
      checked: true,
      extraData: {
      },
      ACCEPT: [
        '.rar',
        '.docx',
        '.doc',
        '.ppt',
        '.pptx',
        '.xls',
        '.xlsx',
        '.pdf'
      ]
    };
  },
  methods: {
    isAcceptable(fileName) {
      const {ACCEPT} = this;

      for (let accept of ACCEPT) {
        if (endsWith(fileName, accept)) {
          return true;
        }
      }

      return true;
    },
    handleBeforeUpload(file) {
      let fileName = file.name;
      if (this.isAcceptable(fileName)) {
        let fileSize = file.size / (1024 * 1024);

        if (fileSize > 20) {
          this.$message({
            message: '附件超过20M',
            type: 'error'
          });

          return false;
        }
        return true;
      } else {
        this.$message({
          message: '只支持word、excel、ppt、pdf、rar格式',
          type: 'error'
        });
        return false;
      }
    },
    handleSuccess(response, file, fileList) {
      this.requirement.uploadFiles.splice(0, 1);
      this.requirement.uploadFiles.push(file);
    },
    handleRemove(file, fileList) {
      this.requirement.uploadFiles.splice(0, 1);
      return true;
    },
    submitRequirement() {
      this.$refs.baseForm.validate((valid) => {
        if (valid) {
          this.createApproveCustomer(this.requirement);
        }
      });
    },
    ...mapActions([
      'createCustomer',
      'createApproveCustomer'
    ])
  }
};
</script>
<style lang="scss" src="./style.scss"></style>
