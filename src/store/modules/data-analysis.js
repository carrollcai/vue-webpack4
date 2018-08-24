import _ from 'lodash';

import * as types from '../types';
import { oneMonthAgo, nineDaysAgo, twoDaysAgo, sixMonthsAgo } from '@/utils/helper';

import {
  TREND_RADIO,
  TREND_RADIO_PROPERTY,
  RETENTION_TREND_RADIO,
  RETENTION_TREND_RADIO_PORPERTY
} from '@/config';

import {
  convertNull
} from '@/utils/common';

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
  addUserOverviewData: {},
  // 新增用户分析 - 新增用户趋势分析
  adduserTrend: {
    startDate: new Date(sixMonthsAgo),
    endDate: new Date(oneMonthAgo),
    mode: 0,
    selected: '',
    chartRadio: '0'
  },
  // 保存 新增用户分析 - 新增用户趋势分析 的原始数据
  addUserTrendList: [],
  addUserTrendData: [],
  addUserTrendFields: [],

  // 新增用户分析 - 各省份用户新增排名情况
  adduserMapTrend: {
    date: [new Date(nineDaysAgo), new Date(twoDaysAgo)],
    chartRadio: '0'
  },
  // 保存 新增用户分析 - 各省份用户新增排名情况 的原始数据
  addUserMapList: [],
  addUserMapData: [],

  // 新增用户分析 - 新增会员用户趋势分析
  adduserVipTrend: {
    startDate: new Date(sixMonthsAgo),
    endDate: new Date(oneMonthAgo),
    mode: 0,
    region: '',
    chartRadio: '0'
  },
  // 保存 新增用户分析 - 新增会员用户趋势分析 的原始数据
  addUserVipList: [],
  addUserVipData: [],
  addUserVipFields: [],
};

