import _ from 'lodash';

import * as types from '../types';
import { oneMonthAgo, nineDaysAgo, twoDaysAgo, sixMonthsAgo } from '@/utils/helper';

import {
  TREND_RADIO_PROPERTY,
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
  eventObj: {
    provinceSelected: [],
    date: '',
  },
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
    lossUser: 0,
    dropoutRate: null,
    retainRate: null,
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
    district: null,
    chartRadio: '0'
  },
  // 保存 新增用户分析 - 新增用户趋势分析 的原始数据
  addUserTrendList: [],
  addUserTrendData: [],
  addUserTrendFields: [],

  // 新增用户分析 - 各省份用户新增排名情况
  adduserMapTrend: {
    startDate: new Date(sixMonthsAgo),
    endDate: new Date(oneMonthAgo),
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
    district: null,
    chartRadio: '1'
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
      otherIpNum: null,
      orderNum: null
    };

    state.dailyUser = {
      activeUserNum: convertNull(info.activeNum),
      mobileAccount: convertNull(info.msisdnNum),
      mobileIp: convertNull(info.chinaMobileIpNum),
      unmobileIp: convertNull(info.otherIpNum),
      orderNum: convertNull(info.orderNum)
    };
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
  // 活跃度分析-活跃度趋势分析
  [types.ACTIVE_UPDATE_TREND](state, type) {
    let list = _.cloneDeep(state.trendList);

    let temp1 = _.groupBy(list, 'periodId');

    let result = [];
    let fields = _.uniq(_.map(list, 'province'));
    for (let key in temp1) {
      let val = temp1[key];
      let p = {};
      for (let item of val) {
        p[item.province] = item[TREND_RADIO_PROPERTY[type]];
      }
      p.periodId = key;
      result.push(p);
    }
    result = _.sortBy(result, 'periodId');

    state.trendData = result;
    state.trendFields = fields;
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
    let list = data.map(val => {
      return {
        orderNum: val.orderNum,
        name: val.province,
        value: val.activeNum
      };
    });

    let result = _.sortBy(list, 'orderNum');

    state.provinceUserList = result;
  },
  [types.RETENTION_GET_USER](state, data) {
    let info = data[0];

    info = info || {
      newRetainNum: null,
      newMemberNum: null,
      retainNum: null,
      dropoutNum: null,
      dropoutRate: null,
      retainRate: null,
    };

    state.retentionLossUser = Object.assign(state.retentionLossUser, {
      newMemberNum: convertNull(info.newMemberNum),
      newRetainNum: convertNull(info.newRetainNum),
      retainNum: convertNull(info.retainNum),
      dropoutNum: convertNull(info.dropoutNum),
      dropoutRate: info.dropoutRate,
      retainRate: info.retainRate,
    });
  },
  [types.RETENTION_GET_TREND_LIST](state, data) {
    state.retTrendList = data.map(val => {
      val.newUserRetPer = (val.retainRate * 100).toFixed(1) + '%';
      val.retLossPer = (val.dropoutRate * 100).toFixed(1) + '%';
      return val;
    });
  },
  // 留存流失分析- 留存流失趋势分析
  [types.RETENTION_UPDATE_PROVINCE_TREND_LIST](state, type) {
    let list = _.cloneDeep(state.retTrendList);

    const TYPES = {
      '0': 'retainRate',
      '1': 'dropoutRate',
    };
    let temp1 = _.groupBy(list, 'periodId');

    let result = [];
    let fields = _.uniq(_.map(list, 'province'));
    for (let key in temp1) {
      let val = temp1[key];
      let p = {};
      for (let item of val) {
        p[item.province] = item[TYPES[type]];
      }
      p.periodId = key;
      result.push(p);
    }
    result = _.sortBy(result, 'periodId');
    state.retTrendData = result;
    state.retTrendFields = fields;
  },
  // 新增用户分析- 新增用户数据
  [types.ADD_USER_OVERVIEW](state, data) {
    let info = data[0];

    info = info || {
      newUserNum: null,
      newMobileNum: null,
      newVisitNum: null,
      newActiveNum: null,
      newUserNumRank: null,
      newMobileNumRank: null,
      newVisitNumRank: null,
      newActiveNumRank: null
    };

    state.addUserOverviewData = {
      newUserNum: convertNull(info.newUserNum),
      newMobileNum: convertNull(info.newMobileNum),
      newVisitNum: convertNull(info.newVisitNum),
      newActiveNum: convertNull(info.newActiveNum),
      newUserNumRank: convertNull(info.newUserNumRank),
      newMobileNumRank: convertNull(info.newMobileNumRank),
      newVisitNumRank: convertNull(info.newVisitNumRank),
      newActiveNumRank: convertNull(info.newActiveNumRank)
    };
  },
  // 新增用户分析- 新增用户趋势分析 原始数据
  [types.ADD_USER_TREND](state, data) {
    state.addUserTrendList = data;
  },
  // 新增用户分析- 新增用户趋势分析
  [types.ADD_USER_PROVINCE_TREND](state, type) {
    let list = state.addUserTrendList;

    const TYPES = {
      '0': 'newUserNum',
      '1': 'newMobileNum',
      '2': 'newVisitNum',
      '3': 'newActiveNum',
    };

    let temp1 = _.groupBy(list, 'periodId');

    let result = [];
    let fields = _.uniq(_.map(list, 'province'));
    for (let key in temp1) {
      let val = temp1[key];
      let p = {};
      for (let item of val) {
        p[item.province] = item[TYPES[type]];
      }
      p.periodId = key;
      result.push(p);
    }
    result = _.sortBy(result, 'periodId');

    state.addUserTrendData = result;
    state.addUserTrendFields = fields;
  },
  // 新增用户分析- 用户新增排名情况 原始数据
  [types.ADD_USER_MAP](state, data) {
    state.addUserMapList = data;
  },
  // 新增用户分析- 用户新增排名情况
  [types.ADD_USER_DISTRICT_MAP](state, type) {
    let list = _.cloneDeep(state.addUserMapList);

    const TYPES = {
      '0': 'newUserNum',
      '1': 'newMobileNum',
      '2': 'newActiveNum'
    };

    const RANK_TYPES = {
      '0': 'newUserNumRank',
      '1': 'newMobileNumRank',
      '2': 'newActiveNumRank'
    };

    let result = _.sortBy(list.map((item) => {
      item.orderNum = item[RANK_TYPES[type]];
      item.name = item.province;
      item.value = item[TYPES[type]];
      return item;
    }), 'orderNum');

    state.addUserMapData = result;
  },
  // 新增用户分析- 新增会员用户趋势分析 原始数据
  [types.ADD_USER_VIP](state, data) {
    state.addUserVipList = data;
  },
  // 新增用户分析 - 新增会员用户趋势分析
  [types.ADD_USER_VIP_CHART](state, type) {
    let list = _.cloneDeep(state.addUserVipList);
    let temp1 = _.groupBy(list, 'periodId');

    let result = [];
    let fields = _.uniq(_.map(list, 'province'));
    for (let key in temp1) {
      let val = temp1[key];
      let p = {};
      for (let item of val) {
        p[item.province] = item[`member_${type}`];
      }
      p.periodId = key;
      result.push(p);
    }
    result = _.sortBy(result, 'periodId');

    state.addUserVipData = result;
    state.addUserVipFields = fields;
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
