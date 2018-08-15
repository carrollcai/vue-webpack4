import {mapActions} from 'vuex';
import Steps from '@/components/Steps.vue';
import Step from '@/components/Step.vue';
import ProductCase from './ProductCase.vue';
import { multFileValid } from '@/utils/rules.js';
import { FILE_TYPE_ID } from '@/config/index.js';
import {
  isEmpty as emptyValidator
} from '@/utils/rules';

export default {
  components: {
    Steps,
    Step,
    ProductCase
  },
  data() {
    const fileCheck = (rule, value, callback) => {
      multFileValid(this.uploadFiles, callback);
    };
    const priceFn = (rule, value, callback) => {
      const reg = /^\d{1,9}(?:\.\d{1,2})?$/;
      if (String(value).trim() === '') {
        callback(new Error('请输入价格'));
      } else if (!reg.test(value)) {
        callback(new Error('请重新输入，最多9位数，小数位最多2位'));
      } else {
        callback();
      }
    };

    return {
      step: 1,
      isAddingCase: false,
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
      baseFormRules: {
        productName: [
          { required: true, message: '请输入产品名称', trigger: ['blur', 'change'] },
          { validator: emptyValidator, trigger: ['blur', 'change'] }
        ],
        mainMarketArr: [
          { required: true, message: '请选择主营市场', trigger: ['blur', 'change'] }
        ],
        productType: [
          { required: true, message: '请选择产品类型', trigger: 'change' }
        ],
        price: [
          { required: true, validator: priceFn, type: 'number', trigger: ['blur', 'change'] }
        ],
        username: [
          { required: true, message: '请输入负责人姓名', trigger: ['blur', 'change'] },
          { validator: emptyValidator, trigger: ['blur', 'change'] }
        ],
        deptment: [
          { required: true, message: '请输入部门名称', trigger: ['blur', 'change'] },
          { validator: emptyValidator, trigger: ['blur', 'change'] }
        ],
        position: [
          { required: true, message: '请输入岗位名称', trigger: ['blur', 'change'] },
          { validator: emptyValidator, trigger: ['blur', 'change'] }
        ],
        description: [
          { required: true, message: '请输入产品介绍', trigger: ['blur', 'change'] },
          { validator: emptyValidator, trigger: ['blur', 'change'] }
        ],
        broker: [
          { required: true, message: '请选择对接人', trigger: 'change' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: ['blur', 'change'] },
          { validator: emptyValidator, trigger: ['blur', 'change'] }
        ],
        files: [
          { validator: fileCheck }
        ]
      }
    };
  },
  methods: {
    isFirstStep() {
      return this.step === 0;
    },
    isSecondStep() {
      return this.step === 1;
    },
    toFirstStep() {
      this.step = 0;
    },
    toSecondStep() {
      this.$refs.baseForm.validate((valid) => {
        if (valid) {
          this.step = 1;
          if (!this.cases.length) {
            this.isAddingCase = true;
          }
        }
      });
    },
    toSubmit() {
      this.$refs.baseForm.validate((valid) => {
        if (valid) {
          const {productCase} = this;
          // 新增
          if (this.uploadFiles && this.uploadFiles.length) {
            productCase.files = this.uploadFiles;
          }

          productCase.state = '2';

          this.list.push(productCase);
          let submitParams = Object.cloneDeep(this.product);
          submitParams.productId = this.proId;
          for (let i = 0; i < submitParams.mainMarketArr.length; i++) {
            let item = submitParams.mainMarketArr[i];
            if (item === '个人市场') {
              submitParams.mainMarketArr[i] = 1;
            } else if (item === '家庭市场') {
              submitParams.mainMarketArr[i] = 2;
            } else if (item === '政企市场') {
              submitParams.mainMarketArr[i] = 3;
            }
          }
          delete submitParams.state;
          delete submitParams.files;
          delete submitParams.salesList;
          if (submitParams.belongToCompany === '核心能力清单') {
            submitParams.secondOption = submitParams.secondOptionAbility;
          }
          delete submitParams.secondOptionAbility;
          // console.log(submitParams);
          // delete submitParams.secondOption;
          // submitParams.secondOption = submitParams.secondOptionStr;
          delete submitParams.secondOptionStr;
          if (submitParams.belongToCompany) {
            if (submitParams.secondOption && submitParams.specificProduct) {
            } else {
              this.$message({ showClose: true, message: '若选择产品属性，请选择完整！', type: 'error' });
              return;
            }
          }
          let params = {
            fileInputId: '',
            fileTypeId: FILE_TYPE_ID.product,
            moduleId: 1,
            files: this.uploadFiles
          };
          this.saveProduct({ params, submitParams });
        }
      });
    },
    handleDeleteCase(index, productCase) {
      let params = {};
      params.salesId = productCase.salesId;
      this.delSalesCase(params).then(res => {
        var data = {productId: productCase.productId};
        this.getSalesCaseDetail(data);
      });
      // if (productCase.salesId) {
      //   productCase.state = '0';
      // } else {
      //   this.cases.splice(index, 1);
      // }
    },
    handleEditCase(productCase, index) {
      this.isAddingCase = true;
      this.$nextTick(() => {
        this.$refs.prodctCases.init(productCase, index);
      });
    },
    isNotAbleToSubmit() {
      return !(!this.isAddingCase);
    },
    salesTypeFormat(row, column, cellValue) {
      return cellValue === '0' ? '单品销售' : '组合销售';
    },
    composedProductFormat(row, column, cellValue) {
      let composedStr = '';
      if (cellValue && cellValue.length > 0) {
        composedStr = cellValue.join('、');
      }
      return composedStr;
    },
    addCase() {
      this.isAddingCase = true;
    },
    cancelAddingCase() {
      this.isAddingCase = false;
    },
    cancel() {
      this.$router.push(`/product/product-creat-manage`);
    },
    ...mapActions([
      'getProductFileId',
      'uploadProductScheme',
      'delSalesCase',
      'getSalesCaseDetail',
      'saveProduct'
    ])
  }
};
