import * as types from '../types';

const state = {
  province: []
};

const mutations = {
  [types.PROVINCE](state, data) {
    console.log(data);
    state.province = data;
  }
};

export default {
  state,
  mutations
};