const mutations = {
  [types.CLIENT_GET](state, data) {
    state.client = data;
  },
  [types.ACTIVE_GET_DAILY_USER](state, data) {
    let info = data[0];

    info = info || {
      activeNum: null,
      msisdnNum: null,
      chinaMobileIpNum: null,
      otherIpNum: null
    };

    state.dailyUser = Object.assign(state.dailyUser, {
      activeUserNum: convertNull(info.activeNum),
      mobileAccount: convertNull(info.msisdnNum),
      mobileIp: convertNull(info.chinaMobileIpNum),
      unmobileIp: convertNull(info.otherIpNum)
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
  // 活跃度分析- 省份 - 活跃度趋势分析
  [types.ACTIVE_UPDATE_PROVINCE_TREND](state, data) {
    let type = data.chartRadio;
    let label = TREND_RADIO[type];

    if (label) {
      state.trendData = _.map(_.cloneDeep(state.trendList), val => {
        val[label] = parseInt(val[TREND_RADIO_PROPERTY[type]]);
        return val;
      });
      state.trendFields = [label];
    } else {
      state.trendData = [];
      state.trendFields = [];
    }
  },
  // 活跃度分析- 大区 - 活跃度趋势分析
  // TODO
  [types.ACTIVE_UPDATE_DISTRICT_TREND](state, data) {
    /*
    let type = data.chartRadio;
    let label = TREND_RADIO[type];

    if (label) {
      state.trendData = _.map(_.cloneDeep(state.trendList), val => {
        val[label] = parseInt(val[TREND_RADIO_PROPERTY[type]]);
        return val;
      });
      state.trendFields = [label];
    } else {
      state.trendData = [];
      state.trendFields = [];
    }
    */

    let list = [
      {
        'periodId': '2018-03',
        'clientType': '咪咕视频',
        'member_3': null,
        'province': '山东',
        'member_1': 2665,
        'member_2': 27421,
        'member_3_rank': null,
        'member_2_rank': 1,
        'member_1_rank': 10
      },
      {
        'periodId': '2018-03',
        'clientType': '咪咕视频',
        'member_3': null,
        'province': '山西',
        'member_1': 696,
        'member_2': 22529,
        'member_3_rank': null,
        'member_2_rank': 2,
        'member_1_rank': 21
      },
      {
        'periodId': '2018-04',
        'clientType': '咪咕视频',
        'member_3': null,
        'province': '山东',
        'member_1': 2665,
        'member_2': 27421,
        'member_3_rank': null,
        'member_2_rank': 1,
        'member_1_rank': 10
      },
      {
        'periodId': '2018-04',
        'clientType': '咪咕视频',
        'member_3': null,
        'province': '山西',
        'member_1': 696,
        'member_2': 22529,
        'member_3_rank': null,
        'member_2_rank': 2,
        'member_1_rank': 21
      }
    ];

    let temp1 = _.groupBy(list, 'periodId');

    let result = [];
    let fields = _.uniq(_.map(list, 'province'));
    for (let key in temp1) {
      let val = temp1[key];
      let p = {};
      for (let item of val) {
        p[item.province] = item.member_1;
      }
      p.periodId = key;
      result.push(p);
    }
    result = _.sortBy(result, 'periodId');

    state.trendData = result;
    state.trendFields = fields;
  },
  // 活跃度分析- 全国 - 活跃度趋势分析
  // TODO
  [types.ACTIVE_UPDATE_COUNTRY_TREND](state, data) {
    let type = data.chartRadio;
    let label = TREND_RADIO[type];

    if (label) {
      state.trendData = _.map(_.cloneDeep(state.trendList), val => {
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
    let info = data[0];

    info = info || {
      newMembersNum: null,
      newRetainNum: null,
      retainNum: null,
      dropoutNum: null
    };

    state.retentionLossUser = Object.assign(state.retentionLossUser, {
      newUser: convertNull(info.newMembersNum),
      newRetainNum: convertNull(info.newRetainNum),
      retentionUser: convertNull(info.retainNum),
      lossUser: convertNull(info.dropoutNum)
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
  // 新增用户分析- 新增用户数据
  [types.ADD_USER_OVERVIEW](state, data) {
    state.addUserOverviewData = data;
  },
  // 新增用户分析- 新增用户趋势分析 原始数据
  [types.ADD_USER_TREND](state, data) {
    state.addUserTrendList = data;
  },
  // 新增用户分析- 省份 - 新增用户趋势分析
  [types.ADD_USER_PROVINCE_TREND](state, type) {
    let list = state.addUserTrendList;
    console.log(list);
    state.addUserTrendData = [];
    state.addUserTrendFields = [];
  },
  // 新增用户分析- 大区 - 新增用户趋势分析
  [types.ADD_USER_DISTRICT_TREND](state, type) {
    let list = state.addUserTrendList;
    console.log(list);
    state.addUserTrendData = [];
    state.addUserTrendFields = [];
  },
  // 新增用户分析- 全国 - 新增用户趋势分析
  [types.ADD_USER_COUNTRY_TREND](state, type) {
    let list = state.addUserTrendList;
    console.log(list);
    state.addUserTrendData = [];
    state.addUserTrendFields = [];
  },
  // 新增用户分析- 用户新增排名情况 原始数据
  [types.ADD_USER_MAP](state, data) {
    state.addUserMapList = data;
  },
  // 新增用户分析- 大区 - 用户新增排名情况
  [types.ADD_USER_DISTRICT_MAP](state, type) {
    let list = state.addUserMapList;
    console.log(list);
    state.addUserMapData = [];
  },
  // 新增用户分析- 全国 - 用户新增排名情况
  [types.ADD_USER_COUNTRY_MAP](state, type) {
    let list = state.addUserMapList;
    console.log(list);
    state.addUserMapData = [];
  },
  // 新增用户分析- 新增会员用户趋势分析 原始数据
  [types.ADD_USER_VIP](state, data) {
    state.addUserVipList = data;
  },
  // 新增用户分析- 省份 - 新增会员用户趋势分析
  [types.ADD_USER_PROVINCE_VIP](state, type) {
    let list = state.addUserVipList;
    console.log(list);
    state.addUserVipData = [];
    state.addUserVipFields = [];
  },
  // 新增用户分析- 大区 - 新增会员用户趋势分析
  [types.ADD_USER_DISTRICT_VIP](state, type) {
    let list = state.addUserVipList;
    console.log(list);
    state.addUserVipData = [];
    state.addUserVipFields = [];

    list = [
      {
        'periodId': '2018-04',
        'clientType': '咪咕视频',
        'member_3': null,
        'province': '山西',
        'member_1': 696,
        'member_2': 22529,
        'member_3_rank': null,
        'member_2_rank': 2,
        'member_1_rank': 21
      },
      {
        'periodId': '2018-03',
        'clientType': '咪咕视频',
        'member_3': null,
        'province': '山东',
        'member_1': 2665,
        'member_2': 27421,
        'member_3_rank': null,
        'member_2_rank': 1,
        'member_1_rank': 10
      },
      {
        'periodId': '2018-03',
        'clientType': '咪咕视频',
        'member_3': null,
        'province': '山西',
        'member_1': 696,
        'member_2': 22529,
        'member_3_rank': null,
        'member_2_rank': 2,
        'member_1_rank': 21
      },
      {
        'periodId': '2018-04',
        'clientType': '咪咕视频',
        'member_3': null,
        'province': '山东',
        'member_1': 2665,
        'member_2': 27421,
        'member_3_rank': null,
        'member_2_rank': 1,
        'member_1_rank': 10
      },
    ];

    let temp = _.groupBy(list, 'periodId');

    let result = [];
    let fields = _.uniq(_.map(list, 'province'));
    for (let key in temp) {
      let val = temp[key];
      let p = {};
      for (let item of val) {
        p[item.province] = item.member_1;
      }
      p.periodId = key;
      result.push(p);
    }
    result = _.sortBy(result, 'periodId');

    state.addUserVipData = result;
    state.addUserVipFields = fields;
  },
  // 新增用户分析- 全国 - 新增会员用户趋势分析
  [types.ADD_USER_COUNTRY_VIP](state, type) {
    let list = state.addUserVipList;
    console.log(list);
    state.addUserVipData = [];
    state.addUserVipFields = [];
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
