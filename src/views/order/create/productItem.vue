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
        <el-autocomplete
          v-model="item.processorData"
          :fetch-suggestions="((item, cb)=>{queryProcessorAsync(item, cb, index)})"
          placeholder="指派人"
          @select="((item)=>{handleProcessorSelect(item, index)})"
          :trigger-on-focus="false" />
          <div class="tag-list">
            <el-tag
              :key="tag"
              v-for="tag in orderCreate.orderProductDtoList[index].processorArray"
              closable
              :disable-transitions="false"
              @close="((tag)=>{handleClose(tag, index)})">
              {{tag}}
            </el-tag>
          </div>
        <!-- <el-cascader
          v-model="item.processorData"
          v-if="productHandlers"
          :show-all-levels="false"
          multiple
          clearable
          @change="((item)=>{processorFn(item, index)})"
          :options="productHandlers">
        </el-cascader> -->
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
  async beforeMount() {
    // this.getProductHandler();
  },
  computed: {
    ...mapState({
      orderCreate: ({ order }) => order.orderCreate,
      productList: ({ order }) => order.productList,
      productHandlers: ({ order }) => order.productHandlers
    })
  },
  methods: {
    handleClose(item, index) {
      console.log(item, index);
      this.orderCreate.orderProductDtoList[index].processor.splice(index, 1);
      this.orderCreate.orderProductDtoList[index].processorArray.splice(index, 1);
    },
    /* processorFn(value, index) {
      this.orderCreate.orderProductDtoList[index].processor = String(value);
    }, */
    delFn(index) {
      let proList = this.orderCreate.orderProductDtoList;
      if (proList.length > 1) {
        this.orderCreate.orderProductDtoList.splice(index, 1);
      }
    },
    async queryProcessorAsync(value, cb, index) {
      if (!value.trim()) return false;
      await this.getProductHandler(this.getProcessorList[index]);

      await clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(this.productHandlers);
      }, 1000);
    },
    handleProcessorSelect(item, index) {
      // this.orderCreate.orderProductDtoList[index].processor = String(item.value);
      this.orderCreate.orderProductDtoList[index].processor.push(String(item.value));
      this.orderCreate.orderProductDtoList[index].processorArray.push(String(item.value));
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
      this.orderCreate.orderProductDtoList[index].productId = item.productId;
      this.orderCreate.orderProductDtoList[index].companyBelong = item.operatorInfo.opRegion;
      this.orderCreate.orderProductDtoList[index].roleList = item.roleList;
      this.updateOrderCreate({ productId: item.productId });
      this.getProcessorList.push({
        opRegion: item.operatorInfo.opRegion,
        roleList: item.roleList
      });
      console.log(this.getProcessorList, 'q');
    },
    ...mapMutations({
      updateOrderCreate: 'ORDER_UPDATE_CREATE'
    }),
    ...mapActions([
      'getProductHandler',
      'queryProductByCodeOrName'
    ])
  }
};
</script>
