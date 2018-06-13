import * as types from '../types';
import { PAGE_NO, PAGE_SIZE } from '@/config';

const roleCreate = {
  roleName: '',
  notes: '',
  menuIds: []
};
const userCreate = {
  staffName: '',
  code: '',
  roleId: [],
  provinces: []
};

const state = {
  roleObj: [],
  permissions: [],
  roleForm: {
    pageNo: PAGE_NO,
    pageSize: PAGE_SIZE,
    totalcount: 1,
    roleName: ''
  },
  roleCreate: Object.cloneDeep(roleCreate),
  userList: [],
  userForm: {
    pageNo: PAGE_NO,
    pageSize: PAGE_SIZE,
    totalcount: 1,
    role: '',
    name: '',
    account: ''
  },
  userCreate: Object.cloneDeep(userCreate)
};

const mutations = {
  [types.ROLE_LIST](state, data) {
    state.roleObj = data;
    state.roleForm.totalcount = data.totalcount;
  },
  [types.ROLE_INIT_FORM](state, data) {
    state.roleCreate = Object.cloneDeep(roleCreate);
  },
  [types.ROLE_GET_INFO](state, data) {
    state.roleCreate = data;
  },
  [types.PERMISSIONS](state, data) {
    state.permissions = data;
  },
  [types.USER_GET_LIST](state, data) {
    state.userList = data;
  }
};

export default {
  state,
  mutations
};
