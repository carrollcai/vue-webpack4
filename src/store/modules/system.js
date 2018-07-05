import * as types from '../types';
import {
  PAGE_NO,
  PAGE_SIZE,
  MENU_PERMISSIONS
} from '@/config/index.js';
import store from '@/store';

const roleCreate = {
  roleName: '',
  notes: '',
  menuIds: []
};
const userCreate = {
  staffName: '',
  code: '',
  roleId: [],
  provinces: [],
  opRegion: '',
  mobile: '',
  email: ''
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
  userObj: {
    list: [],
    totalcount: 1
  },
  userForm: {
    pageNo: PAGE_NO,
    pageSize: PAGE_SIZE,
    opRegion: null,
    otherField: '',
    role: ''
  },
  userCreate: Object.cloneDeep(userCreate),

  regionRelationList: []
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

    state.roleCreate = Object.assign(state.roleCreate, data);

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
    state.userCreate = Object.cloneDeep(userCreate);
  },
  [types.USER_GET_LIST](state, data) {
    state.userObj = data;
  },
  [types.USER_GET_INFO](state, data) {
    state.userCreate = data;
  },
  [types.SYSTEM_QUERY_REGION](state, data) {
    let regionArr = [];
    data.map(val => {
      if (String(val.codeValue) === String(store.state.root.currentUser.operator.opRegion)) {
        regionArr.push(val);
        return false;
      }
      val.children && val.children(cval => {
        if (String(cval.codeValue) === String(store.state.root.currentUser.operator.opRegion)) {
          val.children = [cval];
          regionArr.push(val);
          return false;
        }
      });
    });
    regionArr = regionArr.length ? regionArr : data;

    state.regionRelationList = regionArr.map(val => {
      let _val = {};
      _val.value = val.codeValue;
      _val.label = val.codeName;
      _val.children = val.staticDataDTOList.map(cval => {
        let _cval = {};
        _cval.value = val.codeValue;
        _cval.label = val.codeName;
        return _cval;
      });
      return _val;
    });
  }
};

export default {
  state,
  mutations
};
