import {Message} from 'element-ui';
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
    API.queryRequirementListAPI(params).then(res => {
      if (isSuccess(res)) {
        commit(types.REQUIREMENT_GET_LIST, res.data);
      } else {
        commit(types.REQUIREMENT_GET_LIST, {});
      }
    });
  },

  /**
   * 查询 需求任务处理列表
   *
   * @param {Store} Store
   * @param {String} params
   */
  queryRequirementTasks: ({commit}, params) => {
    API.queryRequirementTasksAPI(params).then(res => {
      if (isSuccess(res)) {
        commit(types.REQUIREMENT_TASK_LIST, res.data);
      } else {
        commit(types.REQUIREMENT_TASK_LIST, {});
      }
    });
  },

  /**
   * 查询 需求任务处理人
   *
   * @param {Store} Store
   * @param {String} params
   */
  queryRequirementProcessors: ({commit}, params) => {
    API.queryRequirementProcessorsAPI(params).then(res => {
      if (isSuccess(res)) {
        commit(types.REQUIREMENT_PROCESSORS, res.data);
      } else {
        commit(types.REQUIREMENT_PROCESSORS, []);
      }
    });
  },

  saveRequirement({commit}, requirement) {
    API.saveRequirementAPI(requirement).then((res) => {
      if (isSuccess(res)) {
        Message({
          message: '新增成功',
          type: 'success',
          duration: 3000
        });
        commit(types.ROUTE_CHANGE, {
          path: '/requirement/manage'
        });
      }
    });
  },
  queryRequirement({commit}, id) {
    API.queryRequirementAPI({
      reqId: id
    }).then((res) => {
      if (isSuccess(res)) {
        commit(types.REQUIREMENT_GET_INFO, res.data);
      } else {
        commit(types.REQUIREMENT_GET_INFO, {});
      }
    });
  },

  /**
   * 客户需求-处理物料需求
   *
   * @param {Store} Store
   * @param {String} params
   */
  handleRequirementMateriel({commit}, params) {
    API.handleRequirementMaterielAPI(params).then((res) => {
      if (isSuccess(res)) {
        Message({
          message: '处理成功',
          type: 'success',
          duration: 3000
        });
        commit(types.ROUTE_CHANGE, {
          path: '/requirement/list'
        });
      }
    });
  },

  /**
   * 客户需求-处理日常、投诉需求
   *
   * @param {Store} Store
   * @param {String} params
   */
  handleDailyComplain({commit}, params) {
    API.handleDailyComplainAPI(params).then((res) => {
      if (isSuccess(res)) {
        Message({
          message: '处理成功',
          type: 'success',
          duration: 3000
        });
        commit(types.ROUTE_CHANGE, {
          path: '/requirement/list'
        });
      }
    });
  }
};

export default actions;
