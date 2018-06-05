import * as types from '../types';
const roleCreate = {
  name: '',
  desc: '',
  permissions: []
};

const state = {
  roleObj: [],
  roleCreate: Object.cloneDeep(roleCreate)
};

const mutations = {
  [types.ROLE_LIST](state, data) {
    state.roleObj = data;
  },
  [types.ROLE_INIT_FORM](state, data) {
    state.roleCreate = Object.cloneDeep(roleCreate);
  },
  [types.ROLE_GET_INFO](state, data) {
    state.roleCreate = data;
  }
};

export default {
  state,
  mutations
};
