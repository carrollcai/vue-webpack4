import {mapActions} from 'vuex';
import Steps from '@/components/Steps.vue';
import Step from '@/components/Step.vue';
import ProductCase from './ProductCase.vue';
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
    handleDeleteCase(index, productCase) {
      if (productCase.salesId) {
        productCase.state = '0';
      } else {
        this.cases.splice(index, 1);
      }
    },
    handleEditCase(productCase, index) {
      this.isAddingCase = true;
      this.$nextTick(() => {
        this.$refs.prodctCases.init(productCase, index);
      });
    },
    isNotAbleToSubmit() {
      return !(!this.isAddingCase && this.cases.length);
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
    ...mapActions([
      'getProductFileId',
      'uploadProductScheme'
    ])
  }
};
