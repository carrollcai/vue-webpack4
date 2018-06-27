import * as types from '../types';

const state = {
  productSaleDemo: 0,
  productList: {}
};

const mutations = {
  [types.PRODUCT_DETAIL](state, data) {
    state.productSaleDemo = 1;
  },
  [types.PRODUCT_CREAT_LIST](state, data) {
    debugger;
    state.productList = data;
  }
};

export default {
  state,
  mutations
};
