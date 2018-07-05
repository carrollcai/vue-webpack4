<template>
  <div>
    <div class="m-container">
      <div class="breadcrumb">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/order/create-manage' }">订单创建管理</el-breadcrumb-item>
          <el-breadcrumb-item>新建订单</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="m-container order-create">
      <el-form :label-position="'right'" label-width="140px" :model="orderCreate" ref="orderCreateForm" :rules="orderCreateRules">
        <el-form-item label="订单名称：" prop="ordName">
          <el-input class="form-input-medium" v-model="orderCreate.ordName" placeholder="订单名称" />
        </el-form-item>
        <el-form-item label="预定合同金额：" prop="predictContactAmount">
          <el-input class="form-input-medium" v-model="orderCreate.predictContactAmount" placeholder="合同金额">
            <template slot="append">万元/月</template>
          </el-input>
        </el-form-item>
        <el-form-item label="预定签约时间：" prop="predictSignDate">
          <el-date-picker class="form-input-medium" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" v-model="orderCreate.predictSignDate" placeholder="请选择时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="预计协议期：" prop="predictAgreement">
          <el-select class="form-input-medium" v-model="orderCreate.predictAgreement" placeholder="合同金额">
            <el-option v-for="item in agreementTimeStatic" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="项目是否招标：" prop="isProjectInvitation" required>
          <el-radio v-model="orderCreate.isProjectInvitation" :label="item.value" v-for="(item, i) in projectInvitationStatic" :key="i">{{item.label}}</el-radio>
        </el-form-item>

        <el-form-item label="联系人员：" required>
          <el-form-item prop="contactName" style="display: inline-block;">
            <el-input maxlength="6" class="form-input-80" v-model="orderCreate.contactName" placeholder="姓名"></el-input>
          </el-form-item>
          <div class="form-input-sep">-</div>
          <el-form-item prop="contactGender" style="display: inline-block;">
            <el-select class="form-input-80" v-model="orderCreate.contactGender" placeholder="性别">
              <el-option v-for="item in genderStatic" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <div class="form-input-sep">-</div>
          <el-form-item prop="contactMobile" style="display: inline-block;">
            <el-input maxlength="11" class="form-input-120" v-model="orderCreate.contactMobile" placeholder="手机号"></el-input>
          </el-form-item>
        </el-form-item>

        <el-form-item label="联系邮箱：" prop="contactEmail">
          <el-input class="form-input-large" v-model="orderCreate.contactEmail" placeholder="邮箱" />
        </el-form-item>

        <el-form-item label="合作集团：" required>
          <el-form-item prop="organizeName" style="display:inline-block;">
            <el-autocomplete maxlength="25" class="form-input-half" v-model="orderCreate.organizeName" :fetch-suggestions="querySearchAsync" placeholder="合作集团/编码" @select="handleSelect"></el-autocomplete>
          </el-form-item>
          <div class="form-input-sep">-</div>
          <el-form-item prop="address" style="display:inline-block;">
            <el-input maxlength="50" class="form-input-half" v-model="orderCreate.address" placeholder="办公地址"></el-input>
          </el-form-item>
        </el-form-item>

        <el-form-item label="订单描述：" prop="busiDesc">
          <el-input type="textarea" class="form-input-large" v-model="orderCreate.busiDesc" placeholder="订单描述" />
        </el-form-item>
        <el-form-item label="订单需求：" prop="assignReason">
          <el-input type="textarea" class="form-input-large" v-model="orderCreate.assignReason" placeholder="订单需求" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm()">提交</el-button>
          <el-button @click="submitForm()">保存为草稿</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { checkPhone, emailCheck } from '@/utils/rules.js';

export default {
  data() {
    return {
      orderCreateRules: {
        ordName: [
          { required: true, message: '请输入订单名称', trigger: 'blur' }
        ],
        predictContactAmount: [
          { required: true, message: '请输入预定合同金额', trigger: 'blur' }
        ],
        predictSignDate: [
          { required: true, message: '请输入预定签约时间', trigger: 'blur' }
        ],
        predictAgreement: [
          { required: true, message: '请输入预计协议期', trigger: 'change' }
        ],
        contactName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        contactGender: [
          { required: true, message: '请输入性别', trigger: 'change' }
        ],
        contactMobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ],
        contactEmail: [
          { required: true, message: '请输入联系邮箱', trigger: 'blur' },
          { validator: emailCheck, trigger: 'blur' }
        ],
        organizeName: [
          { required: true, message: '请输入合作集团/编码', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'change' }
        ],
        busiDesc: [
          { required: true, message: '请输入订单描述', trigger: 'blur' }
        ],
        assignReason: [
          { required: true, message: '请输入订单需求', trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
    ...mapState({
      orderCreate: ({ order }) => order.orderCreate,
      genderStatic: ({ root }) => root.staticData.SEX,
      agreementTimeStatic: ({ root }) => root.staticData.PREDICT_AGREEMENT_TIME,
      projectInvitationStatic: ({ root }) => root.staticData.PROJECT_INVITATION
    })
  },
  beforeMount() {
    let { type, id } = this.$route.params;
    if (type !== 'create') {
      this.getOrderEdit({ id });
    }
  },
  methods: {
    querySearchAsync() {
      this.queryOrganizeAddress();
    },
    handleSelect() {

    },
    submitForm() {
      const params = this.orderCreate;
      this.$refs.orderCreateForm.validate(valid => {
        if (!valid) return false;

        this.createOrder(params);
      });
    },
    ...mapActions([
      'getOrderEdit',
      'createOrder',
      'queryOrganizeAddress'
    ])
  }
};
</script>

<style lang="scss">
@import "scss/variables.scss";

.order-create {
  margin-top: $blockWidth;
  display: flex;
  justify-content: center;
}
</style>
