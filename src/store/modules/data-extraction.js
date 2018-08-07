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
  dataDownloadList: [],
  dataSteps: [],
  dataDetailList: {},
  auditForm: {
    startTime: '',
    endTime: '',
    opName: '',
    name: '',
    status: null,
    pageNo: PAGE_NO,
    pageSize: PAGE_SIZE
  },
  dataAuditList: {},
  dataTaskList: []
};

const mutations = {
  [types.DATA_EXTRACTION_DOWMLOAD](state, data) {
    state.dataDownloadList = data;
  },
  [types.DATA_EXTRACTION_STEPS](state, data) {
    state.dataSteps = data;
  },
  [types.DATA_EXTRACTION_DETAIL_DATA](state, data) {
    state.dataDetailList = data;
  },
  [types.DATA_EXTRACTION_AUDIT](state, data) {
    state.dataAuditList = data;
  },
  [types.DATA_EXTRACTION_TASK](state, data) {
    state.dataTaskList = data;
  }
};

export default {
  state,
  mutations
};
