<template>
  <div>
    <div class="td"
      v-for="(item, i) in orderCreate.orderProductDtoList"
      :key="i">
      <div>
        <el-form-item>
          <el-autocomplete v-model="item.productName"
            :fetch-suggestions="queryProductAsync"
            placeholder="订购产品"
            @select="val => handleProductSelect(val, i)"
            :trigger-on-focus="false" />
        </el-form-item>
      </div>
      <div>
        <el-form-item>
          <el-input v-model="item.amount"
            maxlength="9"
            placeholder="数量" />
        </el-form-item>
      </div>

      <div>
        <el-form-item>
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
      </div>
      <div class="del">
        <span @click="delFn(index)">删除</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import { PAGE_SIZE } from '@/config/index.js';

export default {
  data() {
    return {
      pageSize: PAGE_SIZE,
      getProcessorList: []
    };
  },
  computed: {
    ...mapState({
      orderCreate: ({ order }) => order.orderCreate,
      productList: ({ order }) => order.productList,
    })
  },
  methods: {
    handleProcessorSelect(i) {
      this.handleOrderProcess({
        index: i
      });
    },
    delFn(index) {
      this.deleteOrderProduct();
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
        opRegion: item.operatorInfo.opRegion,
        roleList: item.roleList,
        index: index
      });
    },
    ...mapMutations({
      deleteOrderProduct: 'ORDER_DELETE_PRODUCT',
      handleOrderProcess: 'ORDER_HANDLE_PROCESS',
      updateOrderCreate: 'ORDER_UPDATE_CREATE',
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
