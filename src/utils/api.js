import qs from 'qs';
import { fetch } from './http/index.js';
import { jsonToFormData } from './common.js';

// const development = 'http://localhost:3618';
const development = '';
const API = (url, method) => params => fetch(development + url, params, method || 'post');
const download = url => params => {
  // console.log(`${qs.stringify(params, {arrayFormat: 'brackets'})}`);
  window.location.href = `${url}?${qs.stringify(params, { arrayFormat: 'brackets' })}`;
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
  /* 公共 */
  getProvinceAPI: API('/esop/secBranch/queryStaticData'),
  getUserRoleAPI: API('/esop/role/queryRoleAll'),
  queryStaticDataAPI: API('/esop/commonWebController/queryStaticDatsMap'),
  queryRegionRelationListAPI: API('/esop/operator/getRegionRelationList'),
  queryProductByCodeOrNameAPI: API('/esop/product/queryByCodeOrName'), // 查询产品名称
  /* 附件 */
  getNewFileInputIdAPI: API('/esop/elec/getNewFileInputId'), // 获取附件上传id
  uploadFileAPI: upload('/esop/elec/upload'), // 附件上传
  getFileThroughtFileIdAPI: upload('/esop/elec/queryElec'), // 通过文件id获取文件信息
  downloadAttachFileAPI: download('/esop/elec/download'), // 文件下载

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

  // 分省日活跃用户数，按日
  getDailyActiveUserAPI: API('/esop/analysisReport/queryDActiveWithSum'),
  // 分省日活跃用户数，按月
  getMonthDailyActiveUserAPI: API('/esop/analysisReport/queryMActiveWithSum'),

  queryActiveOverviewDayAPI: API('/esop/analysisReport/queryDActive'),
  queryActiveOverviewMonthAPI: API('/esop/analysisReport/queryMActive'),

  // 活跃度分析日活跃数查询，按日
  getTrendListAPI: API('/esop/analysisReport/queryDActive'),
  // 活跃度分析月活跃数查询，按月
  getMonthTrendListAPI: API('/esop/analysisReport/queryMActive'),

  // 活跃度分析新增会员查询，按日
  getTrendNewMembersAPI: API('/esop/analysisReport/queryPDNNs'),
  // 活跃度分析新增会员查询，按月
  getTrendNewMembersMonthAPI: API('/esop/analysisReport/queryMNANs'),
  getProvinceUserAPI: API('/esop/analysisReport/queryDActiveWithSum'), // 各省日活跃用户情况，按日

  downloadTrendDataAnalysisAPI: download('/esop/analysisReport/downloadDActive'), // 下载数据分析,按日
  downloadMonthTrendDataAnalysisAPI: download('/esop/analysisReport/downloadMActive'), // 下载数据分析，按月
  downloadRetTrendDataAnalysisAPI: download('/esop/analysisReport/downloadRetainDropout'), // 下载留存流失趋势分析
  downloadNewUserRankByMonthAPI: download('/esop/analysisReportNew/downloadNewUserRankByMonth'), // 新增用户趋势分析下载
  downloadNewMemberAPI: download('/esop/analysisReportNew/downloadNewMember'), // 新增活跃会员分析下载
  eventUseraddDownloadAPI: download('/esop/analysisReportNew/downloadNewMember11'), // 球球活动下载

  // 新增用户分析 - 查询新增用户数据
  queryAddUserOverviewAPI: API('/esop/analysisReportNew/queryNewUserRank'),

  // 新增用户分析 -  查询新增用户趋势分析
  queryAddUserTrendAPI: API('/esop/analysisReportNew/queryNewUserRankByMonth'),

  queryAddUserMapAPI: API('/esop/analysisReportNew/queryNewUserRank'),

  // 新增用户分析 -  查询新增会员用户趋势分析
  queryAddUserVipAPI: API('/esop/analysisReportNew/queryNewMember'),

  getRetentionLossUserAPI: API('/esop/analysisReport/queryRetainDropout'), // 月留存流失

  queryRetentionLossUserAPI: API('/esop/analysisReport/queryRetainDropoutWithSum'),

  /* 任务管理 */
  getTaskQueryListAPI: API('http://localhost:3618/task/management'), // 任务查询列表
  getTaskDetailAPI: API('http://localhost:3618/task/management'), // 任务详情获取接口
  queryPushListAPI: API('http://localhost:3618/task/push/list'), // 我的申请列表
  deletePushAPI: API('http://localhost:3618/task/push/list'), // 我的申请列表删除
  queryTodoListAPI: API('http://localhost:3618/task/todo/list'), // 我的待办列表
  taskSubmitAuditAPI: API('http://localhost:3618/task/todo/list'), // 审核接口

  /* 订单管理 */
  getOrderOverviewListAPI: API('/esop/bizOrder/overView'), // 订单总览
  getCreateManageListAPI: API('/esop/bizOrder/createView'), // 订单创建管理
  getHandleTaskListAPI: API('/esop/bizOrder/queryTaskInfo'), // 订单处理任务
  getOrganizeAddressAPI: API('/esop/organize/queryLikeName'), // 查询集团地址
  createOrderAPI: API('/esop/bizOrder/save'), // 新建订单
  updateOrderAPI: API('/esop/bizOrder/update'), // 修改订单
  getOrderDetailAPI: API('/esop/bizOrder/detail'), // 获取订单详情
  // getOverViewDetailAPI: API('/esop/bizOrder/overViewDetail'),
  getOverViewDetailAPI: API('/esop/bizOrder/detail'),
  getAssignhandlerAPI: API('/esop/operator/getAssignOperatorList'), // 获取分派
  getProductHandlerAPI: API('/esop/operator/selectOrdProOperator'), // 获取产品指派人
  createAssignAPI: API('/esop/bizOrder/nodeMove'), // 推动流程，创建分派resultStatus=0，取消resultStatus=3
  submitOrderRowAPI: API('/esop/bizOrder/startProcess'), // 提交订单
  deleteOrderRowAPI: API('/esop/bizOrder/delete'), // 删除订单,
  setConnectOriganizeAPI: API('/esop/bizOrder/updateOrganize'), // 关联集团
  submitOrderPayAPI: API('/esop/bizOrder/updatePayAmount'), // 付款
  submitAssignContractAPI: API('/esop/bizOrder/updateFileId'), // 签约

  /* 登录相关 */
  loginApi: API('/esop/login/server'),
  logoutApi: API('/esop/login/logout'),
  resetPwdApi: API('/esop/secBranch/editPassword'),
  sendSmsApi: API('/esop/login/sendVerifyLoginSMS'),
  getCurrentUserInfoAPI: API('/esop/login/queryCurrentOperator'),

  /* 集团客户管理 */
  /**
   * 查询集团客户总览列表
   */
  queryCustomerOverviewListAPI: API('/esop/organize/queryOrganize'),

  /**
   * 集团客户总览-查看主页-查询订购产品
   */
  querySubscribeProductsAPI: API('/esop/organize/queryOrganizeOrder'),

  /**
   * 查询集团客户创建列表
   */
  getGroupCustomerListAPI: API('/esop/organize/queryMyOrganize'),

  /**
   * 查询集团客户审核列表
   */
  queryCustomerAuditListAPI: API('/esop/organize/queryTaskInfo'),

  /**
   * 生成集团客户联系人ID
   */
  generateContactIdAPI: API('/esop/organize/contactId'),

  /**
   * 根据名称模糊查询集团信息
   */
  getGroupNameAPI: API('/esop/organize/queryLikeName'),
  /* 产品管理 */
  // 产品总览
  // 产品创建管理
  getProductCreatListAPI: API('/esop/product/queryProduct'),
  // 产品详情
  getProductDetailAPI: API('/esop/product/queryDetailProductWithOutSales'),
  setEditProductAPI: API('/esop/product/editProduct'),
  deleteProductAPI: API('/esop/product/deleteProduct'),
  uploadProductSchemeAPI: upload('/esop/elec/upload'), // 订单处理上传任务
  uploadProductFileIdAPI: upload('/esop/elec/getNewFileInputId'),
  queryElecAPI: upload('/esop/elec/queryElec'),
  delUplodFileAPI: upload('/esop/elec/del'),
  downloadUplodFileAPI: download('/esop/elec/download'),
  // getDetailSaleListAPI: API('http://localhost:3618/esop/product/queryComposedProduct')
  getComposedProductAPI: API('/esop/product/queryComposedProduct'),
  // 新产品接口
  // 查询归属公司
  getOwnershipCompanyAPI: API('/esop/secBranch/queryStaticByParentCode'),
  getProductLibraryAPI: API('/esop/product/queryProductLibrary'),
  getProductOutOfLibraryAPI: API('/esop/product/queryProductOutOfLibrary'),
  // 新增销售产品
  addSalesProductsAPI: API('/esop/product/productLibraryOn'),
  // 下架
  underCarriageProductAPI: API('/esop/product/productLibraryOff'),
  // 添加销售案例
  addSalesCaseAPI: API('/esop/product/addSales'),
  // 修改销售案例
  editSalesCaseAPI: API('/esop/product/editSales'),
  // 删除销售案例
  delSalesCaseAPI: API('/esop/product/deleteSales'),
  // 查询销售案例详情页面
  getSalesCaseDetailAPI: API('/esop/product/queryDetailProductWithSales'),
  // 查询销售案例详情（单个案例）
  getProductCaseDetailAPI: API('/esop/product/queryDetailSale'),
  // 模糊搜索产品
  getProductNameAPI: API('/esop/product/queryByCodeOrName'),
  // getProductListAPI: API('/esop/product/queryProduct'),
  // 新建产品
  setAddProductAPI: API('/esop/product/addProduct'),
  // 查询对接人
  getBrokerAPI: API('/esop/product/queryBroker'),
  // 产品下线
  setProductOffAPI: API('/esop/product/productOff'),
  // 产品审核管理
  getProductTaskInfoAPI: API('esop/product/queryTaskInfo'),
  // 产品审核
  setProductAuditAPI: API('esop/product/moveNode'),
  // 获取产品归属联动下拉框静态数据
  getProductBelongOptionAPI: API('esop/product/selectProductBelongOption'),

  /**
   * 新增集团客户
   */
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
   * 修改-立即提审集团客户
   */
  editApproveCustomerAPI: API('/esop/organize/editApprove'),

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

  /**
   * 标签库查询
   */
  tagLibraryAPI: API('/esop/organize/queryLabel'),

  /**
   * 查询客户需求列表
   */
  queryRequirementListAPI: API('/esop/bizRequire/queryRequirement'),

  /**
   * 查询 需求任务处理 列表
   */
  queryRequirementTasksAPI: API('/esop/bizRequire/queryRequireTask'),

  /**
   * 客户需求-处理日常、投诉需求
   */
  handleDailyComplainAPI: API('/esop/bizRequire/handleDailyComplain'),

  /**
   *客户需求-处理物料需求
   */
  handleRequirementMaterielAPI: API('/esop/bizRequire/handleMateriel'),

  /**
   * 新增客户需求
   */
  saveRequirementAPI: API('/esop/bizRequire/create'),

  /**
   * 处理客户需求 查询投诉处理人
   */
  queryRequirementProcessorsAPI: API('/esop/bizRequire/getComplaintProcessor'),

  /**
   * 新增客户需求 查询处理人
   */
  queryRequirementCreateProcessorsAPI: API('/esop/bizRequire/getReqProcessor'),

  /**
   * 查询客户需求
   */
  queryRequirementAPI: API('/esop/bizRequire/queryReqDetail'),

  /* 商机管理 */
  // 查询商机列表
  getBusinessListAPI: API('/esop/bizOppor/allList'),

  // 商机详情查询
  getBusinessDetailAPI: API('/esop/bizOppor/detail'),

  // 新建商机
  // 创建并提交商机
  submitBusinessOpporityAPI: API('/esop/bizOppor/createApprove'),
  // 提交商机草稿
  submitBusinessDraftAPI: API('/esop/bizOppor/startProcess'),
  // 保存草稿商机
  saveBusinessDraftAPI: API('/esop/bizOppor/create'),
  // 集团关联商机
  groupAssociationAPI: API('/esop/bizOppor/editOrg'),
  // 删除商机
  delBusinessOpporityAPI: API('/esop/bizOppor/remove'),
  // 获取提醒人
  getRemindPersonAPI: API('esop/operator/getRemindersOperatorList'),
  // 获取指派处理人
  getDesignatePersonAPI: API('esop/operator/getAssignOperatorList'),
  // 提交分派
  submitBusinessSendAPI: API('esop/bizOppor/nodeMove'),
  // 提交作废
  submitBusinessCancelAPI: API('esop/bizOppor/nodeMove'),
  // 商机转订单(获取订单基本数据)
  getTransforOrderDetailAPI: API('esop/bizOppor/transOppor'),
  // 提交商机转订单
  saveBusinessOrderAPI: API('esop/bizOppor/transtoOrder'),

  // 我的商机查询
  getMyBusinessListAPI: API('esop/bizOppor/list'),
  // 商机处理任务查询
  getBusinessTaskListAPI: API('esop/bizOppor/queryTaskInfo'),
  // 修改商机提交审核
  editBusinessDetailApproveAPI: API('esop/bizOppor/editApprove'),
  // 修改商机不提交审核
  editBusinessDetailAPI: API('esop/bizOppor/edit'),
  // 根据产品编码或名称查询
  getProductNameCodeAPI: API('esop/product/queryByCodeOrName'),
  /* visit */
  getMyVisitManageListAPI: API('esop/visit/queryVisitSelf'),
  addCreateVisitAPI: API('esop/visit/addVisitSelf'),
  addCreateAppiontAPI: API('esop/visit/addVisitAssign'),
  getAppointVisitListAPI: API('esop/visit/queryVisitAssign'),
  queryVisitAppointDetailAPI: API('esop/visit/queryDetailVisit'),
  queryRegisterListAPI: API('esop/bizOppor/queryOpporByCode'),
  editVisitAppAPI: API('esop/visit/editVisit'),
  deleteVisitAppAPI: API('esop/visit/deleteVisit'),
  addAppointVisitAPI: API('/esop/visit/handleVisit'),
  queryRegionManagerAPI: API('esop/visit/selectRegionManager'),
  queryProcessorAPI: API('esop/visit/getProcessor'),
  /**
   * 查询 走访任务处理 列表
   */
  queryVisitTasksAPI: API('/esop/visit/queryVisitTaskInfo'),

  /**
   * 查询走访详情
   */
  queryVisitDetailAPI: API('/esop/visit/queryDetailVisit'),
  queryVisitAssignDetailAPI: API('/esop/visit/queryVisitAssign'),
  /**
   * 评价走访任务
   */
  judgeVisitAPI: API('/esop/visit/executeEvaluate'),

  /**
   * 审核走访任务
   */
  auditVisitAPI: API('/esop/visit/approveVisit'),
  // 任务查看
  getQueryTaskAPI: API('esop/processInfo/queryTask'),
  /**
   * 首页
   */
  // 获取当前用户信息
  queryCurrentOperatorAPI: API('esop/login/queryCurrentOperator'),
  // 更新用户首页设置标志位
  updateHomeModuleAPI: API('esop/operator/updateHomeModule'),
  // 首页（商机）
  getHomeBusinessListAPI: API('esop/bizOppor/homePage'),
  // 首页（订单）
  getHomeOrderListAPI: API('esop/bizOrder/homePage'),
  // 我的处理任务
  queryTaskInfoAPI: API('esop/index/queryTaskInfo'),
  // 首页集团查询
  queryOrganizeInfoAPI: API('esop/index/queryOrganizeInfo'),
  /**
   * 数据抽取管理
   */
  queryDataDownloadAPI: API('esop/dataExtract/getList'),
  deleteDownLoadDataAPI: API('esop/dataExtract/cancel'),
  dataDownLoadFileAPI: download('http://localhost:3618/esop/all/extraction'),
  applyDataExtractionAPI: API('esop/dataExtract/create'),
  queryDataExtractionStepsAPI: API('esop/processInfo/query'),
  queryDataDetailAPI: API('esop/dataExtract/detail'),
  auditDataExtractionAPI: API('esop/dataExtract/moveNode'),
  queryDataAuditAPI: API('esop/dataExtract/queryTaskInfo'),
  queryDataTaskAPI: API('esop/dataExtract/queryByName'),
  queryProvinceAPI: API('esop/dataExtract/queryProvince')
};
