import * as types from '../store/types';
import API from '../utils/api';

const actions = {
  getProductDetail: ({ commit, state }, params) => {
    return API.getProductDetailAPI().then((res) => {
      console.log(res.data.List);
      commit(types.PRODUCT_DETAIL, res.data);
    });
  },
  getProductCreatList: ({ commit, state }, params) => {
    return API.getProductCreatListAPI(params).then((res) => {
      console.log(res.data);
      commit(types.PRODUCT_CREAT_LIST, res.data);
    });
  }
};

export default actions;
