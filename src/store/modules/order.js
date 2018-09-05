import * as types from '../types';
import {
  PAGE_NO,
  PAGE_SIZE
} from '@/config/index.js';
const orderCreate = {
  ordName: '',
  predictSignTime: '',
  predictAgreementTime: '',
  organizeId: '',
  organizeName: '',
  address: '',
  contactName: '',
  contactGender: '',
  contactMobile: null,
  contactEmail: '',
  busiDesc: '',
  teamProject: '',
  productId: null,
  ordProductDtoList: [],
  productName: '',
  amount: '',
  processor: '',
  predictRevenue: '',
  startProcess: ''
};

const ordProductDtoListObj = {
  productId: null,
  productName: '',
  amount: '',
  processor: [],
  processorData: [],
  companyBelong: '',
  productHandlers: [],
  // productList: [],
};

const state = {
  submitAssignButton: false,
  processInsId: null,
  // 总览
  orderOverviewForm: {
    pageNo: PAGE_NO,
    pageSize: PAGE_SIZE,
    ordNameOrCode: '',
    organizeNameOrCode: '',
    startDate: '',
    endDate: '',
    date: [],
    ordStatus: null
  },
  orderOverviewObj: {
    list: [],
    totalCount: 1
  },
  orderOverviewDetail: {},
  processList: [],
  payDetailFileList: [],

  // 创建管理
  orderCreateManageForm: {
    pageNo: PAGE_NO,
    pageSize: PAGE_SIZE,
    ordNameOrCode: '',
    organizeNameOrCode: '',
    startDate: '',
    endDate: '',
    date: [],
    ordStatus: '0'
  },
  orderCreateManageObj: {
    list: [],
    totalCount: 1
  },
  orderCreate: Object.cloneDeep(orderCreate),
  orderOrganizeAddressList: [],
  productList: [],

  // 处理任务
  orderHandleTaskForm: {
    pageNo: PAGE_NO,
    pageSize: PAGE_SIZE,
    ordNameOrCode: '',
    organizeNameOrCode: '',
    startDate: '',
    endDate: '',
    date: [],
    businessStatus: '0'
  },
  orderHandleTaskObj: {
    list: [],
    totalCount: 1
  },
  assignHandlers: [],
  // productHandlers: [],
  handleTaskDetail: {},
  lastProcessInfo: {
    lastOpName: '',
    lastDealResult: ''
  },
  hasSignedFile: {
    fileTypeId: '',
    fileSaveName: '',
    fileName: ''
  }
};

