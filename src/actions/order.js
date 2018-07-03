import * as types from '../store/types';
import API from '../utils/api';

const actions = {
  getOrderList: ({ commit }, params) => {
    return API.getOrderListAPI().then((res) => {
      commit(types.ORDER_GET_LIST, res.data);
    });
  },
  uploadOrderHandleTask: ({ commit }, params) => {
    return API.uploadOrderHandleTaskAPI(params).then((res) => {
      console.log('上传成功');
    });
  }
};

export default actions;
