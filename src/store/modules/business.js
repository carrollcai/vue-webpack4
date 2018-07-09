import * as types from '../types';
import {
  PAGE_NO,
  PAGE_SIZE
} from '@/config/index.js';

const state = {
  cooperationGroupList: [],
  businessForm: {
    opporCode: '',
    orgFilter: '',
    createStartDate: '',
    createEndDate: '',
    opporStatus: 0,
    pageNo: PAGE_NO,
    pageSize: PAGE_SIZE
  },
  myBusinessForm: {
    opporCode: '',
    orgFilter: '',
    createStartDate: '',
    createEndDate: '',
    opporStatus: 0,
    pageNo: PAGE_NO,
    pageSize: PAGE_SIZE
  },
  businessTaskForm: {
    startDate: '',
    endDate: '',
    organizeNameOrCode: '',
    opporCode: '',
    taskHasComplete: '',
    pageNo: PAGE_NO,
    pageSize: PAGE_SIZE,
    businessStatus: '1'
  },
  businessTaskList: [],
  businessList: {},
  businessDetail: {},
  businessCategoryList: [],
  officeAddress: '',
  submitBusinessStatus: '',
  groupAssociationStatus: '',
  delBusinessStatus: '',
  businessDraftDetail: '',
  designatePerson: '',
  remindPerson: [],
  submitBusinessSendStatus: '',
  submitBusinessCancelStatus: '',
  saveBusinessDrafStatus: '',
  saveBusinessOrder: '',
  saveBusinessOrderDraft: '',
  myBusinessList: ''
};

const mutations = {
  [types.COOPERATION_GROUP](state, data) {
    state.cooperationGroupList = data.list;
  },
  [types.BUSINESS_OPPORTUNITY_LIST](state, data) {
    state.businessList.data = data.list;
    state.businessList.totalCount = data.totalCount;
  },
  [types.BUSINESS_DETAIL](state, data) {
    state.businessDetail = data.list;
  },
  [types.BUSINESS_CATEGORY_LIST](state, data) {
    state.businessCategoryList = data.list;
  },
  [types.OFFICE_ADDRESS](state, data) {
    state.officeAddress = data.list;
  },
  [types.SUBMIT_BUSINESS_STATUS](state, data) {
    state.submitBusinessStatus = data.list;
  },
  [types.GROUP_ASSOCIATION_STATUS](state, data) {
    state.groupAssociationStatus = data.list;
  },
  [types.DEL_BUSINESS_STATUS](state, data) {
    state.delBusinessStatus = data.list;
  },
  [types.BUSINESS_DRAFT_DETAIL](state, data) {
    state.businessDraftDetail = data.list;
  },
  [types.DESIGNATE_PERSON](state, data) {
    state.designatePerson = data.list;
  },
  [types.REMIND_PERSON](state, data) {
    state.remindPerson = data.list;
  },
  [types.SUBMIT_BUSINESS_SEND_STATUS](state, data) {
    state.submitBusinessSendStatus = data.list;
  },
  [types.SUBMIT_BUSINESS_CANCEL_STATUS](state, data) {
    state.submitBusinessCancelStatus = data.list;
  },
  [types.SAVE_BUSINESS_DRAFT_STATUS](state, data) {
    state.saveBusinessDrafStatus = data.list;
  },
  [types.SAVE_BUSINESS_ORDER](state, data) {
    state.saveBusinessOrder = data.list;
  },
  [types.SAVE_BUSINESS_ORDER_DRAFT](state, data) {
    state.saveBusinessOrderDraft = data.list;
  },
  [types.MY_BUSINESS_LIST](state, data) {
    state.myBusinessList = data.list;
  },
  [types.BUSINESS_TASK_LIST](state, data) {
    state.businessTaskList = data.list;
  }
};
export default {
  state,
  mutations
};
