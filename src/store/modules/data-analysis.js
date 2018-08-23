import * as types from '../types';
import { oneMonthAgo, nineDaysAgo, twoDaysAgo, sixMonthsAgo } from '@/utils/helper';

import {
  TREND_RADIO,
  TREND_RADIO_PROPERTY,
  RETENTION_TREND_RADIO,
  RETENTION_TREND_RADIO_PORPERTY
} from '@/config';

const state = {
  /* 活跃度分析 */
  // 省份和客户端对象
  activeObj: {
    provinceSelected: [],
    clientSelected: '咪咕视频', // 默认咪咕视频
    dateType: 0
  },
  // 第一模块
  dailyUser: {
    activeUserNum: 0,
    mobileAccount: 0,
    mobileIp: 0,
    unmobileIp: 0,
    newMembers: 0
  },
  members: [],
  membersList: [],
  // 活跃度分析 - 活跃度趋势分析
  trend: {
    dateType: 0,
    date: [new Date(nineDaysAgo), new Date(twoDaysAgo)],
    startDate: new Date(sixMonthsAgo),
    endDate: new Date(oneMonthAgo),
    mode: 0,
    chartRadio: 0,
    district: null
  },
  trendList: [],
  trendData: [],
  trendFields: [],
  trendNewMembers: [],
  // 第三模块
  provinceUser: {
    dateType: 0,
    startDate: new Date(sixMonthsAgo),
    endDate: new Date(oneMonthAgo),
    date: [new Date(nineDaysAgo), new Date(twoDaysAgo)]
  },
  provinceUserList: [],
  // 中国地图数据
  mapData: [],

  /* 留存流失 */
  retentionObj: {
    provinceSelected: [],
    clientSelected: '咪咕视频'
  },
  retentionLossUser: {
    newUser: 0,
    newRetainNum: 0,
    retentionUser: 0,
    lossUser: 0
  },
  retTrend: {
    startDate: new Date(sixMonthsAgo),
    endDate: new Date(oneMonthAgo),
    mode: 0,
    chartRadio: 0,
    district: null
  },
  retTrendList: [],

  retTrendData: [],
  retTrendFields: [],

  /* 新增用户分析 */
  adduserObj: {
    clientSelected: '咪咕视频',
  },
  // 新增用户分析 - 新增用户趋势分析
  adduserTrend: {
    dateType: 0,
    date: [new Date(nineDaysAgo), new Date(twoDaysAgo)],
    startDate: new Date(sixMonthsAgo),
    endDate: new Date(oneMonthAgo),
    mode: 0,
    selected: 0,
    chartRadio: '0'
  },
  // 新增用户分析 - 各省份用户新增排名情况
  adduserMapTrend: {
    startDate: new Date(sixMonthsAgo),
    endDate: new Date(oneMonthAgo),
    chartRadio: '0'
  },
  // 新增用户分析 - 新增会员用户趋势分析
  adduserVipTrend: {
    dateType: 0,
    date: [new Date(nineDaysAgo), new Date(twoDaysAgo)],
    startDate: new Date(sixMonthsAgo),
    endDate: new Date(oneMonthAgo),
    mode: 0,
    chartRadio: '0'
  },
};

