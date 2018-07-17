import * as types from '../store/types';
import API from '../utils/api';

const actions = {
  getMyVisitManageList: ({ commit }, params) => {
    return API.getMyVisitManageListAPI(params).then((res) => {
      commit(types.MY_VISIT_MANAGE, res.data);
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
  /**
   * 查询走访任务处理列表
   */
  queryHandleVisits: ({ commit }, params) => {
    return API.getMyVisitManageListAPI(params).then((res) => {
      commit(types.HANDLE_VISIT_MANAGE_LIST, res.data);
    });
  },
  /**
   * 评价走访
   */
  judgeVisit: ({ commit }, params) => {
    return API.judgeVisitAPI(params).then((res) => {
      commit(types.HANDLE_VISIT_MANAGE_LIST, res.data);
    });
  },
  /**
   * 审核走访
   */
  auditVisit: ({ commit }, params) => {
    return API.auditVisitAPI(params).then((res) => {
      commit(types.HANDLE_VISIT_MANAGE_LIST, res.data);
    });
  }
};

export default actions;
