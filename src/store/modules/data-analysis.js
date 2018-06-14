import * as types from '../types';
import { nowDay, sevenDaysAgo, nowMonth, halfYearsAgo, oneMonthAgo } from '@/utils/helper';

const state = {
  // client: [],
  // 省份和客户端对象
  activeObj: {
    provinceSelected: [],
    clientSelected: '咪咕视频', // 默认咪咕视频
    dateType: 0
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
    date: [new Date(sevenDaysAgo), new Date(nowDay)],
    mode: 0,
    chartRadio: 0
  },
  trendList: [],
  trendNewMembers: [],
  // 第三模块
  provinceUser: {
    date: [new Date(sevenDaysAgo), new Date(nowDay)]
  },
  provinceUserList: [],
  // 中国地图数据
  mapData: [],

  // 留存流失
  retentionObj: {
    provinceSelected: [],
    clientSelected: '咪咕视频'
  },
  retentionLossUser: {
    newUser: 1,
    newRetainNum: 1,
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
    state.dailyUser = Object.assign(state.dailyUser, {
      activeUserNum: data.reduce((prev, cur) => prev + cur.activeNum, 0),
      mobileAccount: data.reduce((prev, cur) => prev + cur.msisdnNum, 0),
      mobileIp: data.reduce((prev, cur) => prev + cur.chinaMobileIpNum, 0),
      unmobileIp: data.reduce((prev, cur) => prev + cur.otherIpNum, 0)
    });
  },
  [types.TREND_GET_LIST](state, data) {
    state.trendList = data.map(val => {
      val.value = parseInt(val.activeNum);
      return val;
    });
  },
  [types.TREND_GET_NEW_MEMBERS](state, data) {
    let uniqueMembers = [];
    // 将新增会员用户添加到表格里
    state.trendList = state.trendList.map(val => {
      data.map(cval => {
        if (val.periodId === cval.periodId) {
          val.newMembersNum = cval.newMembersNum;
        }
      });
      return val;
    });
    console.log(state.trendList);

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
      case 0:
        state.trendList = state.trendList.map(val => {
          val.value = parseInt(val.activeNum);
          return val;
        });
        break;
      case 1:
        state.trendList = state.trendList.map(val => {
          val.value = parseInt(val.msisdnNum);
          return val;
        });
        break;
      // case 2:
      //   state.trendList = state.trendList.map(val => {
      //     val.value = parseInt(val.mobileIp);
      //     return val;
      //   });
      //   break;
      // case 3:
      //   state.trendList = state.trendList.map(val => {
      //     val.value = parseInt(val.newMembers);
      //     return val;
      //   });
      //   break;
      default:
        // console.error('类型不支持');
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
    // console.log(data);
    state.retTrendList = data.map(val => {
      val.newUserRetPer = (val.newRetainNum / val.newMembersNum * 100).toFixed(1) + '%';
      val.retLossPer = (val.dropoutNum / val.retainNum * 100).toFixed(1) + '%';
      // 方便图表字段展示, toFix()返回的是string。
      val.value = parseFloat(val.newUserRetPer.replace('%', '')) | 0;
      return val;
    });
  },
  [types.RETENTION_UPDATE_TREND_LIST](state, data) {
    if (data.chartRadio) {
      state.retTrendList = state.retTrendList.map(val => {
        val.value = parseFloat(val.retLossPer.replace('%', '')) | 0;
        return val;
      });
    } else {
      state.retTrendList = state.retTrendList.map(val => {
        val.value = parseFloat(val.newUserRetPer.replace('%', '')) | 0;
        return val;
      });
    }
  },
  [types.ACTIVE_INIT_DATE](state, data) {
    // if (!state.trend.date) return false;
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
