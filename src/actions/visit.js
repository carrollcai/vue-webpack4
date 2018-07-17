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
  queryHandleVisits: ({ commit }, params) => {
    return API.getMyVisitManageListAPI(params).then((res) => {
      commit(types.HANDLE_VISIT_MANAGE_LIST, res.data);
    });
  }
};

export default actions;
