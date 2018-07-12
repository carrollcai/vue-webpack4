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
    <div class="business-detail" v-if="orderData.opporProcessor">
      <div class="business-detail-content">
        <div class="business-detail-content-item">
          <span class="left">指派人：</span>
          <span class="right">{{orderData.opporProcessor}}</span>
        </div>
        <div class="business-detail-content-item">
          <span class="left">指派原因：</span>
          <span class="right">{{orderData.opporAssignReason}}</span>
        </div>
        <!--<div class="business-detail-content-item">
          <span class="left">合同下载：</span>
          <a class="down" href="#">第三次签约合同.doc</a>
        </div>-->
      </div>
    </div>
    <div class="order-container">
      <el-form :rules="rules" ref="transForm" :model="orderData" label-width="140px">
        <el-form-item label="订单名称：" prop="ordName">
          <el-input maxlength="30" v-model="orderData.ordName" class="form-input-medium" placeholder="请输入订单名称">
          </el-input>
        </el-form-item>
        <el-form-item label="订购产品：" prop="productName">
          <el-autocomplete maxlength="25" class="form-input-medium" v-model="orderData.productName" :fetch-suggestions="productQuerySearch" placeholder="请输入产品名称/编码" @select="selectProduct"></el-autocomplete>
        </el-form-item>
        <el-form-item label="预计合同金额：" prop="predictContractAmount">
          <el-input v-model="orderData.predictContractAmount" class="form-input-medium" placeholder="请输入合同金额">
          </el-input>
        </el-form-item>
        <el-form-item label="预计签约时间：" prop="predictSignTime">
          <el-date-picker class="form-input-medium" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" v-model="orderData.predictSignTime" placeholder="请选择时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="预计协议期：" prop="predictAgreementTime">
          <el-select class="form-input-medium" v-model="orderData.predictAgreementTime" placeholder="请选择">
              <el-option
              v-for="item in PREDICT_AGREEMENT_TIME"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系人员：" prop="contactName">
          <el-input maxlength="6" class="form-input-80" v-model="orderData.contactName" placeholder="姓名"></el-input>
          <span class="form-input-sep">-</span>
          <el-form-item prop="contactGender" style="display: inline-block;">
            <el-select class="form-input-80" v-model="orderData.contactGender" placeholder="性别">
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
            <el-input maxlength="11" class="form-input-120" v-model="orderData.contactMobile" placeholder="手机号"></el-input>
          </el-form-item>
        </el-form-item>
        <el-form-item prop="contactEmail" label="联系邮箱：">
          <el-input maxlength="35" class="form-input-320" v-model="orderData.contactEmail" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="合作集团：" prop="organizeName">
          <el-autocomplete maxlength="25" class="form-input-half" v-model="orderData.organizeName" :fetch-suggestions="querySearchAsync" placeholder="合作集团/编码" @select="handleSelect" @blur="noData = false;"></el-autocomplete>
          <el-card class="create-business-box-card" v-if="noData">
            <div>
              系统暂未录入该集团，你可以暂时手动输入，建议后续尽快录入并同步关联修改！
            </div>
          </el-card>
          <span class="form-input-sep">-</span>
          <el-form-item prop="address" style="display:inline-block;">
            <el-input maxlength="50" class="form-input-half" v-model="orderData.address" placeholder="办公地址"></el-input>
          </el-form-item>
        </el-form-item>
        <el-form-item label="订单描述：" prop="busiDesc">
          <el-input maxlength="500" class="form-input-320" type="textarea" :rows="3" placeholder="请输入订单描述" v-model="orderData.busiDesc"></el-input>
        </el-form-item>
        <el-form-item label="订单需求：" prop="busiRequire">
          <el-input class="form-input-320" type="textarea" :rows="3" placeholder="请输入订单需求" v-model="orderData.busiRequire"></el-input>
        </el-form-item>
        <!--<el-form-item label="需要协调的问题：">
          <el-input maxlength="500" class="form-input-320" type="textarea" :rows="3" placeholder="请输入需要协调的问题" v-model="orderData.needCoordinationIssue"></el-input>
        </el-form-item>-->
        <el-form-item label="项目是否招标：" prop="isProjectInvitation">
          <el-radio v-model="orderData.isProjectInvitation" label="1">是</el-radio>
          <el-radio v-model="orderData.isProjectInvitation" label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="submit">提交</el-button>
          <el-button @click="cancel" plain>取消</el-button>
        </el-form-item>
      </el-form>
      </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { checkPhone, emailCheck, inte5Deci4 } from '@/utils/rules.js';
