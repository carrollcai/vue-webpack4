import * as types from '../types';

const state = {
  productSaleDemo: 0,
  productList: {}
};

const mutations = {
  [types.PRODUCT_DETAIL](state, data) {
    console.log('PRODUCT_DETAIL');
    console.log(data);
    state.productSaleDemo = 1;
  },
  [types.PRODUCT_CREAT_LIST](state, data) {
    console.log('PRODUCT_CREAT_LIST');
    console.log(data);
    state.productList = data;
  }
};

export default {
  state,
  mutations
};
