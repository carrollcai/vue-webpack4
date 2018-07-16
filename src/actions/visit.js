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
      // commit(types.CREATE_VISIT, res.data);
    });
  },
  queryHandleVisits: ({ commit }, params) => {
    return API.getMyVisitManageListAPI(params).then((res) => {
      commit(types.HANDLE_VISIT_MANAGE_LIST, res.data);
    });
  }
};

export default actions;
