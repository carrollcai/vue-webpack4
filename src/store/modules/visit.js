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
    visitStartTime: '',
    visitEndTime: '',
    visitStatus: [],
    organizeName: '',
    isFirstVisit: '',
    pageNo: PAGE_NO,
    pageSize: PAGE_SIZE
  },
  myVisitManageList: {},
  createVisitFrom: {
    visitTheme: '',
    organizeId: '',
    organizeName: '',
    visitAddress: '',
    intervieweeName: '',
    intervieweeMobile: '',
    visitPresentMembers: '',
    visitContent: '',
    relOpporId: '',
    relOpporCode: '',
    problemCoordinate: '',
    visitAuditor: '',
    isFirstVisit: 0,
    visitStartTime: '',
    visitEndTime: '',
    isSubmit: 0
  },
  createVisitData: {},
  appointVisitForm: {
    visitStartTime: '',
    visitEndTime: '',
    visitStatus: [],
    organizeName: '',
    isFirstVisit: '',
    pageNo: PAGE_NO,
    pageSize: PAGE_SIZE
  },
  createAppointFrom: {
    visitTheme: '',
    organizeId: '',
    organizeName: '',
    visitAddress: '',
    intervieweeName: '',
    intervieweeMobile: '',
    visitPresentMembers: '',
    visitContent: '',
    relOpporId: '',
    relOpporCode: '',
    processor: '',
    assignNote: '',
    problemCoordinate: '',
    isFirstVisit: '',
    visitStartTime: '',
    visitEndTime: ''
  },
  appointVisitList: {},
  visitAppointDetail: {},
  regionManageList: [],
  registerList: [],
  handleQuery: {
    pageNo: PAGE_NO,
    pageSize: PAGE_SIZE,
    rangeDate: [],
    status: '',
    organizeName: '',
    isFirstVisit: '',
    activeName: 'first'
  },
  handleVisits: {},
  visitDetail: {}
};
const mutations = {
  [types.MY_VISIT_MANAGE_LIST](state, data) {
    state.myVisitManageList = data;
  },
  [types.CREATE_VISIT_DATA](state, data) {
    state.createVisitData = data;
  },
  [types.APPOINT_VISIT_LIST](state, data) {
    state.appointVisitList = data;
  },
  [types.VISIT_APPOINT_DETAIL](state, data) {
    state.visitAppointDetail = data;
    // state.createVisitFrom = Object.assign(state.createVisitFrom, data) ;
  },
  [types.REGION_MANAGE_LIST](state, data) {
    state.regionManageList = data;
  },
  [types.REGISTER_LIST](state, data) {
    state.registerList = data.list;
  },
  [types.HANDLE_VISIT_MANAGE_LIST](state, data) {
    state.handleVisits = data;
  },
  [types.VISIT_DETAIL](state, data) {
    state.visitDetail = data;
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
