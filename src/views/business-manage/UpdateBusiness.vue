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
      <el-form :rules="rules" ref="businessForm" :model="form" label-width="318px">
        <el-form-item label="商机类别：" prop="category">
          <el-select class="commonWidth1" v-model="form.category" placeholder="请选择属性">
              <el-option
              v-for="item in businessCategoryList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="预计收入：" prop="income">
          <el-input v-model="form.income" class="commonWidth1" placeholder="请输入预计收入">
          </el-input>
        </el-form-item>
        <el-form-item label="预计签约时间：" prop="signTime">
          <el-date-picker class="commonWidth1" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" v-model="form.signTime" placeholder="请选择时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="预计协议期：" prop="protoTime">
          <el-select class="commonWidth1" v-model="form.protoTime" placeholder="请选择">
              <el-option
              v-for="item in protoTimeList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目是否招标：" prop="tender">
          <el-radio v-model="form.tender" label="1">是</el-radio>
          <el-radio v-model="form.tender" label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="联系人员：" prop="name">
          <el-input maxlength="6" class="commonWidth2" v-model="form.name" placeholder="姓名"></el-input>
          <span class="sep">-</span>
          <el-form-item prop="sex" style="display: inline-block;">
            <el-select class="commonWidth7" v-model="form.sex" placeholder="性别">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
          </el-form-item>
          <span class="sep">-</span>
          <el-form-item prop="tel" style="display: inline-block;">
            <el-input maxlength="11" class="commonWidth3" v-model="form.tel" placeholder="手机号"></el-input>
          </el-form-item>
          <span class="sep">-</span>
          <el-form-item prop="email" style="display: inline-block;">
            <el-input maxlength="35" class="commonWidth4" v-model="form.email" placeholder="邮箱"></el-input>
          </el-form-item>
        </el-form-item>
        <el-form-item label="合作集团：" prop="group">
          <el-autocomplete maxlength="25" class="commonWidth5" v-model="form.group" :fetch-suggestions="querySearchAsync" placeholder="合作集团/编码" @select="handleSelect"></el-autocomplete>
          <span class="sep">-</span>
          <el-form-item prop="office" style="display:inline-block;">
            <el-input maxlength="50" class="commonWidth5" v-model="form.office" placeholder="办公地址"></el-input>
          </el-form-item>
        </el-form-item>
        <el-form-item label="业务描述：" prop="desc">
          <el-input maxlength="500" resize="none" class="commonWidth6" type="textarea" :rows="3" placeholder="请输入业务描述" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item label="业务需求：" prop="command">
          <el-input class="commonWidth6" type="textarea" :rows="3" placeholder="请输入业务需求" v-model="form.command"></el-input>
        </el-form-item>
        <el-form-item label="需要协调的问题：">
          <el-input maxlength="500" class="commonWidth6" type="textarea" :rows="3" placeholder="请输入需要协调的问题" v-model="form.problem"></el-input>
        </el-form-item>
        <div class="b-container">
          <el-form-item label="提醒人：">
            <el-select class="commonWidth1" v-model="designatePerson" placeholder="请选择提醒人" multiple>
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
            <el-button plain @click="save">保存为草稿</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  components: {
  },
  data() {
    return {
      form: {
        category: '',
        income: '',
        signTime: '',
        protoTime: '',
        tender: '1',
        name: '',
        sex: '',
        tel: '',
        email: '',
        group: '',
        office: '',
        desc: '',
        command: '',
        problem: '',
        linkman: ''
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
        category: [
          { required: true, message: '请选择商机类别', trigger: ['blur', 'change'] }
        ],
        group: [
          { required: true, message: '请输入合作集团/编码', trigger: ['blur', 'change'] }
        ],
        office: [
          { required: true, message: '请输入办公地址', trigger: ['blur', 'change'] }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: ['blur', 'change'] }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: ['blur', 'change'] }
        ],
        tel: [
          { required: true, message: '请输入手机号', trigger: ['blur', 'change'] },
          { pattern: /^1[34578]\d{9}$/, message: '手机号码格式不正确' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: ['blur', 'change'] },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        desc: [
          { required: true, message: '请输入业务描述', trigger: ['blur', 'change'] }
        ],
        command: [
          { required: true, message: '请输入业务需求', trigger: ['blur', 'change'] }
        ],
        income: [
          { required: true, message: '请输入预计收入', trigger: ['blur', 'change'] }
        ],
        signTime: [
          { required: true, message: '请选择预计签约时间', trigger: ['blur', 'change'] }
        ],
        protoTime: [
          { required: true, message: '请选择预计协议期', trigger: ['blur', 'change'] }
        ],
        tender: [
          { required: true, message: '请选择项目是否招标', trigger: ['blur', 'change'] }
        ]
      }
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
      this.form.office = item.id;
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
  padding-top: 16px;
  margin-top: 16px;
  background: #fff;
  padding-bottom: 40px;
}
.b-container {
  padding-top: 18px;
  border-top:1px solid #E5E5E5;
}
.commonWidth1 {
  width: 229px !important;
}
.commonWidth2 {
  width: 70px !important;
}
.commonWidth3 {
  width: 112px !important;
}
.commonWidth4 {
  width: 132px !important;
}
.commonWidth5 {
  width: 217px !important;
}
.commonWidth6 {
  width: 457px !important;
}
.commonWidth7 {
  width: 75px !important;
}
.sep {
  color: rgb(0, 0, 0) 25%;
  padding-left: 4px;
  padding-right: 4px;
}
</style>
