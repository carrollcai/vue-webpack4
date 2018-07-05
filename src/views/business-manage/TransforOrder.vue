<template>
  <div>
    <div class="m-container">
      <div class="breadcrumb">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/business-manage/business-task' }">商机处理任务</el-breadcrumb-item>
          <el-breadcrumb-item>转订单</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="business-detail">
      <div class="business-detail-content">
        <div class="business-detail-content-item">
          <span class="left">指派人：</span>
          <span class="right">张小明</span>
        </div>
        <div class="business-detail-content-item">
          <span class="left">指派原因：</span>
          <span class="right">你们的订单，你们自己处理吧...</span>
        </div>
        <!--<div class="business-detail-content-item">
          <span class="left">合同下载：</span>
          <a class="down" href="#">第三次签约合同.doc</a>
        </div>-->
      </div>
    </div>
    <div class="order-container">
      <el-form :rules="rules" ref="transForm" :model="form" label-width="140px">
        <el-form-item label="订单名称：" prop="ordername">
          <el-input maxlength="30" v-model="form.ordername" class="form-input-medium" placeholder="请输入订单名称">
          </el-input>
        </el-form-item>
        <el-form-item label="订购产品：" prop="orderproduct">
          <el-input maxlength="25" v-model="form.orderproduct" class="form-input-medium" placeholder="请输入产品名称/编码">
          </el-input>
        </el-form-item>
        <el-form-item label="预计合同金额：" prop="conamount">
          <el-input v-model="form.conamount" class="form-input-medium" placeholder="请输入合同金额">
          </el-input>
        </el-form-item>
        <el-form-item label="预计签约时间：" prop="signtime">
          <el-date-picker class="form-input-medium" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" v-model="form.signTime" placeholder="请选择时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="预计协议期：" prop="protoTime">
          <el-select class="form-input-medium" v-model="form.protoTime" placeholder="请选择">
              <el-option
              v-for="item in protoTimeList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系人员：" prop="name">
          <el-input maxlength="6" class="form-input-80" v-model="form.name" placeholder="姓名"></el-input>
          <span class="form-input-sep">-</span>
          <el-form-item prop="sex" style="display: inline-block;">
            <el-select class="form-input-80" v-model="form.sex" placeholder="性别">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
          </el-form-item>
          <span class="form-input-sep">-</span>
          <el-form-item prop="tel" style="display: inline-block;">
            <el-input maxlength="11" class="form-input-120" v-model="form.tel" placeholder="手机号"></el-input>
          </el-form-item>
        </el-form-item>
        <el-form-item prop="email" label="联系邮箱：">
          <el-input maxlength="35" class="form-input-320" v-model="form.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="合作集团：" prop="group">
          <el-autocomplete maxlength="25" class="form-input-half" v-model="form.group" :fetch-suggestions="querySearchAsync" placeholder="合作集团/编码" @select="handleSelect" @blur="noData = false;"></el-autocomplete>
          <el-card class="create-business-box-card" v-if="noData">
            <div>
              系统暂未录入该集团，你可以暂时手动输入，建议后续尽快录入并同步关联修改！
            </div>
          </el-card>
          <span class="form-input-sep">-</span>
          <el-form-item prop="office" style="display:inline-block;">
            <el-input maxlength="50" class="form-input-half" v-model="form.office" placeholder="办公地址"></el-input>
          </el-form-item>
        </el-form-item>
        <el-form-item label="订单描述：" prop="desc">
          <el-input maxlength="500" class="form-input-320" type="textarea" :rows="3" placeholder="请输入订单描述" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item label="订单需求：" prop="command">
          <el-input class="form-input-320" type="textarea" :rows="3" placeholder="请输入订单需求" v-model="form.command"></el-input>
        </el-form-item>
        <el-form-item label="需要协调的问题：">
          <el-input maxlength="500" class="form-input-320" type="textarea" :rows="3" placeholder="请输入需要协调的问题" v-model="form.problem"></el-input>
        </el-form-item>
        <el-form-item label="项目是否招标：" prop="tender">
          <el-radio v-model="form.tender" label="1">是</el-radio>
          <el-radio v-model="form.tender" label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="submit">提交</el-button>
          <el-button @click="save" plain>保存为草稿</el-button>
        </el-form-item>
      </el-form>
      </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { checkPhone, emailCheck, inte5Deci4 } from '@/utils/rules.js';
