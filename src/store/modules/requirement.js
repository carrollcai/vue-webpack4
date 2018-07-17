import { createHelpers } from 'vuex-map-fields';
import * as types from '../types';
import {PAGE_NO, PAGE_SIZE} from '@/config';

const { getRequirementField, updateRequirementField } = createHelpers({
  getterType: 'getRequirementField',
  mutationType: 'updateRequirementField'
});

const state = {
  requirementList: {},
  requirementTasks: {},
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
    taskHasComplete: '',
    organizeName: '',
    reqType: '',
    activeName: 'first'
  },
  processors: {}
};

const mutations = {
  [types.REQUIREMENT_GET_LIST](state, data) {
    state.requirementList = data;
  },
  [types.REQUIREMENT_TASK_LIST](state, data) {
    state.requirementTasks = data;
  },
  [types.REQUIREMENT_GET_INFO](state, data) {
    state.requirement = data;
  },
  [types.REQUIREMENT_PROCESSORS](state, data) {
    // 改造指派人结构
    let handlers = data.map(val => {
      let newVal = {};
      newVal.value = val.codeValue;
      newVal.label = val.codeName;
      newVal.children = val.childrenList && val.childrenList.filter(cval => cval.secOperatorDTOList).map(cval => {
        let newCval = {};
        newCval.value = cval.codeValue;
        newCval.label = cval.codeName;
        newCval.children = cval.secOperatorDTOList && cval.secOperatorDTOList.map(gcval => {
          return {
            value: gcval.operatorId,
            label: gcval.staffName
          };
        });
        return newCval;
      });
      return newVal;
    });
    state.processors = handlers.filter(val => val.children && val.children.length);
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
