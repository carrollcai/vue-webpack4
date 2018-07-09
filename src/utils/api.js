import qs from 'qs';
import { fetch } from './http/index.js';
import { jsonToFormData } from './common.js';

// const development = 'http://localhost:3618';
const development = '';
const API = (url, method) => params => fetch(development + url, params, method || 'post');
const download = url => params => {
  window.location.href = `${url}?${qs.stringify(params)}`;
};
const upload = (url, method) => params => {
  let formData = jsonToFormData(params);
  let config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };
  return fetch(development + url, formData, 'post', config);
};

export default {
  getProvinceAPI: API('/esop/secBranch/queryStaticData'),
  getUserRoleAPI: API('/esop/role/queryRoleAll'),
  queryStaticDataAPI: API('/esop/commonWebController/queryStaticDatsMap'),
  queryRegionRelationListAPI: API('/esop/operator/getRegionRelationList'),

  /* 附件 */
  getNewFileInputIdAPI: API('/esop/elec/getNewFileInputId'), // 获取附件上传id

  /* 角色管理 */
  getRoleListAPI: API('/esop/role/queryRole'),
  getRoleInfoAPI: API('/esop/role/getRoleById'),
  createRoleAPI: API('/esop/role/createRole'),
  updateRoleAPI: API('/esop/role/updateRoleById'),
  deleteRoleAPI: API('/esop/role/deleteRoleById'),

  /* 用户管理 */
  getUserListAPI: API('/esop/operator/queryOperator'),
  getUserInfoAPI: API('/esop/operator/queryById'),
  createUserAPI: API('/esop/operator/saveOperator'),
  updateUserAPI: API('/esop/operator/updateInfo'),
  deleteUserAPI: API('/esop/operator/deleteInfo'),

  /* 数据分析 */
  getMembersAPI: API('/esop/analysisReport/queryPDNNs'), // 查询新增会员活跃用户数，按日
  getDailyActiveUserAPI: API('/esop/analysisReport/queryPDARs'), // 分省日活跃用户数，按日
  getMonthDailyActiveUserAPI: API('/esop/analysisReport/queryMANs'), // 分省日活跃用户数，按月
  getTrendListAPI: API('/esop/analysisReport/queryPDARs'), // 活跃度分析日活跃数查询，按日
  getMonthTrendListAPI: API('/esop/analysisReport/queryMANs'), // 活跃度分析月活跃数查询，按月
  getTrendNewMembersAPI: API('/esop/analysisReport/queryPDNNs'), // 活跃度分析新增会员查询，按日
  getTrendNewMembersMonthAPI: API('/esop/analysisReport/queryMNANs'), // 活跃度分析新增会员查询，按月
  getProvinceUserAPI: API('/esop/analysisReport/queryPDARs'), // 各省日活跃用户情况，按日

  downloadTrendDataAnalysisAPI: download('/esop/analysisReport/downloadPDARs'), // 下载数据分析,按日
  downloadMonthTrendDataAnalysisAPI: download('/esop/analysisReport/downloadMANs'), // 下载数据分析，按月

  getRetentionLossUserAPI: API('/esop/analysisReport/queryMDRs'), // 月留存流失
  downloadRetTrendDataAnalysisAPI: download('/esop/analysisReport/downloadMDRs'),

  /* 任务管理 */
  getTaskQueryListAPI: API('http://localhost:3618/task/management'), // 任务查询列表
  getTaskDetailAPI: API('http://localhost:3618/task/management'), // 任务详情获取接口
  queryPushListAPI: API('http://localhost:3618/task/push/list'), // 我的申请列表
  deletePushAPI: API('http://localhost:3618/task/push/list'), // 我的申请列表删除
  queryTodoListAPI: API('http://localhost:3618/task/todo/list'), // 我的待办列表
  taskSubmitAuditAPI: API('http://localhost:3618/task/todo/list'), // 审核接口

  /* 订单管理 */
  getOrderListAPI: API('http://localhost:3618/order/overview'), // 订单总览
  uploadOrderHandleTaskAPI: upload('http://localhost:3618/task/todo/list'), // 订单处理上传任务
  getOrganizeAddressAPI: API('/esop/organize/queryLikeName'), // 查询集团地址,
  createOrderAPI: API('http://localhost:3618/order/overview'), // 新建订单,
  getOrderDetailAPI: API('http://localhost:3618/order/overview'), // 获取订单详情
  getAssignhandlerAPI: API('http://localhost:3618/order/overview'), // 获取分派
  createAssignAPI: API('http://localhost:3618/order/overview'), // 创建分派
  submitOrderRowAPI: API('http://localhost:3618/order/overview'), // 提交订单
  deleteOrderRowAPI: API('http://localhost:3618/order/overview'), // 删除订单

  /* 登录相关 */
  loginApi: API('/esop/login/server'),
  logoutApi: API('/esop/login/logout'),
  resetPwdApi: API('/esop/secBranch/editPassword'),
  getCurrentUserInfoAPI: API('/esop/login/queryCurrentOperator'),

  /* 集团客户管理 */
  /**
   * 查询集团客户总览列表
   */
  queryCustomerOverviewListAPI: API('/esop/organize/queryOrganize'),

  /**
   * 集团客户总览-查看主页-查询订购产品
   */
  querySubscribeProductsAPI: API('/esop/organize/queryOrganize'),

  /**
   * 查询集团客户创建列表
   */
  getGroupCustomerListAPI: API('/esop/organize/queryMyOrganize'),
  /**
   * 查询集团客户审核列表
   */
  queryCustomerAuditListAPI: API('/esop/organize/queryTaskInfo'),

  // 生成集团客户联系人ID
  generateContactIdAPI: API('/esop/organize/contactId'),
  /* 产品管理 */
  // 产品总览
  getProductListAPI: API('/esop/product/queryProduct'),
  // 产品创建管理
  getProductCreatListAPI: API('/esop/product/queryProductSelf'),
  // 产品详情
  getProductDetailAPI: API('/esop/product/queryDetailProduct'),
  setAddProductAPI: API('/esop/product/addProduct'),
  setEditProductAPI: API('/esop/product/editProduct'),
  deleteProductAPI: API('/esop/product/deleteProduct'),
  uploadProductSchemeAPI: upload('/esop/elec/upload'), // 订单处理上传任务
  uploadProductFileIdAPI: upload('/esop/elec/getNewFileInputId'),
  queryElecAPI: upload('/esop/elec/queryElec'),
  delUplodFileAPI: upload('/esop/elec/del'),
  downloadUplodFileAPI: download('/esop/elec/download'),
  // getDetailSaleListAPI: API('http://localhost:3618/esop/product/queryComposedProduct')
  getComposedProductAPI: API('/esop/product/queryComposedProduct'),
  // 新增集团客户
  createCustomerAPI: API('/esop/organize/create'),
  /**
   * 新增集团客户-立即提审
   */
  createApproveCustomerAPI: API('/esop/organize/createApprove'),

  /**
   * 修改集团客户
   */
  updateCustomerAPI: API('/esop/organize/edit'),
  /**
   * 查询客户经理
   */
  queryCustomerManagerAPI: API('esop/operator/queryManager'),

  /**
   * 查询集团客户
   */
  queryCustomerAPI: API('/esop/organize/queryOrganizeById'),
  /**
   * 查询集团客户 快照
   */
  queryCustomerSnapshotAPI: API('/esop/organize/querySnapShort'),
  /**
   * 查询审核集团客户的流程
   */
  queryCustomerProcessedAPI: API('/esop/processInfo/query'),

  /**
   * 删除集团客户
   */
  deleteCustomerAPI: API('/esop/organize/deleteById'),

  /**
   * 提审集团客户
   */
  approveCustomerAPI: API('/esop/organize/startProcess'),
  /**
   * 审核集团客户
   */
  auditCustomerAPI: API('/esop/organize/moveNode'),

  /* 商机管理 */
  // 获取合作集团/编码列表
  getCooperationGroupListAPI: API('http://localhost:3618/business-manage/getCooperationGroup'),
  // 查询商机列表
  getBusinessListAPI: API('/esop/bizOppor/List'),

  // 商机详情查询
  getBusinessDetailAPI: API('http://localhost:3618/business-manage/businessDetail'),

  // 新建商机
  // 获取商机类别列表
  getBusinessCategoryListAPI: API('http://localhost:3618/business-manage/getBusinessCategoryList'),
  // 根据合作集团匹配办公地址
  getOfficeAddressAPI: API('http://localhost:3618/business-manage/getOfficeAddress'),
  // 提交商机
  submitBusinessOpporityAPI: API('/esop/bizOppor/createApprove'),
  // 保存草稿商机
  saveBusinessDraftAPI: API('/esop/bizOppor/create'),
  // 集团关联商机
  groupAssociationAPI: API('http://localhost:3618/business-manage/submitBusinessOppority'),
  // 删除商机
  delBusinessOpporityAPI: API('http://localhost:3618/business-manage/submitBusinessOppority'),
  // 商机草稿详情查询
  getBusinessDraftDetailAPI: API('http://localhost:3618/business-manage/businessDetail'),
  // 获取提醒人
  getRemindPersonAPI: API('http://localhost:3618/business-manage/businessDetail'),
  // 获取指派处理人
  getDesignatePersonAPI: API('http://localhost:3618/business-manage/chuliren'),
  // 提交分派
  submitBusinessSendAPI: API('http://localhost:3618/business-manage/chuliren'),
  // 提交作废
  submitBusinessCancelAPI: API('http://localhost:3618/business-manage/chuliren'),
  // 提交商机转订单
  saveBusinessOrderAPI: API(''),
  // 提交商机转订单草稿
  saveBusinessOrderDraftAPI: API('')
};
