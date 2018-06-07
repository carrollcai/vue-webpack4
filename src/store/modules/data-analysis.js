import * as types from '../types';

const state = {
  client: [],
  activeObj: {
    provincedSelected: [],
    clientSelected: []
  },
  userdata: [],
  dailyUser: [],
  trendList: [],
  members: [],
  mapData: [],
  trend: {
    dateType: 0,
    date: '',
    mode: 0,
    chartRadio: 0
  }
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
  [types.ACTIVE_GET_MEMBERS](state, data) {
    state.members = data;
  },
  [types.PROVINCE_GET_MAP_JSON](state, data) {
    state.mapData = data;
  }
};

export default {
  state,
  mutations
};
