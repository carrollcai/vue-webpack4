import qs from 'qs';
import { fetch } from './http';

// const development = 'http://localhost:3618';
const development = '';
const API = (url, method) => params => fetch(development + url, params, method || 'post');
const download = url => params => {
  window.location.href = `${url}?${qs.stringify(params)}`;
};

export default {
  getProvinceAPI: API('/esop/secBranch/queryStaticData'),
  getUserRoleAPI: API('/esop/role/queryRoleAll'),

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

  /* 登录相关 */
  loginApi: API('/esop/login/server'),
  logoutApi: API('/esop/login/logout'),
  resetPwdApi: API('/esop/secBranch/editPassword'),
  getCurrentUserInfoAPI: API('/esop/login/queryCurrentOperator'),

  /* 集团客户管理 */
  // 获取集团客户概览列表
  getGroupCustomerListAPI: API('/esop/operator/queryOperator'),

  // 生成集团客户联系人ID
  generateContactIdAPI: API('/esop/organize/contactId')
};
