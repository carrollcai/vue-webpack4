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
      <el-form :rules="rules" ref="businessForm" :model="businessData" label-width="140px">
        <el-form-item label="商机类别：" prop="opporType">
          <el-select class="form-input-medium" v-model="businessData.opporType" placeholder="请选择属性">
              <el-option
              v-for="item in BIZ_OPPOR_TYPE"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="预计收入：" prop="predictContractAmount">
          <el-input v-model="businessData.predictContractAmount" class="form-input-medium" placeholder="请输入预计收入">
            <template slot="append">万元/月</template>
          </el-input>
        </el-form-item>
        <el-form-item label="预计签约时间：" prop="predictSignTime">
          <el-date-picker class="form-input-medium" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" v-model="businessData.predictSignTime" placeholder="请选择时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="预计协议期：" prop="predictAgreementTime">
          <el-select class="form-input-medium" v-model="businessData.predictAgreementTime" placeholder="请选择">
              <el-option
              v-for="item in PREDICT_AGREEMENT_TIME"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目是否招标：" prop="isProjectInvitation">
          <el-radio v-model="businessData.isProjectInvitation" label="1">是</el-radio>
          <el-radio v-model="businessData.isProjectInvitation" label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="联系人员：" prop="contactName">
          <el-input maxlength="6" class="form-input-80" v-model="businessData.contactName" placeholder="姓名"></el-input>
          <span class="form-input-sep">-</span>
          <el-form-item prop="contactGender" style="display: inline-block;">
            <el-select class="form-input-80" v-model="businessData.contactGender" placeholder="性别">
                <el-option
                v-for="item in SEX"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
          </el-form-item>
          <span class="form-input-sep">-</span>
          <el-form-item prop="contactMobile" style="display: inline-block;">
            <el-input maxlength="11" class="form-input-120" v-model="businessData.contactMobile" placeholder="手机号"></el-input>
          </el-form-item>
        </el-form-item>
        <el-form-item label="联系邮箱：" prop="contactEmail" style="display: inline-block;">
            <el-input maxlength="35" class="form-input-320" v-model="businessData.contactEmail" placeholder="请输入邮箱"></el-input>
          </el-form-item>
        <el-form-item label="合作集团：" prop="organizeName">
          <el-autocomplete maxlength="25" class="form-input-half" v-model="businessData.organizeName" :fetch-suggestions="querySearchAsync" placeholder="合作集团/编码" @select="handleSelect" @blur="noData = false;"></el-autocomplete>
          <el-card class="create-business-box-card" v-if="noData">
            <div>
              系统暂未录入该集团，你可以暂时手动输入，建议后续尽快录入并同步关联修改！
            </div>
          </el-card>
          <span class="form-input-sep">-</span>
          <el-form-item prop="address" style="display:inline-block;">
            <el-input @focus="noData = false;" @blur="noData = false;" maxlength="50" class="form-input-half" v-model="businessData.address" placeholder="办公地址"></el-input>
          </el-form-item>
        </el-form-item>
        <el-form-item label="业务描述：" prop="busiDesc">
          <el-input maxlength="500" resize="none" class="form-input-320" type="textarea" :rows="3" placeholder="请输入业务描述" v-model="businessData.busiDesc"></el-input>
        </el-form-item>
        <el-form-item label="业务需求：" prop="busiRequire">
          <el-input class="form-input-320" type="textarea" :rows="3" placeholder="请输入业务需求" v-model="businessData.busiRequire"></el-input>
        </el-form-item>
        <el-form-item label="需要协调的问题：">
          <el-input maxlength="500" class="form-input-320" type="textarea" :rows="3" placeholder="请输入需要协调的问题" v-model="businessData.needCoordinationIssue"></el-input>
        </el-form-item>
      </el-form>
      </div>
    </div>
    <div style="background: #fff;">
      <div class="hr"></div>
      <div class="b-container">
          <el-form label-width="140px" style="width: 545px;">
            <el-form-item label="提醒人：">
              <el-select class="form-input-medium" multiple v-model="businessData.remindersArr" placeholder="请选择提醒人" @change="changeReminders">
                  <el-option
                  v-for="item in remindPerson"
                  :key="item.operatorId"
                  :label="item.staffName"
                  :value="item.operatorId">
                  </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="">
              <el-button type="primary" @click="save">保存</el-button>
              <el-button plain @click="submit">提交</el-button>
            </el-form-item>
          </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { checkPhone, emailCheck, checkLeftRightSpace, inte8Deci2 } from '@/utils/rules.js';
import filters from '@/views/business-manage/filters';
export default {
  mixins: [filters],
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
        remindersArr: ''
      },
      rules: {
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
          { required: true, message: '请输入电子邮箱', trigger: 'blur' },
          { validator: emailCheck, trigger: 'blur' }
        ],
        busiDesc: [
          { required: true, message: '请输入业务描述', trigger: 'blur' },
          { validator: checkLeftRightSpace, trigger: 'blur' }
        ],
        busiRequire: [
          { required: true, message: '请输入业务需求', trigger: 'blur' },
          { validator: checkLeftRightSpace, trigger: 'blur' }
        ],
        predictContractAmount: [
          { required: true, message: '请输入预计收入', trigger: 'blur' },
          { validator: inte8Deci2, trigger: ['blur', 'change'] }
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
    const { opporId } = this.$route.params;
    this.getBusinessDetail({ opporId });
    this.getRemindPerson();
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
    changeReminders(val) {
      let arr = [];
      val.map(val => {
        this.remindPerson.map(cval => {
          let flag = false;
          cval.children && cval.children.map(gval => {
            if (Number(val) === Number(gval.operatorId)) {
              flag = true;
            }
          });
          flag && arr.push(cval.operatorId);
        });
      });
      return [...new Set(this.businessData.remindersArr.concat(arr))];
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
    save() {
      this.$refs['businessForm'].validate(valid => {
        if (!valid) return false;
        const params = this.businessData;
        delete params.opporCode;
        delete params.contactGenderName;
        delete params.isProjectInvitationName;
        delete params.opporStatus;
        delete params.opporStatusName;
        delete params.opMobile;
        delete params.opId;
        delete params.createDate;
        delete params.doneDate;
        delete params.state;
        delete params.opporTypeName;
        delete params.predictAgreementTimeName;
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
    },
    submit() {
      this.$refs['businessForm'].validate(valid => {
        if (!valid) return false;
        const params = this.businessData;
        delete params.opporCode;
        delete params.contactGenderName;
        delete params.isProjectInvitationName;
        delete params.opporStatus;
        delete params.opporStatusName;
        delete params.opMobile;
        delete params.opId;
        delete params.createDate;
        delete params.doneDate;
        delete params.state;
        delete params.opporTypeName;
        delete params.predictAgreementTimeName;
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
    },
    cancel() {
      const path = `/business-manage/business-create-manage`;
      this.$router.push(path);
    },
    ...mapActions([
      'getOfficeAddress', 'getCooperationGroupList', 'getBusinessDetail', 'editBusinessDetail', 'getRemindPerson', 'editBusinessDetailApprove'
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
