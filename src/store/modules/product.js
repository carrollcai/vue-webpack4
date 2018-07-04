import * as types from '../types';

const state = {
  productSaleDemo: {},
  productList: {},
  productCreatList: {},
  detailSale: [],
  composedProduct: []
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
  }
};

export default {
  state,
  mutations
};
