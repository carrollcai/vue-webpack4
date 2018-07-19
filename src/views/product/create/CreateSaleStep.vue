<template>
  <div class="p-content">
    <div class="crumb-bar">
      <el-breadcrumb>
        <el-breadcrumb-item :to="{ path: '/product/product-creat-manage' }">产品创建管理</el-breadcrumb-item>
        <el-breadcrumb-item>{{!isAddProduct ? '新建' : '编辑'}}产品</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="creat-content">
      <div class="steps-self w380 pt42 pb60">
        <p class="steps read"><span><i class="el-step__icon-inner is-status el-icon-check"></i>1</span>产品基本信息</p>
        <p class="line"></p>
        <p class="steps current"><span>2</span>产品销售案例</p>
      </div>
      <div class="creat-model">
        <wm-table v-if="cacheData && cacheData.length > 0"
          :source="cacheData"
          row-style="rowStyle">
          <el-table-column label="销售类型" width="80" property="salesType" :formatter="salesTypeFormat">
          </el-table-column>
          <el-table-column label="组合产品" property="composedProduct" :formatter="composedProductFormat" show-overflow-tooltip >
          </el-table-column>
          <el-table-column label="方案介绍" align="center" show-overflow-tooltip property="scheme" prop="">
          </el-table-column>
          <el-table-column label="销售数量" width="80" property="salesNumber">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="operation">
              <span class="blue hand" @click="toPageModefiy(operation.$index ,operation.row)">编辑</span>
              <span class="blue hand" @click="deleteProduct(operation.$index ,operation.row)">删除</span>
            </template>
          </el-table-column>
        </wm-table>
        <div class="bor" v-if="isShow">
          <h3 v-if="(!isAddProduct && addItem) || (isAddProduct && addItem)" class="title">添加销售案例
            <span>（可添加多个销售案例）</span>
          </h3>
          <h3 v-if="(isAddProduct && !addItem) || (!isAddProduct && !addItem)" class="title">编辑销售案例</h3>
          <el-form class="add-content" :model="formData" :rules="formDataValid" ref="formProduct" label-width="130px">
            <el-form-item label="销售类型：">
              <el-radio v-model="formData.salesType" @change="getRadioValue" value="0" label="0">单品销售</el-radio>
              <el-radio v-model="formData.salesType" @change="getRadioValue" value="1" label="1">组合销售</el-radio>
            </el-form-item>
            <el-form-item v-if="formData.salesType === '1'" label="组合产品：" prop="composedProduct" label-width="130px">
              <!-- <el-input v-model="formData.composedProduct" placeholder="产品名称/编码"></el-input> -->
              <el-select
                v-model="formData.composedProduct" label-width="130px"
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

            <el-form-item label="方案介绍：" label-width="130px" prop="scheme">
              <el-input v-model="formData.scheme" placeholder="请简要概述方案" type="textarea" :rows="4"></el-input>
            </el-form-item>
            <el-form-item label="销售数量：" label-width="130px" prop="salesNumber">
              <el-input v-model="formData.salesNumber" placeholder="请输入数量"></el-input>
            </el-form-item>
            <el-form-item label="创新点/借鉴点：" label-width="130px" prop="keypoint">
              <el-input v-model="formData.keypoint" placeholder="请简要概述创新点或借鉴点" type="textarea" :rows="4"></el-input>
            </el-form-item>
            <el-form-item label="经验教训：" label-width="130px" prop="experience">
              <el-input v-model="formData.experience" placeholder="请简要概述经验教训" type="textarea" :rows="4"></el-input>
            </el-form-item>
            <el-form-item label="方案附件：" label-width="130px" prop="files">
              <el-upload class="upload-demo" action=""
                :auto-upload="false"
                :on-change="fileChange"
                :multiple="false"
                :on-remove="removeFile"
                :file-list="fileList">
                <el-button slot="trigger" size="small">
                  <i class="icon-up margin-right-8"></i>上传文件
                </el-button>
                <div slot="tip" class="el-upload__tip">
                  <p class="lh1-5">1. 附件格式支持“PPT、Excel、Word和压缩包“格式</p>
                  <p class="lh1-5">2. 附件大小不超过20M。</p>
                </div>
              </el-upload>
              <!-- <el-upload class="upload-demo"
                action=""
                :auto-upload="false"
                :on-change="fileChange"
                :multiple="false"
                :file-list="fileList"
                :limit="5"
                :accept="fileType"
                :on-remove="removeFile">
                <span class="blue"> <i class="el-icon el-icon-plus fs12"></i>上传附件</span>
                <div slot="tip" class="el-upload__tip">
                  <p class="lh1-5">1. 附件格式支持“PPT、Excel、Word和压缩包“格式</p>
                  <p class="lh1-5">2. 附件大小不超过20M。</p>
                </div>
              </el-upload> -->
            </el-form-item>
            <el-row class="mt28 mb10">
              <el-button type="primary" round size="mini" @click="onSubmit(formData)">确定</el-button>
              <el-button round size="mini" @click="reset(formData)">取消</el-button>
            </el-row>
          </el-form>
        </div>
        <div class="add-demo" @click="addSaleDome">+ 添加销售案例</div>
        <el-row class="mt28 mb10">
          <el-button plain @click="prevStep">上一步</el-button>
          <el-button type="primary" @click="creartProduct">确定</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import WmTable from 'components/Table.vue';
