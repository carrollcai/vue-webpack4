import * as types from '../types';
import {
  PAGE_NO,
  PAGE_SIZE
} from '@/config/index.js';

const state = {
  cooperationGroupList: [],
  businessForm: {
    pageNo: PAGE_NO,
    pageSize: PAGE_SIZE,
    totalcount: 1,
    date: [],
    cooperName: '',
    businessName: '',
    status: null
  },
  businessList: [],
  businessDetail: {},
  businessCategoryList: [],
  officeAddress: '',
  submitBusinessStatus: '',
  groupAssociationStatus: '',
  delBusinessStatus: '',
  businessDraftDetail: '',
  designatePerson: ''
};

const mutations = {
  [types.COOPERATION_GROUP](state, data) {
    state.cooperationGroupList = data.list;
  },
  [types.BUSINESS_OPPORTUNITY_LIST](state, data) {
    state.businessList = data.list;
    state.businessForm.totalcount = data.totalcount;
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
  }
};
export default {
  state,
  mutations
};
