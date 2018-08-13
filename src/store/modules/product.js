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
    operatorId: '',
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
  coreAbilityList: []
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
  }
};

export default {
  state,
  mutations
};
