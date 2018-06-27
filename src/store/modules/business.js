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
  businessDetail: {}
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
  }
};

export default {
  state,
  mutations
};
