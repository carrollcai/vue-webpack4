import * as types from '../types';

const state = {
  client: [],
  activeObj: {
    provincedSelected: [],
    clientSelected: []
  },
  trend: {
    dateType: 0,
    date: '',
    mode: 0,
    chartRadio: 0
  },
  provinceUser: {
    data: ''
  },
  userdata: [],
  dailyUser: [],
  trendList: [],
  provinceUserList: [],
  members: [],
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
  [types.ACTIVE_QUERY_FORM](state, data) {
    state.userdata = data;
  },
  [types.ACTIVE_GET_DAILY_USER](state, data) {
    state.dailyUser = data;
  },
  [types.TREND_GET_LIST](state, data) {
    state.trendList = data;
  },
  [types.TREND_GET_ACTIVE](state, data) {
    state.trendList = data;
  },
  [types.ACTIVE_GET_MEMBERS](state, data) {
    state.members = data;
  },
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
  }
};

export default {
  state,
  mutations
};
