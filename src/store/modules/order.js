import * as types from '../types';
import {
  PAGE_NO,
  PAGE_SIZE
} from '@/config/index.js';

const state = {
  processInsId: null,
  orderOverviewForm: {
    pageNo: PAGE_NO,
    pageSize: PAGE_SIZE,
    ordNameOrCode: '',
    organizeNameOrCode: '',
    startDate: '',
    endDate: '',
    date: [],
    ordStatus: 0
  },
  orderOverviewObj: {
    list: [],
    totalcount: 1
  },
  orderOverviewDetail: {},
  processList: [],

  orderCreateManageForm: {
    pageNo: PAGE_NO,
    pageSize: PAGE_SIZE,
    ordNameOrCode: '',
    organizeNameOrCode: '',
    startDate: '',
    endDate: '',
    date: [],
    ordStatus: 0
  },
  orderCreateManageObj: {
    list: [],
    totalCount: 1
  },
  orderCreate: {
    ordName: '',
    predictContractAmount: null,
    predictSignTime: '',
    predictAgreementTime: '',
    isProjectInvitation: '1',
    organizeName: '',
    address: '',
    contactName: '',
    contactGender: '',
    contactMobile: null,
    contactEmail: '',
    busiDesc: '',
    busiRequire: '',
    productName: ''
  },
  orderOrganizeAddressList: [],

  orderHandleTaskForm: {
    pageNo: PAGE_NO,
    pageSize: PAGE_SIZE,
    ordNameOrCode: '',
    organizeNameOrCode: '',
    startDate: '',
    endDate: '',
    date: [],
    businessStatus: 0
  },
  orderHandleTaskObj: {
    list: [],
    totalcount: 1
  },
  assignHandlers: [],
  handleTaskDetail: {}
};

const mutations = {
  [types.ORDER_GET_LIST](state, data) {
    state.orderOverviewObj = Object.assign(state.orderOverviewObj, data);
  },
  [types.ORDER_QUERY_ORGANIZE_ADDRESS](state, data) {
    state.orderOrganizeAddressList = data.list.map(val => Object.assign(val, {value: val.organizeName}));
  },
  [types.ORDER_CREATE](state, data) {

  },
  [types.ORDER_CM_GET_LIST](state, data) {
    state.orderCreateManageObj = Object.assign(state.orderCreateManageObj, data);
  },
  [types.ORDER_HT_GET_LIST](state, data) {
    state.orderHandleTaskObj = Object.assign(state.orderHandleTaskObj, data);
  },
  [types.ORDER_QUERY_ASSIGN_HANDLER](state, data) {
    state.assignHandlers = data;
  },
  [types.ORDER_GET_HANDLE_TASK_DETAIL](state, data) {
    console.log(data);
    state.handleTaskDetail = data;
  },
  [types.ORDER_OVERVIEW_GET_DETAIL](state, data) {
    state.orderOverviewDetail = Object.assign({}, data);
  },
  [types.ORDER_GET_PROCESS_LIST](state, data) {
    state.processList = data;
  },
  [types.ORDER_UPDATE_CREATE](state, data) {
    state.orderCreate = Object.assign({}, state.orderCreate, data);
  },
  [types.ORDER_GET_EDIT](state, data) {
    state.orderCreate = data;
  }
};

export default {
  state,
  mutations
};
