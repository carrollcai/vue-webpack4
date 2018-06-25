<template>
  <div class="customer-detail">
    <div class="customer-detail_info">
      <div class="block-title base-info_title">
        基本信息
        <span class="base-info_title-sub">更多信息</span>
      </div>
      <div class="block-info">
        <el-row>
          <el-col :span="8">
            <span class="info_label">集团名称：</span>
            <span class="info_content">1111</span>
          </el-col>
          <el-col :span="8">
            <span class="info_label">集团属性：</span>
            <span class="info_content">18756996633</span>
          </el-col>
          <el-col :span="8">
            <span class="info_label">所属省份：</span>
            <span class="info_content"></span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <span class="info_label">成立时间：</span>
            <span class="info_content"></span>
          </el-col>
          <el-col :span="8">
            <span class="info_label">机关类型：</span>
            <span class="info_content"></span>
          </el-col>
          <el-col :span="8">
            <span class="info_label">行业类别：</span>
            <span class="info_content"></span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <span class="info_label">集团规模：</span>
            <span class="info_content"></span>
          </el-col>
          <el-col :span="8">
            <span class="info_label">经营范围：</span>
            <span class="info_content"></span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <span class="info_label">办公地址：</span>
            <span class="info_content"></span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <span class="info_label">优势能力：</span>
            <div class="info_content">公司是多家行业内世界知名企业的产品经销商，公司自行生产了较先进的电子工具系列产品，并与国内一些生产厂商建立了稳固的合作关系。 丰富的产品线不仅有利于公司提供解决方案，而且为公司积累行业经验提供了极佳的条件。</div>
          </el-col>
        </el-row>
      </div>
      <div class="block-title">
        联系人
      </div>
      <div>

        <el-table
          border
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
            label="上级领导">
          </el-table-column>
          <el-table-column type="expand" label="操作" width="100px" :formatter="formatter">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="姓名">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <el-form-item label="部门">
                  <span>{{ props.row.department }}</span>
                </el-form-item>
                <el-form-item label="年龄">
                  <span>{{ props.row.age }}</span>
                </el-form-item>
                <el-form-item label="职位">
                  <span>{{ props.row.position }}</span>
                </el-form-item>
                <el-form-item label="性别">
                  <span>{{ props.row.gender }}</span>
                </el-form-item>
                <el-form-item label="手机号">
                  <span>{{ props.row.mobile }}</span>
                </el-form-item>
                <el-form-item label="婚姻状况">
                  <span>{{ props.row.maritalStatus }}</span>
                </el-form-item>
                <el-form-item label="邮箱">
                  <span>{{ props.row.email }}</span>
                </el-form-item>
                <el-form-item label="管理范畴" class="full-desc">
                  <span>{{ props.row.manageScope }}</span>
                </el-form-item>
                <el-form-item label="工作职责" class="full-desc">
                  <span>{{ props.row.responsibility }}</span>
                </el-form-item>
                <el-form-item label="兴趣爱好" class="full-desc">
                  <span>{{ props.row.interests }}</span>
                </el-form-item>
                <el-form-item label="家庭成员" class="full-desc">
                  <span>{{ props.row.interests }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="block-title">
        客户经理
      </div>
      <div class="block-info">
        <el-row>
          <el-col :span="8">
            <span class="info_label">客户经理：</span>
            <span class="info_content">1111</span>
          </el-col>
          <el-col :span="8">
            <span class="info_label">手机号码：</span>
            <span class="info_content">18756996633</span>
          </el-col>
          <el-col :span="8">
            <span class="info_label">员工编号：</span>
            <span class="info_content"></span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <span class="info_label">所在部门：</span>
            <span class="info_content"></span>
          </el-col>
          <el-col :span="8">
            <span class="info_label">所在职位：</span>
            <span class="info_content"></span>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="customer-detail_audit">
      <el-form class="customer-manager-info" :model="auditInfo" ref="managerForm" :rules="auditRules" label-width="120px" key="managerForm">
        <el-form-item label="审核结果" prop="status" required key="status">
          <el-radio-group v-model="auditInfo.status" key="status-radio">
            <el-radio label="Y">通过</el-radio>
            <el-radio label="N">不通过</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="审核建议" prop="desc" required key="desc">
          <el-input v-model="customer.desc" placeholder="如审核不通过，请填写原因供创建者查看" key="desc-input"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveCustomer">确认审核</el-button>
          <el-button @click="back">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CustomerDetail',
  data() {
    return {
      customer: {
      },
      auditInfo: {
        status: 'Y'
      },
      auditRules: {

      }
    };
  },
  computed: {
    contacts() {
      return this.customer.contactDtoList || [{
        name: '111'
      }];
    }
  },
  mounted() {
    this.$nextTick(() => {
      document.querySelector('.el-table__expand-icon ').innerHTML = '详情<i class="el-icon el-icon-arrow-right"></i>';
    });
  },
  methods: {
    saveCustomer() {
    },
    back() {

    },
    formatter() {
      return '111';
    }
  }
};
</script>
<style lang="scss">
.customer-detail{
  .customer-detail_audit,
  .customer-detail_info{
    background: #FFFFFF;
  }

  .customer-detail_info{
    padding: 32px;
  }
  .customer-detail_audit{
    margin-top: 16px;
  }

  .base-info_title{
    display: flex;
    justify-content: space-between;
  }

  .base-info_title-sub{
    color: rgba(55, 120, 255, 1);
    font-size: 14px;
    cursor: pointer;
  }

  .block-title{
    margin: 32px  0 16px 0 ;
    height: 24px;
    line-height: 24px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 16px;
  }

  .block-info{
    .el-row{
      height: 20px;
      line-height: 20px;
      margin-bottom: 16px;
      &:last-child{
        margin-bottom: 0;
      }
    }

    .el-col{
      display: flex;
    }

    .info_label{
      width: 70px;
      height: 20px;
      line-height: 20px;
      color: rgba(0, 0, 0, 0.45);
      font-size: 14px;
    }

    .info_content{
      flex: 1;
      height: 20px;
      line-height: 20px;
      color: rgba(0, 0, 0, 0.85);
      font-size: 14px;
    }
  }
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  .demo-table-expand {
    font-size: 0;

  .full-desc{
    width: 100%;
  }
}
</style>
