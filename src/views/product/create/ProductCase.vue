<template>
  <div class="product-case">
    <div class="title">添加销售案例 <span class="sub-title">（可添加多个销售案例）</span></div>
    <el-form class="product-case_form" :model="productCase" :rules="rules" ref="baseForm" label-width="130px">
      <el-form-item label="销售类型：">
        <el-radio-group v-model="productCase.salesType" @change="handleChangeSalesType">
          <el-radio label="0">单品销售</el-radio>
          <el-radio label="1">组合销售</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="productCase.salesType === '1'"
        label="组合产品" prop="composedProduct">
        <el-select
          class="full-col"
          v-model="productCase.composedProduct"
          multiple
          filterable
          allow-create
          default-first-option
          @change="productNameChange"
          placeholder="产品名称/编码">
          <el-option
            v-for="item in composedProductList"
            :key="item.productId"
            :label="item.productName"
            :value="item.productName"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="方案介绍" prop="scheme">
        <el-input v-model="productCase.scheme"
          :maxlength="500"
          placeholder="请简要概述方案" type="textarea" :rows="4"></el-input>
      </el-form-item>

      <el-form-item  label="销售数量" prop="salesNumber">
        <el-input class="full-col" v-model="productCase.salesNumber" placeholder="请输入数量"></el-input>
      </el-form-item>

      <el-form-item label="创新点/借鉴点" prop="keypoint">
        <el-input v-model="productCase.keypoint"
          :maxlength="500"
          placeholder="请简要概述创新点或借鉴点" type="textarea" :rows="4"></el-input>
      </el-form-item>

      <el-form-item label="经验教训" prop="experience">
        <el-input v-model="productCase.experience"
          :maxlength="500"
          placeholder="请简要概述经验教训" type="textarea" :rows="4"></el-input>
      </el-form-item>

      <el-form-item label="方案附件" prop="files">
        <el-upload class="upload-files"
          :limit="5"
          :auto-upload="false"
          :on-change="handleChangeFile"
          :on-remove="handleRemoveFile"
          :file-list="uploadFiles">
          <el-button type="primary" class="el-button_upload"><i class="icon-up"></i>选择文件</el-button>
          <p class="lh1-5">{{FILE_TIP[0]}}</p>
          <p class="lh1-5">{{FILE_TIP[1]}}</p>
        </el-upload>
      </el-form-item>
      <el-form-item class="btn-groups">
        <el-button type="primary" size="mini" @click="saveCase(formData)">确定</el-button>
        <el-button size="mini" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {mapState, mapActions} from 'vuex';
import endsWith from 'lodash/endsWith';
import {FILE_ACCEPT, FILE_TIP} from '@/config';
import {
  isEmpty as emptyValidator
} from '@/utils/rules';
export default {
  name: 'ProductCase',
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    const salesNumberFn = (rule, value, callback) => {
      const reg = /^\d{1,9}$/;
      if (String(value).trim() === '') {
        callback(new Error('请输入销售数量!'));
      } else if (!reg.test(value)) {
        callback(new Error('请输入正整数，最多9位数'));
      } else {
        callback();
      }
    };

    return {
      FILE_TIP,
      index: -1,
      productCase: {
        salesType: '0',
        composedProduct: []
      },
      uploadFiles: [],
      rules: {
        composedProduct: [
          { required: true, message: '请输入产品名称或编码', trigger: ['blur', 'change'] },
          { validator: emptyValidator, trigger: ['blur', 'change'] }
        ],
        scheme: [
          { required: true, message: '请输入方案介绍', trigger: ['blur', 'change'] },
          { validator: emptyValidator, trigger: ['blur', 'change'] }
        ],
        productName: [
          { required: true, message: '请输入产品名称或编码', trigger: ['blur', 'change'] },
          { validator: emptyValidator, trigger: ['blur', 'change'] }
        ],
        salesType: [
          { required: true, message: '请选择产品类型', trigger: 'change' }
        ],
        salesNumber: [
          { required: true, validator: salesNumberFn, type: 'number', trigger: 'blur' }
        ],
        keypoint: [
          { required: true, message: '请输入创新点/借鉴点', trigger: ['blur', 'change'] },
          { validator: emptyValidator, trigger: ['blur', 'change'] }
        ],
        experience: [
          { required: true, message: '请输入经验教训', trigger: ['blur', 'change'] },
          { validator: emptyValidator, trigger: ['blur', 'change'] }
        ]
      }
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
      });
    },
    isAcceptable(fileName) {
      for (let accept of FILE_ACCEPT) {
        if (endsWith(fileName.toLowerCase(), accept)) {
          return true;
        }
      }

      return false;
    },
    handleChangeFile(file, fileList) {
      let fileName = file.name;
      let result = true;
      if (this.isAcceptable(fileName)) {
        let fileSize = file.size / (1024 * 1024);

        if (fileSize > 20) {
          this.$message({
            message: '附件超过20M',
            type: 'error'
          });

          result = false;
        } else {
          this.uploadFiles.push(file.raw);
        }
      } else {
        this.$message({
          message: '只支持word、excel、ppt、pdf、rar格式',
          type: 'error'
        });
        result = false;
      }

      if (!result) {
        fileList.pop();
      }

      return result;
    },
    handleRemoveFile(file, fileList) {
      const that = this;
      const {uploadFiles} = that;

      uploadFiles.splice(0, uploadFiles.length);

      for (let item of fileList) {
        uploadFiles.push(item.raw);
      }
    },
    handleChangeSalesType(value) {
      if (value === '0') {
        this.productCase.composedProduct = [];
      }
    },
    productNameChange(value) {
      let curValue = value[0];
      this.getComposedProduct({productName: curValue});
    },
    saveCase() {
      this.$refs.baseForm.validate((valid) => {
        if (valid) {
          if (this.index > -1) {
            this.list[this.index] = Object.assign({}, this.productCase);
          } else {
            if (this.uploadFiles && this.uploadFiles.length) {
              this.productCase.files = this.uploadFiles;
            }

            this.list.push(this.productCase);
          }
          this.cancel();
        }
      });
    },
    cancel() {
      this.$emit('cancel');
    },
    ...mapActions([
      'getComposedProduct'
    ])
  }
};
</script>
<style lang="scss">
@import '@/assets/scss/variables.scss';
$form-item-width: $formLargeWidth;
.product-case{
  width: 100%;
  margin: 0 auto 32px;
  border: 1px solid #E9E9E9;
  border-radius: 4px;

  *{
    box-sizing: border-box;
  }

  .title{
    height: 44px;
    line-height: 44px;
    background-color: rgba(250, 250, 250, 1);
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    padding-left: 24px;
  }

  .sub-title{
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
  }

  .full-col, .el-textarea{
    width: $form-item-width;
  }

  .product-case_form{
    margin-bottom: 32px;
  }

  .btn-groups .el-button{
    width: 58px;
    height: 24px;
    line-height: 24px;
  }

  .upload-files{
    width: $form-item-width;
  }
  .el-upload__tip{
    min-height: 44px;
    line-height: 22px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
  }
}
</style>
