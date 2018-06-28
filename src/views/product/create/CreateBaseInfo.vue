<template>
<div class="p-content">
  <div class="crumb-bar"><span>产品创建管理 / </span>新建产品</div>
  <div class="creat-content">
    <el-steps :active="1" finish-status="success" align-center>
      <el-step title="产品基本信息"></el-step>
      <el-step title="产品销售案例"></el-step>
    </el-steps>
    <el-form class="add-content" :model="formData" label-width="90px">
      <el-form-item label="产品名称：">
        <el-input v-model="formData.productName" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="产品类别：" label-width="90px">
        <el-select style="width: 100%;" v-model="formData.productType" placeholder="请选择类别">
          <el-option value="">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产品价格：" label-width="90px">
        <el-input v-model="formData.productPrice" placeholder="请输入价格"><template slot="append">元</template></el-input>
      </el-form-item>
      <el-form-item label="负责人：" label-width="90px">
        <el-input v-model="formData.operatorCn" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="产品介绍：" label-width="90px">
        <el-input v-model="formData.productDesc" placeholder="/" type="textarea" :rows="3"></el-input>
      </el-form-item>
      <el-form-item class="mt28">
        <el-button type="primary" @click="nextStep">下一步</el-button>
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
    return {
      formData: {
        productName: '',
        productType: '',
        productPrice: '',
        operatorCn: '',
        productDesc: ''
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
    nextStep() {
      sessionStorage.setItem('params', this.formData);
      this.$router.push({path: '/product/create-sale-step01'});
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
.creat-content {background: #fff; margin-top: 16px; height: 832px;}
.el-steps--simple {background: none;}
.el-steps--horizontal {width: 480px; padding: 30px; margin: 0 auto;}
.add-content {width: 430px; margin: 0 auto;}
.el-form-item {margin-bottom: 10px;}
</style>
