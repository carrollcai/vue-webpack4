import * as types from '../store/types';
import API from '../utils/api';
import { Message } from 'element-ui';
import {
  PAGE_SIZE,
} from '@/config/index.js';
import store from '../store/index.js';

const actions = {
  /**
   * 总览
   */
  getUserInfoSelf({ commit }, params) {
    return API.getCurrentUserInfoAPI(params).then(res => {
      if (res.data.secOperatorDTO) {
        return res.data.secOperatorDTO.operatorId;
      }
    });
  },
  getOrderOverviewList({ commit }, params) {
    return API.getOrderOverviewListAPI(params).then((res) => {
      commit(types.ORDER_GET_LIST, res.data);
    });
  },
  overviewSignHandle({ commit }, params) {
    return API.overviewSignHandleAPI(params).then((res) => {
      commit(types.ORDER_OV_SIGN_HANDLE, res.data);
    });
  },

  /**
   * 创建管理
   */
  getCreateManageList({ commit }, params) {
    return API.getCreateManageListAPI(params).then(res => {
      commit(types.ORDER_CM_GET_LIST, res.data);
    });
  },
  // 指派处理人
  getAssignhandler({ commit }, params) {
    return API.getAssignhandlerAPI(params).then(res => {
      commit(types.ORDER_QUERY_ASSIGN_HANDLER, res.data);
    });
  },
  // 产品指派处理人
  async getProductHandler({ commit }, params) {
    let { index, item } = params;
    let data = {
      opRegion: item.region,
      roleList: item.roleList,
    };
    let res = await API.getProductHandlerAPI(data);
    await commit(types.ORDER_QUERY_PRODUCT_HANDLER, {
      list: res.data,
      item,
      index,
    });
  },
  // 提交订单
  submitOrderRow({ commit }, params) {
    return API.submitOrderRowAPI(params).then(res => {
      commit(types.ORDER_SUBMIT_ORDER_ROW, res.data);
    });
  },
  deleteOrderRow({ commit }, params) {
    return API.deleteOrderRowAPI(params).then(res => {
      commit(types.ORDER_DELETE_ORDER_ROW, res.data);
    });
  },
  createOrder({ commit }, params) {
    return API.createOrderAPI(params).then((res) => {
      Message({
        message: '创建成功',
        type: 'success'
      });
      // 创建成功
      commit(types.ROUTE_CHANGE, {
        path: '/order/create-manage'
      });
    });
  },
  updateOrder({ commit }, params) {
    return API.updateOrderAPI(params).then((res) => {
      Message({
        message: '修改成功',
        type: 'success'
      });
      // 创建成功
      commit(types.ROUTE_CHANGE, {
        path: '/order/create-manage'
      });
    });
  },
  async queryProductByCodeOrName({ commit }, params) {
    let res = await API.queryProductByCodeOrNameAPI(params);
    await commit(types.ORDER_QUERY_PRODUCT_NAME, res.data);
    return res.data;
  },
  // 修改获取订单数据
  async getOrderEdit({ commit, dispatch }, params) {
    let index = 0;
    let res = await API.getOrderUpdateAPI(params);
    res.data = res.data[0];
    await commit(types.ORDER_GET_EDIT, res.data);
    // 如果有指派人，需要取指派人接口
    for (let val of res.data.ordProductDtoList) {
      if (val.productName) {
        // 获取产品名称所对应的列表
        let productNameList = await dispatch('queryProductByCodeOrName', {
          pageSize: PAGE_SIZE,
          productName: val.productName
        });

        let productFilterList = productNameList.list &&
          productNameList.list.filter(cVal => cVal.productId === Number(val.productId));

        if (productFilterList[0]) {
          await dispatch('getProductHandler', {
            item: productFilterList[0],
            index
          });
        }
      }
      // 这个地方index需要在尾部添加
      ++index;
      console.log(index);
    }
    // 将指派人id转换成指派人name
    commit(types.ORDER_EDIT_PROCESSOR_TO_NAME);
  },
  getOrganizeAddress({ commit }, params) {
    return API.getOrganizeAddressAPI(params).then((res) => {
      commit(types.ORDER_QUERY_ORGANIZE_ADDRESS, res.data);
      return res.data;
    });
  },

  /**
   * 处理任务
   */
  async uploadOrderHandleTask({ commit }, params) {
    store.commit('SHOW_PAGE_LOADING');
    let res = await API.uploadFileAPI(params);
    if (res && res.data === null) {
      return false;
    }
    return true;
    // return API.uploadFileAPI(params).then(res => {
    //   return '';
    // }, err => {
    //   return err;
    // });
  },
  getHandleTaskList({ commit }, params) {
    return API.getHandleTaskListAPI(params).then(res => {
      commit(types.ORDER_HT_GET_LIST, res.data);
    });
  },
  getHandleTaskDetail({ commit }, params) {
    return API.getOrderDetailAPI(params).then(res => {
      commit(types.ORDER_GET_HANDLE_TASK_DETAIL, res.data);
    });
  },
  // 设置集团关联
  setConnectOriganize({ commit }, params) {
    return API.setConnectOriganizeAPI(params);
  },
  getOrderOverviewDetail({ commit }, params) {
    return API.getOverViewDetailAPI(params).then(res => {
      commit(types.ORDER_OVERVIEW_GET_DETAIL, res.data);
    });
  },
  cancelAssign({ commit }, params) {
    return API.createAssignAPI(params).then(() => {
      Message({
        message: '提交成功',
        type: 'success'
      });
      commit(types.ROUTE_CHANGE, {
        path: '/order/handle-task'
      });
    });
  },
  // 先获取附件id再上传,再提交表单。
  async submitAssignContract({ dispatch, commit, state }, { params, submitParams }) {
    commit(types.ORDER_SUBMIT_ASSIGN_BUTTON_STATUS);
    let fileInputId = await dispatch('getNewFileInputId');
    if (!fileInputId) {
      commit(types.ORDER_SUBMIT_ASSIGN_BUTTON_STATUS);
      return false;
    }
    let _params = Object.assign(params, { fileInputId });
    let _submitParams = Object.assign(submitParams, { fileId: fileInputId });

    // 如果上传失败，还原按钮状态，退出程序
    let error = await dispatch('uploadOrderHandleTask', _params);
    if (error) {
      commit(types.ORDER_SUBMIT_ASSIGN_BUTTON_STATUS);
      return false;
    }

    await API.submitAssignContractAPI(_submitParams).then(() => {
      commit(types.ORDER_SUBMIT_ASSIGN_BUTTON_STATUS);
      Message({
        message: '提交成功',
        type: 'success'
      });
      commit(types.ROUTE_CHANGE, {
        path: '/order/handle-task'
      });
    }, () => {
      commit(types.ORDER_SUBMIT_ASSIGN_BUTTON_STATUS);
    });
  },
  submitPay({ commit }, params) {
    return API.submitOrderPayAPI(params).then(res => {
      Message({
        message: '提交成功',
        type: 'success'
      });
      commit(types.ROUTE_CHANGE, {
        path: '/order/handle-task'
      });
    });
  },
  gethasSignedFile({ commit }, params) {
    return API.getFileThroughtFileIdAPI(params).then(res => {
      commit(types.ORDER_GET_HAS_SIGNED_FILE, res.data);
    });
  },
  orderDownloadFile({ commit }, params) {
    return API.downloadAttachFileAPI(params);
  },
  // 详情页获取流程图
  async getOrderOverviewProcessList({ commit, dispatch }, params) {
    // 这里不能用forEach控制流程，需要用for of
    for (let val of params.ordProductDtoList) {
      let fileList = [];
      let res = {};
      // 草稿状态不请求流程接口
      if (val.processInsId) {
        res = await API.queryCustomerProcessedAPI({
          processInsId: val.processInsId
        });
        if (val.fileId) {
          let fileReq = await API.getFileThroughtFileIdAPI({
            fileInputId: val.fileId
          });
          fileList = fileReq.data;
        }
      }
      let data = {
        ...val,
        fileList,
        list: res.data
      };
      await commit(types.ORDER_GET_PROCESS_LIST, data);
    }
  },
  // 获取附件列表
  async gethasSignedFileList({ commit }, params) {
    for (let val of params.ordProductDtoList) {
      // 如果不存在fileId，不请求API
      if (val.fileId) {
        let res = await API.getFileThroughtFileIdAPI({
          fileInputId: val.fileId
        });
        let data = {
          ...val,
          fileList: res.data
        };
        await commit(types.ORDER_GET_HAS_SIGNED_FILE_LIST, data);
      }
    }
  }
};

export default actions;
