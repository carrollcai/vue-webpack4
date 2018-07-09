import * as types from '../store/types';
import API from '../utils/api';

const actions = {
  getProductDetail: ({ commit }, params) => {
    return API.getProductDetailAPI(params).then((res) => {
      commit(types.PRODUCT_DETAIL, res.data);
    });
  },
  getProductList: ({ commit }, params) => {
    return API.getProductListAPI(params).then((res) => {
      commit(types.PRODUCT_LIST, res.data);
    });
  },
  getProductCreatList: ({ commit }, params) => {
    return API.getProductCreatListAPI(params).then((res) => {
      commit(types.PRODUCT_CREAT_LIST, res.data);
    });
  },
  getDetailSaleList: ({ commit }, params) => {
    return API.getDetailSaleListAPI(params).then((res) => {
      commit(types.DETAIL_SALE, res.data);
    });
  },
  getComposedProduct: ({commit}, params) => {
    return API.getComposedProductAPI(params).then((res) => {
      commit(types.COMPOSED_PRODUCT, res.data);
    });
  },
  setAddProduct: ({ commit }, params) => {
    return API.setAddProductAPI(params).then((res) => {
      return res;
    });
  },
  setEditProduct: ({ commit }, params) => {
    return API.setEditProductAPI(params).then((res) => {
      return res;
    });
  },
  setdeleteProduct: ({commit}, params) => {
    return API.deleteProductAPI(params).then((res) => {
      return res;
    });
  },
  uploadProductScheme: ({ commit }, params) => {
    return API.uploadProductSchemeAPI(params).then((res) => {
      return res.data;
    });
  },
  getProductFileId: ({ commit }, params) => {
    return API.uploadProductFileIdAPI(params).then((res) => {
      return res;
    });
  },
  queryElec: ({commit}, params) => {
    return API.queryElecAPI(params).then((res) => {
      return res;
    });
  },
  delUplodFile: ({commit}, params) => {
    return API.delUplodFileAPI(params).then((res) => {
      return res;
    });
  },
  downloadUplodFile: ({commit}, params) => {
    return API.downloadUplodFileAPI(params);
  }
};

export default actions;
