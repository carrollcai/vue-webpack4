<template>
  <div class="customer-create">
    <steps :active="step">
      <step title="集团基本信息"></step>
      <step title="集团联系人"></step>
      <step title="指定客户经理"></step>
    </steps>
    <el-form :model="customer"
      v-if="isFirstStep()"
      ref="baseForm"
      :rules="baseInfoRules"
      label-width="120px"
      key="baseForm">
        <div class="base-info">
          <el-form-item label="集团名称" prop="organizeName" required key="name">
            <el-input v-model="customer.organizeName" placeholder="请输入集团名称" key="name-input"></el-input>
          </el-form-item>
          <el-form-item label="集团属性" prop="groupType" required key="group-type">
            <el-input v-model="customer.groupType" placeholder="请输入集团属性" key="groupType-input"></el-input>
          </el-form-item>
          <el-form-item label="成立日期" prop="establishTime" required key="establishTime">
            <el-date-picker
              v-model="customer.establishTime"
              type="date"
              :editable="false"
              :clearable="false"
              :picker-options="dateOptions"
              placeholder="请选择成立日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="所属省份" prop="provinceId" required key="provinceId">
            <el-input v-model="customer.provinceId" placeholder="请选择所属省份" key="province-input"></el-input>
          </el-form-item>
          <el-form-item label="机构类型" prop="orgIndustryType" required key="orgIndustryType">
            <el-input v-model="customer.orgIndustryType" placeholder="请输入机构类型" key="orgIndustryType-input"></el-input>
          </el-form-item>
          <el-form-item label="行业类别" prop="industryType" required key="industryType">
            <el-input v-model="customer.industryType" placeholder="请输入行业类别" key="industryType-input"></el-input>
          </el-form-item>
          <el-form-item label="集团客户规模" prop="memberNum" required key="memberNum">
            <el-input v-model="customer.memberNum" placeholder="请选择集团客户规模" key="memberNum-input"></el-input>
          </el-form-item>
          <el-form-item label="优势能力" prop="orgAdvantage" required key="orgAdvantage">
            <el-input v-model="customer.orgAdvantage" placeholder="请输入优势能力" key="orgAdvantage-input"></el-input>
          </el-form-item>
          <el-form-item label="经营范围" prop="businessScope" required key="Business-Scope">
            <el-input v-model="customer.businessScope" placeholder="请输入经营范围" key="businessScope-input"></el-input>
          </el-form-item>
          <el-form-item label="详细地址" prop="orgAddress" required key="orgAddress">
            <el-input v-model="customer.orgAddress" placeholder="请输入经营范围" key="orgAddress-input"></el-input>
          </el-form-item>
        </div>
        <div class="not-required">
          <span class="not-required_text">以下为非必填项</span>
        </div>
        <div class="base-optional-info">
          <el-form-item label="工商注册号" key="companyNo">
            <el-input v-model="customer.registeNum" placeholder="请输入工商注册号" key="companyNo-input"></el-input>
          </el-form-item>
          <el-form-item label="证件类型" key="IDtype">
            <el-input v-model="customer.idType" placeholder="请输入证件类型" key="idType-input"></el-input>
          </el-form-item>
          <el-form-item label="组织机构代码" key="code">
            <el-input v-model="customer.code" placeholder="请输入组织机构代码" key="code-input"></el-input>
          </el-form-item>
          <el-form-item label="社会信用代码" key="socialCreditCode">
            <el-input v-model="customer.socialCreditCode" placeholder="请输入社会信用代码" key="socialCreditCode-input"></el-input>
          </el-form-item>
          <el-form-item label="注册资金" key="capital">
            <el-input v-model="customer.registerFund" placeholder="请输入注册资金" key="capital-input">
              <template slot="append">万元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="经营期限" key="operation-term">
            <el-input v-model="customer.businessTerm" placeholder="请输入经营期限" key="operation-input">
              <template slot="append">年</template>
            </el-input>
          </el-form-item>
          <el-form-item label="登记机关" key="Registrar">
            <el-input v-model="customer.registerOrg" placeholder="请输入登记机关" key="registrar-input"></el-input>
          </el-form-item>
          <el-form-item label="发证日期" key="Licence-date">
            <el-date-picker
              v-model="customer.openTime"
              type="date"
              :editable="false"
              :picker-options="dateOptions"
              placeholder="请选择发证日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="证件地址" key="Licence-address">
            <el-input v-model="customer.certificateAddress" placeholder="请输入证件地址" key="licenceAddress-input"></el-input>
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
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="手机"
          width="180">
        </el-table-column>
        <el-table-column
          prop="gender"
          label="性别">
        </el-table-column>
        <el-table-column
          prop="department"
          label="部门">
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
            <span class="btnLists">
              <el-tooltip effect="dark" content="修改" placement="bottom">
                <i class="el-icon-edit-outline" @click="handleEditContact(scope.row, scope.$index)"></i>
              </el-tooltip>
              <el-tooltip effect="dark" content="删除" placement="bottom">
                <i class="el-icon-delete" @click="handleDeleteContact(scope.$index, scope.row.contactId)"></i>
              </el-tooltip>
            </span>
        </template>
        </el-table-column>
      </el-table>
      <div class="btn_add-contact" v-if="!isAddingContact" @click="addContact">
        <i class="el-icon-plus"></i> 添加联系人
      </div>
      <customer-contacts ref="customerContacts" v-if="isAddingContact" @cancel="cancelAddingContact" :list="contacts"></customer-contacts>
      <div>
        <el-button type="primary" @click="toThirdStep" :disabled="isNotAbleToThirdStep()">下一步</el-button>
        <el-button type="primary" @click="toFirstStep">上一步</el-button>
      </div>
    </div>
    <el-form class="customer-manager-info" :model="customer" ref="managerForm" :rules="managerRules" label-width="120px" v-if="isThirdStep()" key="managerForm">
      <el-form-item label="客户经理" prop="managerName" required key="managerName">
        <el-input v-model="customer.managerName" placeholder="请输入客户经理" key="manager-input"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="managerMobile" required key="managerMobile">
        <el-input v-model="customer.managerMobile" placeholder="请输入手机号码" key="managerMobile-input"></el-input>
      </el-form-item>
      <el-form-item label="员工工号" prop="managerNo" required key="managerNo">
        <el-input v-model="customer.managerNo" placeholder="请输入员工工号" key="managerId-input"></el-input>
      </el-form-item>
      <el-form-item label="所在部门" prop="managerDepartment" required key="managerDepartment">
        <el-input v-model="customer.managerDepartment" placeholder="请输入所在部门" key="managerDept-input"></el-input>
      </el-form-item>
      <el-form-item label="所在职位" prop="managerPosition" required key="managerPosition">
        <el-input v-model="customer.managerPosition" placeholder="请输入所在职位" key="managerJob-input"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveCustomer">立即提审</el-button>
        <el-button type="primary" @click="saveCustomer">保存草稿</el-button>
        <el-button type="primary" @click="toSecondStepFromThird">上一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import _ from 'lodash';
