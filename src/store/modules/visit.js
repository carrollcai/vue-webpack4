// import { createHelpers } from 'vuex-map-fields';
import * as types from '../types';
import {
  PAGE_NO,
  PAGE_SIZE
} from '@/config/index.js';

/* const { getVisitField, updateVisitField } = createHelpers({
  getterType: 'getVisitField',
  mutationType: 'updateVisitField'
}); */

const createAppointFrom = {
  visitTheme: '',
  organizeName: '',
  intervieweeName: '',
  visitStartTime: '',
  visitEndTime: '',
  visitTime: null,
  timeRange: null,
  processor: [],
  processorData: [],
  regionData: {
    regionList: [],
    processorList: [],
    processor: []
  }
};

const state = {
  myVisitManageFrom: {
    visitStartTime: '',
    visitEndTime: '',
    visitStatus: ['1'],
    organizeName: '',
    visitResource: '',
    pageNo: PAGE_NO,
    pageSize: PAGE_SIZE,
    state: '1'
    // visitTime: null
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
    visitStatusData: '',
    organizeName: '',
    processor: [],
    processorData: '',
    pageNo: PAGE_NO,
    pageSize: PAGE_SIZE,
    visitResource: '1',
    // timeRang: ''
  },
  createAppointFrom: {
    visitTheme: '',
    organizeName: '',
    intervieweeName: '',
    visitStartTime: '',
    visitEndTime: '',
    visitTime: null,
    timeRange: null,
    processor: [],
    processorData: [],
    regionData: {
      regionList: [],
      processorList: [],
      processor: []
    }
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
  visitDetail: {},
  visitAssignDetail: {}
};
const mutations = {
  // 清空创建数据
  [types.APPOINT_CREATE](state, data) {
    state.createAppointFrom = Object.cloneDeep(createAppointFrom);
  },
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
  [types.VISIT_ASSIGN_DETAIL](state, data) {
    state.visitAssignDetail = data;
  },
  [types.GET_PROCESSOR_LIST](state, data) {
    // 审核人结构
    let handlers = data.map(val => {
      let newVal = {};
      newVal.value = val.codeValue;
      newVal.label = val.codeName;
      newVal.children = val.childrenList && val.childrenList.filter(cval => cval.secOperatorDTOList).map(cval => {
        let newCval = {};
        newCval.value = cval.codeValue;
        newCval.label = cval.codeName;
        newCval.children = cval.secOperatorDTOList && cval.secOperatorDTOList.map(gcval => {
          return {
            value: gcval.operatorId,
            label: gcval.staffName
          };
        });
        return newCval;
      });
      return newVal;
    });
    state.getProcessorList = handlers;
    // state.getProcessorList = handlers.filter(val => val.children && val.children.length);
    // state.getProcessorList = state.getProcessorList[0].children[0].children;
  },
  [types.REGION_MANAGE_LIST](state, data) {
    state.regionManageList = data;
  },
  [types.REGISTER_LIST](state, data) {
    state.registerList = data.list;
  },
  /* [types.HANDLE_VISIT_MANAGE_LIST](state, data) {
    state.handleVisits = data;
  },
  [types.VISIT_DETAIL](state, data) {
    state.visitDetail = data;
  },
  updateVisitField */
};

/* const getters = {
  getVisitField
}; */

export default {
  state,
  mutations
  // getters
};