import { multFileValid } from '@/utils/rules.js';
import { FILE_ACCEPT, FILE_MAX_SIZE, FILE_TIP } from '@/config/index.js';
export default {
  components: {
    WmTable
  },
  data() {
    function getWordLen(str, validNum) {
      let length = str.length;
      /* var length = 0;
      for (let i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94) {
          length += 2;
        } else {
          length += 1;
        }
      } */
      if (length > validNum) {
        return true;
      }
    };
    const fileCheck = (rule, value, callback) => {
      multFileValid(this.uploadData.files, callback);
    };
    function checkTip(content, value, callback) {
      if (String(value).trim() === '') {
        callback(new Error('请输入' + content + '!'));
      } else if (getWordLen(value, 500)) {
        callback(new Error('请输入500个字符以内' + content + '!'));
      } else {
        callback();
      }
    };
    var productNameFn = (rule, value, callback) => {
      if (String(value).trim() === '') {
        callback(new Error('请输入产品名称!'));
      } else if (getWordLen(value, 25)) {
        callback(new Error('请输入在25个字符以内产品名称!'));
      } else {
        callback();
      }
    };
    var salesTypeFn = (rule, value, callback) => {
      if (String(value).trim() === '') {
        callback(new Error('选择产品类型!'));
      } else {
        callback();
      }
    };
    var salesNumberFn = (rule, value, callback) => {
      var reg = /^\d{1,9}$/;
      if (String(value).trim() === '') {
        callback(new Error('请输入销售数量!'));
      } else if (!reg.test(value)) {
        callback(new Error('请输入正整数，最多9位数!'));
      } else {
        callback();
      }
    };
    var keypointFn = (rule, value, callback) => {
      checkTip('创新点/借鉴点', value, callback);
    };
    var experienceFn = (rule, value, callback) => {
      checkTip('经验教训', value, callback);
    };
    var schemeFn = (rule, value, callback) => {
      checkTip('方案介绍', value, callback);
    };
    return {
      FILE_MAX_SIZE,
      isAddProduct: this.$route.params.id | false,
      modefiyIndex: -1,
      params: {},
      isShow: true,
      cacheData: [],
      cacheSalesList: [],
      addItem: typeof (this.$route.params.id) === 'undefined',
      fileList: [],
      fileLen: 0,
      formData: {
        salesId: '',
        salesType: '0',
        scheme: '',
        salesNumber: '',
        keypoint: '',
        experience: '',
        composedProduct: [],
        fileInputId: null
      },
      fileType: 'application/pdf,application/rar,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/msword,application/vnd.ms-excel',
      uploadData: {
        fileInputId: '',
        fileTypeId: 502,
        moduleId: 1,
        expireDate: '',
        effectiveDate: '',
        files: []
      },
      formDataValid: {
        composedProduct: [
          { required: true, message: '请输入产品名称或编码', trigger: 'blur' }
        ],
        scheme: [
          { required: true, validator: schemeFn, trigger: 'blur' }
        ],
        productName: [
          { required: true, validator: productNameFn, trigger: 'blur' }
        ],
        salesType: [
          { required: true, validator: salesTypeFn, trigger: 'blur' }
        ],
        salesNumber: [
          { required: true, validator: salesNumberFn, type: 'number', trigger: 'blur' }
        ],
        keypoint: [
          { required: true, validator: keypointFn, trigger: 'blur' }
        ],
        experience: [
          { required: true, validator: experienceFn, trigger: 'blur' }
        ],
        files: [
          { validator: fileCheck }
        ]
      }
    };
  },
  computed: {
    composedProductList() {
      if (this.composedProduct) {
        var formData = this.formData;
        if (this.formData.composedProduct[0] === '无') {
          formData.composedProduct = [];
        }
        return this.composedProduct;
      }
    },
    ...mapState({
      composedProduct: ({ product }) => product.composedProduct,
      productSaleDemo: ({ product }) => product.productSaleDemo,
      saleStep: ({product}) => product.saleStep
    })
  },
  beforeMount() {
    let returnStep = Number(localStorage.getItem('nextStep'));
    let prevStep = Number(localStorage.getItem('prevStep'));
    var _this = this;
    this.getComposedProduct({});
    this.params = JSON.parse(localStorage.getItem('params'));
    let cacheData = JSON.parse(localStorage.getItem('cacheData'));
    let cacheSalesList = JSON.parse(localStorage.getItem('cacheSalesList'));
    if (this.isAddProduct && this.isAddProduct > 0) {
      this.isShow = false;
      if (returnStep === 1 && prevStep === 2) {
        this.formData = this.saleStep;
        if (this.saleStep.salesList && this.saleStep.salesList.length > 0) {
          let res = this.saleStep.salesList;
          for (let i in res) {
            res[i].state = 3;
          }
          this.cacheSalesList = cacheSalesList;
          this.cacheData = cacheData;
          this.params.salesList = cacheSalesList;
        }
      } else {
        var data = { productId: Number(this.isAddProduct) };
        this.getProductDetail(data).then((reques) => {
          if (_this.productSaleDemo) {
            let res = _this.productSaleDemo.salesList;
            for (let i in res) {
              res[i].state = 3;
            }
            _this.cacheSalesList = res;
            _this.cacheData = res.concat();
          }
        });
      }
    } else {
      if (returnStep === 1 && prevStep === 2) {
        this.formData = this.saleStep;
        if (this.saleStep.salesList && this.saleStep.salesList.length > 0) {
          this.isShow = false;
          let res = this.saleStep.salesList;
          for (let i in res) {
            res[i].state = 3;
          }
          this.cacheSalesList = cacheSalesList;
          this.cacheData = cacheData;
          this.params.salesList = cacheSalesList;
        }
      }
    }
  },
  methods: {
    salesTypeFormat(row, column, cellValue) {
      if (cellValue === '0') {
        return '单品销售';
      } else {
        return '组合销售';
      }
    },
    composedProductFormat(row, column, cellValue) {
      let composedStr = '';
      if (cellValue && cellValue.length > 0) {
        composedStr = cellValue.join('、');
      }
      return composedStr;
    },
    productNameFormat(row, column, cellValue) {
      if (row.salesType === '0' || row.salesType === '单品销售' || cellValue[0] === '无') {
        return '无';
      } else {
        return cellValue;
      }
    },
    filterData(value, row, column) {
    },
    rowStyle(row, rowIndex) {
      if (row.state === 0) {
        return 'display: none';
      } else {
        return '';
      }
    },
    addSaleDome() {
      if (this.isShow) {
        this.$message({ showClose: true, message: '请先保存产品案例', type: 'warning' });
      } else {
        this.addItem = true;
        this.reset();
      }
    },
    productNameChange(value) {
      var curValue = value[0];
      this.getComposedProduct({productName: curValue}).then((res) => {
      });
    },
    async onSubmit(vaildData) {
      this.isSubmit = true;
      var _this = this;
      await this.submitAssignForm();
      this.$refs.formProduct.validate((valid) => {
        if (valid) {
          if (_this.isAddProduct) {
            if (_this.addItem) {
              _this.formData.state = 2;
            } else {
              _this.formData.state = 3;
              _this.cacheData.splice(_this.modefiyIndex, _this.modefiyIndex + 1);
              _this.cacheSalesList.splice(_this.modefiyIndex, _this.modefiyIndex + 1);
              _this.params.salesList = _this.cacheSalesList;
            }
          } else {
            _this.formData.state = 2;
            if (!_this.addItem) {
              _this.cacheData.splice(_this.modefiyIndex, _this.modefiyIndex + 1);
              _this.cacheSalesList.splice(_this.modefiyIndex, _this.modefiyIndex + 1);
              _this.params.salesList = _this.cacheSalesList;
            }
          }
          _this.cacheData.push(_this.formData);
          _this.cacheSalesList.push(_this.formData);
          _this.params.salesList = _this.cacheSalesList;
          localStorage.setItem('cacheData', JSON.stringify(_this.cacheData));
          localStorage.setItem('cacheSalesList', JSON.stringify(_this.cacheSalesList));
          _this.isShow = false;
        } else {
          _this.isShow = true;
          return false;
        }
        _this.addItem = false;
      });
    },
    creartProduct() {
      var _this = this;
      if (!this.isSubmit) {
        this.params.salesList = this.cacheSalesList;
      }
      var salesList = this.params.salesList;
      for (var s in salesList) {
        if (salesList[s].salesType === '单品销售') {
          salesList[s].salesType = '0';
          salesList[s].composedProduct = [];
        } else if (salesList[s].salesType === '组合销售') {
          salesList[s].salesType = '1';
        }
      }
      if (this.isShow) {
        this.$message({showClose: true, message: '请先报存，在提交！', type: 'warning'});
        return false;
      }
      if (this.isAddProduct) {
        this.setEditProduct(_this.params).then((res) => {
          if (res.data && res.errorInfo.code === '200') {
            _this.$message({ showClose: true, message: '修改产品成功！', type: 'success' });
            this.$router.push({ path: '/product/product-creat-manage' });
          }
        });
      } else {
        this.setAddProduct(_this.params).then((res) => {
          if (res.data && res.errorInfo.code === '200') {
            _this.$message({ showClose: true, message: '新增产品成功！', type: 'success' });
            this.$router.push({ path: '/product/product-creat-manage' });
          }
        });
      }
    },
    async toPageModefiy(index, row) {
      var _this = this;
      if (row.salesType === '单品销售') {
        row.salesType = '0';
        row.composedProduct = [];
      } else if (row.salesType === '组合销售') {
        row.salesType = '1';
      }
      this.addItem = false;
      this.fileList = [];
      if (row.fileInputId) {
        this.formData.fileInputId = row.fileInputId;
        this.uploadData.fileInputId = row.fileInputId;
        await this.queryElec({'fileInputId': row.fileInputId}).then((res) => {
          if (res.data) {
            (res.data).forEach(function(item, index) {
              item.name = item.fileName;
              _this.fileList.push(item);
            }, _this);
          }
        });
      } else {
        this.elecInstId = '';
      }
      this.modefiyIndex = index;
      this.formData = {
        salesId: row.salesId || '',
        salesType: row.salesType || '',
        scheme: row.scheme || '',
        salesNumber: row.salesNumber || '',
        keypoint: row.keypoint || '',
        experience: row.experience || '',
        composedProduct: row.composedProduct || []
      };
      this.isShow = true;
    },
    deleteProduct(index, row) {
      var _this = this;
      if (this.isShow) {
        this.$message({showClose: true, message: '请先报存，在提交！', type: 'warning'});
        return false;
      }
      this.$confirm('删除该产品数据, 是否继续?', ' ', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.cacheData.splice(index, 1);
        if (this.isAddProduct && this.isAddProduct > 0) {
          for (var i in _this.cacheSalesList) {
            if (_this.cacheSalesList[i].salesId === row.salesId) {
              _this.cacheSalesList[i].state = 0;
            }
          }
          _this.params.salesList = _this.cacheSalesList;
        } else {
          _this.params.salesList = _this.cacheData;
        }
        localStorage.setItem('cacheSalesList', JSON.stringify(_this.cacheSalesList));
        localStorage.setItem('cacheData', JSON.stringify(_this.cacheData));
        _this.$message({showClose: true, message: '已删除产品成功！', type: 'success'});
      }).catch(() => {
        _this.$message('已取消删除');
      });
    },
    reset(validData) {
      this.formData = {
        // productId: '',
        salesId: '',
        salesType: '0',
        scheme: '',
        salesNumber: '',
        keypoint: '',
        experience: '',
        composedProduct: [],
        fileInputId: null
      };
      this.fileList = [];
      this.modefiyIndex = null;
      if (validData) {
        this.$refs.formProduct.resetFields();
        this.isShow = false;
      } else {
        this.isShow = true;
      }
    },
    beforeUpload(file, fileList) {
      const isOverLimit = file.size > (FILE_MAX_SIZE * 1024 * 1024);
      const isFormat = !this.isAcceptable(file.name);
      let index = fileList.findIndex(val => val.uid === file.raw.uid);
      if (isFormat) {
        this.$message.error(FILE_TIP);
        fileList.splice(index, 1);
      }
      if (isOverLimit) {
        this.$message.error(`上传文件不能超过${FILE_MAX_SIZE}MB!`);
        fileList.splice(index, 1);
      }
      return isOverLimit || isFormat;
    },
    fileChange(file, fileList) {
      if (this.beforeUpload(file, fileList)) return false;
      this.fileList.push(file.raw);
      this.uploadData.files.push(file.raw);
      this.$refs.formProduct.validateField('files');
    },
    removeFile(files, fileList) {
      var _this = this;
      if (files.elecInstId) {
        this.delUplodFile({elecInstId: files.elecInstId, fileTypeId: 502}).then((res) => {
          if (res.errorInfo.code === '200') {
            this.$message.success(`已删除成功!`);
            if (fileList.length === 0) {
              _this.uploadData.fileInputId = '';
              _this.formData.fileInputId = '';
            }
          }
        });
      } else {
        this.formDataValid.files = null;
      }
      this.$refs.formProduct.validateField('files');
    },
    isAcceptable(fileName) {
      for (let accept of FILE_ACCEPT) {
        if (fileName.endsWith(accept)) {
          return true;
        }
      }
      return false;
    },
    async submitAssignForm() {
      var _this = this;
      let isId = this.uploadData.fileInputId || false;
      await this.getProductFileId().then((res) => {
        _this.uploadData.fileInputId = res.data;
        _this.formData.fileInputId = res.data;
      });
      if (this.isShow && this.isAddProduct) {
        if (isId) {
          this.uploadProductScheme(this.uploadData);
        } else {
          this.uploadProductScheme(this.uploadData);
        }
      } else {
        this.uploadProductScheme(this.uploadData);
      }
    },
    prevStep() {
      if (!this.isSubmit) {
        this.params.salesList = this.cacheSalesList;
      }
      this.saveSaleStep(this.params);
      localStorage.setItem('prevStep', 2);
      this.$router.go(-1);
    },
    getRadioValue(value) {
      this.formData.salesType = value;
      if (value === '0') {
        this.formData.composedProduct = [];
      }
    },
    ...mapActions([
      'setAddProduct',
      'getProductDetail',
      'setEditProduct',
      'uploadProductScheme',
      'getProductFileId',
      'getComposedProduct',
      'queryElec',
      'delUplodFile',
      'saveSaleStep'
    ])
  }
};
</script>

