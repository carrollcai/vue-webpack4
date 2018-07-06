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
      return res.data.list;
    });
  },
  /**
   * 保存 “商机草稿” 数据
   */
  saveBusinessDraft: ({ commit }, params) => {
    return API.saveBusinessDraftAPI(params).then(res => {
      commit(types.SAVE_BUSINESS_DRAFT_STATUS, res.data);
      return res.data.list;
    });
  },
  /**
   * 获取 “集团关联商机” 状态
   */
  groupAssociation: ({ commit }, params) => {
    return API.groupAssociationAPI(params).then(res => {
      commit(types.GROUP_ASSOCIATION_STATUS, res.data);
      return res.data.list;
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
  },
  /**
   * 查询 “提醒人” 数据
   */
  getRemindPerson: ({ commit }, params) => {
    return API.getRemindPersonAPI(params).then(res => {
      commit(types.REMIND_PERSON, res.data);
    });
  },
  /**
   * 查询 “指派处理人” 数据
   */
  getDesignatePerson: ({ commit }, params) => {
    return API.getDesignatePersonAPI(params).then(res => {
      commit(types.DESIGNATE_PERSON, res.data.list);
      return res.data.list;
    });
  },
  /**
   * 提交 “商机指派” 数据
   */
  submitBusinessSend: ({ commit }, params) => {
    return API.submitBusinessSendAPI(params).then(res => {
      commit(types.SUBMIT_BUSINESS_SEND_STATUS, res.data);
      return res.data.list;
    });
  },
  /**
   * 提交 “商机作废” 数据
   */
  submitBusinessCancel: ({ commit }, params) => {
    return API.submitBusinessCancelAPI(params).then(res => {
      commit(types.SUBMIT_BUSINESS_CANCEL_STATUS, res.data);
      return res.data.list;
    });
  },
  /**
   * 提交 “商机转订单” 数据
   */
  saveBusinessOrder: ({ commit }, params) => {
    return API.saveBusinessOrderAPI(params).then(res => {
      commit(types.SAVE_BUSINESS_ORDER, res.data);
      return res.data.list;
    });
  },
  /**
   * 提交 “商机转订单草稿” 数据
   */
  saveBusinessOrderDraft: ({ commit }, params) => {
    return API.saveBusinessOrderDraftAPI(params).then(res => {
      commit(types.SAVE_BUSINESS_ORDER_DRAFT, res.data);
      return res.data.list;
    });
  }
};

export default actions;
