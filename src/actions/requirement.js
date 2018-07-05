import * as types from '../store/types';
import API from '../utils/api';

function isSuccess(res) {
  return res.errorInfo && res.errorInfo.code && res.errorInfo.code === '200';
}

const actions = {
  /**
   * 查询需求创建管理列表
   *
   * @param {Store} Store
   * @param {String} params
   */
  queryRequirementList: ({commit}, params) => {
    API.queryCustomerOverviewListAPI(params).then(res => {
      if (isSuccess(res)) {
        commit(types.REQUIREMENT_GET_LIST, res.data);
      } else {
        commit(types.REQUIREMENT_GET_LIST, {});
      }
    });
  }
};

export default actions;
