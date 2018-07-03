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
        :source="cacheData">
          <el-table-column label="销售类型" property="salesType" :formatter="salesTypeFormat">
          </el-table-column>
          <el-table-column label="组合产品" property="composedProduct" :formatter="productNameFormat">
          </el-table-column>
          <el-table-column label="方案介绍" property="scheme" prop="">
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
        <el-form class="add-content"
          :model="formData"
          :rules="formDataValid"
          :ref="formData"
          label-width="130px">
          <el-form-item label="销售类型：">
            <el-radio v-model="formData.salesType" label="0">单品销售</el-radio>
            <el-radio v-model="formData.salesType" label="1">组合销售</el-radio>
          </el-form-item>
          <el-form-item v-if="formData.salesType === '1'" label="组合产品：" prop="composedProduct" label-width="130px">
            <el-input v-model="formData.composedProduct" placeholder="产品名称/编码"></el-input>
          </el-form-item>
          <el-form-item label="方案介绍：" label-width="130px"  prop="scheme">
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
            <el-button type="primary" round size="mini" @click="onSubmit(formDataValid)">确定</el-button>
            <el-button round size="mini" @click="reset(formDataValid)">取消</el-button>
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
import { mapActions } from 'vuex';
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
      formData: {
        salesId: '',
        salesType: '0',
        scheme: '',
        salesNumber: '',
        keypoint: '',
        experience: '',
        composedProduct: ''
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
  methods: {
    salesTypeFormat(row, column, cellValue) {
      if (cellValue === '0') {
        return '单品销售';
      } else {
        return '组合销售';
      }
    },
    productNameFormat(row, column, cellValue) {
      if (row.salesType === '0') {
        return '无';
      } else {
        return cellValue;
      }
    },
    addSaleDome() {
      if (this.isShow) {
        this.$message({showClose: true, message: '请先保存产品案例', type: 'warning'});
      } else {
        this.isShow = true;
        this.reset();
      }
    },
    onSubmit(vaildData) {
      var _this = this;
      this.$refs[vaildData].validate((valid) => {
        if (valid) {
          if (_this.modefiyIndex !== -1) {
            _this.cacheData.splice(_this.modefiyIndex, _this.modefiyIndex + 1);
            _this.params.salesList = _this.cacheData;
          }
          _this.params = JSON.parse(localStorage.getItem('params'));
          _this.cacheData.push(_this.formData);
          _this.params.salesList = _this.cacheData;
          _this.isShow = false;
        } else {
          return false;
        }
      });
    },
    creartProduct() {
      console.log(this.params);
      var _this = this;
      this.setAddProduct(_this.params).then((res) => {
        if (res.data && res.errorInfo.code === '200') {
          _this.$message({showClose: true, message: '新增产品成功！', type: 'success'});
          this.$router.push({path: '/product/product-creat-manage'});
        }
      });
    },
    toPageModefiy(index, row) {
      this.modefiyIndex = index;
      this.isShow = true;
      this.formData = {
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
    reset(validData) {
      this.formData = {
        // productId: '',
        salesId: '',
        salesType: '1',
        scheme: '',
        salesNumber: '',
        keypoint: '',
        experience: '',
        composedProduct: ''
      };
      this.modefiyIndex = -1;
      if (validData) {
        this.$refs[validData].resetFields();
      }
    },
    prevStep() {
      this.$router.go(-1);
    },
    ...mapActions([
      'setAddProduct'
    ])
  }
};
</script>

<style lang="scss">
.el-step.is-horizontal .el-step__line {height: 1px; background: #c0c0c0}
.el-step__head.is-process, .el-step__title.is-process {color: #8c8c8c; font-weight: 400;}
.el-step.is-simple .el-step__arrow::before, .el-step.is-simple  .el-step__arrow:before {display: none}
.el-step.is-simple .el-step__arrow::after, .el-step.is-simple  .el-step__arrow:after {-webkit-transform: none; transform: none; height: 1px; width: 320px;}
.el-step__icon.is-text {border-width: 1px;}
.creat-content {background: #fff; margin-top: 16px; min-height: 812px; height: auto;}
.el-steps--simple {background: none;}
.el-steps--horizontal {width: 480px; padding: 30px; margin: 0 auto;}
.add-content {width: 430px; margin: 0 auto; padding: 33px 0 20px;}
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
