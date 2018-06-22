import * as types from '../store/types';
import API from '../utils/api';
// import {Message} from 'element-ui';

const actions = {
  getGroupCustomerList: ({commit}, params) => {
    return API.getGroupCustomerListAPI(params).then(res => {
      commit(types.GROUP_CUSTOMER_GET_LIST, res.data);
    });
  },
  generateContactId: () => {
    return API.generateContactIdAPI();
  }
};

export default actions;
