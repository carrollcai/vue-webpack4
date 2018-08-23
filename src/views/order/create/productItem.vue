<template>
<div>
  <div class="td" v-for="(item, index) in orderCreate.orderProductDtoList" :key="index">
    <div>
      <el-form-item
        :prop="'orderProductDtoList.' + index + '.productName'"
        :rules="[{ required: true, message: '请输入产品名称', trigger: 'blur' },
        { validator: textAccountLimit, trigger: 'blur' },
        { validator: isProductExist, trigger: 'blur' }]">
        <el-autocomplete v-model="item.productName" :fetch-suggestions="queryProductAsync" placeholder="订购产品" @select="((item)=>{handleProductSelect(item, index)})" :trigger-on-focus="false" />
      </el-form-item>
    </div>
    <div>
      <el-form-item
        :prop="'orderProductDtoList.' + index + '.amount'"
        :rules="[{ required: true, message: '请输入数量', trigger: 'blur' }]">
        <el-input v-model="item.amount" maxlength="9" placeholder="数量" />
      </el-form-item>
    </div>
    <div>
      <el-form-item
        :prop="'orderProductDtoList.' + index + '.processor'"
        :rules="[{ required: true, message: '请选择处理人', trigger: 'blur' }]">
        <el-cascader
          v-model="item.processorData"
          v-if="assignHandlers"
          :show-all-levels="false"
          clearable
          @change="((item)=>{processorFn(item, index)})"
          :options="assignHandlers">
        </el-cascader>
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
      selectedProduct: {
        productName: '',
        productId: null
      }
    };
  },
  async beforeMount() {
    this.getAssignhandler();
  },
  computed: {
    ...mapState({
      orderCreate: ({ order }) => order.orderCreate,
      productList: ({ order }) => order.productList,
      assignHandlers: ({ order }) => order.assignHandlers
    })
  },
  methods: {
    processorFn(value, index) {
      this.orderCreate.orderProductDtoList[index].processor = String(value[2]);
    },
    delFn(index) {
      let proList = this.orderCreate.orderProductDtoList;
      if (proList.length > 1) {
        this.orderCreate.orderProductDtoList.splice(index, 1);
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
      this.selectedProduct = {
        productName: item.productName,
        productId: item.productId
      };
      this.orderCreate.orderProductDtoList[index].productId = item.productId;
      this.updateOrderCreate({ productId: item.productId });
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
