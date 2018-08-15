import {Message} from 'element-ui';
import * as types from '../store/types';
import API from '../utils/api';

const actions = {
  getProductDetail: ({ commit }, params) => {
    return API.getProductDetailAPI(params).then((res) => {
      let data = res.data;
      data.mainMarket = res.data.mainMarket.split(',');
      data.broker = parseInt(res.data.broker);
      if (data.productFileid) {
        let fileList = [];
        API.queryElecAPI({'fileInputId': res.data.productFileid}).then((res) => {
          if (res.data) {
            for (let i = 0; i < res.data.length; i++) {
              let fileData = {};
              fileData.fileTypeId = 502;
              fileData.fileSaveName = res.data[i].fileSaveName;
              fileData.fileName = res.data[i].fileName;
              fileList.push(fileData);
            }
            data.fileData = fileList;
            commit(types.PRODUCT_DETAIL, data);
          }
        });
      }
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
  // 先获取附件id再上传,再提交表单。
  async saveProduct({ dispatch, commit }, { params, submitParams }) {
    // commit(types.ORDER_SUBMIT_ASSIGN_BUTTON_STATUS);
    let fileInputId = await dispatch('getNewFileInputId');
    let _params = Object.assign(params, { fileInputId });
    let _submitParams = Object.assign(submitParams, { productFileid: fileInputId });

    // 如果上传失败，还原按钮状态，退出程序
    let error = await dispatch('uploadOrderHandleTask', _params);
    if (error) {
      // commit(types.ORDER_SUBMIT_ASSIGN_BUTTON_STATUS);
      return false;
    }
    await API.setAddProductAPI(_submitParams).then(() => {
      // commit(types.ORDER_SUBMIT_ASSIGN_BUTTON_STATUS);
      Message({
        message: '新增产品成功',
        type: 'success',
        duration: 3000
      });
    }, () => {
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
  // addSalesCase: ({ commit }, params) => {
  //   return API.addSalesCaseAPI(params).then((res) => {
  //     Message({
  //       message: '添加成功',
  //       type: 'success',
  //       duration: 3000
  //     });
  //   });
  // },

  // 先获取附件id再上传,再提交表单。
  async addSalesCase({ dispatch, commit }, { params, submitParams }) {
    // commit(types.ORDER_SUBMIT_ASSIGN_BUTTON_STATUS);
    let fileInputId = await dispatch('getNewFileInputId');
    let _params = Object.assign(params, { fileInputId });
    let _submitParams = Object.assign(submitParams, { fileInputId: fileInputId });

    // 如果上传失败，还原按钮状态，退出程序
    let error = await dispatch('uploadOrderHandleTask', _params);
    if (error) {
      // commit(types.ORDER_SUBMIT_ASSIGN_BUTTON_STATUS);
      return false;
    }
    await API.addSalesCaseAPI(_submitParams).then(() => {
      // commit(types.ORDER_SUBMIT_ASSIGN_BUTTON_STATUS);
      Message({
        message: '提交成功',
        type: 'success'
      });
    }, () => {
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
   * 删除销售案例
   * @param {*} param0
   * @param {Object} product
   */
  delSalesCase: ({ commit }, params) => {
    return API.delSalesCaseAPI(params).then((res) => {
      Message({
        message: '删除成功',
        type: 'success',
        duration: 3000
      });
      // commit(types.DEL_SALES_CASE, res.data);
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
  },
  /**
   * 一级集采目录类别
   * @param {*} param0
   * @param {Object} product
   */
  getFirstCatalogType({ commit }, params) {
    const req = { codeType: 'FIRST_COLLECTION' };
    return API.getProductBelongOptionAPI(req).then(res => {
      commit(types.FIRST_COLLECTION_TYPE, res.data.bigClass);
    }, err => {
      if (err) {
        commit(types.FIRST_COLLECTION_TYPE, []);
      }
    });
  },
  /**
   * 核心能力清单类别
   * @param {*} param0
   * @param {Object} product
   */
  getCoreAbilityType({ commit }, params) {
    const req = { codeType: 'CORE_ABILITY' };
    return API.getProductBelongOptionAPI(req).then(res => {
      commit(types.CORE_ABILITY_TYPE, res.data.coreAbilityList);
    }, err => {
      if (err) {
        commit(types.CORE_ABILITY_TYPE, []);
      }
    });
  },
  /**
   * 查询销售案例详情（单个案例）
   * @param {*} param0
   * @param {Object} product
   */
  getProductCaseDetail({ commit }, params) {
    return API.getProductCaseDetailAPI(params).then(res => {
      commit(types.PRODUCT_CASE_DETAIL, res.data);
    });
  },
  /**
   * 查询产品名称
   */
  getProductName({commit}, params) {
    API.getProductNameAPI(params).then(res => {
      commit(types.GROUP_NAME_LIST, res.data.list);
    });
  },
  /**
   * 具体产品列表查询
   * @param {*} param0
   * @param {Object} product
   */
  getSpecProductList: ({ commit }, params) => {
    return API.getOwnershipCompanyAPI(params).then((res) => {
      commit(types.SPEC_PRODUCT_LIST, res.data);
    });
  },
  productDownloadFile: ({ commit }, params) => {
    return API.downloadAttachFileAPI(params);
  }
};

export default actions;
