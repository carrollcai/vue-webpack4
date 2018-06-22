import * as types from '../types';
import {
  PAGE_NO,
  PAGE_SIZE,
  MENU_PERMISSIONS
} from '@/config/index.js';

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
    staffName: '',
    code: '',
    roleId: ''
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
    let exceptFirstMendId = MENU_PERMISSIONS.filter(val => val.children).map(val => val.menuId);
    state.roleCreate = data;
    // 将多余的一级菜单menuId剔除
    state.roleCreate.menuIds = state.roleCreate.menuIds.filter(val => {
      let flag = true;
      exceptFirstMendId.map(cval => {
        if (cval === val) flag = false;
      });

      return flag;
    });
  },
  [types.USER_INIT_FORM](state, data) {
    state.userCreate = Object.cloneDeep(roleCreate);
  },
  [types.USER_GET_LIST](state, data) {
    state.userList = data;
    state.userForm.totalcount = data.totalcount;
  },
  [types.USER_GET_INFO](state, data) {
    state.userCreate = data;
  }
};

export default {
  state,
  mutations
};
