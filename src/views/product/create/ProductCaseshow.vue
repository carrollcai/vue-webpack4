<template>
  <div class="product-case">
    <div class="title">添加销售案例
      <span class="sub-title">（可添加多个销售案例）</span>
    </div>
    <el-form class="product-case_form"
      :model="productCase"
      ref="baseForm"
      label-width="130px">
      <el-form-item label="销售类型：">
        <el-radio-group disabled
          v-model="productCase.salesType">
          <el-radio label="0">单品销售</el-radio>
          <el-radio label="1">组合销售</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="productCase.salesType === '1'"
        label="组合产品">
        <el-select :disabled="true"
          class="full-col"
          v-model="productCase.composedProduct"
          multiple
          filterable
          placeholder="产品名称/编码">
          <el-option v-for="item in composedProductList"
            :key="item.productId"
            :label="item.productName"
            :value="item.productName"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="方案介绍">
        <el-input :disabled="true"
          v-model="productCase.scheme"
          :maxlength="500"
          placeholder="请简要概述方案"
          type="textarea"
          :rows="4"></el-input>
      </el-form-item>
      <el-form-item label="方案附件"
        prop="files">
        <ul>
          <li v-for="item in uploadFiles"
            :key="item">
            <label @click="downloadFile(item)"
              class="download">{{item.fileName}}</label>
          </li>
        </ul>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
export default {
  name: 'ProductCase',
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    },
    proId: ''
  },
  data() {
    return {
      index: -1,
      productCase: {
        salesType: '0',
        composedProduct: []
      },
      uploadFiles: []
    };
  },
  computed: {
    composedProductList() {
      if (this.composedProduct) {
        const productCase = this.productCase;
        if (this.productCase.composedProduct[0] === '无') {
          productCase.composedProduct = [];
        }
        return this.composedProduct;
      }
    },
    ...mapState({
      composedProduct: ({ product }) => product.composedProduct
    })
  },
  beforeMount() {
    this.getComposedProduct({});
  },
  methods: {
    /**
     * 修改时，对数据进行初始化
     */
    init(productCase, index) {
      this.$nextTick(() => {
        this.productCase = Object.assign({}, productCase);
        this.index = index;

        if (this.productCase.files) {
          this.uploadFiles = this.productCase.files;
          return;
        }

        // 修改产品时，对销售案例进行修改
        if (this.productCase.fileInputId) {
          const that = this;
          this.uploadFiles = [];
          this.queryElec({ 'fileInputId': this.productCase.fileInputId }).then((res) => {
            if (res.data) {
              (res.data).forEach((item) => {
                item.name = item.fileName;
                that.uploadFiles.push(item);
              });
            }
          });
        }
      });
    },
    downloadFile(obj) {
      let params = {
        fileTypeId: 502,
        fileSaveName: obj.fileSaveName,
        fileName: obj.fileName
      };
      this.productDownloadFile(params);
    },
    ...mapActions([
      'getComposedProduct',
      'queryElec',
      'productDownloadFile'
    ])
  }
};
</script>
<style lang="less">
@import "~@/assets/scss/variables.less";
@form-item-width: @formLargeWidth;
.product-case {
  width: 100%;
  margin: 0 auto 32px;
  border: 1px solid #e9e9e9;
  border-radius: 4px;

  * {
    box-sizing: border-box;
  }

  .title {
    height: 44px;
    line-height: 44px;
    background-color: rgba(250, 250, 250, 1);
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    padding-left: 24px;
  }

  .sub-title {
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
  }

  .full-col,
  .el-textarea {
    width: @form-item-width;
  }

  .product-case_form {
    margin-bottom: 32px;
  }

  .btn-groups .el-button {
    width: 58px;
    height: 24px;
    line-height: 24px;
  }

  .upload-files {
    width: @form-item-width;
  }
  .el-upload__tip {
    min-height: 44px;
    line-height: 22px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
  }
  .download {
    color: #3778ff;
    font-size: 14px;
    cursor: pointer;
  }
}
</style>
