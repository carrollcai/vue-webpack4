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
    isFirstVisit: 1,
    visitStartTime: '',
    visitEndTime: '',
    isSubmit: 1,
    visitTime: null,
    timeRange: null
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
    isFirstVisit: 1,
    visitTime: null,
    timeRange: null,
    visitStartTime: '',
    visitEndTime: ''
  },
  appointVisitList: {},
  visitAppointDetail: {},
  regionManageList: [],
  getProcessorList: [],
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
  [types.GET_PROCESSOR_LIST](state, data) {
    state.getProcessorList = data;
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
