import * as types from '../store/types';
import API from 'utils/api';
import { twoDaysAgo, oneMonthAgo } from '@/utils/helper';
import moment from 'moment';

const actions = {
  getDailyActiveUser: ({ commit, state }, params) => {
    const req = activeReq(state);
    if (req.dateType) {
      return API.getMonthDailyActiveUserAPI(req).then(res => {
        commit(types.ACTIVE_GET_DAILY_USER, res.data.reportList);
      });
    } else {
      return API.getDailyActiveUserAPI(req).then(res => {
        commit(types.ACTIVE_GET_DAILY_USER, res.data.reportList);
      });
    }
  },

  getTrendList: ({ commit, state }, params) => {
    const req = activeTrendReq(state);
    // 按月查询
    if (req.dateType) {
      return API.getMonthTrendListAPI(req).then(res => {
        commit(types.TREND_GET_LIST, res.data.reportList);
      });
    } else {
      return API.getTrendListAPI(req).then(res => {
        commit(types.TREND_GET_LIST, res.data.reportList);
      });
    }
  },
  getTrendNewMembers: ({ commit, state }, params) => {
    const req = activeTrendReq(state);
    // 按月查询
    if (req.dateType) {
      return API.getTrendNewMembersMonthAPI(req).then(res => {
        commit(types.TREND_GET_NEW_MEMBERS, res.data.reportList);
      });
    } else {
      return API.getTrendNewMembersAPI(req).then(res => {
        commit(types.TREND_GET_NEW_MEMBERS, res.data.reportList);
      });
    }
  },

  getMembers: ({ commit, state }, params) => {
    const req = activeReq(state);
    // 按月查询
    if (req.dateType) {
      return API.getTrendNewMembersMonthAPI(req).then(res => {
        commit(types.ACTIVE_GET_MEMBERS, res.data.reportList);
      });
    } else {
      return API.getMembersAPI(req).then(res => {
        commit(types.ACTIVE_GET_MEMBERS, res.data.reportList);
      });
    }
  },

  getMapJson: ({ commit }, params) => {
    return API.getMapJsonAPI(params).then(res => {
      commit(types.PROVINCE_GET_MAP_JSON, res.data);
    });
  },

  getProvinceUser: ({ commit, state }, params) => {
    const req = activeProvinceUserReq(state);

    if (req.dateType) {
      return API.getMonthDailyActiveUserAPI(req).then(res => {
        commit(types.PROVINCE_GET_USER, res.data.reportList);
      });
    } else {
      return API.getProvinceUserAPI(req).then(res => {
        commit(types.PROVINCE_GET_USER, res.data.reportList);
      });
    }
  },
  downloadTrendDataAnalysis: ({ commit, state }, params) => {
    const req = activeTrendReq(state);
    if (req.dateType) {
      return API.downloadMonthTrendDataAnalysisAPI(req);
    } else {
      return API.downloadTrendDataAnalysisAPI(req);
    }
  },

  getRetentionLossUser: ({ commit, state }, params) => {
    const req = {};
    const { retentionObj } = state.dataAnalysis;
    let { provinces } = state.root.currentUser.operator;
    req.beginDate = oneMonthAgo;
    req.endDate = oneMonthAgo;
    req.clientType = retentionObj.clientSelected;
    req.provinces = retentionObj.provinceSelected ? retentionObj.provinceSelected.filter(val => val !== null) : provinces.map(val => val.value);

    return API.getRetentionLossUserAPI(req).then(res => {
      commit(types.RETENTION_GET_USER, res.data.reportList);
    });
  },

  getRetTrendList: ({ commit, state }, params) => {
    const req = retTrendReq(state);

    return API.getRetentionLossUserAPI(req).then(res => {
      commit(types.RETENTION_GET_TREND_LIST, res.data.reportList);
    });
  },
  downloadRetTrendDataAnalysis: ({ commit, state }, params) => {
    const req = retTrendReq(state);
    return API.downloadRetTrendDataAnalysisAPI(req);
  },
  /**
   * 新增用户分析-查询 新增用户数据
   */
  queryAddUserOverview({commit}, params) {
    return new Promise((resolve) => {
      commit(types.ADD_USER_OVERVIEW, {});
      resolve();
    });
  },
  /**
   *新增用户分析-查询 新增用户趋势分析 数据
   */
  queryAddUserTrend({commit}, params) {
    return new Promise((resolve) => {
      commit(types.ADD_USER_TREND, []);
      resolve();
    });
  },
  /**
   *新增用户分析-查询 用户新增排名情况 数据
   */
  queryAddUserMap({commit}, params) {
    return new Promise((resolve) => {
      commit(types.ADD_USER_MAP, []);
      resolve();
    });
  },
  /**
   *新增用户分析-查询 新增会员用户趋势分析 数据
   */
  queryAddUserVip({commit}, params) {
    return new Promise((resolve) => {
      commit(types.ADD_USER_VIP, []);
      resolve();
    });
  },
};

