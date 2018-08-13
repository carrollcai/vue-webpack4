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
  },
  /**
   * 产品审核管理列表查询
   * @param {*} param0
   * @param {Object} product
   */
  getProductTaskInfo: ({ commit }, params) => {
    return API.getProductTaskInfoAPI(params).then((res) => {
      commit(types.PRODUCT_TASK_INFO_LIST, res.data);
    });
  },
  /**
   * 归属公司列表查询
   * @param {*} param0
   * @param {Object} product
   */
  getOwnershipCompany: ({ commit }, params) => {
    return API.getOwnershipCompanyAPI(params).then((res) => {
      commit(types.OWNERSHIP_COMPANY_LIST, res.data);
    });
  },
  /**
   * 销售案例详情查询
   * @param {*} param0
   * @param {Object} product
   */
  getSalesCaseDetail: ({ commit }, params) => {
    return API.getSalesCaseDetailAPI(params).then((res) => {
      commit(types.SALES_CASE_DETAIL, res.data);
    });
  },
  /**
   * 新增销售产品
   * @param {*} param0
   * @param {Object} product
   */
  addSalesProducts: ({ commit }, params) => {
    return API.addSalesProductsAPI(params).then((res) => {
      commit(types.ADD_SALES_PRODUCTS, res.data);
    });
  },
  /**
   * 下架
   * @param {*} param0
   * @param {Object} product
   */
  underCarriageProduct: ({ commit }, params) => {
    return API.underCarriageProductAPI(params).then((res) => {
      commit(types.UNDER_CARRIAGE_PRODUCT, res.data);
    });
  },
  /**
   * 添加销售案例
   * @param {*} param0
   * @param {Object} product
   */
  addSalesCase: ({ commit }, params) => {
    return API.addSalesCaseAPI(params).then((res) => {
      commit(types.ADD_SALES_CASE, res.data);
    });
  },
  /**
   * 添加销售案例
   * @param {*} param0
   * @param {Object} product
   */
  editSalesCase: ({ commit }, params) => {
    return API.editSalesCaseAPI(params).then((res) => {
      commit(types.EDIT_SALES_CASE, res.data);
    });
  },
  /**
   * 添加销售案例
   * @param {*} param0
   * @param {Object} product
   */
  delSalesCase: ({ commit }, params) => {
    return API.delSalesCaseAPI(params).then((res) => {
      commit(types.DEL_SALES_CASE, res.data);
    });
  },
  /**
   * 查询对接人
   * @param {*} param0
   * @param {Object} product
   */
  getBroker: ({ commit }, params) => {
    return API.getBrokerAPI(params).then((res) => {
      commit(types.BROKER_LIST, res.data);
    });
  },
  /**
   * 修改产品
   * @param {*} param0
   * @param {Object} product
   */
  setProductOff({ commit }, product) {
    return API.setProductOffAPI(product).then((res) => {
      Message({
        message: '产品下线成功',
        type: 'success',
        duration: 3000
      });
    });
  },
  /**
   * 审核产品
   * @param {*} param0
   * @param {Object} product
   */
  setProductAudit({ commit }, product) {
    return API.setProductAuditAPI(product).then((res) => {
      Message({
        message: '产品审核成功',
        type: 'success',
        duration: 3000
      });
    });
  },
  /**
   * 一级集采目录
   * @param {*} param0
   * @param {Object} product
   */
  getFirstCatalog({ commit }, params) {
    const req = { codeType: 'FIRST_COLLECTION' };
    return API.getProvinceAPI(req).then(res => {
      commit(types.FIRST_COLLECTION_LIST, res.data.FIRST_COLLECTION);
    }, err => {
      if (err) {
        commit(types.CORE_ABILITY_LIST, []);
      }
    });
  },
  /**
   * 核心能力清单
   * @param {*} param0
   * @param {Object} product
   */
  getCoreAbility({ commit }, params) {
    const req = { codeType: 'CORE_ABILITY' };
    return API.getProvinceAPI(req).then(res => {
      commit(types.CORE_ABILITY_LIST, res.data.CORE_ABILITY);
    }, err => {
      if (err) {
        commit(types.CORE_ABILITY_LIST, []);
      }
    });
  }
};

export default actions;
