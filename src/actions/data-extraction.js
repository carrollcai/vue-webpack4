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
  }
};

export default actions;