// import {mapActions} from 'vuex';
import Steps from '@/components/Steps.vue';
import Step from '@/components/Step.vue';
import CustomerContacts from './CustomerContacts.vue';
export default {
  name: 'CustomerCreate',
  components: {
    CustomerContacts,
    Steps,
    Step
  },
  data() {
    return {
      step: 1,
      isAddingContact: false,
      customer: {
        name: '',
        contactDtoList: [ { "gender": "M", "maritalStatus": "N", "contactFamilyDtoList": [ {} ], "name": "1", "department": "1", "age": 1, "position": "1", "mobile": "1", "email": "1@173.com", "manageScope": "1", "responsibility": "1", "contactId": 1529630957203 }, { "gender": "M", "maritalStatus": "N", "contactFamilyDtoList": [ {} ], "name": "2", "department": "2", "age": 2, "position": "2", "mobile": "2", "email": "2@183.com", "manageScope": "2", "responsibility": "2", "contactId": 1529630969539 } ]
      },
      dateOptions: {
        disabledDate(time) {
          return time.getTime() > new Date().getTime();
        }
      },
      baseInfoRules: {
        organizeName: [
          { required: true, message: '请输入集团名称', trigger: 'blur' },
          { min: 1, max: 50, message: '集团名称过长，长度 50 个字符内', trigger: 'blur' }
        ],
        // TODO
        groupType: [
          { required: true, message: '请输入集团属性', trigger: 'blur' }
        ],
        establishTime: [
          { required: true, message: '请选择成立日期', trigger: 'blur' }
        ],
        provinceId: [
          { required: true, message: '请选择所属省份', trigger: 'blur' }
        ],
        orgIndustryType: [
          { required: true, message: '请输入机构类型', trigger: 'blur' }
        ],
        level: [
          { required: true, message: '请输入行业类别', trigger: 'blur' }
        ],
        memberNum: [
          { required: true, message: '请选择集团客户规模', trigger: 'blur' }
        ],
        orgAdvantage: [
          { required: true, message: '请输入优势能力', trigger: 'blur' }
        ],
        businessScope: [
          { required: true, message: '请输入经营范围', trigger: 'blur' }
        ],
        orgAddress: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ]
      },
      managerRules: {
        managerName: [
          { required: true, message: '请输入客户经理', trigger: 'blur' }
        ],
        managerMobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' }
        ],
        managerNo: [
          { required: true, message: '请输入员工工号', trigger: 'blur' }
        ],
        managerDepartment: [
          { required: true, message: '请输入所在部门', trigger: 'blur' }
        ],
        managerPosition: [
          { required: true, message: '请输入所在职位', trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
    contacts() {
      return this.customer.contactDtoList;
    }
  },
  methods: {
    isFirstStep() {
      return this.step === 0;
    },
    isSecondStep() {
      return this.step === 1;
    },
    isThirdStep() {
      return this.step === 2;
    },
    toFirstStep() {
      this.step = 0;
    },
    toSecondStep() {
      this.$refs.baseForm.validate((valid) => {
        if (valid) {
          this.step = 1;
          if (!this.contacts.length) {
            this.isAddingContact = true;
          }
        }
      });
    },
    toSecondStepFromThird() {
      this.step = 1;
      if (!this.contacts.length) {
        this.isAddingContact = true;
      }
    },
    isNotAbleToThirdStep() {
      return this.isAddingContact || !this.contacts.length;
    },
    toThirdStep() {
      this.step = 2;
    },
    saveCustomer() {
      this.$refs.managerForm.validate((valid) => {
        if (valid) {
          console.log(valid);
        }
      });
    },
    addContact() {
      this.isAddingContact = true;
    },
    cancelAddingContact() {
      this.isAddingContact = false;
    },
    handleDeleteContact(index, id) {
      let filters = _.filter(this.contacts, {'parentContactId': id});
      if (filters.length) {
        this.$message({
          message: `已经被选为上级，不可删除`,
          type: 'warning'
        });
      } else {
        this.contacts.splice(index, 1);
      }
    },
    handleEditContact(contact, index) {
      this.isAddingContact = true;
      this.$nextTick(() => {
        this.$refs.customerContacts.init(contact, index);
      });
    },
    changeContactParent(index, id) {
      let filters = _.filter(this.contacts, {'parentContactId': id});

      if (filters.length) {
        this.$message({
          message: `不能与“${filters[0].name}”互选为上级`,
          type: 'warning'
        });
        this.contacts[index].parentContactId = '';
      }
    }
  }
};
</script>
<style lang="scss">
.customer-create{
  background: #FFF;
  padding: 24px;

  .steps{
    width: 620px;
    margin: 16px auto 40px;

    .step__line{
      width: 120px;
    }
  }

  .base-info,
  .base-optional-info,
  .customer-manager-info{
    width: 550px;
    margin: 0 auto;

    .el-input{
      width: 420px;
    }
  }

  .not-required {
    border-top: 1px solid #E6E6E6;
    height: 1px;
    margin: 32px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    .not-required_text {
        padding: 0 20px;
        line-height: 24px;
        background: #ffffff;
        font-size: 12px;
        color: #C2C2C2;
    }
  }

  .second-step{
    width: 800px;
    margin: 0 auto;
  }

  .btn_add-contact{
    width: 100%;
    height: 32px;
    line-height: 32px;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 1);
    border: 1px dashed rgba(217, 217, 217, 1);
    text-align: center;
    margin: 24px 0;
    cursor: pointer;
  }
}
</style>
