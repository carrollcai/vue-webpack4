import * as types from '../types';
import {
  PAGE_NO,
  PAGE_SIZE
} from '@/config/index.js';

const state = {
  productSaleDemo: {
    salesList: []
  },
  productList: {},
  productCreatList: {},
  detailSale: [],
  composedProduct: [],
  baseInfo: {
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
  saleStep: {},
  productLibraryList: '',
  productOutofLibraryList: '',
  productTaskInfoList: '',
  ownerShipCompanyList: [],
  salesProductStoreForm: {
    productType: null,
    productName: '',
    pageNo: PAGE_NO,
    pageSize: PAGE_SIZE,
    codeType: '',
    codeValue: null
  },
  productCreateForm: {
    pageNo: PAGE_NO,
    pageSize: PAGE_SIZE,
    productType: null,
    operatorId: '',
    productName: '',
    productStatus: ''
  },
  productAuditManageForm: {
    date: '',
    staffName: '',
    productNameOrCode: '',
    taskHasComplete: 0,
    pageNo: PAGE_NO,
    pageSize: PAGE_SIZE
  },
  salesCaseDetail: '',
  addSalesProduct: '',
  underCarriageProduct: '',
  addSalesCase: '',
  addProduct: '',
  firstCollectList: [],
  coreAbilityList: [],
  firstCollectionType: [],
  brokerList: [],
  coreAbilityType: [],
  productCaseDetail: '',
  productNameList: [],
  specProductList: []
};
const mutations = {
  [types.PRODUCT_DETAIL](state, data) {
    state.productSaleDemo = data;
  },
  [types.PRODUCT_LIST](state, data) {
    state.productList = data;
  },
  [types.PRODUCT_CREAT_LIST](state, data) {
    state.productCreatList = data;
  },
  [types.DETAIL_SALE](state, data) {
    state.detailSale = data;
  },
  [types.COMPOSED_PRODUCT](state, data) {
    state.composedProduct = data;
  },
  [types.SAVE_BASE_INFO](state, data) {
    state.baseInfo = data;
  },
  [types.SAVE_SALE_STEP](state, data) {
    state.saleStep = data;
  },
  [types.PRODUCT_LIBRARY_LIST](state, data) {
    for (let i = 0; i < data.list.length; i++) {
      data.list[i].mainMarketArrCN = data.list[i].mainMarketArrCN.join();
    }
    state.productLibraryList = data;
  },
  [types.PRODUCT_OUTOF_LIBRARY_LIST](state, data) {
    state.productOutofLibraryList = data;
  },
  [types.PRODUCT_TASK_INFO_LIST](state, data) {
    state.productTaskInfoList = data;
  },
  [types.OWNERSHIP_COMPANY_LIST](state, data) {
    let handlers = data.map(val => {
      let newVal = {};
      newVal.value = val.codeValue;
      newVal.label = val.codeName;
      return newVal;
    });
    state.ownerShipCompanyList = handlers;
  },
  [types.SALES_CASE_DETAIL](state, data) {
    state.salesCaseDetail = data;
  },
  [types.ADD_SALES_PRODUCTS](state, data) {
    state.addSalesProduct = data;
  },
  [types.UNDER_CARRIAGE_PRODUCT](state, data) {
    state.underCarriageProduct = data;
  },
  [types.ADD_SALES_CASE](state, data) {
    state.addSalesCase = data;
  },
  [types.EDIT_SALES_CASE](state, data) {
    state.editSalesCase = data;
  },
  [types.DEL_SALES_CASE](state, data) {
    state.delSalesCase = data;
  },
  [types.FIRST_COLLECTION_LIST](state, data) {
    let handlers = data.map(val => {
      let newVal = {};
      newVal.value = val.codeValue;
      newVal.label = val.codeName;
      return newVal;
    });
    state.firstCollectList = handlers;
  },
  [types.CORE_ABILITY_LIST](state, data) {
    let handlers = data.map(val => {
      let newVal = {};
      newVal.value = val.codeValue;
      newVal.label = val.codeName;
      return newVal;
    });
    state.coreAbilityList = handlers;
  },
  [types.FIRST_COLLECTION_TYPE](state, data) {
    state.firstCollectionType = data.map(val => {
      let _val = {};
      _val.value = val.codeValue;
      _val.label = val.codeName;
      if (val.middleClass) {
        let children = [];
        val.middleClass.map(val => {
          let _chi = {};
          _chi.value = val.codeValue;
          _chi.label = val.codeName;
          children.push(_chi);
          if (val.smallClass) {
            let children = [];
            val.smallClass.map(val => {
              let _chi = {};
              _chi.value = val.codeValue;
              _chi.label = val.codeName;
              children.push(_chi);
            });
            _chi.children = children;
          };
        });
        _val.children = children;
      };
      return _val;
    });
  },
  [types.BROKER_LIST](state, data) {
    let handlers = data.map(val => {
      let newVal = {};
      newVal.value = val.operatorId;
      newVal.label = val.staffName;
      newVal.mobile = val.mobile;
      return newVal;
    });
    state.brokerList = handlers;
  },
  [types.CORE_ABILITY_TYPE](state, data) {
    let handlers = data.map(val => {
      let newVal = {};
      newVal.value = val.codeValue;
      newVal.label = val.codeName;
      return newVal;
    });
    state.coreAbilityType = handlers;
  },
  [types.PRODUCT_CASE_DETAIL](state, data) {
    state.productCaseDetail = data;
  },
  [types.PRODUCT_NAME_LIST](state, data) {
    state.productNameList = data.map(val => Object.assign(val, {value: val.vendorName}));
  },
  [types.SPEC_PRODUCT_LIST](state, data) {
    let handlers = data.map(val => {
      let newVal = {};
      newVal.value = val.codeValue;
      newVal.label = val.codeName;
      return newVal;
    });
    state.specProductList = handlers;
  }
};

export default {
  state,
  mutations
};
