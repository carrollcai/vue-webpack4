<template>
  <div>
    <div class="m-container">
      <div class="breadcrumb">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/order/create-manage' }">订单创建管理</el-breadcrumb-item>
          <el-breadcrumb-item>{{ routeType() }}订单</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="m-container order-create">
      <el-form :label-position="'right'" label-width="140px" :model="orderCreate" ref="orderCreateForm" :rules="orderCreateRules">
        <el-form-item label="订单名称：" prop="ordName">
          <el-input class="form-input-medium" v-model="orderCreate.ordName" placeholder="订单名称" />
        </el-form-item>
        <el-form-item label="预定合同金额：" prop="predictContractAmount">
          <el-input class="form-input-medium" v-model="orderCreate.predictContractAmount" placeholder="合同金额">
            <template slot="append">万元/月</template>
          </el-input>
        </el-form-item>
        <el-form-item label="预定签约时间：" prop="predictSignTime">
          <el-date-picker class="form-input-medium" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" v-model="orderCreate.predictSignTime" placeholder="请选择时间" :editable="false"></el-date-picker>
        </el-form-item>
        <el-form-item label="预计协议期：" prop="predictAgreementTime">
          <el-select class="form-input-medium" v-model="orderCreate.predictAgreementTime" placeholder="合同金额">
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
            <el-autocomplete class="form-input-half" v-model="orderCreate.organizeName" :fetch-suggestions="querySearchAsync" placeholder="合作集团/编码" @select="handleSelect"></el-autocomplete>
          </el-form-item>
          <div class="form-input-sep">-</div>
          <el-form-item prop="address" style="display:inline-block;">
            <el-input maxlength="50" class="form-input-half" v-model="orderCreate.address" placeholder="办公地址"></el-input>
          </el-form-item>
        </el-form-item>
        <el-form-item label="订购产品：" prop="productName" required>
          <el-autocomplete class="form-input-large" v-model="orderCreate.productName" :fetch-suggestions="queryProductAsync" placeholder="订购产品" @select="handleProductSelect" />
        </el-form-item>
        <el-form-item label="订单描述：" prop="busiDesc">
          <el-input type="textarea" class="form-input-large" v-model="orderCreate.busiDesc" placeholder="订单描述" />
        </el-form-item>
        <el-form-item label="订单需求：" prop="busiRequire">
          <el-input type="textarea" class="form-input-large" v-model="orderCreate.busiRequire" placeholder="订单需求" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm(true)">提交</el-button>
          <el-button @click="submitForm(false)">保存为草稿</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import { PAGE_SIZE } from '@/config/index.js';
import { checkPhone, emailCheck, textLimit, textareaLimit, inte5Deci4, checkLeftRightSpace } from '@/utils/rules.js';

export default {
  data() {
    const isProductExist = (rule, value, callback) => {
      if (this.selectedProduct.productId && this.selectedProduct.productName === this.orderCreate.productName) {
        callback();
      } else {
        callback(new Error('产品名称不存在'));
      }
    };
    return {
      pageSize: PAGE_SIZE,
      timeout: null,
      selectedProduct: {
        productName: '',
        productId: null
      },
      orderCreateRules: {
        ordName: [
          { required: true, message: '请输入订单名称', trigger: 'blur' },
          { validator: checkLeftRightSpace, trigger: 'blur' },
          { validator: textLimit, trigger: 'blur' }
        ],
        predictContractAmount: [
          { required: true, message: '请输入预定合同金额', trigger: 'blur' },
          { validator: inte5Deci4, trigger: 'blur' }
        ],
        predictSignTime: [
          { required: true, message: '请输入预定签约时间', trigger: 'blur' }
        ],
        predictAgreementTime: [
          { required: true, message: '请输入预计协议期', trigger: 'change' }
        ],
        contactName: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { validator: textLimit, trigger: 'blur' }
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
          { required: true, message: '请输入合作集团/编码', trigger: 'blur' },
          { validator: textareaLimit, trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'change' },
          { validator: textareaLimit, trigger: 'blur' }
        ],
        productName: [
          { required: true, message: '请输入产品名称', trigger: 'blur' },
          { validator: isProductExist, trigger: 'blur' }
        ],
        busiDesc: [
          { required: true, message: '请输入订单描述', trigger: 'blur' },
          { validator: isProductExist, trigger: 'blur' }
        ],
        busiRequire: [
          { required: true, message: '请输入订单需求', trigger: 'blur' },
          { validator: isProductExist, trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
    ...mapState({
      orderCreate: ({ order }) => order.orderCreate,
      productList: ({ order }) => order.productList,
      genderStatic: ({ root }) => root.staticData.SEX,
      agreementTimeStatic: ({ root }) => root.staticData.PREDICT_AGREEMENT_TIME,
      projectInvitationStatic: ({ root }) => root.staticData.PROJECT_INVITATION,
      orderOrganizeAddressList: ({ order }) => order.orderOrganizeAddressList
    })
  },
  async beforeMount() {
    const { type, id } = this.$route.params;
    if (type !== 'create') {
      // 修改的话，需要给本地产品缓存重新赋值
      await this.getOrderEdit({ ordId: id });
      this.selectedProduct = await {
        productName: this.orderCreate.productName,
        productId: this.orderCreate.productId
      };
    }
  },
  beforeDestroy() {
    // 组件注销的时候，需要清空表单数据
    this.clearOrderCreate();
  },
  methods: {
    routeType() {
      const { type } = this.$route.params;
      return type === 'create' ? '新建' : '修改';
    },
    handleSelect(item) {
      this.updateOrderCreate({ address: item.orgAddress });
    },
    handleProductSelect(item) {
      this.selectedProduct = {
        productName: item.productName,
        productId: item.productId
      };
      this.updateOrderCreate({ productId: item.productId });
    },
    async queryProductAsync(queryString, cb) {
      if (!queryString) return false;
      let params = {
        pageSize: this.pageSize,
        productName: queryString
      };
      await this.queryProductByCodeOrName(params);

      await clearTimeout(this.timeout);
      this.timeout = await setTimeout(() => {
        cb(this.productList);
      }, 1000);
    },
    async querySearchAsync(queryString, cb) {
      if (!queryString) return false;
      let params = {
        pageSize: this.pageSize,
        organizeName: queryString
      };
      await this.getOrganizeAddress(params);

      await clearTimeout(this.timeout);
      this.timeout = await setTimeout(() => {
        cb(this.orderOrganizeAddressList);
      }, 1000);
    },
    submitForm(startProcess) {
      const { type, id } = this.$route.params;
      const params = this.orderCreate;
      params.startProcess = startProcess;
      this.$refs.orderCreateForm.validate(valid => {
        if (!valid) return false;

        if (type === 'create') {
          this.createOrder(params);
          return false;
        }

        params.ordId = id;
        this.updateOrder(params);
      });
    },
    ...mapMutations({
      updateOrderCreate: 'ORDER_UPDATE_CREATE',
      clearOrderCreate: 'ORDER_CREATE'
    }),
    ...mapActions([
      'getOrderEdit',
      'createOrder',
      'updateOrder',
      'getOrganizeAddress',
      'queryProductByCodeOrName'
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
