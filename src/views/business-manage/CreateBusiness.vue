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
      <div class="business-detail-item">
        <div class="left">商机类别：</div>
        <div class="right">
            <el-select class="commonWidth1" v-model="form.category" placeholder="请选择属性">
                <el-option
                v-for="item in businessCategoryList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </div>
      </div>
      <div class="business-detail-item">
        <div class="left">预计收入：</div>
        <div class="right">
            <el-input v-model="form.income" class="commonWidth1" placeholder="请输入预计收入">
            </el-input>
        </div>
      </div>
      <div class="business-detail-item">
        <div class="left">预计签约时间：</div>
        <div class="right">
            <el-date-picker class="commonWidth1" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" v-model="form.signTime" placeholder="请选择时间"></el-date-picker>
        </div>
      </div>
      <div class="business-detail-item">
        <div class="left">预计协议期：</div>
        <div class="right">
          <el-date-picker class="commonWidth1" v-model="form.protoTime" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
          <!--<el-date-picker class="commonWidth1" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="dates" v-model="form.protoTime" placeholder="请选择日期"></el-date-picker>-->
        </div>
      </div>
      <div class="business-detail-item">
        <div class="left">项目是否招标：</div>
        <div class="right">
          <el-radio v-model="form.tender" label="1">是</el-radio>
          <el-radio v-model="form.tender" label="2">否</el-radio>
        </div>
      </div>
      <div class="business-detail-item">
        <div class="left">联系人员：</div>
        <div class="right">
          <el-input class="commonWidth2" v-model="form.name" placeholder="姓名"></el-input>
          <span class="sep">-</span>
          <el-select class="commonWidth7" v-model="form.sex" placeholder="性别">
              <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              </el-option>
          </el-select>
            <span class="sep">-</span>
          <el-input class="commonWidth3" v-model="form.tel" placeholder="手机号"></el-input>
            <span class="sep">-</span>
          <el-input class="commonWidth4" v-model="form.email" placeholder="邮箱"></el-input>
        </div>
      </div>
      <div class="business-detail-item">
        <div class="left">合作集团：</div>
        <div class="right">
            <el-autocomplete class="commonWidth5" v-model="form.group" :fetch-suggestions="querySearchAsync" placeholder="合作集团/编码" @select="handleSelect"></el-autocomplete>
            <span class="sep">-</span>
            <el-input class="commonWidth5" v-model="form.office" placeholder="办公地址"></el-input>
        </div>
      </div>
      <div class="business-detail-item">
        <div class="left">业务描述：</div>
        <div class="right">
            <el-input class="commonWidth6" type="textarea" :rows="3" placeholder="请输入业务描述" v-model="form.desc"></el-input>
        </div>
      </div>
      <div class="business-detail-item">
        <div class="left">业务需求：</div>
        <div class="right">
            <el-input class="commonWidth6" type="textarea" :rows="3" placeholder="请输入业务需求" v-model="form.command"></el-input>
        </div>
      </div>
      <div class="business-detail-item">
        <div class="left">需要协调的问题：</div>
        <div class="right">
            <el-input class="commonWidth6" type="textarea" :rows="3" placeholder="请输入需要协调的问题" v-model="form.problem"></el-input>
        </div>
      </div>
      <div class="b-container">
        <div class="business-detail-item">
            <div class="left1">指派联系人：</div>
            <div class="right">
                <el-input class="commonWidth1" v-model="form.linkman" placeholder="请输入"></el-input>
            </div>
        </div>
        <div class="business-detail-item">
            <div class="left1"></div>
            <div class="right">
              <el-button type="primary" @click="submit">提交</el-button>
              <el-button plain @click="save">保存为草稿</el-button>
            </div>
        </div>
      </div>
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
        tender: '',
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
      options: [
        { 'label': '男', 'value': '0' },
        { 'label': '女', 'value': '1' }
      ]
    };
  },
  beforeMount() {
    this.getBusinessCategoryList();
    this.getCooperationGroupList();
  },
  computed: {
    ...mapState({
      businessCategoryList: ({ business }) => business.businessCategoryList,
      officeAddress: ({ business }) => business.officeAddress,
      submitBusinessStatus: ({ business }) => business.submitBusinessStatus,
      cooperationGroupList: ({ business }) => business.cooperationGroupList
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
      this.submitBusinessOppority(params);
    },
    save() {
      const params = this.form;
      this.submitBusinessOppority(params);
    },
    ...mapActions([
      'getBusinessCategoryList', 'getOfficeAddress', 'submitBusinessOppority', 'getCooperationGroupList'
    ])
  }
};
</script>

<style lang="scss">
@import "scss/variables.scss";
.container {
  margin-top: 16px;
  background: #fff;
  padding-bottom: 40px;
}
.b-container {
  margin:32px;
  border-top:1px solid #E5E5E5;
}
.business-detail-item {
  display: flex;
  padding-top: 25px;
  line-height: 32px;
  & .left {
    width: 318px;
    text-align: right;
    color: rgba(0, 0, 0, 0.45);
    padding-right: 12px;
  }
  & .left1 {
    width:286px;
    text-align: right;
    color: rgba(0, 0, 0, 0.45);
    padding-right: 12px;
  }
  & .right {
    flex: 1;
    text-align: left;
    padding-right: 108px;
  }
  & .down {
    height: 20px;
    line-height: 20px;
    color: rgba(55, 120, 255, 1);
    font-size: 14px;
    text-align: left;
  }
  & .title {
    width: 122px;
    text-align: right;
    color: rgba(0, 0, 0, 0.45);
    padding-right: 12px;
    font-size: 14px;
    height: 20px;
    line-height: 20px;
  }
  & .content {
    width: 215px;
  }
}
.business-detail-title {
  height: 68px;
  display: flex;
  background: #FAFAFA 100%;
  margin: 32px 36px 8px 32px;
  & .item {
    flex: 1;
    text-align: left;
    color: rgba(0, 0, 0, 0.45);
  }
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
