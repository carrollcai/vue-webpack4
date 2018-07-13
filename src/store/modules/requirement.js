import { createHelpers } from 'vuex-map-fields';
import * as types from '../types';
import {PAGE_NO, PAGE_SIZE} from '@/config';

const { getRequirementField, updateRequirementField } = createHelpers({
  getterType: 'getRequirementField',
  mutationType: 'updateRequirementField'
});

const state = {
  requirementList: {},
  requirement: {},
  managementQuery: {
    pageNo: PAGE_NO,
    pageSize: PAGE_SIZE,
    rangeDate: [],
    taskStatus: '',
    organizeName: '',
    reqType: '',
    activeName: 'first'
  },
  handleQuery: {
    pageNo: PAGE_NO,
    pageSize: PAGE_SIZE,
    rangeDate: [],
    taskStatus: '',
    organizeName: '',
    reqType: '',
    activeName: 'second'
  }
};

const mutations = {
  [types.REQUIREMENT_GET_LIST](state, data) {
    state.requirementList = data;
  },
  [types.REQUIREMENT_GET_INFO](state, data) {
    state.requirement = data;
  },
  updateRequirementField
};

const getters = {
  requirement(state) {
    return state.requirement;
  },
  getRequirementField
};

export default {
  state,
  mutations,
  getters
};