const mutations = {
  [types.ORDER_GET_LIST](state, data) {
    state.orderOverviewObj = Object.assign(state.orderOverviewObj, data);
  },
  [types.ORDER_QUERY_ORGANIZE_ADDRESS](state, data) {
    state.orderOrganizeAddressList = data.list.map(val => Object.assign(val, { value: val.organizeName }));
  },
  // 清空创建数据
  [types.ORDER_CREATE](state, data) {
    state.orderCreate = Object.cloneDeep(orderCreate);
  },
  [types.ORDER_CM_GET_LIST](state, data) {
    state.orderCreateManageObj = Object.assign(state.orderCreateManageObj, data);
  },
  [types.ORDER_HT_GET_LIST](state, data) {
    state.orderHandleTaskObj = Object.assign(state.orderHandleTaskObj, data);
  },
  [types.ORDER_QUERY_PRODUCT_HANDLER](state, data) {
    let dataList = data.list.map(item => {
      return {
        value: item.staffName,
        label: item.operatorId,
      };
    });
    state.orderCreate.ordProductDtoList[data.index].companyBelong = data.item.region;
    state.orderCreate.ordProductDtoList[data.index].productId = data.item.productId;
    state.orderCreate.ordProductDtoList[data.index].productHandlers = dataList;
  },
  [types.ORDER_QUERY_ASSIGN_HANDLER](state, data) {
    // 改造指派人结构
    let handlers = data.map(val => {
      let newVal = {};
      newVal.value = val.codeValue;
      newVal.label = val.codeName;
      newVal.children = val.childrenList && val.childrenList.filter(cval => cval.secOperatorDTOList).map(cval => {
        let newCval = {};
        newCval.value = cval.codeValue;
        newCval.label = cval.codeName;
        newCval.children = cval.secOperatorDTOList && cval.secOperatorDTOList.map(gcval => {
          return {
            value: gcval.operatorId,
            label: gcval.staffName
          };
        });
        return newCval;
      });
      return newVal;
    });
    state.assignHandlers = handlers.filter(val => val.children && val.children.length);
  },
  [types.ORDER_GET_HANDLE_TASK_DETAIL](state, data) {
    state.handleTaskDetail = data;
  },
  [types.ORDER_OVERVIEW_GET_DETAIL](state, data) {
    state.orderOverviewDetail = Object.assign({}, data);
  },
  [types.ORDER_GET_PROCESS_LIST](state, data) {
    // console.log(data);
    state.processList = state.processList.concat(data);
  },
  [types.ORDER_GET_HAS_SIGNED_FILE_LIST](state, data) {
    // 这里需要直接改变processList的引用，不能直接操作数组，vue检测不到
    // Error: state.processList[data.index].fileList = data.list;
    state.payDetailFileList = state.payDetailFileList.concat(data);
  },
  [types.ORDER_REMOVE_PROCESS_LIST](state, data) {
    state.processList = [];
  },
  [types.ORDER_UPDATE_CREATE](state, data) {
    state.orderCreate = Object.assign({}, state.orderCreate, data);
  },
  // 修改获取数据
  [types.ORDER_GET_EDIT](state, data) {
    let { processName, processor, ...filterData } = data;
    state.orderCreate = filterData;

    console.log(state.orderCreate);
    // state.orderCreate.ordProductDtoList = filterData.ordProductDtoList;
  },
  [types.ORDER_QUERY_PRODUCT_NAME](state, data) {
    state.productList = data.list.map(val => Object.assign(val, { value: val.productName }));
    // state.orderCreate.ordProductDtoList[data.index].productList = data.list.map(val => Object.assign(val, { value: val.productName }));
  },
  [types.ORDER_SUBMIT_ASSIGN_BUTTON_STATUS](state, data) {
    state.submitAssignButton = !state.submitAssignButton;
  },
  [types.ORDER_GET_HAS_SIGNED_FILE](state, data) {
    // state.hasSignedFile = data;
    let item = state.orderCreate.ordProductDtoList[data.index];
    item.hasSignedFile = data.list;
  },
  [types.ORDER_OVERVIEW_PAGE_CHANGE](state, data) {
    state.orderOverviewForm = data
      ? Object.assign(state.orderOverviewForm, data)
      : Object.assign(state.orderOverviewForm, {
        pageNo: PAGE_NO,
        pageSize: PAGE_SIZE
      });
  },
  [types.ORDER_CM_PAGE_CHANGE](state, data) {
    state.orderCreateManageForm = data
      ? Object.assign(state.orderCreateManageForm, data)
      : Object.assign(state.orderCreateManageForm, {
        pageNo: PAGE_NO,
        pageSize: PAGE_SIZE
      });
  },
  [types.ORDER_HT_PAGE_CHANGE](state, data) {
    state.orderHandleTaskForm = data
      ? Object.assign(state.orderHandleTaskForm, data)
      : Object.assign(state.orderHandleTaskForm, {
        pageNo: PAGE_NO,
        pageSize: PAGE_SIZE
      });
  },
  [types.ORDER_LAST_PROCESS_INFO](state, data) {
    state.lastProcessInfo = data.length ? data[0] : state.lastProcessInfo;
  },
  [types.ORDER_HANDLE_PROCESS](state, data) {
    let item = state.orderCreate.ordProductDtoList[data.index];
    item.processor = item.processorData.map(val => {
      let processor = item.productHandlers.filter(cval => cval.value === val)[0];
      if (processor) {
        return processor.label;
      }
    });
  },
  // 删除订购产品中某一条
  [types.ORDER_DELETE_PRODUCT](state, data) {
    let nick = state.orderCreate.ordProductDtoList;
    nick.splice(data.index, 1);
  },
  [types.ORDER_ADD_PRODUCT](state, data) {
    let item = Object.cloneDeep(ordProductDtoListObj);
    state.orderCreate.ordProductDtoList = state.orderCreate.ordProductDtoList.concat([item]);
  },
  [types.ORDER_REMOVE_PAY_DETAIL_FILES](state, data) {
    state.payDetailFileList = [];
  },
  [types.ORDER_INIT_CREATE](state, data) {
    let item = Object.cloneDeep(ordProductDtoListObj);
    state.orderCreate.ordProductDtoList = state.orderCreate.ordProductDtoList.concat([item]);
  },
  [types.ORDER_EDIT_PROCESSOR_TO_NAME](state, data) {
    state.orderCreate.ordProductDtoList = state.orderCreate.ordProductDtoList.map(val => {
      let processorData = [];
      val.processor.map(cVal => {
        let _filter = val.productHandlers.filter(gcVal => Number(gcVal.label) === Number(cVal));
        _filter[0] && processorData.push(_filter[0].value);
      });
      return {
        ...val,
        processorData,
      };
    });
  }
};

export default {
  state,
  mutations
};