<style lang="scss">
@import "scss/variables.scss";
.p-content {
  .crumb-bar {
    .el-breadcrumb {
      line-height: 48px;
    }
  }
  .lh1-5 {line-height: 1.5;}
  .fs12 {font-size: 12px;}
  .el-select {width: 100%;}
  .el-upload__tip {margin-top: 0;}
  .el-step.is-horizontal .el-step__line {
    height: 1px;
    background: #c0c0c0
  }

  .el-step__head.is-process,
  .el-step__title.is-process {
    color: #8c8c8c;
    font-weight: 400;
  }

  .el-step.is-simple .el-step__arrow::before,
  .el-step.is-simple .el-step__arrow:before {
    display: none
  }
  .el-step.is-simple .el-step__arrow::after,
  .el-step.is-simple .el-step__arrow:after {
    -webkit-transform: none;
    transform: none;
    height: 1px;
    width: 320px;
  }

  .el-step__icon.is-text {
    border-width: 1px;
  }

  .creat-content {
    background: #fff;
    margin-top: 16px;
    min-height: 812px;
    height: auto;
  }

  .el-steps--simple {
    background: none;
  }

  .el-steps--horizontal {
    width: 480px;
    padding: 30px;
    margin: 0 auto;
  }
  .el-select {
    .el-tag {
      max-width: 235px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      position: relative;
      padding-right: 25px;
    }
    .el-tag__close {
      position: absolute;
      top:5px;
      right: 5px;
    }

  }
  .add-content {
    width: 430px;
    margin: 0 auto;
  }
}
.creat-model {
  width: 587px;
  margin: 0 auto;
  .bor {
    width: 100%;
    border: 1px #e7e7e7 solid;
    margin-top: 16px;
  }
  .title {
    height: 44px;
    line-height: 44px;
    font-size: 14px;
    color: #262626;
    background: #f0f2f5;
    padding: 0 24px;
    margin: 0;
    span {
      color: #8c8c8c;
    }
  }
  .add-demo {
    height: 32px;
    line-height: 32px;
    border: #e7e7e7 1px dashed;
    margin-top: 16px;
    text-align: center;
    color: #595959
  }
  .el-button--mini,
  .el-button--mini {
    line-height: 1;
  }
}
.w380 {width: 380px; margin: 0 auto;}
.pt42 {padding-top: 42px;}
.pb60 {padding-bottom: 60px;}
.steps-self {
  display: flex;
  align-items: center;
  justify-content: space-around;
  .steps {
    line-height: 25px;
    color: #8C8C8C;
    font-size: 14px;
  }
  .line {
    display: block;
    height: 1px;
    background: #e9e9e9;
    margin: 0 12px;
    flex: 1;
  }
  span {
    position: relative;
    display: block;
    width: 26px;
    height:26px;
    line-height: 26px;
    text-align: center;
    z-index: 10;
    color: #3778FF;
    float: left;
    margin-right: 8px;
    overflow: hidden;
  }
  span::before {
    content: '';
    position: absolute;
    display: block;
    width: 24px;
    height:24px;
    border-radius: 12px;
    color: #3778FF;
    border: 1px #3778FF solid;
    background: #fff;
    z-index: -1;
  }
  i {color: #3778FF; display: none;}
  .current {
    span {color: #fff;}
    span::before {background: #3778FF;}
  }
  .read {
    i {display: block; font-size: 12px; line-height: 26px;}
    span {font-size: 9999px;}
  }
}
</style>
