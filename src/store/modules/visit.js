import { createHelpers } from 'vuex-map-fields';
import * as types from '../types';
import {
  PAGE_NO,
  PAGE_SIZE
} from '@/config/index.js';

const { getVisitField, updateVisitField } = createHelpers({
  getterType: 'getVisitField',
  mutationType: 'updateVisitField'
});

const state = {
  myVisitManageFrom: {
    startDate: '',
    endDate: '',
    state: 0,
    organizeName: '',
    isFirstVisit: '',
    pageNo: PAGE_NO,
    pageSize: PAGE_SIZE
  },
  myVisitManageList: {},
  createVisitFrom: {
    visitTheme: '', // 走访主题
    organizeCode: '',
    organizeName: '', // 走访集团客户名称
    visitAddress: '', // 走访地址
    intervieweeName: '', // 走访对象姓名
    intervieweeMobile: '', // 联系电话
    visitPresentMembers: '', // 我方出席人员
    visitStartTime: '', // 走访开始时间
    visitEndTime: '', // 走访结束时间
    visitContent: '', // 走访内容
    relOpporCode: '', // 涉及商机编码
    problemCoordinate: '', // 问题协调
    isFirstVisit: '', // 是否首客走访
    visitAuditor: '' // 选择审核人
  },
  createVisitData: {},
  handleQuery: {
    pageNo: PAGE_NO,
    pageSize: PAGE_SIZE,
    rangeDate: [],
    status: '',
    organizeName: '',
    reqType: '',
    activeName: 'first'
  },
  handleVisits: {}
};
const mutations = {
  [types.MY_VISIT_MANAGE](state, data) {
    state.myVisitManageList = data;
  },
  [types.CREATE_VISIT](state, data) {
    state.createVisitData = data;
  },
  [types.HANDLE_VISIT_MANAGE_LIST](state, data) {
    state.handleVisits = data;
  },
  updateVisitField
};

const getters = {
  getVisitField
};

export default {
  state,
  mutations,
  getters
};