function activeReq(state) {
  const req = {};
  const { activeObj } = state.dataAnalysis;
  let { provinces } = state.root.currentUser.operator;
  req.dateType = activeObj.dateType;
  req.beginDate = !activeObj.dateType ? twoDaysAgo : oneMonthAgo;
  req.endDate = !activeObj.dateType ? twoDaysAgo : oneMonthAgo;
  req.clientType = activeObj.clientSelected;
  req.provinces = activeObj.provinceSelected.length ? activeObj.provinceSelected.filter(val => val !== null) : provinces.map(val => val.value);
  return req;
}

function activeTrendReq(state) {
  const req = {};
  const { trend, activeObj } = state.dataAnalysis;
  let { provinces } = state.root.currentUser.operator;
  if (trend.date.length) {
    let beginDate, endDate;
    if (trend.dateType) {
      beginDate = moment(trend.startDate).format('YYYY-MM') + '-01';
      endDate = moment(trend.endDate).format('YYYY-MM') + '-01';
    } else {
      beginDate = moment(trend.date[0]).format('YYYY-MM-DD');
      endDate = moment(trend.date[1]).format('YYYY-MM-DD');
    }
    req.dateType = trend.dateType;
    req.beginDate = beginDate;
    req.endDate = endDate;
  }
  req.clientType = activeObj.clientSelected;
  req.provinces = activeObj.provinceSelected.length ? activeObj.provinceSelected.filter(val => val !== null) : provinces.map(val => val.value);
  return req;
}

function activeProvinceUserReq(state) {
  const req = {};
  const { provinceUser, activeObj } = state.dataAnalysis;
  let { provinces } = state.root.currentUser.operator;
  if (provinceUser.date.length) {
    let beginDate, endDate;
    if (provinceUser.dateType) {
      beginDate = moment(provinceUser.startDate).format('YYYY-MM') + '-01';
      endDate = moment(provinceUser.endDate).format('YYYY-MM') + '-01';
    } else {
      beginDate = moment(provinceUser.date[0]).format('YYYY-MM-DD');
      endDate = moment(provinceUser.date[1]).format('YYYY-MM-DD');
    }
    req.dateType = provinceUser.dateType;
    req.beginDate = beginDate;
    req.endDate = endDate;
  }

  req.isAloneProvince = true;
  req.clientType = activeObj.clientSelected;
  req.provinces = activeObj.provinceSelected.length ? activeObj.provinceSelected.filter(val => val !== null) : provinces.map(val => val.value);
  return req;
}

function retTrendReq(state) {
  const req = {};
  const { retentionObj, retTrend } = state.dataAnalysis;
  let { provinces } = state.root.currentUser.operator;
  req.beginDate = moment(retTrend.startDate).format('YYYY-MM') + '-01';
  req.endDate = moment(retTrend.endDate).format('YYYY-MM') + '-01';
  req.clientType = retentionObj.clientSelected;
  req.provinces = retentionObj.provinceSelected.length ? retentionObj.provinceSelected.filter(val => val !== null) : provinces.map(val => val.value);
  return req;
}

export default actions;
