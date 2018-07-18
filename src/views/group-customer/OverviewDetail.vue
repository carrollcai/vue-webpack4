<template>
  <div class="customer-overview_detail">
    <div class="m-container">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/group-customer/overview' }">集团客户总览</el-breadcrumb-item>
        <el-breadcrumb-item>查看主页</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="m-container info-block base-info">
      <div class="base-info_image">
        <div class="customer-log"></div>
      </div>
      <div class="base-info_main">
        <div class="info_head">
          <span>
            <span class="info_head-title">{{customer.organizeName}}</span>
            <span class="info_head-title_sub">（{{customer.industryTypeValue}}）</span>
          </span>
          <span class="info_head-sub show-more" @click="showMore">更多信息</span>
        </div>
        <div class="base-info_content">
          <el-row>
            <el-col :span="18" class="base-info_advantage">
              {{customer.orgAdvantage}}
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <span class="info_label">集团编码：</span>
              <span class="info_content">{{customer.organizeCode}}</span>
            </el-col>
            <el-col :span="8">
              <span class="info_label">集团属性：</span>
              <span class="info_content">{{customer.organizeTypeValue}}</span>
            </el-col>
            <el-col :span="8">
              <span class="info_label">集团规模：</span>
              <span class="info_content">{{customer.memberNumValue}}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <span class="info_label">成立时间：</span>
              <span class="info_content">{{formateDate(customer.establishTime)}}</span>
            </el-col>
            <el-col :span="16">
              <span class="info_label">公司地址：</span>
              <span class="info_content">{{customer.organizeTypeValue}}</span>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div class="m-container info-block">
      <div class="info_head">
        <span class="info_head-title">订购产品</span>
      </div>
      <wm-table
        :source="customerSubscribeProducts.list"
        :total="0"
        :pageNo="params.pageNo"
        :pageSize="params.pageSize"
        @onPagination="onPagination"
        @onSizePagination="onSizePagination">
        <el-table-column label="产品名称" property="organizeId" />
        <el-table-column label="订单编号" property="organizeName">
        </el-table-column>
        <el-table-column label="签约时间" property="organizeTypeName">
        </el-table-column>
      </wm-table>
    </div>
    <div class="m-container info-block">
      <div class="info_head">
        <span class="info_head-title">集团联系人</span>
        <div class="info_head-sub">
          <el-radio-group v-model="activeName" size="mini" @change="handleRadioChange">
            <el-radio-button  label="2">
              <i class="icon-tree"></i>
            </el-radio-button>
            <el-radio-button label="1">
              <i class="icon-date1"></i>
            </el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <template v-if="activeName === '1'">
        <wm-table
          :source="contacts">
          <el-table-column label="姓名" property="name" />
          <el-table-column label="手机号" property="mobile">
          </el-table-column>
          <el-table-column label="性别" property="genderValue">
          </el-table-column>
          <el-table-column label="部门" property="department" />
          <el-table-column label="职位" property="position">
          </el-table-column>
          <el-table-column label="上级领导">
            <template slot-scope="props">
              {{parentContact(props.row.parentContactId)}}
            </template>
          </el-table-column>
          <el-table-column type="expand" label="操作" width="100px">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="姓名">
                    <span>{{ props.row.name }}</span>
                  </el-form-item>
                  <el-form-item label="部门">
                    <span>{{ props.row.department }}</span>
                  </el-form-item>
                  <el-form-item label="年龄">
                    <span>{{ props.row.ageValue }}</span>
                  </el-form-item>
                  <el-form-item label="职位">
                    <span>{{ props.row.position }}</span>
                  </el-form-item>
                  <el-form-item label="性别">
                    <span>{{ props.row.genderValue}}</span>
                  </el-form-item>
                  <el-form-item label="手机号">
                    <span>{{ props.row.mobile }}</span>
                  </el-form-item>
                  <el-form-item label="婚姻状况">
                    <span>{{ maritalFilter(props.row.maritalStatusValue)}}</span>
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
                    <span>{{ familyContact(props.row.contactFamilyDtoList)  }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
        </wm-table>
      </template>
      <template v-else>
        <org-tree :contacts="contacts"></org-tree>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import WmTable from 'components/Table.vue';
import OrgTree from 'components/OrgTree.vue';
import filters from './filters';
import {PAGE_NO, PAGE_SIZE} from '@/config';
import find from 'lodash/find';
export default {
  components: {
    WmTable,
    OrgTree
  },
  mixins: [filters],
  data() {
    return {
      activeName: '2',
      params: {
        pageNo: PAGE_NO,
        pageSize: PAGE_SIZE,
        organizeType: '',
        provinceId: '',
        managerName: '',
        otherField: ''
      }
    };
  },
  computed: {
    ...mapState({
      groupCustomerList: ({ groupCustomer }) => groupCustomer.groupCustomerList,
      customerSubscribeProducts: ({ groupCustomer }) => groupCustomer.customerSubscribeProducts
    }),
    customer() {
      return this.$store.getters.groupCustomer;
    },
    contacts() {
      return this.customer.contactDtoList || [];
    }
  },
  beforeMount() {
    this.init();
  },
  methods: {
    showMore() {
      this.$router.push(`/group-customer/overview/detail/${this.customer.organizeId}/more`);
    },
    onPagination(value) {
      this.params.pageNo = value;
      this.query();
    },
    onSizePagination(value) {
      this.params.pageSize = value;
      this.query();
    },
    handleDetail(row) {
      this.$router.push(`/group-customer/detail/${row.organizeId}`);
    },
    parentContact(parentId) {
      let result = '-';
      if (parentId) {
        let contact = find(this.contacts, {contactId: parentId});
        result = contact ? contact.name : result;
      }

      return result;
    },
    familyContact(contacts) {
      let result = '';
      if (contacts && contacts.length) {
        for (let contact of contacts) {
          result += `${contact.name}，${contact.relationship}，${contact.jobDuty}，${contact.mobile}；`;
        }
      }

      return result;
    },
    getParams() {
      const {params} = this;
      let STATUS = {
        'first': [],
        'second': ['1'],
        'third': ['2', '5'],
        'fourth': ['4'],
        'fifth': ['3', '6']
      };

      params.taskStatusList = STATUS[this.activeName];
      return params;
    },
    query() {
      this.getGroupCustomerList(this.getParams());
    },
    init() {
      this.queryCustomer(this.$route.params.id);
    },
    setDom() {
      let list = document.querySelectorAll('.el-table__expand-icon');
      for (let dom of list) {
        dom.innerHTML = '详情<i class="el-icon el-icon-arrow-right"></i>';
      }
    },
    handleRadioChange(val) {
      if (val === '1') {
        this.$nextTick(() => {
          this.setDom();
        });
      }
    },
    ...mapActions([
      'getGroupCustomerList',
      'queryCustomer'
    ])
  }
};
</script>

<style lang="scss">
@import "scss/variables.scss";
.group-form-item__lable {
  margin-left: $blockWidth;
}
.group-form {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.group-form-item__input {
  width: $inputWidthQuery;
}

.role-form-item {
  margin-left: $formWidth;
}

.customer-overview_detail {
  .info-block{
     margin-top: $blockWidth;
  }

  .base-info{
    display: flex;
  }

  .base-info_image{
    width: 100px;
  }

  .customer-log{
    margin: 16px 24px 0 0;
    float: right;
    height: 51px;
    width: 51px;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: contain;
    background-image: url('~@/assets/images/customer-logo.svg');
  }

  .base-info_main{
    flex: 1;
  }

  .base-info_content{
    .el-row{
      margin-top: 16px;
    }
  }

  .info_label{
    width: 60px;
    height: 17px;
    line-height: 17px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 12px;
  }

  .info_content{
    height: 17px;
    line-height: 17px;
    color: rgba(0, 0, 0, 0.65);
    font-size: 12px;
  }

  .base-info_advantage{
    min-height: 34px;
    line-height: 17px;
    color: rgba(0, 0, 0, 0.65);
    font-size: 12px;
  }

  .info_head{
    display: flex;
     justify-content: space-between;
     margin: 8px 0 24px 0;
  }
  .info_head-title{
      color: rgba(0, 0, 0, 0.85);
      font-size: 16px;
  }

  .info_head-title_sub{
    color: rgba(0, 0, 0, 0.45);
    font-size: 12px;
  }

  .show-more{
    color: rgba(55, 120, 255, 1);
    font-size: 12px;
    cursor: pointer;
  }

  .info_head-sub{

  }

  .demo-table-expand label {
      width: 90px;
      color: rgba(0, 0, 0, 0.45);
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

    .el-table__expand-column{
      .el-icon{
        margin-left: 16px;
        transform: rotate(90deg);
        transition: transform .2s ease-in-out;
      }

      .el-table__expand-icon--expanded {
        transform: rotate(0);

        .el-icon{
          transform: rotate(-90deg);
          transition: transform .2s ease-in-out;
        }
      }
    }
}
</style>
