<template>
  <div>
    <div class="m-container">
      <div class="breadcrumb">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/business-manage/business' }">商机总览</el-breadcrumb-item>
          <el-breadcrumb-item>商机详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="container">
      <div>
      <el-form :rules="rules" ref="businessForm" :model="form" label-width="140px">
        <el-form-item label="商机类别：" prop="opporType">
          <el-select class="form-input-medium" v-model="form.opporType" placeholder="请选择属性">
              <el-option
              v-for="item in businessCategoryList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="预计收入：" prop="predictContractAmount">
          <el-input v-model="form.predictContractAmount" class="form-input-medium" placeholder="请输入预计收入">
            <template slot="append">万元/月</template>
          </el-input>
        </el-form-item>
        <el-form-item label="预计签约时间：" prop="predictSignTime">
          <el-date-picker class="form-input-medium" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" v-model="form.predictSignTime" placeholder="请选择时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="预计协议期：" prop="predictAgreementTime">
          <el-select class="form-input-medium" v-model="form.predictAgreementTime" placeholder="请选择">
              <el-option
              v-for="item in protoTimeList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目是否招标：" prop="isProjectInvitation">
          <el-radio v-model="form.isProjectInvitation" label="1">是</el-radio>
          <el-radio v-model="form.isProjectInvitation" label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="联系人员：" prop="contactName">
          <el-input maxlength="6" class="form-input-80" v-model="form.contactName" placeholder="姓名"></el-input>
          <span class="form-input-sep">-</span>
          <el-form-item prop="contactGender" style="display: inline-block;">
            <el-select class="form-input-80" v-model="form.contactGender" placeholder="性别">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
          </el-form-item>
          <span class="form-input-sep">-</span>
          <el-form-item prop="contactMobile" style="display: inline-block;">
            <el-input maxlength="11" class="form-input-120" v-model="form.contactMobile" placeholder="手机号"></el-input>
          </el-form-item>
        </el-form-item>
        <el-form-item label="联系邮箱：" prop="contactEmail" style="display: inline-block;">
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
            <el-input maxlength="50" class="form-input-half" v-model="form.address" placeholder="办公地址"></el-input>
          </el-form-item>
        </el-form-item>
        <el-form-item label="业务描述：" prop="busiDesc">
          <el-input maxlength="500" resize="none" class="form-input-320" type="textarea" :rows="3" placeholder="请输入业务描述" v-model="form.busiDesc"></el-input>
        </el-form-item>
        <el-form-item label="业务需求：" prop="busiRequire">
          <el-input class="form-input-320" type="textarea" :rows="3" placeholder="请输入业务需求" v-model="form.busiRequire"></el-input>
        </el-form-item>
        <el-form-item label="需要协调的问题：">
          <el-input maxlength="500" class="form-input-320" type="textarea" :rows="3" placeholder="请输入需要协调的问题" v-model="form.needCoordinationIssue"></el-input>
        </el-form-item>
      </el-form>
      </div>
    </div>
    <div style="background: #fff;">
      <div class="hr"></div>
      <div class="b-container">
          <el-form label-width="140px" style="width: 460px;">
            <el-form-item label="提醒人：">
              <el-select class="form-input-medium" v-model="form.reminders" placeholder="请选择提醒人" multiple>
                  <el-option
                  v-for="item in designatePerson"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                  </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="">
              <el-button type="primary" @click="submit">提交</el-button>
              <!--<el-button plain @click="save">保存为草稿</el-button>-->
            </el-form-item>
          </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { checkPhone, emailCheck } from '@/utils/rules.js';
export default {
  components: {
  },
  data() {
    return {
      form: {
        opporType: '',
        predictContractAmount: '',
        predictSignTime: '',
        predictAgreementTime: '',
        isProjectInvitation: '1',
        contactName: '',
        contactGender: '',
        contactMobile: '',
        contactEmail: '',
        organizeName: '',
        address: '',
        busiDesc: '',
        busiRequire: '',
        needCoordinationIssue: '',
        reminders: ''
      },
      businessCategoryList: [
        { 'label': '公司级商机', 'value': '0' },
        { 'label': '分公司级商机', 'value': '1' },
        { 'label': '普通商机', 'value': '2' }
      ],
      options: [
        { 'label': '男', 'value': '0' },
        { 'label': '女', 'value': '1' }
      ],
      protoTimeList: [
        { 'label': '1年', 'value': '0' },
        { 'label': '2年', 'value': '1' },
        { 'label': '3年（含）以上', 'value': '2' }
      ],
      rules: {
        opporType: [
          { required: true, message: '请选择商机类别', trigger: ['blur', 'change'] }
        ],
        organizeName: [
          { required: true, message: '请输入合作集团/编码', trigger: ['blur', 'change'] }
        ],
        address: [
          { required: true, message: '请输入办公地址', trigger: ['blur', 'change'] }
        ],
        contactName: [
          { required: true, message: '请输入姓名', trigger: ['blur', 'change'] }
        ],
        contactGender: [
          { required: true, message: '请选择性别', trigger: ['blur', 'change'] }
        ],
        contactMobile: [
          { required: true, message: '请输入手机号码', trigger: ['blur', 'change'] },
          { validator: checkPhone, trigger: 'blur' }
        ],
        contactEmail: [
          { required: true, message: '请输入电子邮箱', trigger: ['blur', 'change'] },
          { validator: emailCheck, trigger: ['blur', 'change'] }
        ],
        busiDesc: [
          { required: true, message: '请输入业务描述', trigger: ['blur', 'change'] }
        ],
        busiRequire: [
          { required: true, message: '请输入业务需求', trigger: ['blur', 'change'] }
        ],
        predictContractAmount: [
          { required: true, message: '请输入预计收入', trigger: ['blur', 'change'] }
        ],
        predictSignTime: [
          { required: true, message: '请选择预计签约时间', trigger: ['blur', 'change'] }
        ],
        predictAgreementTime: [
          { required: true, message: '请选择预计协议期', trigger: ['blur', 'change'] }
        ],
        isProjectInvitation: [
          { required: true, message: '请选择项目是否招标', trigger: ['blur', 'change'] }
        ]
      },
      noData: false
    };
  },
  beforeMount() {
    // this.getBusinessCategoryList();
    this.getCooperationGroupList();
    // this.getDesignatePerson();
  },
  computed: {
    ...mapState({
      // businessCategoryList: ({ business }) => business.businessCategoryList,
      officeAddress: ({ business }) => business.officeAddress,
      submitBusinessStatus: ({ business }) => business.submitBusinessStatus,
      cooperationGroupList: ({ business }) => business.cooperationGroupList,
      designatePerson: ({ business }) => business.designatePerson
    })
  },
  methods: {
    querySearchAsync(queryString, cb) {
      var cooperationGroupList = this.cooperationGroupList;
      var results = queryString ? cooperationGroupList.filter(this.createStateFilter(queryString)) : cooperationGroupList;
      if (results.length === 0) {
        this.noData = true;
      } else {
        this.noData = false;
      };
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 100 * Math.random());
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
      this.form.address = item.id;
      this.getOfficeAddress();
    },
    submit() {
      const params = this.form;
      this.$refs['businessForm'].validate(valid => {
        if (!valid) return false;
      });
      this.submitBusinessOppority(params);
    },
    save() {
      const params = this.form;
      this.submitBusinessOppority(params);
    },
    ...mapActions([
      'getOfficeAddress', 'submitBusinessOppority', 'getCooperationGroupList'
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
</style>
