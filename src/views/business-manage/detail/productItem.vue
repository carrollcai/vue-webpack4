<template>
  <div>
    <div class="td"
      v-for="(item, index) in toOrderCreate.ordProductDtoList"
      :key="index">
      <el-form class="td"
        :model="item"
        ref="itemForm"
        :rules="itemRules">
        <div>
          <el-form-item prop="productName">
            <el-autocomplete v-model="item.productName"
              :fetch-suggestions="queryProductAsync"
              placeholder="订购产品"
              @select="((item)=>{handleProductSelect(item, index)})"
              :trigger-on-focus="false" />
          </el-form-item>
        </div>
        <div>
          <el-form-item prop="amount">
            <el-input v-model="item.amount"
              :maxlength="9"
              placeholder="数量" />
          </el-form-item>
        </div>
        <div>
          <el-form-item prop="processorData">
            <el-cascader v-model="item.processorData"
              v-if="assignHandlers"
              :show-all-levels="false"
              clearable
              @change="((item)=>{processorFn(item, index)})"
              :options="assignHandlers">
            </el-cascader>
          </el-form-item>
        </div>
      </el-form>
      <div class="del">
        <span @click="delFn(index)">删除</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import { PAGE_SIZE } from '@/config/index.js';
import { checkMultRules } from '@/utils/common.js';
import { isPositive } from '@/utils/rules.js';

export default {
  data() {
    return {
      pageSize: PAGE_SIZE,
      itemRules: {
        productName: [
          { required: true, message: '请输入产品名称', trigger: 'blur' },
        ],
        amount: [
          { validator: isPositive, trigger: 'blur' },
        ],
        processorData: [
          { required: true, message: '请输入指派人', trigger: 'change' },
        ]
      }
    };
  },
  async beforeMount() {
    this.getAssignhandler();
  },
  computed: {
    ...mapState({
      toOrderCreate: ({ business }) => business.toOrderCreate,
      productList: ({ order }) => order.productList,
      assignHandlers: ({ order }) => order.assignHandlers
    })
  },
  methods: {
    processorFn(value, index) {
      this.toOrderCreate.ordProductDtoList[index].processor = String(value[2]);
    },
    delFn(index) {
      let proList = this.toOrderCreate.ordProductDtoList;
      if (proList.length > 1) {
        this.toOrderCreate.ordProductDtoList.splice(index, 1);
      }
    },
    async queryProductAsync(queryString, cb) {
      if (!queryString.trim()) return false;
      let params = {
        pageSize: this.pageSize,
        productName: queryString
      };

      await this.queryProductByCodeOrName(params);

      await clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(this.productList);
      }, 1000);
    },
    handleProductSelect(item, index) {
      this.toOrderCreate.ordProductDtoList[index].productId = item.productId;
      this.toOrderCreate.ordProductDtoList[index].companyBelong = item.operatorInfo.opRegion;
      this.updateOrderCreate({ productId: item.productId });
    },
    validate() {
      let checkMult = checkMultRules(this.$refs['itemForm']);
      return checkMult;
    },
    ...mapMutations({
      updateOrderCreate: 'ORDER_UPDATE_CREATE'
    }),
    ...mapActions([
      'getAssignhandler',
      'queryProductByCodeOrName'
    ])
  }
};
</script>
