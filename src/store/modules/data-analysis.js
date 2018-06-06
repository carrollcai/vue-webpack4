import * as types from '../types';

const state = {
  client: [],
  activeObj: {
    provincedSelected: [],
    clientSelected: []
  },
  userdata: []
};

const mutations = {
  [types.CLIENT_GET](state, data) {
    state.client = data;
  },
  [types.ACTIVE_QUERY_FORM](state, data) {
    state.userdata = data;
  }
};

export default {
  state,
  mutations
};
