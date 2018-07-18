import {Message} from 'element-ui';
import * as types from '../store/types';
import API from '../utils/api';

const actions = {
  getMyVisitManageList: ({ commit }, params) => {
    return API.getMyVisitManageListAPI(params).then((res) => {
      commit(types.MY_VISIT_MANAGE_LIST, res.data);
    });
  },
  setCreateVisit: ({ commit }, params) => {
    return API.setCreateVisitAPI(params).then((res) => {
      return res;
    });
  },
  getAppointVisitList: ({ commit }, params) => {
    return API.getAppointVisitListAPI(params).then((res) => {
      commit(types.APPOINT_VISIT_LIST, res.data);
    });
  },
  queryVisitAppointDetail: ({ commit }, params) => {
    return API.queryVisitAppointDetailAPI(params).then((res) => {
      commit(types.VISIT_APPOINT_DETAIL, res.data);
    });
  },
  /**
   * 查询走访任务处理列表
   */
  queryHandleVisits: ({ commit }, params) => {
    return API.queryVisitTasksAPI(params).then((res) => {
      commit(types.HANDLE_VISIT_MANAGE_LIST, res.data);
    });
  },
  /**
   * 评价走访
   */
  judgeVisit: ({ commit }, params) => {
    return API.judgeVisitAPI(params).then((res) => {
      Message({
        message: '评价成功',
        type: 'success',
        duration: 3000
      });
      commit(types.ROUTE_CHANGE, {
        path: '/visit/mission-handling'
      });
    });
  },
  /**
   * 审核走访
   */
  auditVisit: ({ commit }, params) => {
    return API.auditVisitAPI(params).then((res) => {
      Message({
        message: '审核成功',
        type: 'success',
        duration: 3000
      });
      commit(types.ROUTE_CHANGE, {
        path: '/visit/mission-handling'
      });
    });
  }
};

export default actions;
