import * as types from '../store/types';
import API from 'utils/api';

const actions = {
  getClient: ({ commit }, params) => {
    return API.getClientAPI(params).then(res => {
      commit(types.CLIENT_GET, res.data);
    }, err => {
      if (err) {
        commit(types.CLIENT_GET, {});
      }
    });
  },
  queryActiveForm: ({ commit }, params) => {
    return API.queryActiveFormAPI(params).then(res => {
      commit(types.ACTIVE_QUERY_FORM, res.data);
    });
  },
  getDailyActiveUser: ({ commit }, params) => {
    return API.getDailyActiveUserAPI(params).then(res => {
      commit(types.ACTIVE_GET_DAILY_USER, res.data);
    });
  },
  getTrendList: ({ commit }, params) => {
    return API.getTrendListAPI(params).then(res => {
      commit(types.TREND_GET_LIST, res.data);
    });
  },
  getMembers: ({ commit }, params) => {
    return API.getMembersAPI(params).then(res => {
      commit(types.ACTIVE_GET_MEMBERS, res.data);
    });
  },
  getActiveTrend: ({ commit }, params) => {
    return API.getActiveTrendAPI(params).then(res => {
      commit(types.TREND_GET_ACTIVE, res.data);
    });
  },
  getMapJson: ({ commit }, params) => {
    return API.getMapJsonAPI(params).then(res => {
      commit(types.PROVINCE_GET_MAP_JSON, res.data);
    });
  },
  getProvinceUser: ({ commit }, params) => {
    return API.getProvinceUserAPI(params).then(res => {
      commit(types.PROVINCE_GET_USER, res.data);
    });
  }
};

export default actions;
