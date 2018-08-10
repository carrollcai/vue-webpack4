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
  /**
   * 修改产品
   * @param {*} param0
   * @param {Object} product
   */
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
  },
  /**
   * 查询产品库（已入库）
   * @param {*} param0
   * @param {Object} product
   */
  getProductLibrary: ({ commit }, params) => {
    return API.getProductLibraryAPI(params).then((res) => {
      commit(types.PRODUCT_LIBRARY_LIST, res.data);
    });
  },
  /**
   * 查询产品库（已入库）
   * @param {*} param0
   * @param {Object} product
   */
  getProductOutOfLibrary: ({ commit }, params) => {
    return API.getProductOutOfLibraryAPI(params).then((res) => {
      commit(types.PRODUCT_OUTOF_LIBRARY_LIST, res.data);
    });
  }
};

export default actions;
