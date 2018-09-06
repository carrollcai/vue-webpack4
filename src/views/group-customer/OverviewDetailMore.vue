<template>
  <div class="customer-overview_detail-more">
    <div class="m-container">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/group-customer/overview' }">集团客户总览</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/group-customer/overview/detail/${customer.organizeId}` }">{{customer.organizeName}}</el-breadcrumb-item>
        <el-breadcrumb-item>查看主页</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="m-container info-block">
        <div class="info_head">
          基本信息
        </div>
        <div class="base-info_content">
          <el-row>
            <el-col :span="8">
              <span class="info_label">集团名称：</span>
              <span class="info_content">{{customer.organizeName}}</span>
            </el-col>
            <el-col :span="8">
              <span class="info_label">集团属性：</span>
              <span class="info_content">{{customer.organizeTypeValue}}</span>
            </el-col>
            <el-col :span="8">
              <span class="info_label">所属省份：</span>
              <span class="info_content">{{customer.provinceName}}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8" v-if="customer.establishTime &&  customer.establishTime.length">
              <span class="info_label">成立时间：</span>
              <span class="info_content">{{formateDate(customer.establishTime)}}</span>
            </el-col>
            <el-col :span="8">
              <span class="info_label">机构类型：</span>
              <span class="info_content">{{customer.orgIndustryTypeValue}}</span>
            </el-col>
            <el-col :span="8">
              <span class="info_label">行业类别：</span>
              <span class="info_content">{{customer.industryTypeValue}}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <span class="info_label">集团规模：</span>
              <span class="info_content">{{customer.memberNumValue}}</span>
            </el-col>
            <el-col :span="8">
              <span class="info_label">公司标签：</span>
              <div class="info_content">{{customer.label}}</div>
            </el-col>
          </el-row>
          <el-row>
            <!--<el-col :span="8">
              <span class="info_label">公司标签：</span>
              <div class="info_content">{{customer.label}}</div>
            </el-col>-->
            <el-col :span="24">
              <span class="info_label">办公地址：</span>
              <div class="info_content">{{customer.orgAddress}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <span class="info_label">经营范围：</span>
              <div class="info_content">{{customer.businessScope}}</div>
            </el-col>
          </el-row>
          <!--<el-row>
            <el-col :span="24">
              <span class="info_label">办公地址：</span>
              <div class="info_content">{{customer.orgAddress}}</div>
            </el-col>
          </el-row>-->
          <el-row>
            <el-col :span="24">
              <span class="info_label">优势能力：</span>
              <div class="info_content">{{customer.orgAdvantage}}</div>
            </el-col>
          </el-row>
          <div class="line"></div>
          <el-row>
            <el-col :span="8">
              <span class="info_label">工商注册号：</span>
              <span class="info_content">{{customer.registerNum}}</span>
            </el-col>
            <el-col :span="8">
              <span class="info_label">证件类型：</span>
              <span class="info_content">{{customer.certificateTypeValue}}</span>
            </el-col>
            <el-col :span="8">
              <span class="info_label">统一社会信用代码：</span>
              <span class="info_content">{{customer.socialCreditCode}}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <span class="info_label">注册资金类型：</span>
              <span class="info_content">{{customer.registerFundTypeValue}}</span>
            </el-col>
            <el-col :span="8">
              <span class="info_label">注册资金：</span>
              <span class="info_content">{{customer.registerFund}}万元</span>
            </el-col>
            <el-col :span="8">
              <span class="info_label">经营期限：</span>
              <span class="info_content">{{customer.businessTerm}}年</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <span class="info_label">登记机关：</span>
              <span class="info_content">{{customer.registrateOrg}}</span>
            </el-col>
            <el-col :span="8">
              <span class="info_label">发证日期：</span>
              <span class="info_content">{{formateDate(customer.openTime)}}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <span class="info_label">证件地址：</span>
              <span class="info_content">{{customer.certificateAddress}}</span>
            </el-col>
          </el-row>
      </div>
    </div>
    <div class="m-container info-block">
      <div class="info_head">
        客户经理
      </div>
      <div class="base-info_content">
        <el-row>
          <el-col :span="8">
            <span class="info_label">客户经理：</span>
            <span class="info_content">{{customer.managerName}}</span>
          </el-col>
          <el-col :span="8">
            <span class="info_label">手机号码：</span>
            <span class="info_content">{{customer.managerMobile}}</span>
          </el-col>
          <el-col :span="8">
            <span class="info_label">员工编号：</span>
            <span class="info_content">{{customer.managerNo}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <span class="info_label">所在部门：</span>
            <span class="info_content">{{customer.managerDepartment}}</span>
          </el-col>
          <el-col :span="8">
            <span class="info_label">所在职位：</span>
            <span class="info_content">{{customer.managerPosition}}</span>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import filters from './filters';
export default {
  mixins: [filters],
  data() {
    return {
    };
  },
  computed: {
    customer() {
      return this.$store.getters.groupCustomer;
    }
  },
  beforeMount() {
    this.init();
  },
  methods: {
    init() {
      this.queryCustomer(this.$route.params.id);
    },
    ...mapActions([
      'queryCustomer'
    ])
  }
};
</script>

<style lang="scss">
@import "scss/variables.scss";
.customer-overview_detail-more {
  * {
    box-sizing: border-box;
  }

  .info-block{
     margin-top: $blockWidth;
  }

  .base-info{
    display: flex;
  }

  .base-info_content{
    .el-row{
      margin-top: 16px;
    }
  }

  .line{
    height: 1px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    margin: 24px 0;
  }

  .info_label{
    min-width: 90px;
    max-width: 130px;
    height: 20px;
    line-height: 20px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;

  }

  .info_content{
    flex: 1;
    min-height: 20px;
    line-height: 20px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    word-break: break-all;
  }

  .info_head{
    border-bottom: 1px solid #E6E6E6;
    padding: 0 0 16px 16px;

    color: rgba(0, 0, 0, 0.85);
    font-size: 16px;
  }

  .el-col{
    display: flex;
  }
}
</style>
