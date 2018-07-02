<template>
<div class="p-content">
  <div class="crumb-bar"><span>产品创建管理 / </span>新建产品</div>
  <div class="creat-content">
    <el-steps :active="2" finish-status="success" align-center>
      <el-step title="产品基本信息"></el-step>
      <el-step title="产品销售案例"></el-step>
    </el-steps>
    <div class="creat-model">
      <wm-table
        v-if="cacheData && cacheData.length > 0"
        :source="cacheData"
        :pageNo="formData.pageNo"
        :pageSize="formData.pageSize"
      >
          <el-table-column label="销售类型" property="salesType" :formatter="salesTypeFormat">
          </el-table-column>
          <el-table-column label="组合产品" property="productId" :formatter="productNameFormat">
          </el-table-column>
          <el-table-column label="方案介绍" property="scheme">
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
        <h3 class="title">添加销售案例<span>（可添加多个销售案例）</span></h3>
        <el-form class="add-content" :model="formData" label-width="130px">
          <el-form-item label="销售类型：">
            <el-radio v-model="formData.salesType" label="1">单品销售</el-radio>
            <el-radio v-model="formData.salesType" label="2">组合销售</el-radio>
          </el-form-item>
          <el-form-item v-if="formData.salesType === '2'" label="组合产品：" label-width="130px">
            <el-input v-model="formData.productId" placeholder="产品名称/编码"></el-input>
          </el-form-item>
          <el-form-item label="方案介绍：" label-width="130px">
            <el-input v-model="formData.scheme" placeholder="请简要概述方案" type="textarea" :rows="4"></el-input>
          </el-form-item>
          <el-form-item label="销售数量：" label-width="130px">
            <el-input v-model="formData.salesNumber" placeholder="请输入数量"></el-input>
          </el-form-item>
          <el-form-item label="创新点/借鉴点：" label-width="130px">
            <el-input v-model="formData.keypoint" placeholder="请简要概述创新点或借鉴点" type="textarea" :rows="4"></el-input>
          </el-form-item>
          <el-form-item label="经验教训：" label-width="130px">
            <el-input v-model="formData.experience" placeholder="请简要概述经验教训" type="textarea" :rows="4"></el-input>
          </el-form-item>
          <el-form-item label="经验教训：" label-width="130px">
            <el-upload
              label="方案附件："
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/">
              <el-button size="small" type="primary">+上传附件</el-button>
              <div slot="tip" class="el-upload__tip">
                <p>1. 附件格式支持“word、excel、ppt、pdf、rar“格式</p>
                <p>2. 附件大小不超过20M。</p>
              </div>
            </el-upload>
          </el-form-item>
          <el-row class="mt28 mb10">
            <el-button type="primary" round size="mini" @click="onSubmit">确定</el-button>
            <el-button round size="mini" @click="reset">取消</el-button>
          </el-row>
        </el-form>
      </div>
      <div class="add-demo" @click="addSaleDome">+ 添加销售案例</div>
      <el-row class="mt28 mb10">
        <el-button plain>上一步</el-button>
        <el-button type="primary" @click="creartProduct">确定</el-button>
      </el-row>
    </div>
  </div>
</div>
</template>

<script>
// import { mapState, mapActions } from 'vuex';
import WmTable from 'components/Table.vue';

export default {
  components: {
    WmTable
  },
  data() {
    return {
      modefiyIndex: -1,
      params: {},
      isShow: true,
      cacheData: [],
      formData: {
        productId: '',
        salesId: '',
        salesType: '1',
        scheme: '',
        salesNumber: '',
        keypoint: '',
        experience: '',
        composedProduct: ''
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
    salesTypeFormat(row, column, cellValue) {
      if (cellValue === '1') {
        return '单品销售';
      } else {
        return '组合销售';
      }
    },
    productNameFormat(row, column, cellValue) {
      if (row.salesType === '1') {
        return '无';
      } else {
        return cellValue;
      }
    },
    addSaleDome() {
      // var flag = this.isState();
      if (this.isShow) {
        this.$message({showClose: true, message: '请先保存产品案例', type: 'warning'});
      } else {
        this.reset();
      }
      this.isShow = true;
    },
    onSubmit() {
      if (this.modefiyIndex !== -1) {
        this.cacheData.splice(this.modefiyIndex, this.modefiyIndex + 1);
        this.params.salesList = this.cacheData;
      }
      this.params = JSON.parse(localStorage.getItem('params'));
      this.cacheData.push(this.formData);
      this.params.salesList = this.cacheData;
      this.isShow = false;
      this.reset();
    },
    creartProduct() {
      // 添加 this.params
      this.$message({showClose: true, message: '恭喜您，产品创建成功！', type: 'success'});
    },
    isState() {
      for (var i in this.formData) {
        if (i > 0 && this.formData[i] !== '') {
          return true;
        }
      }
      return false;
    },
    toPageModefiy(index, row) {
      this.modefiyIndex = index;
      this.isShow = true;
      this.formData = {
        productId: row.productId + '',
        salesId: row.salesId + '',
        salesType: row.salesType + '',
        scheme: row.scheme + '',
        salesNumber: row.salesNumber + '',
        keypoint: row.keypoint + '',
        experience: row.experience + '',
        composedProduct: row.composedProduct + ''
      };
    },
    deleteProduct(index, row) {
      // 校验商机和订单是否有用到
      this.$confirm('删除该产品数据, 是否继续?', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        // 删除操作
        this.cacheData.splice(index, index + 1);
        this.params.salesList = this.cacheData;
        this.$message('已删除');
      }).catch(() => {
        this.$message('已取消删除');
      });
    },
    reset() {
      this.formData = {
        salesType: '1',
        salesNumber: '',
        scheme: '',
        experience: '',
        keypoint: '',
        pageNo: 1,
        pageSize: 10
      };
      this.modefiyIndex = -1;
    },
    nextStep() {
      localStorage.setItem('params', this.formData);
      this.$router.push({path: '/product/create-sale-step02'});
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
.creat-content {background: #fff; margin-top: 16px; min-height: 812px; height: auto; padding-bottom: 20px;}
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
