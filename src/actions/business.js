import * as types from '../store/types';
import API from '../utils/api';

const actions = {
  /**
   * 查询“合作集团/编码”列表
   */
  getCooperationGroupList: ({ commit }, params) => {
    return API.getCooperationGroupListAPI(params).then(res => {
      commit(types.COOPERATION_GROUP, res.data);
    });
  },
  /**
   * 查询 “商机总览” 列表
   */
  getBusinessList: ({ commit }, params) => {
    return API.getBusinessListAPI(params).then(res => {
      commit(types.BUSINESS_OPPORTUNITY_LIST, res.data);
    });
  },
  /**
   * 查询 “商机详情” 数据
   */
  getBusinessDetail: ({ commit }, params) => {
    return API.getBusinessDetailAPI(params).then(res => {
      commit(types.BUSINESS_DETAIL, res.data);
    });
  }
};

export default actions;
