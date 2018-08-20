import {Message} from 'element-ui';
import * as types from '../store/types';
import API from '../utils/api';

const actions = {
  getMyVisitManageList: ({ commit }, params) => {
    return API.getMyVisitManageListAPI(params).then((res) => {
      commit(types.MY_VISIT_MANAGE_LIST, res.data);
    });
  },
  addCreateVisit: ({ commit }, params) => {
    let path = '/visit/my-visit-manage';
    return API.addCreateVisitAPI(params).then((res) => {
      if (res.data === 1) {
        Message({
          message: '新增成功',
          type: 'success'
        });
        commit(types.ROUTE_CHANGE, {
          path: path
        });
      }
      return res;
    });
  },
  addCreateAppiont: ({ commit }, params) => {
    let path = '/visit/visit-appoint';
    return API.addCreateAppiontAPI(params).then((res) => {
      if (res.data === 1) {
        Message({
          message: '新增成功',
          type: 'success'
        });
        commit(types.ROUTE_CHANGE, {
          path: path
        });
      }
      return res;
    });
  },
  getAppointVisitList: ({ commit }, params) => {
    return API.getAppointVisitListAPI(params).then((res) => {
      commit(types.APPOINT_VISIT_LIST, res.data);
    });
  },
  queryVisitAppointDetail: ({ commit }, params) => {
    return API.queryVisitAppointDetailAPI(params).then((res) => {
      commit(types.VISIT_APPOINT_DETAIL, res.data);
    });
  },
  queryRegionManager: ({ commit }, params) => {
    return API.queryRegionManagerAPI(params).then((res) => {
      commit(types.REGION_MANAGE_LIST, res.data);
    });
  },
  addApproveVisit: ({ commit }, params) => {
    return API.addAppointVisitAPI(params).then((res) => {
      if (res.errorInfo.code === '200') {
        Message({
          message: '执行处理成功',
          type: 'success',
          duration: 3000
        });
        commit(types.ROUTE_CHANGE, {
          path: '/visit/my-visit-manage'
        });
      }
    });
  },
  queryRegisterList: ({ commit }, params) => {
    return API.queryRegisterListAPI(params).then((res) => {
      commit(types.REGISTER_LIST, res.data);
    });
  },
  editVisitApp: ({ commit }, params) => {
    return API.editVisitAppAPI(params).then((res) => {
      if (res.data === 1) {
        Message({
          message: '编辑成功',
          type: 'success'
        });
        commit(types.ROUTE_CHANGE, {
          path: '/visit/my-visit-manage'
        });
      }
      return res;
    });
  },
  deleteVisitApp: ({ commit }, params) => {
    return API.deleteVisitAppAPI(params).then((res) => {
      if (res.data === 1) {
        Message({
          message: '删除成功',
          type: 'success'
        });
      }
      return res;
    });
  },
  queryProcessors: ({ commit }, params) => {
    return API.queryProcessorAPI(params).then((res) => {
      commit(types.GET_PROCESSOR_LIST, res.data);
    });
  },
  /**
   * 查询走访任务处理列表
   */
  queryHandleVisits: ({ commit }, params) => {
    return API.queryVisitTasksAPI(params).then((res) => {
      commit(types.HANDLE_VISIT_MANAGE_LIST, res.data);
    });
  },
  /**
   * 评价走访
   */
  judgeVisit: ({ commit }, params) => {
    return API.judgeVisitAPI(params).then((res) => {
      Message({
        message: '评价成功',
        type: 'success',
        duration: 3000
      });
      commit(types.ROUTE_CHANGE, {
        path: '/visit/mission-handling'
      });
    });
  },
  /**
   * 审核走访
   */
  auditVisit: ({ commit }, params) => {
    return API.auditVisitAPI(params).then((res) => {
      Message({
        message: '审核成功',
        type: 'success',
        duration: 3000
      });
      commit(types.ROUTE_CHANGE, {
        path: '/visit/mission-handling'
      });
    });
  },
  /**
   * 查询走访详情
   */
  queryVisitDetail: ({ commit }, params) => {
    return API.queryVisitDetailAPI(params).then((res) => {
      commit(types.VISIT_DETAIL, res.data);
    }, () => {
      commit(types.VISIT_DETAIL, {});
    });
  }
};

export default actions;
