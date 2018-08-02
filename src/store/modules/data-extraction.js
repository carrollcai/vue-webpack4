import * as types from '../types';
import {PAGE_NO, PAGE_SIZE} from '@/config';

const state = {
  downloadForm: {
    startTime: '',
    endTime: '',
    name: '',
    status: null,
    pageNo: PAGE_NO,
    pageSize: PAGE_SIZE
  },
  dataDownloadList: []
};

const mutations = {
  [types.DATA_EXTRACTION_DOWMLOAD](state, data) {
    state.dataDownloadList = data;
  }
};

export default {
  state,
  mutations
};
