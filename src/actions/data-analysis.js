import * as types from '../store/types';
import API from 'utils/api';
import { twoDaysAgo, oneMonthAgo } from '@/utils/helper';
import dayjs from 'dayjs';

const actions = {
  getDailyActiveUser: ({ commit, state }, params) => {
    const req = activeReq(state);
    let dateType = req.dateType;
    delete req.dateType;

    // 按月
    if (dateType) {
      return API.queryActiveOverviewMonthAPI(req).then(res => {
        commit(types.ACTIVE_GET_DAILY_USER, res.data);
      });
    } else {
      return API.queryActiveOverviewDayAPI(req).then(res => {
        commit(types.ACTIVE_GET_DAILY_USER, res.data);
      });
    }
  },

  getTrendList: ({ commit, state }, params) => {
    const req = activeTrendReq(state);

    let dateType = req.dateType;
    delete req.dateType;

    // console.log(dateType);
    // 按月查询
    if (dateType) {
      return API.getMonthTrendListAPI(req).then(res => {
        commit(types.TREND_GET_LIST, res.data);
      });
    } else {
      return API.getTrendListAPI(req).then(res => {
        commit(types.TREND_GET_LIST, res.data);
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
    return API.getMembersAPI(req).then(res => {
      commit(types.ACTIVE_GET_MEMBERS, res.data.reportList);
    });
    // 按月查询
    // if (req.dateType) {
    //   return API.getTrendNewMembersMonthAPI(req).then(res => {
    //     commit(types.ACTIVE_GET_MEMBERS, res.data.reportList);
    //   });
    // } else {
    //   return API.getMembersAPI(req).then(res => {
    //     commit(types.ACTIVE_GET_MEMBERS, res.data.reportList);
    //   });
    // }
  },

  getMapJson: ({ commit }, params) => {
    return API.getMapJsonAPI(params).then(res => {
      commit(types.PROVINCE_GET_MAP_JSON, res.data);
    });
  },

  getProvinceUser: ({ commit, state }, params) => {
    const req = activeProvinceUserReq(state);
    let dateType = req.dateType;
    delete req.dateType;

    if (dateType) {
      return API.getMonthDailyActiveUserAPI(req).then(res => {
        commit(types.PROVINCE_GET_USER, res.data);
      });
    } else {
      return API.getProvinceUserAPI(req).then(res => {
        commit(types.PROVINCE_GET_USER, res.data);
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
    // let { provinces } = state.root.currentUser.operator;
    req.beginDate = oneMonthAgo;
    req.endDate = oneMonthAgo;
    req.clientType = retentionObj.clientSelected;
    // req.provinces = retentionObj.provinceSelected ? retentionObj.provinceSelected.filter(val => val !== null) : provinces.map(val => val.value);

    return API.queryRetentionLossUserAPI(req).then(res => {
      commit(types.RETENTION_GET_USER, res.data);
    });
  },

  getRetTrendList: ({ commit, state }, params) => {
    const req = retTrendReq(state);

    return API.getRetentionLossUserAPI(req).then(res => {
      commit(types.RETENTION_GET_TREND_LIST, res.data);
    });
  },
  downloadRetTrendDataAnalysis: ({ commit, state }, params) => {
    const req = retTrendReq(state);
    return API.downloadRetTrendDataAnalysisAPI(req);
  },
  /**
   * 新增用户分析-查询 新增用户数据
   */
  queryAddUserOverview({ commit }, params) {
    return new Promise((resolve) => {
      API.queryAddUserOverviewAPI(params).then(res => {
        commit(types.ADD_USER_OVERVIEW, res.data);
        resolve();
      });
    });
  },
  /**
   *新增用户分析-查询 新增用户趋势分析 数据
   */
  queryAddUserTrend({ commit }, params) {
    return new Promise((resolve) => {
      API.queryAddUserTrendAPI(params).then(res => {
        commit(types.ADD_USER_TREND, res.data);
        resolve();
      });
    });
  },
  /**
   *新增用户分析-查询 用户新增排名情况 数据
   */
  queryAddUserMap({ commit }, params) {
    return new Promise((resolve) => {
      API.queryAddUserMapAPI(params).then(res => {
        commit(types.ADD_USER_MAP, res.data);
        resolve();
      });
    });
  },
  /**
   *新增用户分析-查询 新增会员用户趋势分析 数据
   */
  queryAddUserVip({ commit }, params) {
    return new Promise((resolve) => {
      API.queryAddUserVipAPI(params).then(res => {
        commit(types.ADD_USER_VIP, res.data);
        resolve();
      });
    });
  },
  queryAddUserLastMonthNewNembers({ commit }, params) {
    return API.queryAddUserVipAPI(params).then(res => {
      commit(types.ADD_USER_LAST_MONTH_VIP, res.data);
    });
  },

  // 新增用户趋势分析下载
  downloadAdduserDataAnalysis({ commit, state }, params) {
    API.downloadNewUserRankByMonthAPI(params);
  },
  // 新增活跃会员分析下载
  downloadNewMember({ commit, state }, params) {
    API.downloadNewMemberAPI(params);
  },
  eventUseraddDownload({ commit, state }, params) {
    API.eventUseraddDownloadAPI(params);
  }
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
  if (trend.date.length) {
    let beginDate, endDate;
    if (trend.dateType) {
      beginDate = dayjs(trend.startDate).format('YYYY-MM') + '-01';
      endDate = dayjs(trend.endDate).format('YYYY-MM') + '-01';
    } else {
      beginDate = dayjs(trend.date[0]).format('YYYY-MM-DD');
      endDate = dayjs(trend.date[1]).format('YYYY-MM-DD');
    }
    req.region = trend.district;
    req.dateType = trend.dateType;
    req.beginDate = beginDate;
    req.endDate = endDate;
  }
  req.clientType = activeObj.clientSelected;
  return req;
}

function activeProvinceUserReq(state) {
  const req = {};
  const { provinceUser, activeObj } = state.dataAnalysis;
  // let { provinces } = state.root.currentUser.operator;
  if (provinceUser.date.length) {
    let beginDate, endDate;
    if (provinceUser.dateType) {
      beginDate = dayjs(provinceUser.startDate).format('YYYY-MM') + '-01';
      endDate = dayjs(provinceUser.endDate).format('YYYY-MM') + '-01';
    } else {
      beginDate = dayjs(provinceUser.date[0]).format('YYYY-MM-DD');
      endDate = dayjs(provinceUser.date[1]).format('YYYY-MM-DD');
    }
    req.dateType = provinceUser.dateType;
    req.beginDate = beginDate;
    req.endDate = endDate;
  }

  // req.isAloneProvince = true;
  req.clientType = activeObj.clientSelected;
  // req.provinces = activeObj.provinceSelected.length ? activeObj.provinceSelected.filter(val => val !== null) : provinces.map(val => val.value);
  return req;
}

function retTrendReq(state) {
  const req = {};
  const { retentionObj, retTrend } = state.dataAnalysis;
  req.beginDate = dayjs(retTrend.startDate).format('YYYY-MM') + '-01';
  req.endDate = dayjs(retTrend.endDate).format('YYYY-MM') + '-01';
  req.clientType = retentionObj.clientSelected;
  req.region = retTrend.district;
  return req;
}

export default actions;
