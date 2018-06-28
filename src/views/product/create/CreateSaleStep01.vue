<template>
<div class="p-content">
  <div class="crumb-bar"><span>产品创建管理 / </span>新建产品</div>
  <div class="creat-content">
    <el-steps :active="2" finish-status="success" align-center>
      <el-step title="产品基本信息"></el-step>
      <el-step title="产品销售案例"></el-step>
    </el-steps>
    <div class="creat-model">
      <div class="bor">
        <h3 class="title">添加销售案例<span>（可添加多个销售案例）</span></h3>
        <el-form class="add-content" :model="formData" label-width="130px">
          <el-form-item label="销售类型：">
            <el-radio v-model="formData.salesType" label="1">单品销售</el-radio>
            <el-radio v-model="formData.salesType" label="2">组合销售</el-radio>
          </el-form-item>
          <el-form-item label="销售数量：" label-width="130px">
            <el-input v-model="formData.salesNumber" placeholder="请输入数量"></el-input>
          </el-form-item>
          <el-form-item label="销售方案：" label-width="130px">
            <el-input v-model="formData.scheme" placeholder="请输入" type="textarea" :rows="4"></el-input>
          </el-form-item>
          <el-form-item label="经验教训：" label-width="130px">
            <el-input v-model="formData.experience" placeholder="请输入" type="textarea" :rows="4"></el-input>
          </el-form-item>
          <el-form-item label="创新点/借鉴点：" label-width="130px">
            <el-input v-model="formData.keypoint" placeholder="请输入" type="textarea" :rows="4"></el-input>
          </el-form-item>
          <el-row class="mt28 mb10">
            <el-button type="primary" round size="mini" @click="onSubmit">确定</el-button>
            <el-button round size="mini">取消</el-button>
          </el-row>
        </el-form>
      </div>
      <div class="add-demo" @click="addSaleDome">+ 添加销售案例</div>
      <el-row class="mt28 mb10">
        <el-button plain>上一步</el-button>
        <el-button type="primary" @click="nextStep">下一步</el-button>
      </el-row>
    </div>
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
      cacheData: [],
      formData: {
        salesType: '1',
        salesNumber: '',
        scheme: '',
        experience: '',
        keypoint: ''
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
      this.$router.push({path: '/product/create-sale-step02'});
    },
    addSaleDome() {
    },
    onSubmit() {
      this.cacheData.push(this.formData);
      console.log(sessionStorage.getItem('params'));
    },
    isState() {
      for (let item of this.formData) {
        if (item === '') {
          this.$message({showClose: true, message: '请先保存产品案例', type: 'warning'});
          return false;
        }
      }
    }
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
.add-content {width: 430px; margin: 0 auto; padding: 33px 0 20px;}
.el-form-item {margin-bottom: 10px;}
.creat-model {
  width: 587px;
  margin: 0 auto;
  .bor {
    width: 100%;
    border: 1px #e7e7e7 solid;
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
  .el-button--mini, .el-button--mini {
    line-height: 1;
  }
}
</style>
