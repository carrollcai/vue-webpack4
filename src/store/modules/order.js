import * as types from '../types';
import {
  PAGE_NO,
  PAGE_SIZE
} from '@/config/index.js';
const orderCreate = {
  ordName: '',
  predictContractAmount: null,
  predictSignTime: '',
  predictAgreementTime: '',
  isProjectInvitation: '1',
  organizeName: '',
  address: '',
  contactName: '',
  contactGender: '',
  contactMobile: null,
  contactEmail: '',
  busiDesc: '',
  busiRequire: '',
  productName: '',
  productId: null
};

const state = {
  submitAssignButton: false,
  processInsId: null,
  orderOverviewForm: {
    pageNo: PAGE_NO,
    pageSize: PAGE_SIZE,
    ordNameOrCode: '',
    organizeNameOrCode: '',
    startDate: '',
    endDate: '',
    date: [],
    ordStatus: 0
  },
  orderOverviewObj: {
    list: [],
    totalCount: 1
  },
  orderOverviewDetail: {},
  processList: [],

  orderCreateManageForm: {
    pageNo: PAGE_NO,
    pageSize: PAGE_SIZE,
    ordNameOrCode: '',
    organizeNameOrCode: '',
    startDate: '',
    endDate: '',
    date: [],
    ordStatus: 0
  },
  orderCreateManageObj: {
    list: [],
    totalCount: 1
  },
  orderCreate: Object.cloneDeep(orderCreate),
  orderOrganizeAddressList: [],
  productList: [],

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
  handleTaskDetail: {},
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
    state.processList = data;
  },
  [types.ORDER_UPDATE_CREATE](state, data) {
    state.orderCreate = Object.assign({}, state.orderCreate, data);
  },
  [types.ORDER_GET_EDIT](state, data) {
    let { processName, processor, ...filterData } = data;
    state.orderCreate = filterData;
  },
  [types.ORDER_QUERY_PRODUCT_NAME](state, data) {
    state.productList = data.list.map(val => Object.assign(val, { value: val.productName }));
  },
  [types.ORDER_SUBMIT_ASSIGN_BUTTON_STATUS](state, data) {
    state.submitAssignButton = !state.submitAssignButton;
  },
  [types.ORDER_GET_HAS_SIGNED_FILE](state, data) {
    state.hasSignedFile = data;
  }
};

export default {
  state,
  mutations
};
