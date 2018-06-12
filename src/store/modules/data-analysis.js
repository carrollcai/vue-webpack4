import * as types from '../types';
import { nowDay, sevenDaysAgo, nowMonth, halfYearsAgo } from '@/utils/helper';

const state = {
  client: [],
  // 省份和客户端对象
  activeObj: {
    provincedSelected: [],
    clientSelected: []
  },
  // 第一模块
  dailyUser: {
    activeUserNum: 1,
    mobileAccount: 1,
    mobileIp: 1,
    unmobileIp: 1,
    newMembers: 1
  },
  members: [],
  // 第二模块
  trend: {
    dateType: 0,
    date: '',
    mode: 0,
    chartRadio: 0
  },
  trendList: [],
  // 第三模块
  provinceUser: {
    data: ''
  },
  provinceUserList: [],
  // 中国地图数据
  mapData: [],
  // 留存流失
  retentionObj: {
    provincedSelected: [],
    clientSelected: []
  },
  retentionLossUser: {
    newUser: 1,
    retentionUser: 1,
    lossUser: 1
  },
  retTrend: {
    date: '',
    mode: 0,
    chartRadio: 0
  },
  retTrendList: []
};

const mutations = {
  [types.CLIENT_GET](state, data) {
    state.client = data;
  },
  [types.ACTIVE_GET_DAILY_USER](state, data) {
    state.dailyUser = data;
  },
  [types.TREND_GET_LIST](state, data) {
    state.trendList = data.map(val => {
      val.value = parseInt(val.activeUserNum);
      return val;
    });
  },
  [types.ACTIVE_UPDATE_TREND](state, data) {
    switch (data.chartRadio) {
      case 0:
        state.trendList = state.trendList.map(val => {
          val.value = parseInt(val.activeUserNum);
          return val;
        });
        break;
      case 1:
        state.trendList = state.trendList.map(val => {
          val.value = parseInt(val.mobileAccount);
          return val;
        });
        break;
      case 2:
        state.trendList = state.trendList.map(val => {
          val.value = parseInt(val.mobileIp);
          return val;
        });
        break;
      case 3:
        state.trendList = state.trendList.map(val => {
          val.value = parseInt(val.newMembers);
          return val;
        });
        break;
      default:
        console.error('类型不支持');
    }
  },
  [types.ACTIVE_GET_MEMBERS](state, data) {
    state.members = data;
  },
  // 从本地获取中国地图json数据
  [types.PROVINCE_GET_MAP_JSON](state, data) {
    state.mapData = data;
  },
  [types.PROVINCE_GET_USER](state, data) {
    state.provinceUserList = data;
  },
  [types.RETENTION_GET_USER](state, data) {
    state.retentionLossUser = data;
  },
  [types.RETENTION_GET_TREND_LIST](state, data) {
    state.retTrendList = data.map(val => {
      val.newUserRetPer = (val.retentionUser / val.newUser * 100).toFixed(1) + '%';
      val.retLossPer = (val.lossUser / val.retentionUser * 100).toFixed(1) + '%';
      // 方便图表字段展示, toFix()返回的是string。
      val.value = parseFloat(val.newUserRetPer.replace('%', ''));
      return val;
    });
  },
  [types.RETENTION_UPDATE_TREND_LIST](state, data) {
    if (data.chartRadio) {
      state.retTrendList = state.retTrendList.map(val => {
        val.value = parseFloat(val.retLossPer.replace('%', ''));
        return val;
      });
    } else {
      state.retTrendList = state.retTrendList.map(val => {
        val.value = parseFloat(val.newUserRetPer.replace('%', ''));
        return val;
      });
    }
  },
  [types.ACTIVE_INIT_DATE](state, data) {
    // if (!state.trend.date) return false;
    // console.log(state.trend.date);
    if (!state.trend.dateType) {
      state.trend.date = [new Date(sevenDaysAgo), new Date(nowDay)];
    } else {
      state.trend.date = [new Date(halfYearsAgo), new Date(nowMonth)];
    }
  }
};

export default {
  state,
  mutations
};
