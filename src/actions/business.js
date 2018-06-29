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
  },
  /**
   * 查询 “获取商机类别列表” 数据
   */
  getBusinessCategoryList: ({ commit }, params) => {
    return API.getBusinessCategoryListAPI(params).then(res => {
      commit(types.BUSINESS_CATEGORY_LIST, res.data);
    });
  },
  /**
   * 根据 “合作集团匹配办公地址” 数据
   */
  getOfficeAddress: ({ commit }, params) => {
    return API.getOfficeAddressAPI(params).then(res => {
      commit(types.OFFICE_ADDRESS, res.data);
    });
  },
  /**
   * 提交 “商机” 数据
   */
  submitBusinessOppority: ({ commit }, params) => {
    return API.submitBusinessOpporityAPI(params).then(res => {
      commit(types.SUBMIT_BUSINESS_STATUS, res.data);
    });
  },
  /**
   * 获取 “集团关联商机” 状态
   */
  groupAssociation: ({ commit }, params) => {
    return API.groupAssociationAPI(params).then(res => {
      commit(types.GROUP_ASSOCIATION_STATUS, res.data);
    });
  },
  /**
   * 删除 “商机” 数据
   */
  delBusinessOppority: ({ commit }, params) => {
    return API.delBusinessOpporityAPI(params).then(res => {
      commit(types.DEL_BUSINESS_STATUS, res.data);
    });
  },
  /**
   * 查询 “商机草稿详情” 数据
   */
  getBusinessDraftDetail: ({ commit }, params) => {
    return API.getBusinessDraftDetailAPI(params).then(res => {
      commit(types.BUSINESS_DRAFT_DETAIL, res.data);
    });
  }
};

export default actions;
