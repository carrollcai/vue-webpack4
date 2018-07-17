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
      <p class="steps current"><span>1</span><i class="el-step__icon-inner is-status el-icon-check" style="display:none"></i>产品基本信息</p>
      <p class="line"></p>
      <p class="steps"><span>2</span>产品销售案例</p>
    </div>
    <el-form class="add-content"
      :model="formData"
      :rules="formDataValid"
      :ref="formData"
      label-width="90px">
      <el-form-item label="产品名称：" label-width="110px" prop="productName">
        <el-input v-model="formData.productName" @change="vaildRepeat" placeholder="请输入名称"></el-input>
      </el-form-item>

      <el-form-item label="产品类别：" label-width="110px" prop="productType">
        <el-select style="width: 100%;" v-model="formData.productType" placeholder="请选择类别">
          <el-option label="个人市场" value="0"></el-option>
          <el-option label="政企市场" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产品价格：" label-width="110px" prop="price">
        <el-input v-model="formData.price" placeholder="数字允许小数点后两位小数"><template slot="append">元</template></el-input>
      </el-form-item>
      <el-form-item label="负责人：" required label-width="110px" class="col-item">
        <el-col :span="8"><el-form-item prop="username"><el-input v-model="formData.username" placeholder="姓名" style="width: 100px;"></el-input><span class="split">-</span></el-form-item></el-col>
        <el-col :span="8"><el-form-item prop="deptment"><el-input v-model="formData.deptment" placeholder="部门" style="width: 100px;"></el-input><span class="split">-</span></el-form-item></el-col>
        <el-col :span="8"><el-form-item prop="position"><el-input v-model="formData.position" placeholder="岗位" style="width: 100px;"></el-input></el-form-item></el-col>
      </el-form-item>
      <el-form-item label="版本号" label-width="110px" prop="version">
        <el-input v-model="formData.version" placeholder="请输入版本号"></el-input>
      </el-form-item>
      <el-form-item label="产品介绍：" label-width="110px" prop="description">
        <el-input v-model="formData.description" placeholder="请输入介绍" type="textarea" :rows="3"></el-input>
      </el-form-item>
      <el-form-item class="mt28">
        <el-button type="primary" @click="nextStep(formDataValid)">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  components: {
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
    var versionTrim = (rule, value, callback) => {
      if (String(value).trim() === '') {
        callback(new Error('请输入版本号'));
      } else if (getWordLen(value, 20)) {
        callback(new Error('长度20个字符内'));
      } else {
        callback();
      }
    };
    var validTrim = (rule, value, callback) => {
      if (String(value).trim() === '') {
        callback(new Error('请输入负责人姓名'));
      } else if (getWordLen(value, 6)) {
        callback(new Error('长度6个字符内!'));
      } else {
        callback();
      }
    };
    var deptmentTrim = (rule, value, callback) => {
      if (String(value).trim() === '') {
        callback(new Error('请输入部门名称'));
      } else if (getWordLen(value, 15)) {
        callback(new Error('长度15个字符内!'));
      } else {
        callback();
      }
    };
    var positionTrim = (rule, value, callback) => {
      if (String(value).trim() === '') {
        callback(new Error('请输入岗位名称'));
      } else if (getWordLen(value, 15)) {
        callback(new Error('长度15个字符内!'));
      } else {
        callback();
      }
    };
    var productNameFn = (rule, value, callback) => {
      if (String(value).trim() === '') {
        callback(new Error('请输入产品名称!'));
      } else if (getWordLen(value, 25)) {
        callback(new Error('请输入在25个字符以内产品名称!'));
      } else if (this.isRepeat) {
        callback(new Error('请重新输入，该产品名称已存在!'));
      } else {
        callback();
      }
    };
    var productTypeFn = (rule, value, callback) => {
      if (String(value).trim() === '') {
        callback(new Error('选择产品类型!'));
      } else {
        callback();
      }
    };
    var priceFn = (rule, value, callback) => {
      var reg = /^\d{1,9}(?:\.\d{1,2})?$/;
      if (String(value).trim() === '') {
        callback(new Error('请输入价格!'));
      } else if (!reg.test(value)) {
        callback(new Error('请重新输入，最多9位数，小数位最多2位!!'));
      } else {
        callback();
      }
    };
    var descriptionFn = (rule, value, callback) => {
      if (String(value).trim() === '') {
        callback(new Error('请输入产品介绍!'));
      } else if (getWordLen(value, 500)) {
        callback(new Error('请输入500个字符以内产品介绍!'));
      } else {
        callback();
      }
    };
    return {
      isAddProduct: this.$route.params.id | false,
      isRepeat: false,
      currProductName: '',
      formData: {
        productId: '',
        productName: '',
        productType: '',
        price: '',
        description: '',
        username: '',
        deptment: '',
        version: '',
        position: '',
        salesList: []
      },
      formDataValid: {
        version: [
          { validator: versionTrim, trigger: 'blur' }
        ],
        username: [
          { required: true, validator: validTrim, trigger: 'blur' }
        ],
        deptment: [
          { required: true, validator: deptmentTrim, trigger: 'blur' }
        ],
        position: [
          { required: true, validator: positionTrim, trigger: 'blur' }
        ],
        productName: [
          { required: true, validator: productNameFn, trigger: 'blur' }
        ],
        productType: [
          { required: true, validator: productTypeFn, trigger: 'blur' }
        ],
        price: [
          { required: true, validator: priceFn, type: 'number', trigger: 'blur' }
        ],
        description: [
          { required: true, validator: descriptionFn, trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
    ...mapState({
      baseInfo: ({ product }) => product.baseInfo,
      composedProduct: ({ product }) => product.composedProduct,
      productSaleDemo: ({ product }) => product.productSaleDemo
    })
  },
  beforeMount() {
    this.getComposedProduct({});
    let returnStep = Number(localStorage.getItem('prevStep'));
    if (this.isAddProduct && this.isAddProduct > 0) {
      if (returnStep === 2) {
        this.formData = this.baseInfo;
      } else {
        var _this = this;
        var data = { productId: this.isAddProduct };
        this.getProductDetail(data).then(() => {
          var res = _this.productSaleDemo;
          if (res.productType === '个人市场') {
            res.productType = '0';
          } else if (res.productType === '政企市场') {
            res.productType = '1';
          }
          _this.formData = {
            productId: res.productId,
            productName: res.productName,
            productType: res.productType,
            price: res.price,
            description: res.description,
            username: res.username,
            deptment: res.deptment,
            version: res.version,
            position: res.position,
            salesList: []
          };
          _this.currProductName = res.productName;
        });
      }
    } else {
      if (returnStep === 2) {
        this.formData = this.baseInfo;
      }
    }
  },
  methods: {
    query() {
      // 产品数据查询方法
    },
    vaildRepeat(value) {
      this.isRepeat = false;
      let comArr = this.composedProduct;
      for (let item of comArr) {
        if (item.productName === value && value != this.currProductName) {
          this.isRepeat = true;
        }
      }
    },
    nextStep(vaildData) {
      this.$refs[vaildData].validate((valid) => {
        if (valid) {
          localStorage.setItem('nextStep', 1);
          localStorage.setItem('params', JSON.stringify(this.formData));
          this.saveBaseInfo(this.formData);
          if (this.isAddProduct) {
            this.$router.push({path: `/product/create-sale-step/${this.isAddProduct}`});
          } else {
            this.$router.push({path: '/product/create-sale-step'});
          }
        } else {
          return false;
        }
      });
    },
    ...mapActions([
      'getProductDetail',
      'saveBaseInfo',
      'getComposedProduct'
    ])
  }
};
</script>

<style lang="scss">
.p-content {
  .crumb-bar {
    .el-breadcrumb {
      line-height: 48px;
    }
  }
  .el-step.is-horizontal .el-step__line {height: 1px; background: #c0c0c0}
  .el-step__head.is-process, .el-step__title.is-process {color: #8c8c8c; font-weight: 400;}
  .el-step.is-simple .el-step__arrow::before, .el-step.is-simple  .el-step__arrow:before {display: none}
  .el-step.is-simple .el-step__arrow::after, .el-step.is-simple  .el-step__arrow:after {-webkit-transform: none; transform: none; height: 1px; width: 320px;}
  .el-step__icon.is-text {border-width: 1px;}
  .creat-content {background: #fff; margin-top: 16px; min-height: 812px; height: auto;}
  .el-steps--simple {background: none;}
  .el-steps--horizontal {width: 480px; padding: 30px; margin: 0 auto;}
  .add-content {width: 460px; margin: 0 auto;}
  .demo-input-size .split {display: inline-block; width: 15px; color: #8c8c8c; text-align: center;}
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
}
</style>
