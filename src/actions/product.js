import {Message} from 'element-ui';
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
      if (!params.productName) {
        commit(types.COMPOSED_PRODUCT, res.data);
      } else {
        return res.data;
      }
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
  },
  saveBaseInfo: ({commit}, params) => {
    return commit(types.SAVE_BASE_INFO, params);
  },
  saveSaleStep: ({commit}, params) => {
    return commit(types.SAVE_SALE_STEP, params);
  },
  /**
   * 新增产品
   * @param {*} param0
   * @param {Object} product
   */
  saveProduct({commit}, product) {
    return API.setAddProductAPI(product).then(() => {
      Message({
        message: '新增产品成功',
        type: 'success',
        duration: 3000
      });
      // 创建成功
      commit(types.ROUTE_CHANGE, {
        path: '/product/product-creat-manage'
      });
    });
  },
  updateProduct({ commit }, product) {
    return API.setEditProductAPI(product).then((res) => {
      Message({
        message: '修改产品成功',
        type: 'success',
        duration: 3000
      });
      // 创建成功
      commit(types.ROUTE_CHANGE, {
        path: '/product/product-creat-manage'
      });
    });
  }
};

export default actions;
