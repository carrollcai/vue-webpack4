<template>
  <div class="p-content">
    <div class="crumb-bar">
      <span>产品创建管理 / </span>新建产品</div>
    <div class="creat-content">
      <div class="steps-self w380 pt42 pb60">
        <p class="steps read"><span><i class="el-step__icon-inner is-status el-icon-check"></i>1</span>产品基本信息</p>
        <p class="line"></p>
        <p class="steps current"><span>2</span>产品销售案例</p>
      </div>
      <div class="creat-model">
        <wm-table v-if="cacheData && cacheData.length > 0" :source="cacheData">
          <el-table-column label="销售类型" property="salesType" :formatter="salesTypeFormat">
          </el-table-column>
          <el-table-column label="组合产品" property="composedProduct" width="120" :formatter="productNameFormat">
          </el-table-column>
          <el-table-column label="方案介绍" show-overflow-tooltip property="scheme" prop="">
          </el-table-column>
          <el-table-column label="销售数量" property="salesNumber">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="operation">
              <span class="blue hand" @click="toPageModefiy(operation.$index ,operation.row)">编辑</span>
              <span class="blue hand" @click="deleteProduct(operation.$index ,operation.row)">删除</span>
            </template>
          </el-table-column>
        </wm-table>
        <div class="bor" v-if="isShow">
          <h3 class="title">添加销售案例
            <span>（可添加多个销售案例）</span>
          </h3>
          <el-form class="add-content" :model="formData" :rules="formDataValid" :ref="formData" label-width="130px">
            <el-form-item label="销售类型：">
              <el-radio v-model="formData.salesType" @change="getRadioValue" value="0" label="0">单品销售</el-radio>
              <el-radio v-model="formData.salesType" @change="getRadioValue" value="1" label="1">组合销售</el-radio>
            </el-form-item>
            <el-form-item v-if="formData.salesType === '1'" label="组合产品：" prop="composedProduct" label-width="130px">
              <!-- <el-input v-model="formData.composedProduct" placeholder="产品名称/编码"></el-input> -->
              <el-select
                v-model="formData.composedProduct"
                multiple
                filterable
                allow-create
                default-first-option
                placeholder="产品名称/编码">
                <el-option
                v-for="item in composedProduct"
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
            <el-form-item label="方案附件：" label-width="130px" prop="fileList">
              <el-upload class="upload-demo"
                action=""
                :auto-upload="false"
                :on-change="fileChange"
                :multiple="false"
                :file-list="fileList"
                :on-remove="removeFile">
                <el-button slot="trigger" size="small">选择文件</el-button>
              </el-upload>
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
export default {
  components: {
    WmTable
  },
  data() {
    function getWordLen(str) {
      var length = 0;
      for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94) {
          length += 2;
        } else {
          length += 1;
        }
      }
      return length;
    };
    function checkTip(content, value, callback) {
      var len = getWordLen(value);
      if (value === '') {
        callback(new Error('请输入' + content + '!'));
      } else if (len > 1000) {
        callback(new Error('请输入500个汉字以内' + content + '!'));
      } else {
        callback();
      }
    };
    var productNameFn = (rule, value, callback) => {
      var len = getWordLen(value);
      if (value === '') {
        callback(new Error('请输入产品名称!'));
      } else if (len > 50) {
        callback(new Error('请输入在25个汉字以内产品名称!'));
      } else {
        callback();
      }
    };
    var salesTypeFn = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('选择产品类型!'));
      } else {
        callback();
      }
    };
    var salesNumberFn = (rule, value, callback) => {
      var vlaueNum = Number(value);
      if (value === '') {
        callback(new Error('请输入销售数量!'));
      } else if (!Number.isInteger(vlaueNum) || (Number.isInteger(vlaueNum) && vlaueNum > 100000000)) {
        callback(new Error('请输入9位以内的数字!'));
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
    var descriptionFn = (rule, value, callback) => {
      checkTip('产品介绍', value, callback);
    };
    return {
      isAddProduct: this.$route.params.id | false,
      modefiyIndex: -1,
      params: {},
      isShow: true,
      cacheData: [],
      cacheSalesList: [],
      addItem: Number(this.$route.params.id) < 0,
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
          { required: true, message: '请输入产品销售方案', trigger: 'blur' }
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
        description: [
          { required: true, validator: descriptionFn, trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
    ...mapState({
      composedProduct: ({ product }) => product.composedProduct,
      productSaleDemo: ({ product }) => product.productSaleDemo
    })
  },
  beforeMount() {
    var _this = this;
    this.getComposedProduct({});
    this.params = JSON.parse(localStorage.getItem('params'));
    if (this.isAddProduct) {
      this.isShow = false;
      var data = { productId: Number(this.isAddProduct) };
      this.getProductDetail(data).then((reques) => {
        if (_this.productSaleDemo) {
          var res = _this.productSaleDemo.salesList;
          for (var i in res) {
            res[i].state = 3;
          }
          _this.cacheSalesList = res;
          _this.cacheData = res.concat();
        }
      });
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
    productNameFormat(row, column, cellValue) {
      if (row.salesType === '0' || row.salesType === '单品销售' || cellValue[0] === '无') {
        return '无';
      } else {
        return cellValue;
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
    onSubmit(vaildData) {
      var _this = this;
      this.$refs[vaildData].validate((valid) => {
        if (valid) {
          this.submitAssignForm();
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
          _this.isShow = false;
        } else {
          return false;
        }
        _this.addItem = false;
      });
    },
    creartProduct() {
      var _this = this;
      var salesList = this.params.salesList;
      for (var s in salesList) {
        if (salesList[s].salesType === '单品销售') {
          salesList[s].salesType = '0';
          salesList[s].composedProduct = [];
        } else if (salesList[s].salesType === '组合销售') {
          salesList[s].salesType = '1';
        }
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
    toPageModefiy(index, row) {
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
        this.queryElec({'fileInputId': row.fileInputId}).then((res) => {
          if (res.data) {
            (res.data).forEach(function(item, index) {
              var file = {
                name: item.fileName,
                elecInstId: item.elecInstId
              };
              _this.fileList.push(file);
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
      if (row.fileInputId) {
        this.formData.fileInputId = row.fileInputId;
        this.uploadData.fileInputId = row.fileInputId;
      }
      this.isShow = true;
    },
    deleteProduct(index, row) {
      var _this = this;
      this.$confirm('删除该产品数据, 是否继续?', ' ', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        _this.cacheData.splice(index, index + 1);
        for (var i in _this.cacheSalesList) {
          if (_this.cacheSalesList[i].salesId === row.salesId) {
            _this.cacheSalesList[i].state = 0;
          }
        }
        _this.params.salesList = _this.cacheSalesList;
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
        this.$refs[validData].resetFields();
        this.isShow = false;
      } else {
        this.isShow = true;
      }
    },
    fileChange(files, fileList) {
      this.uploadData.files.push(files.raw);
    },
    removeFile(files, fileList) {
      var _this = this;
      if (files.elecInstId) {
        this.delUplodFile({elecInstId: files.elecInstId, fileTypeId: 502}).then((res) => {
          if (res.errorInfo.code === '200') {
            if (fileList.length === 0) {
              _this.uploadData.fileInputId = '';
              _this.formData.fileInputId = '';
            }
          }
        });
      } else {
        this.formDataValid.files = null;
      }
    },
    submitAssignForm() {
      var _this = this;
      if (this.isShow && this.isAddProduct) {
        // 修改
        if (this.uploadData.fileInputId) {
          this.uploadProductScheme(this.uploadData);
        } else {
          this.getProductFileId().then((res) => {
            _this.uploadData.fileInputId = res.data;
            _this.formData.fileInputId = res.data;
            this.uploadProductScheme(this.uploadData);
          });
        }
      } else {
        this.getProductFileId().then((res) => {
          _this.uploadData.fileInputId = res.data;
          _this.formData.fileInputId = res.data;
          this.uploadProductScheme(this.uploadData);
        });
      }
    },
    prevStep() {
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
      'delUplodFile'
    ])
  }
};
</script>

<style lang="scss">
@import "scss/variables.scss";
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

.add-content {
  width: 430px;
  margin: 0 auto;
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
