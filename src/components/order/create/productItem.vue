<template>
  <div class="tTable">
    <div class="tHead">
      <div class="title">订购产品</div>
      <div class="title">订购数量</div>
      <div class="title">处理人</div>
      <div class="title">操作</div>
    </div>
    <div class="tBody">
      <div class="td"
        v-for="(item, i) in orderCreate.orderProductDtoList"
        :key="i">
        <el-form class="td"
          :model="item"
          ref="itemForm"
          :rules="itemRules">
          <el-form-item prop="productName"
            class="form-input-half">
            <el-autocomplete v-model="item.productName"
              :fetch-suggestions="queryProductAsync"
              placeholder="订购产品"
              @select="val => handleProductSelect(val, i)"
              :trigger-on-focus="false" />
          </el-form-item>

          <el-form-item prop="amount"
            class="form-input-half">
            <el-input v-model="item.amount"
              maxlength="9"
              placeholder="数量" />
          </el-form-item>

          <el-form-item prop="processorData"
            class="form-input-half">
            <el-select placeholder="指派人"
              v-model="item.processorData"
              :disabled="!item.productHandlers.length"
              @change="item => handleProcessorSelect(i)"
              multiple
              collapse-tags>
              <el-option v-for="cItem in item.productHandlers"
                :key="cItem.value"
                :label="cItem.value"
                :value="cItem.value" />
            </el-select>
          </el-form-item>
          <el-form-item class="del">
            <span @click="delFn(i)"
              v-if="orderCreate.orderProductDtoList.length > 1">删除</span>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="add blue">
      <span @click="addList">
        <i class="el-icon-plus"></i>增加一条</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import { PAGE_SIZE } from '@/config/index.js';
import { checkMultRules } from '@/utils/common.js';

export default {
  data() {
    return {
      pageSize: PAGE_SIZE,
      itemRules: {
        productName: [
          { required: true, message: '请输入产品名称', trigger: 'blur' },
        ],
        amount: [
          { required: true, message: '请输入数量', trigger: 'blur' },
        ],
        processorData: [
          { required: true, message: '请输入指派人', trigger: 'change' },
        ]
      }
    };
  },
  computed: {
    ...mapState({
      orderCreate: ({ order }) => order.orderCreate,
      productList: ({ order }) => order.productList,
    })
  },
  methods: {
    addList() {
      this.addOrderProduct();
      // let proList = this.orderCreate.orderProductDtoList;
      // let l = proList.length - 1;
      // if (proList[l].productName === '' || proList[l].processor === '' || proList[l].amount === '') {
      //   this.$message({ showClose: true, message: '请先填写完整在新增!', type: 'info' });
      //   return false;
      // }
      // proList.push({
      //   productName: this.orderCreate.productName,
      //   amount: this.orderCreate.amount,
      //   processor: this.orderCreate.processor,
      //   productId: this.orderCreate.productId
      // });
    },
    handleProcessorSelect(i) {
      this.handleOrderProcess({
        index: i
      });
    },
    delFn(index) {
      this.deleteOrderProduct({ index });
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
      // 更新订购产品
      this.getProductHandler({
        opRegion: item.region,
        roleList: item.roleList,
        index: index
      });
    },
    validate() {
      let checkMult = checkMultRules(this.$refs['itemForm']);
      return checkMult;
    },
    ...mapMutations({
      deleteOrderProduct: 'ORDER_DELETE_PRODUCT',
      handleOrderProcess: 'ORDER_HANDLE_PROCESS',
      updateOrderCreate: 'ORDER_UPDATE_CREATE',
      addOrderProduct: 'ORDER_ADD_PRODUCT',
    }),
    ...mapActions([
      'getProductHandler',
      'queryProductByCodeOrName'
    ])
  }
};
</script>

<style>
</style>
