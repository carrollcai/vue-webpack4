import * as types from '../types';
import {
  PAGE_NO,
  PAGE_SIZE
} from '@/config/index.js';

const state = {
  cooperationGroupList: [],
  businessForm: {
    startDate: '',
    endDate: '',
    date: [],
    organizeNameOrCode: '',
    opporCode: '',
    opporStatus: '',
    pageNo: PAGE_NO,
    pageSize: PAGE_SIZE
  },
  myBusinessForm: {
    startDate: '',
    endDate: '',
    date: [],
    organizeNameOrCode: '',
    opporCode: '',
    opporStatus: '',
    pageNo: PAGE_NO,
    pageSize: PAGE_SIZE
  },
  businessTaskForm: {
    startDate: '',
    endDate: '',
    date: [],
    organizeNameOrCode: '',
    opporCode: '',
    taskHasComplete: 0,
    pageNo: PAGE_NO,
    pageSize: PAGE_SIZE
  },
  businessTaskList: '',
  businessList: '',
  businessDetail: {},
  officeAddress: '',
  submitBusinessStatus: '',
  groupAssociationStatus: '',
  delBusinessStatus: '',
  designatePerson: [],
  remindPerson: [],
  submitBusinessSendStatus: '',
  submitBusinessCancelStatus: '',
  saveBusinessDrafStatus: '',
  saveBusinessOrder: '',
  myBusinessList: '',
  transforOrderDetail: '',
  submitBusinessDraftStatus: '',
  editBusinessDetailStatus: '',
  editBusinessDetailApproveStatus: '',
  productNameCode: '',
  queryTask: []
};

const mutations = {
  [types.COOPERATION_GROUP](state, data) {
    state.cooperationGroupList = data.list.map(val => Object.assign(val, {value: val.organizeName}));
  },
  // [types.ORDER_QUERY_ORGANIZE_ADDRESS](state, data) {
  //   state.orderOrganizeAddressList = data.list.map(val => Object.assign(val, {value: val.organizeName}));
  // },
  [types.BUSINESS_OPPORTUNITY_LIST](state, data) {
    state.businessList = data;
  },
  [types.BUSINESS_DETAIL](state, data) {
    state.businessDetail = data;
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
    state.delBusinessStatus = data;
  },
  [types.DESIGNATE_PERSON](state, data) {
    state.designatePerson = data.map(val => {
      let _val = {};
      _val.value = val.codeValue;
      _val.label = val.codeName;
      if (val.childrenList) {
        let children = [];
        val.childrenList.map(val => {
          let _chi = {};
          _chi.value = val.codeValue;
          _chi.label = val.codeName;
          children.push(_chi);
        });
        _val.children = children;
      };
      return _val;
    });
  },
  [types.REMIND_PERSON](state, data) {
    state.remindPerson = data;
  },
  [types.SUBMIT_BUSINESS_SEND_STATUS](state, data) {
    state.submitBusinessSendStatus = data.list;
  },
  [types.SUBMIT_BUSINESS_CANCEL_STATUS](state, data) {
    state.submitBusinessCancelStatus = data;
  },
  [types.SAVE_BUSINESS_DRAFT_STATUS](state, data) {
    state.saveBusinessDrafStatus = data.list;
  },
  [types.SAVE_BUSINESS_ORDER](state, data) {
    state.saveBusinessOrder = data.list;
  },
  [types.MY_BUSINESS_LIST](state, data) {
    state.myBusinessList = data;
  },
  [types.BUSINESS_TASK_LIST](state, data) {
    state.businessTaskList = data;
  },
  [types.TRANSFOR_ORDER_DETAIL](state, data) {
    state.transforOrderDetail = data;
  },
  [types.SUBMIT_BUSINESS_DRAFT_STATUS](state, data) {
    state.submitBusinessDraftStatus = data;
  },
  [types.EDIT_BUSINESS_DETAIL_STATUS](state, data) {
    state.editBusinessDetailStatus = data;
  },
  [types.EDIT_BUSINESS_DETAIL_APPROVE_STATUS](state, data) {
    state.editBusinessDetailApproveStatus = data;
  },
  [types.PRODUCT_NAME_CODE](state, data) {
    state.productNameCode = data.list.map(val => Object.assign(val, {value: val.productName}));
    // state.cooperationGroupList = data.list;
  },
  [types.QUERY_TASK](state, data) {
    state.queryTask = data;
  }
};

const getters = {
  businessDetail(state) {
    return state.businessDetail;
  },
  transforOrderDetail(state) {
    return state.transforOrderDetail;
  }
};

export default {
  state,
  mutations,
  getters
};
