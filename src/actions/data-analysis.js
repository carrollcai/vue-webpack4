import * as types from '../store/types';
import API from 'utils/api';

const actions = {
  getClient: ({ commit }, params) => {
    return API.getClientAPI(params).then(res => {
      commit(types.CLIENT_GET, res.data);
    }, err => {
      if (err) {
        commit(types.CLIENT_GET, {});
      }
    });
  },
  queryActiveForm: ({ commit }, params) => {
    return API.queryActiveFormAPI(params).then(res => {
      commit(types.ACTIVE_QUERY_FORM, res.data);
    });
  }
};

export default actions;
