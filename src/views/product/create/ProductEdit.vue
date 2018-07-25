<template>
<div class="product-edit">
  <div class="m-container">
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/product/product-creat-manage' }">产品创建管理</el-breadcrumb-item>
      <el-breadcrumb-item>修改产品</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div class="m-container info-block">
    <steps :active="step">
        <step title="产品基本信息"></step>
        <step title="产品销售案例"></step>
      </steps>
    <el-form class="base-info"
      v-if="isFirstStep()"
      :model="product"
      :rules="baseFormRules"
      ref="baseForm"
      label-width="120px">
      <el-form-item label="产品名称" prop="productName">
        <el-input
          class="full-col"
          v-model="product.productName"
          :maxlength="25"
          placeholder="请输入名称"></el-input>
      </el-form-item>

      <el-form-item label="产品类别" prop="productType">
        <el-select v-model="product.productType" placeholder="请选择产品类别">
          <el-option label="个人市场" value="0"></el-option>
          <el-option label="政企市场" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产品价格" prop="price">
        <el-input class="full-col" v-model="product.price" placeholder="数字允许小数点后两位小数">
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
      <el-form-item label="负责人" required class="col-item">
        <el-col :span="7">
          <el-form-item prop="username">
            <el-input v-model="product.username"
              :maxlength="6"
              class="col-input"
              placeholder="姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="line-container" :span="1">
          <div class="line"></div>
        </el-col>
        <el-col :span="7">
          <el-form-item prop="deptment">
            <el-input v-model="product.deptment"
              class="col-input"
              :maxlength="15"
              placeholder="部门"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="line-container" :span="1">
          <div class="line"></div>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="position">
            <el-input v-model="product.position"
              class="col-input"
              :maxlength="15"
              placeholder="岗位"></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="版本号" prop="version">
        <el-input
          class="full-col"
          v-model="product.version"
          :maxlength="20"
          placeholder="请输入版本号"></el-input>
      </el-form-item>
      <el-form-item label="产品介绍" prop="description">
        <el-input
          class="full-col"
          v-model="product.description"
          :maxlength="500"
          placeholder="请输入介绍" type="textarea" :rows="3"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="toSecondStep()">下一步</el-button>
      </el-form-item>
    </el-form>
    <div class="second-step" v-if="isSecondStep()">
      <el-table
        border
        v-if="!isAddingCase"
        :data="getTableData()">
        <el-table-column label="销售类型" width="80" property="salesType" :formatter="salesTypeFormat">
        </el-table-column>
        <el-table-column label="组合产品" property="composedProduct" :formatter="composedProductFormat" show-overflow-tooltip >
        </el-table-column>
        <el-table-column label="方案介绍" align="center" show-overflow-tooltip property="scheme" prop="">
        </el-table-column>
        <el-table-column label="销售数量" width="80" property="salesNumber">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEditCase(scope.row, scope.$index)">
                编辑
            </el-button>
            <el-button type="text" @click="handleDeleteCase(scope.$index, scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="btn_add-case" v-if="!isAddingCase" @click="addCase">
        <i class="el-icon-plus"></i> 添加销售案例
      </div>
      <product-case ref="prodctCases" v-if="isAddingCase" @cancel="cancelAddingCase" :list="cases"></product-case>
      <div class="">
        <el-button type="primary" @click="toFirstStep">上一步</el-button>
        <el-button type="primary"
          @click="submitProduct"
          :disabled="isDisabled()"
          :loading="isSubmit">{{ isSubmit ? '加载中' : '确定'}}</el-button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import mixins from './mixins';
