import { Message } from 'element-ui';
import * as types from '../store/types';
import API from '../utils/api';

const actions = {
  // 查询“任务查询”列表
  getTaskQueryList: ({ commit }, params) => {
    return API.getTaskQueryListAPI(params).then(res => {
      commit(types.TASK_QUERY_LIST, res.data);
    });
  },
  // 任务详情获取
  getTaskDetail: ({ commit }, params) => {
    return API.getTaskDetailAPI(params).then(res => {
      commit(types.TASK_GET_DETAIL, res.data);
    });
  },
  // 查询 “我的申请” 列表
  queryPushList: ({ commit }, params) => {
    return API.queryPushListAPI(params).then(res => {
      commit(types.SET_PUSH_LIST, res.data);
    });
  },
  deletePush: ({ commit }, params) => {
    return API.deletePushAPI(params).then(res => {
      Message({
        message: '删除成功',
        type: 'success',
        duration: 3000
      });
    });
  },
  // 查询 “我的待办” 列表
  queryTodoList: ({ commit }, params) => {
    return API.queryTodoListAPI(params).then(res => {
      commit(types.SET_TODO_LIST, res.data);
    });
  },
  // 提交审批
  taskSubmitAudit: ({ commit }, params) => {
    return API.taskSubmitAuditAPI(params).then(res => {
      Message({
        message: '提交成功',
        type: 'success'
      });

      commit(types.ROUTE_CHANGE, { path: '/task/management' });
    });
  }
};

export default actions;
