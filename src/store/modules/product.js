import * as types from '../types';

const state = {
  productSaleDemo: {},
  productList: {}
};

const mutations = {
  [types.PRODUCT_DETAIL](state, data) {
    state.productSaleDemo = data;
  },
  [types.PRODUCT_CREAT_LIST](state, data) {
    state.productList = data;
  }
};

export default {
  state,
  mutations
};
