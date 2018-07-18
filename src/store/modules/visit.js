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
    visitStatus: ['0'],
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
    isFirstVisit: '',
    visitStartTime: '',
    visitEndTime: '',
    isSubmit: ''
  },
  createVisitData: {},
  appointVisitForm: {
    startDate: '',
    endDate: '',
    state: 0,
    organizeName: '',
    isFirstVisit: '',
    pageNo: PAGE_NO,
    pageSize: PAGE_SIZE
  },
  appointVisitList: {},
  visitAppointDetail: {},
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
