<template>
  <div class="customer-create">
    <div class="m-container">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/group-customer/create-manage' }">集团客户创建</el-breadcrumb-item>
        <el-breadcrumb-item>创建集团客户</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="m-container info-block">
      <steps :active="step">
        <step title="集团基本信息"></step>
        <step title="集团联系人"></step>
        <step title="指定客户经理"></step>
      </steps>
      <el-form :model="customer"
        v-if="isFirstStep()"
        ref="baseForm"
        :rules="baseInfoRules"
        label-width="130px"
        key="baseForm">
          <div class="base-info">
            <el-form-item label="集团名称" prop="organizeName" key="name">
              <el-input v-model="customer.organizeName"
                :maxlength="25"
                placeholder="请输入集团名称"
                key="name-input"></el-input>
            </el-form-item>
            <el-form-item label="集团属性" prop="organizeType" key="organizeType">
              <el-select v-model="customer.organizeType"
                clearable
                key="organizeType-select"
                placeholder="请选择集团属性">
                <el-option
                  v-for="item in ORGANIZE_TYPE"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="成立日期" prop="establishTime" key="establishTime">
              <el-date-picker
                v-model="customer.establishTime"
                type="date"
                :editable="false"
                :clearable="false"
                value-format="yyyy-MM-dd HH:mm:ss"
                :picker-options="dateOptions"
                placeholder="请选择成立日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="所属省份" prop="provinceId" key="provinceId">
              <el-select
                key="province-select"
                v-model="customer.provinceId"
                placeholder="请选择所属省份">
                <el-option
                  v-for="(item, i) in provinces"
                  :key="i"
                  :label="item.value"
                  :value="item.key">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="机构类型" prop="orgIndustryType" key="orgIndustryType">
              <el-select
                key="orgIndustryType-select"
                v-model="customer.orgIndustryType"
                placeholder="请选择机构类型">
                <el-option
                  v-for="item in ORG_INDUSTRY_TYPE"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="行业类别" prop="industryType" key="industryType">
              <el-select
                key="industryType-select"
                v-model="customer.industryType"
                placeholder="请选择行业类别">
                <el-option
                  v-for="item in INDUSTRY_TYPE"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="集团客户规模" prop="memberNum" key="memberNum">
              <el-select v-model="customer.memberNum"
                clearable
                key="memberNum-select"
                placeholder="请选择集团客户规模">
                <el-option
                  v-for="item in MEMBER_NUM"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="优势能力" prop="orgAdvantage" key="orgAdvantage">
              <el-input v-model="customer.orgAdvantage"
                :maxlength="500"
                type="textarea"
                placeholder="请输入优势能力"
                key="orgAdvantage-input"></el-input>
            </el-form-item>
            <el-form-item label="经营范围" prop="businessScope" key="Business-Scope">
              <el-input v-model="customer.businessScope"
                :maxlength="500"
                type="textarea"
                placeholder="请输入经营范围"
                key="businessScope-input"></el-input>
            </el-form-item>
            <el-form-item label="详细地址" prop="orgAddress" key="orgAddress">
              <el-input v-model="customer.orgAddress"
                :maxlength="50"
                placeholder="请输入详细地址"
                key="orgAddress-input"></el-input>
            </el-form-item>
          </div>
          <div class="not-required">
            <span class="not-required_text">以下为非必填项</span>
          </div>
          <div class="base-optional-info">
            <el-form-item label="工商注册号" prop="registerNum" key="registeNum">
              <el-input v-model="customer.registerNum"
                placeholder="请输入工商注册号"
                :maxlength="13"
                key="registerNum-input"></el-input>
            </el-form-item>
            <el-form-item label="证件类型" key="certificateType">
              <el-select v-model="customer.certificateType"
                clearable
                key="certificateType-select"
                placeholder="请选择证件类型">
                <el-option
                  v-for="item in CERTIFICATE_TYPE"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="统一社会信用代码" prop="socialCreditCode" key="socialCreditCode">
              <el-input
              v-model="customer.socialCreditCode"
              placeholder="请输入统一社会信用代码"
              :maxlength="18"
              key="socialCreditCode-input"></el-input>
            </el-form-item>
            <el-form-item label="注册资金类型" key="registerFundType">
              <el-select v-model="customer.registerFundType"
                clearable
                key="registerFundType-select"
                placeholder="请选择注册资金类型">
                <el-option
                  v-for="item in REGISTER_FUND_TYPE"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="注册资金" prop="registerFund" key="registerFund">
              <el-input v-model="customer.registerFund" placeholder="请输入注册资金" key="registerFund-input">
                <template slot="append">万元</template>
              </el-input>
            </el-form-item>
            <el-form-item label="经营期限" prop="businessTerm" key="operation-term">
              <el-input v-model="customer.businessTerm"
                :maxlength="3"
                placeholder="请输入经营期限" key="operation-input">
                <template slot="append">年</template>
              </el-input>
            </el-form-item>
            <el-form-item label="登记机关" key="registrateOrg">
              <el-input v-model="customer.registrateOrg"
                :maxlength="20"
                placeholder="请输入登记机关"
                key="registrateOrg-input"></el-input>
            </el-form-item>
            <el-form-item label="发证日期" key="Licence-date">
              <el-date-picker
                v-model="customer.openTime"
                type="date"
                :editable="false"
                :picker-options="dateOptions"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="请选择发证日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="证件地址" key="Licence-address">
              <el-input v-model="customer.certificateAddress"
                :maxlength="50"
                placeholder="请输入证件地址"
                key="licenceAddress-input"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="toSecondStep">下一步</el-button>
            </el-form-item>
          </div>
      </el-form>
      <div class="second-step" v-if="isSecondStep()">
        <el-table
          border
          v-if="!isAddingContact"
          :data="contacts">
          <el-table-column
            prop="name"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="手机">
          </el-table-column>
          <el-table-column
            label="性别">
            <template slot-scope="scope">
              {{genderFilter(scope.row.gender)}}
            </template>
          </el-table-column>
          <el-table-column
            prop="department"
            label="部门">
          </el-table-column>
          <el-table-column
            prop="position"
            label="职位">
          </el-table-column>
          <el-table-column
            label="上级设置">
            <template slot-scope="scope">
              <el-select v-model="scope.row.parentContactId"
                clearable
                placeholder="请选择"
                @change="changeContactParent(scope.$index, scope.row.contactId)">
                <el-option
                  v-for="item in contacts"
                  :key="item.contactId"
                  :label="item.name"
                  :value="item.contactId"
                  v-if="item.contactId !== scope.row.contactId">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="handleEditContact(scope.row, scope.$index)">
                编辑
              </el-button>
              <el-button type="text" @click="handleDeleteContact(scope.$index, scope.row.contactId)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="btn_add-contact" v-if="!isAddingContact" @click="addContact">
          <i class="el-icon-plus"></i> 添加联系人
        </div>
        <customer-contacts ref="customerContacts" v-if="isAddingContact" @cancel="cancelAddingContact" :list="contacts"></customer-contacts>
        <div>
          <el-button type="primary" @click="toFirstStep">上一步</el-button>
          <el-button type="primary" @click="toThirdStep" :disabled="isNotAbleToThirdStep()">下一步</el-button>
        </div>
      </div>
      <el-form class="customer-manager-info"
        :model="customer"
        ref="managerForm"
        :rules="managerRules"
        label-width="120px"
        v-if="isThirdStep()"
        key="managerForm">
        <el-form-item label="客户经理" prop="managerName" required key="managerName">
          <el-autocomplete
            key="manager-input"
            v-model="customer.managerName"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入客户经理"
            :trigger-on-focus="false"
            value-key="staffName"
            label="operatorId"
            @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="手机号码" prop="managerMobile" required key="managerMobile">
          <el-input v-model="customer.managerMobile"
            placeholder="请输入手机号码"
            :maxlength="11"
            key="managerMobile-input"></el-input>
        </el-form-item>
        <el-form-item label="员工工号" prop="managerNo" required key="managerNo">
          <el-input v-model="customer.managerNo"
            placeholder="请输入员工工号"
            :maxlength="15"
            key="managerId-input"></el-input>
        </el-form-item>
        <el-form-item label="所在部门" prop="managerDepartment" required key="managerDepartment">
          <el-input v-model="customer.managerDepartment"
            :maxlength="15"
            placeholder="请输入所在部门"
            key="managerDept-input"></el-input>
        </el-form-item>
        <el-form-item label="所在职位" prop="managerPosition" required key="managerPosition">
          <el-input v-model="customer.managerPosition"
            :maxlength="15"
            placeholder="请输入所在职位"
            key="managerJob-input"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="approveCustomer">立即提审</el-button>
          <el-button type="primary" @click="saveCustomer">保存草稿</el-button>
          <el-button type="primary" @click="toSecondStepFromThird">上一步</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import mixins from './mixins';
import filters from '../filters';
export default {
  name: 'CustomerCreate',
  mixins: [mixins, filters],
  data() {
    return {
      customer: {
        orgAdvantage: '',
        contactDtoList: []
      }
    };
  },
  methods: {
    saveCustomer() {
      this.$refs.managerForm.validate((valid) => {
        if (valid) {
          this.createCustomer(this.customer);
        }
      });
    },
    approveCustomer() {
      this.$refs.managerForm.validate((valid) => {
        if (valid) {
          this.createApproveCustomer(this.customer);
        }
      });
    },
    ...mapActions(['createCustomer', 'createApproveCustomer'])
  }
};
</script>
<style lang="scss" src="./style.scss">
</style>
