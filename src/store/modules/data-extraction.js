import * as types from '../types';
import {PAGE_NO, PAGE_SIZE} from '@/config';

const state = {
  downloadForm: {
    startDate: '',
    endDate: '',
    name: '',
    extractBusinessStatus: 0,
    isOpen: null,
    pageNo: PAGE_NO,
    pageSize: PAGE_SIZE
  },
  dataDownloadList: [],
  dataSteps: [],
  dataDetailList: {},
  auditForm: {
    startDate: '',
    endDate: '',
    staffName: '',
    name: '',
    taskHasComplete: 0,
    pageNo: PAGE_NO,
    pageSize: PAGE_SIZE
  },
  dataAuditList: {},
  dataTaskList: [],
  processorList: []
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
  },
  [types.PROCESSOR_LIST](state, data) {
    // 审核人结构
    let handlers = data.map(val => {
      let newVal = {};
      newVal.value = val.region;
      newVal.label = val.regionName;
      newVal.children = val.province && val.province.filter(cval => cval.province).map(cval => {
        let newCval = {};
        newCval.value = cval.province;
        newCval.label = cval.provinceName;
        return newCval;
      });
      return newVal;
    });
    state.processorList = handlers;
  },
};

export default {
  state,
  mutations
};
