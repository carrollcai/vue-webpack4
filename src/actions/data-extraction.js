import {Message} from 'element-ui';
import * as types from '../store/types';
import API from '../utils/api';

const actions = {
  queryDataDownload: ({commit}, params) => {
    API.queryDataDownloadAPI(params).then(res => {
      commit(types.DATA_EXTRACTION_DOWMLOAD, res.data);
    });
  },
  deleteDownLoadData: ({commit}, params) => {
    API.deleteDownLoadDataAPI(params).then(res => {
      Message({
        message: '撤销成功',
        type: 'success'
      });
    });
  },
  dataDownLoadFile: ({commit}, params) => {
    API.dataDownLoadFileAPI(params);
  },
  applyDataExtraction: ({commit}, params) => {
    API.applyDataExtractionAPI(params).then(res => {
      Message({
        message: '数据提取申请成功',
        type: 'success'
      });
      commit(types.ROUTE_CHANGE, {
        path: '/data-extraction/data-download'
      });
    });
  },
  queryDataExtractionSteps: ({commit}, params) => {
    API.queryDataExtractionStepsAPI(params).then(res => {
      commit(types.DATA_EXTRACTION_STEPS, res.data);
    });
  },
  queryDataDetail: ({commit}, params) => {
    API.queryDataDetailAPI(params).then(res => {
      commit(types.DATA_EXTRACTION_DETAIL_DATA, res.data);
    });
  },
  auditDataExtraction: ({commit}, params) => {
    API.auditDataExtractionAPI(params).then(res => {
      Message({
        message: '数据提取审核成功',
        type: 'success'
      });
      commit(types.ROUTE_CHANGE, {
        path: '/data-extraction/data-audit'
      });
    });
  },
  queryDataAudit: ({commit}, params) => {
    API.queryDataAuditAPI(params).then(res => {
      commit(types.DATA_EXTRACTION_AUDIT, res.data);
    });
  },
  queryDataTask: ({commit}, params) => {
    API.queryDataTaskAPI(params).then(res => {
      commit(types.DATA_EXTRACTION_TASK, res.data);
    });
  }
};

export default actions;