export default {
  components: {
  },
  data() {
    return {
      form: {
        tender: '1'
      },
      rules: {
        ordername: [
          { required: true, message: '请输入订单名称', trigger: ['blur', 'change'] }
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
          { required: true, message: '请输入手机号码', trigger: ['blur', 'change'] },
          { validator: checkPhone, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入电子邮箱', trigger: ['blur', 'change'] },
          { validator: emailCheck, trigger: ['blur', 'change'] }
        ],
        desc: [
          { required: true, message: '请输入订单描述', trigger: ['blur', 'change'] }
        ],
        command: [
          { required: true, message: '请输入订单需求', trigger: ['blur', 'change'] }
        ],
        income: [
          { required: true, message: '请输入预计收入', trigger: ['blur', 'change'] },
          { validator: inte5Deci4, trigger: ['blur', 'change'] }
        ],
        signtime: [
          { required: true, message: '请选择预计签约时间', trigger: ['blur', 'change'] }
        ],
        protoTime: [
          { required: true, message: '请选择预计协议期', trigger: ['blur', 'change'] }
        ],
        tender: [
          { required: true, message: '请选择项目是否招标', trigger: ['blur', 'change'] }
        ],
        orderproduct: [
          { required: true, message: '请输入产品名称/编码', trigger: ['blur', 'change'] }
        ],
        conamount: [
          { required: true, message: '请输入预计合同金额', trigger: ['blur', 'change'] },
          { pattern: /^\d{1,5}(?:\.\d{1,4})?$/, message: '整数部分最多5位，小数部分最多4位' }
        ]
      },
      protoTimeList: [
        { 'label': '1年', 'value': '0' },
        { 'label': '2年', 'value': '1' },
        { 'label': '3年（含）以上', 'value': '2' }
      ],
      options: [
        { 'label': '男', 'value': '0' },
        { 'label': '女', 'value': '1' }
      ],
      noData: false
    };
  },
  beforeMount() {
    this.getBusinessDetail();
    this.getCooperationGroupList();
  },
  computed: {
    ...mapState({
      businessDetail: ({ business }) => business.businessDetail,
      cooperationGroupList: ({ business }) => business.cooperationGroupList
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
      this.form.office = item.id;
      this.getOfficeAddress();
    },
    submit() {
      const params = this.form;
      this.$refs['transForm'].validate(valid => {
        if (!valid) return false;
        this.saveBusinessOrder(params).then(res => {
          this.reset();
        });
      });
    },
    save() {
      const params = this.form;
      this.$refs['transForm'].validate(valid => {
        if (!valid) return false;
        this.saveBusinessOrderDraft(params).then(res => {
          this.reset();
        });
      });
    },
    ...mapActions([
      'getBusinessDetail', 'getCooperationGroupList', 'getOfficeAddress'
    ])
  }
};
</script>

<style lang="scss">
@import "scss/variables.scss";
.order-container {
  padding: 16px;
  background: #fff;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
}
.business-detail {
  margin-top: $blockWidth;
}
.business-detail {
  margin-top: 16px;
  background: #ffffff;
  padding: 32px 36px 8px 32px;
  & .business-detail-content {
    height: 42px;
    background: #fafafa;
    padding-top: 26px;
    padding-left: 19px;
    & .business-detail-content-item {
      width: 349px;
      float: left;
      & .left {
        height: 22px;
        line-height: 22px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
        padding-right: 12px;
      }
      & .right {
        height: 20px;
        line-height: 20px;
        color: rgba(0, 0, 0, 0.85);
        font-size: 14px;
        text-align: left;
      }
    }
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
    width:318px;
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
.el-input-group__append {
    background-color: #fff;
    padding: 0 5px;
}
.create-business-box-card {
  position:absolute;z-index:2;line-height:20px;
  .el-card__body {
    padding: 10px;
    color: rgba(0,0,0,0.45);
  }
}
</style>
