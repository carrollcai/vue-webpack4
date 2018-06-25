import { Message } from 'element-ui';
import * as types from '../store/types';
import API from '../utils/api';

const actions = {
  /**
   * 查询“任务查询”列表
   */
  getTaskQueryList: ({ commit }, params) => {
    return API.getTaskQueryListAPI(params).then(res => {
      commit(types.TASK_QUERY_LIST, res.data);
    });
  },
  /**
   * 查询 “我的申请” 列表
   */
  queryPushList: ({ commit }, params) => {
    return API.queryPushListAPI(params).then(res => {
      commit(types.SET_PUSH_LIST, res.data);
    }, err => {
      if (err) {
        commit(types.SET_PUSH_LIST, {});
      }
    });
  },
  deletePush: ({ commit }, params) => {
    return API.deleteRoleAPI(params).then(res => {
      Message({
        showClose: true,
        message: '删除成功',
        type: 'success',
        duration: 3000
      });
    });
  },
  /**
   * 查询 “我的代办” 列表
   */
  queryTodoList: ({ commit }, params) => {
    return API.getRoleListAPI(params).then(res => {
      commit(types.SET_TODO_LIST, res.data);
    }, err => {
      if (err) {
        commit(types.SET_TODO_LIST, {
          list: []
        });
      }
    });
  }
};

export default actions;
