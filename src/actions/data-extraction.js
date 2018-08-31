import {Message} from 'element-ui';
import * as types from '../store/types';
import API from '../utils/api';

const getTaskName = (value) => {
  let list = [
    {label: '审核中', value: 1},
    {label: '数据生成中', value: 2},
    {label: '生成成功', value: 3},
    {label: '审核不通过', value: 4},
    {label: '已取消', value: 5},
    {label: '生成不成功', value: 6},
  ];
  for (let item of list) {
    if (item.value === value) {
      return item.label;
    }
  }
};
const actions = {
  queryDataDownload: ({commit}, params) => {
    API.queryDataDownloadAPI(params).then(res => {
      commit(types.DATA_EXTRACTION_DOWMLOAD, res.data);
    });
  },
  deleteDownLoadData: ({commit}, params) => {
    API.deleteDownLoadDataAPI(params).then(res => {
      return res;
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
  async queryDataExtractionSteps({ commit, dispatch }, params) {
    API.queryDataExtractionStepsAPI({processInsId: params.processInsId}).then(res => {
      let _Data = Object.assign([], res.data);
      if (_Data.length && params.state) {
        let apply = Number(params.apply);
        let status = Number(params.state); // 数据提取的状态
        let statusName = getTaskName(status);
        let last = _Data[_Data.length - 1]; // 获取最后一步
        let size = 4 - _Data.length; // 应该添加的
        let flag = false;
        if (last.taskName === '二级审核' && last.hasComplete === 1) {
          flag = true;
        }
        for (let i = 0; i < size; i++) {
          let obj = {};
          if (size === 2) {
            if (i === 0) { // 第三步
              obj.taskName = '二级审核';
              obj.hasComplete = 0;
              obj.hasCompleteName = '未完成';
              obj.businessStatus = '待处理';
            } else { // 第四步
              if (!flag) { // 未成功
                obj.taskName = '生成成功';
                obj.hasComplete = 0;
                obj.hasCompleteName = '未完成';
                obj.businessStatus = '待处理';
              } else { // 审核完成
                obj.hasCompleteName = status === 2 ? '数据生成中需要一段时间，请耐心等待生成后会短信通知您！' : '已完成';
                obj.taskName = statusName;
                obj.hasComplete = 1;
                obj.businessStatus = '已处理';
              }
            }
          } else if (size === 1) { // 第四步
            if (!flag) { // 未成功
              obj.taskName = '生成成功';
              obj.hasComplete = 0;
              obj.hasCompleteName = '未完成';
              obj.businessStatus = '待处理';
            } else { // 审核完成
              obj.hasCompleteName = status === 2 ? '数据生成中需要一段时间，请耐心等待生成后会短信通知您！' : '已完成';
              obj.taskName = statusName;
              obj.hasComplete = 1;
              obj.businessStatus = '已处理';
            }
          }
          _Data.push(obj);
        }
        if (apply === 1) {
          _Data = _Data.slice(0, _Data.length - 1);
        }
      }
      commit(types.DATA_EXTRACTION_STEPS, _Data);
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
  },
  queryProcessor: ({ commit }, params) => {
    return API.queryProvinceAPI(params).then((res) => {
      commit(types.PROCESSOR_LIST, res.data);
    });
  },
};

export default actions;