export default {
  name: 'ProductCreate',
  mixins: [mixins],
  data() {
    return {
      step: 0,
      isSubmit: false
    };
  },
  computed: {
    ...mapState({
      product: ({ product }) => product.productSaleDemo
    }),
    cases() {
      return this.product.salesList;
    }
  },
  beforeMount() {
    this.init();
  },
  methods: {
    init() {
      let id = this.$route.params.id;

      this.getProductDetail({ productId: id });
    },
    getTableData() {
      return this.cases.filter((item) => item.state !== '0');
    },
    isDisabled() {
      return !(!this.isAddingCase);
    },
    submitProduct() {
      const that = this;
      const {cases} = that;
      that.isSubmit = true;

      // 有方案附件, 先上传文件
      if (this.hasFiles(cases)) {
        let promises = [];
        for (let productCase of cases) {
          let files = productCase.files;
          let deleteFiles = productCase.deleteFiles;

          // 删除文件
          if (deleteFiles && deleteFiles.length) {
            for (let deleteFile of deleteFiles) {
              let promise = new Promise((resolve, reject) => {
                this.delUplodFile({elecInstId: deleteFile.elecInstId, fileTypeId: 502}).then((res) => {
                  resolve();
                }, (err) => {
                  reject(new Error(err));
                });
              });

              promises.push(promise);
            }
          }

          // 上传新增的文件
          if (files && files.length) {
            let fileInputId = productCase.fileInputId;
            let uploadingFiles = [];
            let promise;

            // 新增时已经上传过文件
            if (fileInputId) {
              for (let file of files) {
                if (!file.fileInputId) {
                  uploadingFiles.push(file);
                }
              }
              promise = new Promise((resolve, reject) => {
                let uploadData = {
                  fileInputId,
                  fileTypeId: 502,
                  moduleId: 1,
                  expireDate: '',
                  effectiveDate: '',
                  files: []
                };
                uploadData.files = uploadingFiles;
                that.uploadProductScheme(uploadData).then(() => {
                  resolve();
                }, (err) => {
                  reject(new Error(err));
                });
              });
            } else {
              for (let file of files) {
                uploadingFiles.push(file);
              }
              promise = new Promise((resolve, reject) => {
                that.getProductFileId().then((res) => {
                  let fileInputId = res.data;

                  let uploadData = {
                    fileInputId,
                    fileTypeId: 502,
                    moduleId: 1,
                    expireDate: '',
                    effectiveDate: '',
                    files: []
                  };
                  uploadData.files = uploadingFiles;
                  that.uploadProductScheme(uploadData).then(() => {
                    productCase.fileInputId = fileInputId;
                    resolve();
                  }, (err) => {
                    reject(new Error(err));
                  });
                }, (err) => {
                  reject(new Error(err));
                });
              });
            }

            promises.push(promise);
          }
        }

        Promise.all(promises).then(() => {
          this.removeCaseAttributs(cases);
          this.removeAttributes(this.product);
          this.dealWidthCases(this.product, this.cases);
          this.updateProduct(this.product).then(() => {
          }, () => {
            that.isSubmit = false;
          });
        }, () => {
          that.isSubmit = false;
        });
      } else {
        this.removeCaseAttributs(this.cases);
        this.removeAttributes(this.product);
        this.dealWidthCases(this.product, this.cases);
        this.updateProduct(this.product).then(() => {
        }, () => {
          that.isSubmit = false;
        });
      }
    },
    removeCaseAttributs(cases) {
      // 删除不必要的属性
      for (let productCase of cases) {
        delete productCase.files;
        delete productCase.deleteFiles;
      }
    },
    removeAttributes(product) {
      delete product.insertdate;
      delete product.updatedate;
      delete product.state;
    },
    dealWidthCases(product, cases) {
      for (let productCase of cases) {
        if (productCase.state === 1) {
          productCase.state = '3';
        }
      }

      product.salesList = cases;
    },
    /**
     * 判断销售案例中是否有方案附件
     */
    hasFiles(cases) {
      for (let productCase of cases) {
        let files = productCase.files;
        let deleteFiles = productCase.deleteFiles;
        if ((files && files.length) || (deleteFiles && deleteFiles.length)) {
          return true;
        }
      }

      return false;
    },
    ...mapActions([
      'updateProduct',
      'getProductDetail',
      'delUplodFile'
    ])
  }
};
</script>

<style lang="scss" src="./style.scss"></style>
