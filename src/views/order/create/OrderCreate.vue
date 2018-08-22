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
        <el-form-item label="合作集团：" required>
          <el-form-item prop="organizeName" style="display:inline-block;">
            <el-autocomplete :maxLength="25" class="form-input-half" v-model="orderCreate.organizeName" :fetch-suggestions="querySearchAsync" placeholder="合作集团/编码" @select="handleSelect" :trigger-on-focus="false" />
          </el-form-item>
          <div class="form-input-sep">-</div>
          <el-form-item prop="address" style="display:inline-block;">
            <el-input maxlength="50" class="form-input-half" v-model="orderCreate.address" placeholder="办公地址"></el-input>
          </el-form-item>
        </el-form-item>
        <el-form-item label="联系人：" required>
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
          <div class="form-input-sep">-</div>
          <el-form-item prop="contactEmail" style="display: inline-block;">
          <el-input class="form-input-large" v-model="orderCreate.contactEmail" placeholder="邮箱" />
        </el-form-item>
        </el-form-item>
        <el-form-item label="订购产品：" required>
        <div class="tTable">
          <div class="tHead">
            <div style="min-width: 140px;">订购产品</div>
            <div>订购数量</div>
            <div>处理人</div>
            <div>操作</div>
          </div>
          <div class="tBody">
            <productItem></productItem>
          </div>
          <div class="add" @click="addList">
            增加一条
          </div>
        </div>
        </el-form-item>
        <el-form-item label="业务描述：" prop="busiDesc">
          <el-input type="textarea" class="form-input-large" v-model="orderCreate.busiDesc" placeholder="请输入描述" />
        </el-form-item>
        <el-form-item label="合作方案：" prop="teamProject">
          <el-input type="textarea" class="form-input-large" v-model="orderCreate.teamProject" placeholder="请输入合作方案" />
        </el-form-item>
        <el-form-item label="预计收入：" prop="predictRevenue">
          <el-input class="form-input-medium" v-model="orderCreate.predictRevenue" placeholder="金额">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="预定签约时间：" prop="predictSignTime">
          <el-date-picker class="form-input-medium" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" v-model="orderCreate.predictSignTime" placeholder="请选择时间" :editable="false"></el-date-picker>
        </el-form-item>
        <el-form-item label="预计协议期：" prop="predictAgreementTime">
          <el-select class="form-input-medium" v-model="orderCreate.predictAgreementTime" placeholder="请选择时间">
            <el-option v-for="item in agreementTimeStatic" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="项目是否招标：" prop="isProjectInvitation" required>
          <el-radio v-model="orderCreate.isProjectInvitation" :label="item.value" v-for="(item, i) in projectInvitationStatic" :key="i">{{item.label}}</el-radio>
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
import productItem from './productItem.vue';
import { checkPhone, emailCheck, textLimit, textareaLimit, textareaMaxLimit, inte5Deci4, textAccountLimit } from '@/utils/rules.js';

