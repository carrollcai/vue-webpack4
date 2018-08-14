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

      <!--<el-form-item  label="销售数量" prop="salesNumber">
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
      </el-form-item>-->

      <el-form-item label="方案附件" prop="files">
        <el-upload class="upload-files"
          :limit="FILE_MAX_COUNT"
          :auto-upload="false"
          :on-change="handleChangeFile"
          :on-remove="handleRemoveFile"
          :on-exceed="handleExceed"
          :file-list="uploadFiles">
          <el-button slot="trigger" size="small">
            <i class="icon-up margin-right-8"></i>上传文件
          </el-button>
          <div slot="tip" class="el-upload__tip">
            <p class="lh1-5">{{FILE_TIP[0]}}</p>
            <p class="lh1-5">{{FILE_TIP[1]}}</p>
          </div>
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
import { FILE_TYPE_ID } from '@/config/index.js';
import endsWith from 'lodash/endsWith';
import {
  FILE_ACCEPT,
  FILE_TIP,
  FILE_MAX_COUNT,
  FILE_MAX_SIZE,
  FILE_ERROR_TIP
} from '@/config';
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
    },
    proId: ''
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
      FILE_MAX_COUNT,
      index: -1,
      productCase: {
        salesType: '0',
        composedProduct: []
      },
      uploadFiles: [],
      // 用于保存，修改产品时， 修改销售案例删除的方案文件
      deleteFiles: [],
      newFiles: [],
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

        if (this.productCase.files) {
          this.uploadFiles = this.productCase.files;
          return;
        }

        // 修改产品时，对销售案例进行修改
        if (this.productCase.fileInputId) {
          const that = this;
          this.queryElec({'fileInputId': this.productCase.fileInputId}).then((res) => {
            if (res.data) {
              (res.data).forEach(function(item) {
                item.name = item.fileName;
                that.uploadFiles.push(item);
              });
            }
          });
        }
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
    handleExceed() {
      this.$message({
        message: `附件个数已满${FILE_MAX_COUNT}个`,
        type: 'warning'
      });
    },
    handleChangeFile(file, fileList) {
      let fileName = file.name;
      let result = true;
      if (this.isAcceptable(fileName)) {
        let fileSize = file.size / (1024 * 1024);

        if (fileSize > FILE_MAX_SIZE) {
          this.$message({
            message: `附件超过${FILE_MAX_SIZE}M`,
            type: 'error'
          });

          result = false;
        } else {
          this.uploadFiles.push(file.raw);
        }
      } else {
        this.$message({
          message: FILE_ERROR_TIP,
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
        uploadFiles.push(item);
      }

      if (file.elecInstId) {
        // 删除文件
        this.delUplodFile({elecInstId: file.elecInstId, fileTypeId: FILE_TYPE_ID.product}).then((res) => {
          this.deleteFiles.push(file);
        });
        // this.deleteFiles.push(file);
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
          const {productCase} = this;
          // 修改
          if (this.index > -1) {
            productCase.files = this.uploadFiles;
            productCase.deleteFiles = this.deleteFiles;

            if (productCase.salesId) {
              productCase.state = '3';
            }
            productCase.deleteFiles = this.deleteFiles;

            this.list[this.index] = Object.assign({}, productCase);
            let params = Object.cloneDeep(productCase);
            delete params.productId;
            delete params.state;
            delete params.files;
            delete params.deleteFiles;
            this.editSalesCase(params);
            let data = {productId: this.proId};
            this.getSalesCaseDetail(data);
          } else {
            // 新增
            if (this.uploadFiles && this.uploadFiles.length) {
              productCase.files = this.uploadFiles;
            }

            productCase.state = '2';

            this.list.push(productCase);
            let submitParams = Object.cloneDeep(productCase);
            submitParams.productId = this.proId;
            delete submitParams.state;
            delete submitParams.files;
            // let submitParams = {
            //   fileId: '',
            //   productRequest: param
            // };
            let params = {
              fileInputId: '',
              fileTypeId: FILE_TYPE_ID.product,
              moduleId: 1,
              files: this.uploadFiles
            };
            this.addSalesCase({ params, submitParams });
            let data = {productId: this.proId};
            this.getSalesCaseDetail(data);
          }
          this.cancel();
        }
      });
    },
    cancel() {
      this.$emit('cancel');
    },
    ...mapActions([
      'getComposedProduct',
      'queryElec',
      'addSalesCase',
      'getSalesCaseDetail',
      'editSalesCase',
      'delUplodFile'
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
