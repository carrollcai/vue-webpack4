<template>
<div class="p-content">
  <div class="crumb-bar"><span>产品创建管理 / </span>新建产品</div>
  <div class="creat-content">
    <el-steps :active="1" finish-status="success" align-center>
      <el-step title="产品基本信息"></el-step>
      <el-step title="产品销售案例"></el-step>
    </el-steps>
    <el-form class="add-content" status-icon
      :model="formData"
      :rules="formDataValid"
      :ref="formData"
      label-width="90px">
      <el-form-item label="产品名称：" label-width="110px" prop="productName">
        <el-input v-model="formData.productName" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="产品类别：" label-width="110px" prop="productType">
        <el-select style="width: 100%;" v-model="formData.productType" placeholder="请选择类别">
          <el-option label="类别一" value="1"></el-option>
          <el-option label="类别二" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产品价格：" label-width="110px" prop="price">
        <el-input v-model="formData.price" placeholder="请输入价格"><template slot="append">元</template></el-input>
      </el-form-item>
      <el-form-item label="负责人：" label-width="110px" class="demo-input-size" prop="wheelPople">
        <el-input
          v-model="formData.username" placeholder="姓名" style="width: 100px;"></el-input><span class="split">-</span>
        <el-input v-model="formData.deptment" placeholder="部门" style="width: 100px;"></el-input><span class="split">-</span>
        <el-input v-model="formData.position" placeholder="职业" style="width: 100px;"></el-input>
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
// import { mapState, mapActions } from 'vuex';

export default {
  components: {
  },
  data() {
    function isChinese(str) {
      for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94) {
        } else {
          return false;
        }
      }
      return true;
    }
    var productNameFn = (rule, value, callback) => {
      var flag = isChinese(value);
      if (value === '') {
        callback(new Error('请输入产品名称!'));
      } else if (!flag || value.length > 15) {
        callback(new Error('请输入在25个汉字以内产品名称!'));
      } else {
        callback();
      }
    };
    var productTypeFn = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('选择产品类型!'));
      } else {
        callback();
      }
    };
    var priceFn = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入价格!'));
      } else if (!Number.isInteger(value) && Number(value) < 100000000) {
        callback(new Error('请输入9位以内的数字!'));
      } else {
        callback();
      }
    };
    var descriptionFn = (rule, value, callback) => {
      var flag = isChinese(value);
      if (value === '') {
        callback(new Error('请输入产品介绍!'));
      } else if (!flag || value.length > 500) {
        callback(new Error('请输入500个汉字以内产品介绍!'));
      } else {
        callback();
      }
    };
    return {
      formData: {
        productId: '',
        // productName: '',
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
        productName: [
          { required: true, validator: productNameFn, trigger: 'blur' }
        ],
        productType: [
          { required: true, validator: productTypeFn, trigger: 'blur' }
        ],
        price: [
          { required: true, validator: priceFn, type: 'number', trigger: 'blur' }
        ],
        wheelPople: [
          {required: true}
        ],
        description: [
          { required: true, validator: descriptionFn, trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
  },
  beforeMount() {
  },
  methods: {
    query() {
      // 产品数据查询方法
    },
    nextStep(vaildData) {
      var _this = this;
      this.$refs[vaildData].validate((valid) => {
        if (valid) {
          localStorage.setItem('params', JSON.stringify(_this.formData));
          this.$router.push({path: '/product/create-sale-step01'});
        } else {
          return false;
        }
      });
    },
    isChinese(str) {
      for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94) {
        } else {
          return false;
        }
      }
      return true;
    }
  },
  onload() {
  }
};
</script>

<style lang="scss">
.el-step.is-horizontal .el-step__line {height: 1px; background: #c0c0c0}
.el-step__head.is-process, .el-step__title.is-process {color: #8c8c8c; font-weight: 400;}
.el-step.is-simple .el-step__arrow::before, .el-step.is-simple  .el-step__arrow:before {display: none}
.el-step.is-simple .el-step__arrow::after, .el-step.is-simple  .el-step__arrow:after {-webkit-transform: none; transform: none; height: 1px; width: 320px;}
.el-step__icon.is-text {border-width: 1px;}
.creat-content {background: #fff; margin-top: 16px; min-height: 812px; height: auto; padding-bottom: 20px;}
.el-steps--simple {background: none;}
.el-steps--horizontal {width: 480px; padding: 30px; margin: 0 auto;}
.add-content {width: 460px; margin: 0 auto;}
.demo-input-size .split {display: inline-block; width: 15px; color: #8c8c8c; text-align: center;}
</style>
