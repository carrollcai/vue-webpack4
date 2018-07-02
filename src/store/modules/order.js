import * as types from '../types';
import {
  PAGE_NO,
  PAGE_SIZE
} from '@/config/index.js';

const state = {
  orderOverviewForm: {
    pageNo: PAGE_NO,
    pageSize: PAGE_SIZE,
    totalcount: 1,
    date: [],
    nameOrCode: ''
  },
  orderList: []
};

const mutations = {
  [types.ORDER_GET_LIST](state, data) {
    state.orderList = data.list;
    state.orderOverviewForm.totalcount = data.totalcount;
  }
};

export default {
  state,
  mutations
};