export default {
  components: {
    productItem
  },
  data() {
    const isProductExist = (rule, value, callback) => {
      if (this.selectedProduct.productId &&
        this.selectedProduct.productName === this.orderCreate.productName) {
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
          { validator: textAccountLimit, trigger: 'blur' }
        ],
        predictRevenue: [
          { required: true, message: '请输入预定合同金额', trigger: 'blur' },
          { validator: inte5Deci4, trigger: 'blur' }
        ],
        predictSignTime: [
          { required: true, message: '请输入预定签约时间', trigger: 'blur' }
        ],
        predictAgreementTime: [
          { required: true, message: '请选择预计协议期', trigger: 'change' }
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
          { message: '请输入联系邮箱', trigger: 'blur' },
          { validator: emailCheck, trigger: 'blur' }
        ],
        organizeName: [
          { required: true, message: '请输入合作集团/编码', trigger: 'blur' },
          { validator: textAccountLimit, trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'change' },
          { validator: textareaLimit, trigger: 'blur' }
        ],
        productName: [
          { required: true, message: '请输入产品名称', trigger: 'blur' },
          { validator: textAccountLimit, trigger: 'blur' },
          { validator: isProductExist, trigger: 'blur' }
        ],
        busiDesc: [
          { required: true, message: '请输入业务描述', trigger: 'blur' },
          { validator: textareaMaxLimit, trigger: 'blur' }
        ],
        teamProject: [
          { required: true, message: '请输入合作方案', trigger: 'blur' },
          { validator: textareaMaxLimit, trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
    ...mapState({
      orderCreate: ({ order }) => order.orderCreate,
      genderStatic: ({ root }) => root.staticData.SEX,
      agreementTimeStatic: ({ root }) => root.staticData.PREDICT_AGREEMENT_TIME,
      projectInvitationStatic: ({ root }) => root.staticData.PROJECT_INVITATION,
      orderOrganizeAddressList: ({ order }) => order.orderOrganizeAddressList,
      assignHandlers: ({ order }) => order.assignHandlers
    })
  },
  async beforeMount() {
    const { type, id } = this.$route.params;
    if (type !== 'create') {
      // 修改的话，需要给本地产品缓存重新赋值
      await this.getOrderEdit({ ordId: id });
      this.selectedProduct = {
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
    addList() {
      let proList = this.orderCreate.orderProductDtoList;
      let l = proList.length - 1;
      if (proList[l].productName === '' || proList[l].processor === '' || proList[l].amount === '') {
        this.$message({ showClose: true, message: '请先填写完整在新增!', type: 'info' });
        return false;
      }
      proList.push({
        productName: this.orderCreate.productName,
        amount: this.orderCreate.amount,
        processor: this.orderCreate.processor,
        productId: this.orderCreate.productId
      });
      /* if (this.orderCreate.orderProductDtoList && this.orderCreate.orderProductDtoList.length <= 0) {
        let obj = {
          productName: this.orderCreate.productName,
          amount: this.orderCreate.amount,
          processor: this.orderCreate.processor[2] + '',
          productId : this.orderCreate.productId
        }
        this.orderCreate.orderProductDtoList.push(obj);
      } else {
        let flag = this.orderCreate.orderProductDtoList.filter((item, index, arr) => {
          if (item.productName === this.orderCreate.productName) {
            this.$message({ showClose: true, message: '该产品已添加' });
            return false;
          }
        })
        if (flag) {
          let obj = {
            productName: this.orderCreate.productName,
            amount: this.orderCreate.amount,
            processor: this.orderCreate.processor[0] + '',
            productId : this.orderCreate.productId
          }
          this.orderCreate.orderProductDtoList.push(obj);
        }
      } */
    },
    routeType() {
      const { type } = this.$route.params;
      return type === 'create' ? '新建' : '修改';
    },
    handleSelect(item) {
      this.updateOrderCreate({ address: item.orgAddress });
    },
    async querySearchAsync(queryString, cb) {
      if (!queryString.trim()) return false;
      let params = {
        pageSize: this.pageSize,
        organizeName: queryString
      };

      await this.getOrganizeAddress(params);

      await clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(this.orderOrganizeAddressList);
      }, 1000);
    },
    submitForm(startProcess) {
      const { type, id } = this.$route.params;
      const params = Object.cloneDeep(this.orderCreate);
      delete params.productName;
      delete params.amount;
      delete params.processor;
      delete params.productId;
      params.orderProductDtoList = params.orderProductDtoList.filter(item => {
        delete item.processorData;
        return item;
      });
      params.startProcess = startProcess;
      console.log(params);
      this.$refs.orderCreateForm.validate(valid => {
        if (!valid) return false;

        if (type === 'create') {
          this.createOrder(params);
        } else {
          let { organizeCode, ordStatus, ..._params } = params;
          _params.ordId = id;
          this.updateOrder(_params);
        }
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
@import "./style.scss";
.order-create {
  margin-top: $blockWidth;
  display: flex;
  justify-content: center;
}
</style>
