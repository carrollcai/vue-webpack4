import {Message} from 'element-ui';
import * as types from '../store/types';
import API from '../utils/api';

const actions = {
  /**
   * 查询需求创建管理列表
   *
   * @param {Store} Store
   * @param {String} params
   */
  queryRequirementList: ({commit}, params) => {
    API.queryRequirementListAPI(params).then(res => {
      commit(types.REQUIREMENT_GET_LIST, res.data);
    }, () => {
      commit(types.REQUIREMENT_GET_LIST, {});
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
      commit(types.REQUIREMENT_TASK_LIST, res.data);
    }, () => {
      commit(types.REQUIREMENT_TASK_LIST, {});
    });
  },

  /**
   * 处理需求任务 查询 需求任务处理人
   *
   * @param {Store} Store
   * @param {String} params
   */
  queryRequirementProcessors: ({commit}, params) => {
    API.queryRequirementProcessorsAPI(params).then(res => {
      commit(types.REQUIREMENT_PROCESSORS, res.data);
    }, () => {
      commit(types.REQUIREMENT_PROCESSORS, {});
    });
  },

  /**
   * 创建需求任务 查询 需求任务处理人
   *
   * @param {Store} Store
   * @param {String} params
   */
  queryRequirementCreateProcessors: ({commit}, params) => {
    API.queryRequirementCreateProcessorsAPI(params).then(res => {
      commit(types.REQUIREMENT_CREATE_PROCESSORS, res.data);
    }, () => {
      commit(types.REQUIREMENT_CREATE_PROCESSORS, {});
    });
  },

  saveRequirement({commit}, requirement) {
    delete requirement.orgId;

    API.saveRequirementAPI(requirement).then((res) => {
      Message({
        message: '新增成功',
        type: 'success',
        duration: 3000
      });
      commit(types.ROUTE_CHANGE, {
        path: '/requirement/manage'
      });
    });
  },
  queryRequirement({commit}, id) {
    API.queryRequirementAPI({
      reqId: id
    }).then((res) => {
      commit(types.REQUIREMENT_GET_INFO, res.data);
    }, () => {
      commit(types.REQUIREMENT_GET_INFO, {});
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
      Message({
        message: '处理成功',
        type: 'success',
        duration: 3000
      });
      commit(types.ROUTE_CHANGE, {
        path: '/requirement/list'
      });
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
      Message({
        message: '处理成功',
        type: 'success',
        duration: 3000
      });
      commit(types.ROUTE_CHANGE, {
        path: '/requirement/list'
      });
    });
  }
};

export default actions;
