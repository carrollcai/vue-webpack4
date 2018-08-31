<template>
<div class="product-edit">
  <div class="m-container">
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/product/product-creat-manage' }">产品创建管理</el-breadcrumb-item>
      <el-breadcrumb-item>修改产品</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div class="m-container info-block">
    <!--<steps :active="step">
        <step title="产品基本信息"></step>
        <step title="产品销售案例"></step>
      </steps>-->
    <el-form class="base-info"
      :model="productSaleDemo"
      :rules="baseFormRules"
      ref="baseForm"
      label-width="120px">
      <el-form-item label="产品名称" prop="productName">
        <el-input
          class="form-input-240"
          v-model="productSaleDemo.productName"
          :maxlength="25"
          placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="主营市场" prop="mainMarketArrCN">
        <!--{{productSaleDemo.mainMarketArr}}-->
        <el-checkbox-group v-model="productSaleDemo.mainMarketArrCN">
          <el-checkbox v-for="item in marketList" :label="item" :key="item">{{item}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="产品类别" prop="productType">
        <el-select class="form-input-240" v-model="productSaleDemo.productType" placeholder="请选择产品类别">
          <el-option label="卡类" value="1"></el-option>
          <el-option label="衍生品类" value="2"></el-option>
          <el-option label="活动类" value="3"></el-option>
          <el-option label="智能硬件类" value="4"></el-option>
          <el-option label="会员" value="5"></el-option>
          <el-option label="其他" value="6"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产品介绍" prop="description">
        <el-input
          v-model="productSaleDemo.description"
          :maxlength="500"
          placeholder="请输入介绍" type="textarea" :rows="3" resize="none"></el-input>
      </el-form-item>
      <el-form-item label="价格策略:">
        <el-input maxlength="500" resize="none" type="textarea" v-model="productSaleDemo.priceStrategy" placeholder="请输入介绍"></el-input>
      </el-form-item>
      <el-form-item label="商务策略:">
        <el-input maxlength="500" resize="none" type="textarea" v-model="productSaleDemo.commercialStrategy" placeholder="请输入介绍"></el-input>
      </el-form-item>
      <el-form-item label="产品归属:" class="col-item">
        <el-col :span="11">
          <el-form-item>
            <el-select v-model="productSaleDemo.belongToCompany" placeholder="选择产品归属" @change="selectBelongToCompany">
              <el-option label="无" value="无"></el-option>
              <el-option label="核心能力清单" value="核心能力清单"></el-option>
              <el-option label="一级集采目录" value="一级集采目录"></el-option>
              <el-option label="二级集采目录" value="二级集采目录"></el-option>
              <el-option label="终端库" value="终端库"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <div v-if="productSaleDemo.belongToCompany === '一级集采目录' || productSaleDemo.belongToCompany === 2 || productSaleDemo.belongToCompany === '2'">
          <el-col class="line-container" :span="2">
            <div class="line"></div>
          </el-col>
          <el-col :span="11">
            <el-form-item>
              <el-cascader v-if="firstCollectionType" placeholder="类别"
                :options="firstCollectionType"
                v-model="productSaleDemo.secondOptionArr"
                @change="changeFirstCollectType">
              </el-cascader>
            </el-form-item>
          </el-col>
        </div>
        <div v-if="productSaleDemo.belongToCompany === '核心能力清单' || productSaleDemo.belongToCompany === 1 || productSaleDemo.belongToCompany === '1'">
          <el-col class="line-container" :span="2">
            <div class="line"></div>
          </el-col>
          <el-col :span="11">
            <el-form-item>
              <el-select v-model="productSaleDemo.secondOptionArr" placeholder="核心能力" @change="selectCoreAbility">
                <!--<el-option label="个人-内容及服务" value="0"></el-option>
                <el-option label="家庭-硬件" value="1"></el-option>
                <el-option label="能力-音视频" value="2"></el-option>
                <el-option label="业务运营服务" value="3"></el-option>-->
                <el-option
                  v-for="item in coreAbilityType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </div>
      </el-form-item>
      <el-form-item v-if="productSaleDemo.belongToCompany === '一级集采目录' || productSaleDemo.belongToCompany === '核心能力清单' || productSaleDemo.belongToCompany === '1' || productSaleDemo.belongToCompany === '2'">
        <el-col :span="24">
            <el-form-item>
              <el-select class="form-input-320" v-model="productSaleDemo.specificProduct" placeholder="具体能力及产品">
                <!--specificProductList-->
                <el-option
                  v-for="item in specProductList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
      </el-form-item>
      <el-form-item label="产品对接人:" class="col-item">
        <el-col :span="11">
          <el-form-item prop="broker">
            <el-select v-model="productSaleDemo.broker" placeholder="对接人" @change="selectBroker">
              <el-option
                v-for="item in brokerList"
                :key="item.value"
                :label="item.label"
                :value="item.value"></el-option>
              <!--<el-option label="无" value="0"></el-option>
              <el-option label="核心能力清单" value="1"></el-option>
              <el-option label="一级集采目录" value="2"></el-option>
              <el-option label="二级集采目录" value="3"></el-option>
              <el-option label="终端库" value="4"></el-option>-->
            </el-select>
          </el-form-item>
        </el-col>
        <el-col class="line-container" :span="2">
          <div class="line"></div>
        </el-col>
        <el-col :span="11">
          <el-form-item prop="mobile">
            <el-input
            v-model="productSaleDemo.mobile"
            :maxlength="11"
            placeholder="手机号"></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="11">
          <el-form-item prop="deptment">
            <el-input
            v-model="productSaleDemo.deptment"
            :maxlength="15"
            placeholder="部门"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="line-container" :span="2">
          <div class="line"></div>
        </el-col>
        <el-col :span="11">
          <el-form-item prop="position">
            <el-input
            v-model="productSaleDemo.position"
            :maxlength="15"
            placeholder="岗位"></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
      <!--{{cases}}{{uploadFiles}}-->
      <el-form-item label="产品资料">
        <el-upload class="upload-files"
          :limit="FILE_MAX_COUNT"
          :auto-upload="false"
          :on-change="handleChangeFile"
          :on-remove="handleRemoveFile"
          :on-exceed="handleExceed"
          :file-list="uploadFiles">
          <el-button slot="trigger" size="small" class="form-input-128">
            <i class="icon-up margin-right-8"></i>上传文件
          </el-button>
          <div slot="tip" class="el-upload__tip">
            <p class="lh1-5">{{FILE_TIP[0]}}</p>
            <p class="lh1-5">{{FILE_TIP[1]}}</p>
          </div>
        </el-upload>
      </el-form-item>
      <!--<el-form-item label="产品价格" prop="price">
        <el-input class="full-col" v-model="product.price" placeholder="数字允许小数点后两位小数">
          <template slot="append">元</template>
        </el-input>
      </el-form-item>-->
      <!--<el-form-item label="负责人" required class="col-item">
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
      </el-form-item>-->
      <!--<el-form-item label="版本号" prop="version">
        <el-input
          class="full-col"
          v-model="product.version"
          :maxlength="20"
          placeholder="请输入版本号"></el-input>
      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" @click="submitProduct()">立即提审</el-button>
        <el-button @click="cancel()">取消</el-button>
        <!--<el-button type="primary" @click="toSecondStep()">下一步</el-button>-->
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
          :disabled="isNotAbleToSubmit()"
          :loading="isSubmit">{{ isSubmit ? '加载中' : '确定'}}</el-button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import mixins from './mixins';
import { FILE_TYPE_ID } from '@/config/index.js';
import endsWith from 'lodash/endsWith';
import {
  FILE_ACCEPT,
  FILE_TIP,
  FILE_MAX_COUNT,
  FILE_MAX_SIZE,
  FILE_ERROR_TIP
} from '@/config';
export default {
  name: 'ProductCreate',
  mixins: [mixins],
  data() {
    return {
      step: 0,
      isSubmit: false,
      marketList: ['政企市场', '家庭市场', '个人市场'],
      FILE_TIP,
      // uploadFiles: [],
      deleteFiles: []
    };
  },
  computed: {
    ...mapState({
      productSaleDemo: ({ product }) => product.productSaleDemo,
      firstCollectionType: ({ product }) => product.firstCollectionType,
      firstCollectList: ({ product }) => product.firstCollectList,
      coreAbilityList: ({ product }) => product.coreAbilityList,
      brokerList: ({ product }) => product.brokerList,
      coreAbilityType: ({ product }) => product.coreAbilityType,
      specProductList: ({ product }) => product.specProductList
    }),
    uploadFiles() {
      if (this.productSaleDemo && this.productSaleDemo.secondOptionArr) {
        if (this.productSaleDemo && this.productSaleDemo.secondOptionArr.length < 2) {
          let obj = {};
          obj.codeType = 'CORE_ABILITY';
          obj.parentCode = this.productSaleDemo.secondOptionArr;
          this.getSpecProductList(obj);
        } else {
          let obj = {};
          obj.codeType = 'FIRST_COLLECTION';
          obj.parentCode = this.productSaleDemo.secondOptionArr[2];
          this.getSpecProductList(obj);
        }
      }
      return this.productSaleDemo.fileData;
    }
  },
  beforeMount() {
    this.getFirstCatalogType();
    this.getFirstCatalog();
    this.getCoreAbility();
    this.getBroker();
    this.getCoreAbilityType();
    this.init();
  },
  methods: {
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
    init() {
      let id = this.$route.params.id;

      this.getProductDetail({ productId: id }).then(res => {
        if (this.cases) {
          this.uploadFiles = this.productSaleDemo.fileData;
        }
      });
    },
    getTableData() {
      return this.cases.filter((item) => item.state !== '0');
    },
    submitProduct() {
      if (this.productSaleDemo.productFileid) {
        let fileInputId = this.productSaleDemo.productFileid;
        let params = {
          fileInputId: '',
          fileTypeId: FILE_TYPE_ID.product,
          moduleId: 1,
          files: this.uploadFiles
        };
        let _params = Object.assign(params, { fileInputId });
        this.uploadOrderHandleTask(_params).then(res => {
          let params = {};
          params.productId = this.productSaleDemo.productId;
          params.productName = this.productSaleDemo.productName;
          params.productType = this.productSaleDemo.productType;
          params.description = this.productSaleDemo.description;
          params.broker = this.productSaleDemo.broker;
          params.mobile = this.productSaleDemo.mobile;
          params.deptment = this.productSaleDemo.deptment;
          params.position = this.productSaleDemo.position;
          params.priceStrategy = this.productSaleDemo.priceStrategy;
          params.commercialStrategy = this.productSaleDemo.commercialStrategy;
          params.mainMarketArr = this.productSaleDemo.mainMarketArrCN;
          for (let i = 0; i < params.mainMarketArr.length; i++) {
            let item = params.mainMarketArr[i];
            if (item === '个人市场') {
              params.mainMarketArr[i] = 1;
            } else if (item === '家庭市场') {
              params.mainMarketArr[i] = 2;
            } else if (item === '政企市场') {
              params.mainMarketArr[i] = 3;
            }
          }
          params.secondOption = this.productSaleDemo.coreAbility;
          params.belongToCompany = this.productSaleDemo.belongToCompany;
          params.specificProduct = this.productSaleDemo.specificProduct;
          params.productFileid = this.productSaleDemo.productFileid;
          if (this.productSaleDemo.secondOptionArr) {
            if (typeof (this.productSaleDemo.secondOptionArr) === 'string') {
              let secArr = [];
              secArr.push(this.productSaleDemo.secondOptionArr);
              params.secondOption = secArr;
            } else {
              params.secondOption = this.productSaleDemo.secondOptionArr;
            }
          }
          if (params.belongToCompany === '核心能力清单' || params.belongToCompany === '一级集采目录') {
            if (params.secondOption && params.specificProduct) {
            } else {
              this.$message({ showClose: true, message: '若选择产品归属，请选择完整！', type: 'error' });
              return;
            }
          }
          this.updateProduct(params).then(res => {
            this.$router.push(`/product/product-creat-manage`);
          });
        });
      }
      // const that = this;
      // const {cases} = that;
      // that.isSubmit = true;
      // 修改产品时，对销售案例进行修改
      // 有方案附件, 先上传文件
      // if (this.hasFiles(cases)) {
      //   let promises = [];
      //   for (let productCase of cases) {
      //     let files = productCase.files;
      //     let deleteFiles = productCase.deleteFiles;

      //     // 删除文件
      //     if (deleteFiles && deleteFiles.length) {
      //       for (let deleteFile of deleteFiles) {
      //         let promise = new Promise((resolve, reject) => {
      //           this.delUplodFile({elecInstId: deleteFile.elecInstId, fileTypeId: FILE_TYPE_ID.product}).then((res) => {
      //             resolve();
      //           }, (err) => {
      //             reject(new Error(err));
      //           });
      //         });

      //         promises.push(promise);
      //       }
      //     }

      //     // 上传新增的文件
      //     if (files && files.length) {
      //       let fileInputId = productCase.fileInputId;
      //       let uploadingFiles = [];
      //       let promise;

      //       // 新增时已经上传过文件
      //       if (fileInputId) {
      //         for (let file of files) {
      //           if (!file.fileInputId) {
      //             uploadingFiles.push(file);
      //           }
      //         }
      //         promise = new Promise((resolve, reject) => {
      //           let uploadData = {
      //             fileInputId,
      //             fileTypeId: FILE_TYPE_ID.product,
      //             moduleId: 1,
      //             expireDate: '',
      //             effectiveDate: '',
      //             files: []
      //           };
      //           uploadData.files = uploadingFiles;
      //           that.uploadProductScheme(uploadData).then(() => {
      //             resolve();
      //           }, (err) => {
      //             reject(new Error(err));
      //           });
      //         });
      //       } else {
      //         for (let file of files) {
      //           uploadingFiles.push(file);
      //         }
      //         promise = new Promise((resolve, reject) => {
      //           that.getProductFileId().then((res) => {
      //             let fileInputId = res.data;

      //             let uploadData = {
      //               fileInputId,
      //               fileTypeId: FILE_TYPE_ID.product,
      //               moduleId: 1,
      //               expireDate: '',
      //               effectiveDate: '',
      //               files: []
      //             };
      //             uploadData.files = uploadingFiles;
      //             that.uploadProductScheme(uploadData).then(() => {
      //               productCase.fileInputId = fileInputId;
      //               resolve();
      //             }, (err) => {
      //               reject(new Error(err));
      //             });
      //           }, (err) => {
      //             reject(new Error(err));
      //           });
      //         });
      //       }

      //       promises.push(promise);
      //     }
      //   }

      //   Promise.all(promises).then(() => {
      //     this.removeCaseAttributs(cases);
      //     this.removeAttributes(this.product);
      //     this.dealWidthCases(this.product, this.cases);
      //     this.updateProduct(this.product).then(() => {
      //     }, () => {
      //       that.isSubmit = false;
      //     });
      //   }, () => {
      //     that.isSubmit = false;
      //   });
      // } else {
      //   this.removeCaseAttributs(this.cases);
      //   this.removeAttributes(this.product);
      //   this.dealWidthCases(this.product, this.cases);
      //   this.updateProduct(this.product).then(() => {
      //   }, () => {
      //     that.isSubmit = false;
      //   });
      // }
    },
    cancel() {
      this.$router.push(`/product/product-creat-manage`);
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
    selectBelongToCompany() {
      let obj = {};
      obj.codeType = '';
      obj.parentCode = '';
      this.getSpecProductList(obj);
      this.productSaleDemo.secondOptionArr = '';
      this.productSaleDemo.specificProduct = '';
      if (this.productSaleDemo.belongToCompany === '2' || this.productSaleDemo.belongToCompany === '一级集采目录') {
        this.getFirstCatalogType();
        this.isFirstLevel = true;
      } else {
        this.isFirstLevel = false;
      }
      if (this.productSaleDemo.belongToCompany === '1' || this.productSaleDemo.belongToCompany === '核心能力清单') {
        this.getCoreAbilityType();
        this.isCoreCompetency = true;
      } else {
        this.isCoreCompetency = false;
      }
    },
    selectCoreAbility(item) {
      this.productSaleDemo.specificProduct = '';
      let obj = {};
      obj.codeType = 'CORE_ABILITY';
      obj.parentCode = this.productSaleDemo.secondOptionArr;
      this.getSpecProductList(obj);
      let arr = [];
      arr.push(item);
      // this.productSaleDemo.secondOptionArr = arr;
    },
    changeFirstCollectType(item) {
      this.productSaleDemo.specificProduct = '';
      let type = this.productSaleDemo.secondOptionArr[2];
      let obj = {};
      obj.codeType = 'FIRST_COLLECTION';
      obj.parentCode = type;
      this.getSpecProductList(obj);
      this.firstCollectionType.map(val => {
        if (val.children) {
          val.children.map(val => {
            if (val.children) {
              val.children.map(val => {
                if (val.value === type) {
                  this.productSaleDemo.secondOptionStr = val.label;
                }
              });
            };
          });
        };
      });
    },
    selectBroker(item) {
      this.brokerList.map(val => {
        if (val.value === item) {
          this.productSaleDemo.mobile = val.mobile;
        }
      });
    },
    ...mapActions([
      'updateProduct',
      'getProductDetail',
      'delUplodFile',
      'getFirstCatalogType',
      'queryElec',
      'getFirstCatalog',
      'getCoreAbility',
      'getBroker',
      'getCoreAbilityType',
      'getSpecProductList',
      'uploadOrderHandleTask'
    ])
  }
};
</script>

<style lang="scss" src="./style.scss"></style>