import filters from '@/views/business-manage/filters';
export default {
  mixins: [filters],
  components: {
  },
  data() {
    return {
      rules: {
        ordName: [
          { required: true, message: '请输入订单名称', trigger: ['blur', 'change'] }
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
          { required: true, message: '请输入订单描述', trigger: ['blur', 'change'] }
        ],
        busiRequire: [
          { required: true, message: '请输入订单需求', trigger: ['blur', 'change'] }
        ],
        income: [
          { required: true, message: '请输入预计收入', trigger: ['blur', 'change'] },
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
        ],
        productName: [
          { required: true, message: '请输入产品名称/编码', trigger: ['blur', 'change'] }
        ],
        predictContractAmount: [
          { required: true, message: '请输入预计合同金额', trigger: ['blur', 'change'] },
          { pattern: /^\d{1,5}(?:\.\d{1,4})?$/, message: '整数部分最多5位，小数部分最多4位' }
        ]
      },
      noData: false
    };
  },
  beforeMount() {
    const opprparam = {};
    opprparam.opporId = this.$route.params.opporId;
    // const { opporId } = this.$route.params;
    console.log(this.$route.params);
    this.getBusinessDetail(opprparam);
    this.getTransforOrderDetail(opprparam);
    // this.getCooperationGroupList();
  },
  computed: {
    businessData() {
      return this.$store.getters.businessDetail;
    },
    orderData() {
      return this.$store.getters.transforOrderDetail;
    },
    ...mapState({
      cooperationGroupList: ({ business }) => business.cooperationGroupList,
      transforOrderDetail: ({ business }) => business.transforOrderDetail,
      businessDetail: ({business}) => business.businessDetail,
      productNameCode: ({business}) => business.productNameCode
    })
  },
  methods: {
    async querySearchAsync(queryString, cb) {
      if (!queryString) return false;
      let params = {
        pageSize: 20,
        organizeName: queryString
      };
      await this.getCooperationGroupList(params);
      await clearTimeout(this.timeout);
      this.timeout = await setTimeout(() => {
        var cooperationGroupList = this.cooperationGroupList;
        var results = queryString ? cooperationGroupList.filter(this.createStateFilter(queryString)) : cooperationGroupList;
        if (results.length === 0) {
          this.noData = true;
        } else {
          this.noData = false;
        };
        cb(results);
      }, 1000);
    },
    async productQuerySearch(queryString, cb) {
      if (!queryString) return false;
      let params = {
        pageSize: 20,
        productName: queryString
      };
      await this.getProductNameCode(params);
      await clearTimeout(this.timeout);
      this.timeout = await setTimeout(() => {
        var productNameCode = this.productNameCode;
        var results = queryString ? productNameCode.filter(this.createStateFilter(queryString)) : productNameCode;
        cb(results);
      }, 1000);
    },
    selectProduct(item) {
      this.businessData.productId = item.productId;
      // this.getOfficeAddress();
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
      this.businessData.organizeId = item.organizeId;
    },
    submit() {
      // const params = {};
      const params = this.orderData;
      delete params.opporProcessor;
      delete params.opporAssignReason;
      params.taskInsId = this.$route.params.taskInsId;
      this.$refs['transForm'].validate(valid => {
        if (!valid) return false;
        if (params.productId !== '') {
          var _this = this;
          _this.saveBusinessOrder(params).then(res => {
            if (res.data && res.errorInfo.code === '200') {
              _this.$message({ showClose: true, message: '您已成功提交！', type: 'success' });
              _this.cancel();
            } else {
              _this.$message({ showClose: true, message: '提交失败！', type: 'error' });
            }
          });
        } else {
          this.$message({ showClose: true, message: '请选择已有商品！' });
        }
      });
    },
    cancel() {
      const path = `/business-manage/business-task`;
      this.$router.push(path);
    },
    ...mapActions([
      'getTransforOrderDetail', 'getCooperationGroupList', 'getBusinessDetail', 'saveBusinessOrder', 'getProductNameCode'
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
