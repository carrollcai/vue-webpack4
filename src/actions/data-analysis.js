import * as types from '../store/types';
import API from 'utils/api';
import { nowDay, oneMonthAgo } from '@/utils/helper';
import moment from 'moment';

const actions = {
  getDailyActiveUser: ({ commit, state }, params) => {
    const req = activeReq(state);

    return API.getDailyActiveUserAPI(req).then(res => {
      commit(types.ACTIVE_GET_DAILY_USER, res.data.reportList);
    });
  },
  getTrendList: ({ commit, state }, params) => {
    const req = activeTrendReq(state);

    return API.getTrendListAPI(req).then(res => {
      commit(types.TREND_GET_LIST, res.data.reportList);
    });
  },
  getTrendNewMembers: ({ commit, state }, params) => {
    const req = activeTrendReq(state);

    return API.getTrendNewMembersAPI(req).then(res => {
      commit(types.TREND_GET_NEW_MEMBERS, res.data.reportList);
    });
  },
  getMembers: ({ commit, state }, params) => {
    const req = activeReq(state);

    return API.getMembersAPI(req).then(res => {
      commit(types.ACTIVE_GET_MEMBERS, res.data.reportList);
    });
  },
  getMapJson: ({ commit }, params) => {
    return API.getMapJsonAPI(params).then(res => {
      commit(types.PROVINCE_GET_MAP_JSON, res.data);
    });
  },
  getProvinceUser: ({ commit, state }, params) => {
    const req = activeProvinceUserReq(state);

    return API.getProvinceUserAPI(req).then(res => {
      commit(types.PROVINCE_GET_USER, res.data);
    });
  },
  getRetentionLossUser: ({ commit }, params) => {
    return API.getRetentionLossUserAPI(params).then(res => {
      commit(types.RETENTION_GET_USER, res.data);
    });
  },
  getRetTrendList: ({ commit }, params) => {
    return API.getRetTrendListAPI(params).then(res => {
      commit(types.RETENTION_GET_TREND_LIST, res.data);
    });
  }
};

function activeReq(state) {
  const req = {};
  const { activeObj } = state.dataAnalysis;
  req.beginDate = nowDay;
  req.endDate = !activeObj.dateType ? nowDay : oneMonthAgo;
  req.clientType = activeObj.clientSelected;
  req.provinces = activeObj.provinceSelected;
  return req;
}

function activeTrendReq(state) {
  const req = {};
  const { trend, activeObj } = state.dataAnalysis;
  if (trend.date.length) {
    let beginDate, endDate;
    if (trend.dateType) {
      beginDate = moment(trend.date[1]).format('YYYY-MM') + '-01';
      endDate = moment(trend.date[0]).format('YYYY-MM') + '-01';
    } else {
      beginDate = moment(trend.date[1]).format('YYYY-MM-DD');
      endDate = moment(trend.date[0]).format('YYYY-MM-DD');
    }

    req.beginDate = beginDate;
    req.endDate = endDate;
  }
  req.clientType = activeObj.clientSelected;
  req.provinces = activeObj.provinceSelected;
  return req;
}

function activeProvinceUserReq(state) {
  const req = {};
  const { provinceUser, activeObj } = state.dataAnalysis;
  console.log(provinceUser);
  if (provinceUser.date.length) {
    req.beginDate = moment(provinceUser.date[1]).format('YYYY-MM-DD');
    req.endDate = moment(provinceUser.date[0]).format('YYYY-MM-DD');
  }
  req.isAloneProvince = true;
  req.clientType = activeObj.clientSelected;
  req.provinces = activeObj.provinceSelected;
  return req;
}

export default actions;