const mutations = {
  [types.CLIENT_GET](state, data) {
    state.client = data;
  },
  [types.ACTIVE_GET_DAILY_USER](state, data) {
    state.dailyUser = Object.assign(state.dailyUser, {
      activeUserNum: data.reduce((prev, cur) => prev + cur.activeNum, 0),
      mobileAccount: data.reduce((prev, cur) => prev + cur.msisdnNum, 0),
      mobileIp: data.reduce((prev, cur) => prev + cur.chinaMobileIpNum, 0),
      unmobileIp: data.reduce((prev, cur) => prev + cur.otherIpNum, 0)
    });
  },
  [types.TREND_GET_LIST](state, data) {
    state.trendList = data;
  },
  [types.TREND_GET_NEW_MEMBERS](state, data) {
    let uniqueMembers = [];
    let membersList = [];

    // 查询重新生成新的会员名称
    data.map(val => {
      let flag = false;
      membersList.map(cval => {
        if (cval.item === val.memberType) {
          flag = true;
        }
      });
      if (flag) return false;
      membersList.push({
        item: val.memberType
      });
    });
    state.membersList = membersList;

    data.map(val => {
      let flag = false;
      uniqueMembers.map(cval => {
        if (cval.periodId === val.periodId) {
          // 将中文的会员名称作为key
          cval[val.memberType] = val.newMembersNum;
          flag = true;
        }
      });
      if (flag) return false;
      uniqueMembers.push({
        periodId: val.periodId,
        [val.memberType]: val.newMembersNum
      });
    });
    state.trendNewMembers = uniqueMembers;
  },
  [types.ACTIVE_UPDATE_TREND](state, data) {
    switch (data.chartRadio) {
      // 活跃用户
      case 0:
        /* state.trendList = state.trendList.map(val => {
          val.value = parseInt(val.activeNum);
          return val;
        }); */

        state.trendData = state.trendList.map(val => {
          val['活跃用户'] = parseInt(val.activeNum);
          return val;
        });

        state.trendFields = ['活跃用户'];

        break;
      // 手机账号登录用户
      case 1:
        state.trendData = state.trendList.map(val => {
          val['手机账号登录用户'] = parseInt(val.msisdnNum);
          return val;
        });

        state.trendFields = ['手机账号登录用户'];
        break;
      // 移动IP用户
      case 2:
        state.trendData = state.trendList.map(val => {
          val['移动IP用户'] = parseInt(val.chinaMobileIpNum);
          return val;
        });

        state.trendFields = ['移动IP用户'];
        break;
      // 非移动IP用户
      case 3:
        state.trendData = state.trendList.map(val => {
          val['非移动IP用户'] = parseInt(val.otherIpNum);
          return val;
        });

        state.trendFields = ['非移动IP用户'];
        break;
      default:
        console.error('类型不支持');
    }
  },
  // 省份 - 活跃度趋势分析
  [types.ACTIVE_UPDATE_PROVINCE_TREND](state, data) {
    let type = data.chartRadio;
    let label = TREND_RADIO[type];

    if (label) {
      let list = Object.assign([], state.trendList);
      state.trendData = list.map(val => {
        val[label] = parseInt(val[TREND_RADIO_PROPERTY[type]]);
        return val;
      });
      state.trendFields = [label];
    } else {
      state.trendData = [];
      state.trendFields = [];
    }
  },
  // 大区 - 活跃度趋势分析
  // TODO
  [types.ACTIVE_UPDATE_DISTRICT_TREND](state, data) {
    let type = data.chartRadio;
    let label = TREND_RADIO[type];

    if (label) {
      let list = Object.assign([], state.trendList);
      state.trendData = list.map(val => {
        val[label] = parseInt(val[TREND_RADIO_PROPERTY[type]]);
        return val;
      });
      state.trendFields = [label];
    } else {
      state.trendData = [];
      state.trendFields = [];
    }
  },
  // 全国 - 活跃度趋势分析
  // TODO
  [types.ACTIVE_UPDATE_COUNTRY_TREND](state, data) {
    let type = data.chartRadio;
    let label = TREND_RADIO[type];

    if (label) {
      let list = Object.assign([], state.trendList);
      state.trendData = list.map(val => {
        val[label] = parseInt(val[TREND_RADIO_PROPERTY[type]]);
        return val;
      });
      state.trendFields = [label];
    } else {
      state.trendData = [];
      state.trendFields = [];
    }
  },
  [types.ACTIVE_GET_MEMBERS](state, data) {
    let uniqueMembers = [];

    // 客户端
    data.map(val => {
      let flag = false;
      uniqueMembers.map(cval => {
        if (cval.item === val.memberType) {
          cval.value += val.newMembersNum;
          flag = true;
        }
      });
      if (flag) return false;
      uniqueMembers.push({
        item: val.memberType,
        value: val.newMembersNum
      });
    });
    state.members = uniqueMembers;

    // 新增会员用户总数
    state.dailyUser.newMembers = data.reduce((prev, cur) => prev + cur.newMembersNum, 0);
  },
  // 从本地获取中国地图json数据
  [types.PROVINCE_GET_MAP_JSON](state, data) {
    state.mapData = data;
  },
  [types.PROVINCE_GET_USER](state, data) {
    state.provinceUserList = data.map(val => {
      return {
        orderNum: val.orderNum,
        name: val.province,
        value: val.activeNum
      };
    });
  },
  [types.RETENTION_GET_USER](state, data) {
    state.retentionLossUser = Object.assign(state.retentionLossUser, {
      newUser: data.reduce((prev, cur) => prev + cur.newMembersNum, 0),
      newRetainNum: data.reduce((prev, cur) => prev + cur.newRetainNum, 0),
      retentionUser: data.reduce((prev, cur) => prev + cur.retainNum, 0),
      lossUser: data.reduce((prev, cur) => prev + cur.dropoutNum, 0)
    });
  },
  [types.RETENTION_GET_TREND_LIST](state, data) {
    state.retTrendList = data.map(val => {
      val.newUserRetPer = (val.newRetainNum / val.newMembersNum * 100).toFixed(1) + '%';
      val.retLossPer = (val.dropoutNum / val.retainNum * 100).toFixed(1) + '%';
      return val;
    });
  },
  // 留存流失分析- 省份 - 留存流失趋势分析
  [types.RETENTION_UPDATE_PROVINCE_TREND_LIST](state, data) {
    let type = data.chartRadio;
    let label = RETENTION_TREND_RADIO[type];
    if (label) {
      let list = Object.assign([], state.retTrendList);
      state.retTrendData = list.map(val => {
        val[label] = parseFloat(val[RETENTION_TREND_RADIO_PORPERTY[type]].replace('%', '')) | 0;
        return val;
      });
      state.retTrendFields = [label];
    } else {
      state.retTrendData = [];
      state.retTrendFields = [];
    }
  },
  [types.ACTIVE_INIT_DATE](state, data) {
  },
  [types.PROVINCER_USER_INIT_DATE](state, data) {
  },
};

export default {
  state,
  mutations
};
