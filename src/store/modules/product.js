import * as types from '../types';

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
  productTaskInfoList: ''
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
  }
};

export default {
  state,
  mutations
};
