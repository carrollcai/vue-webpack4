import * as types from '../types';
import { SIDEBAR_DATA } from '@/config';

const state = {
  province: [],
  userRoleList: [],
  currentRoute: {
    path: ''
  },
  currentUser: {
    menuList: Object.cloneDeep(SIDEBAR_DATA),
    operator: {
      code: '',
      provinces: []
    }
  },
  pageLoading: false,
  // 全局message状态控制
  globalMessageStatus: false
};

const mutations = {
  [types.PROVINCE](state, data) {
    state.province = data.map(val => {
      return {
        key: val.codeValue,
        value: val.codeName
      };
    });
  },
  [types.USER_ROLE_LIST](state, data) {
    state.userRoleList = data;
  },
  // 改变当前路由
  [types.ROUTE_CHANGE](state, data) {
    state.currentRoute = data;
  },
  [types.SHOW_PAGE_LOADING](state) {
    state.pageLoading = true;
  },
  [types.HIDE_PAGE_LOADING](state) {
    state.pageLoading = false;
  },
  [types.CURRENT_USER_GET_INFO](state, data) {
    let menuIds = [];
    let sidebars = Object.cloneDeep(SIDEBAR_DATA);
    const provinces = data.secOperatorDTO.provinces.split(',');

    state.currentUser.menuList = Object.cloneDeep(SIDEBAR_DATA);
    state.currentUser.operator.code = data.secOperatorDTO.code;

    // 用户拥有的菜单权限
    data.secMenuDTOList.map(val => {
      menuIds.push(val.menuId);
      val.children && val.children.map(cval => {
        menuIds.push(cval.menuId);
      });
    });
    menuIds.map(val => {
      for (let x in sidebars) {
        if (Number(sidebars[x].menuId) === Number(val)) {
          sidebars[x].enable = true;
        }
        sidebars[x].children && sidebars[x].children.map(gval => {
          if (Number(gval.menuId) === Number(val)) {
            gval.enable = true;
          }
        });
      }
    });
    state.currentUser.menuList = sidebars;
    // 用户拥有的省份权限
    state.currentUser.operator.provinces = provinces.map(val => {
      let obj = {};
      state.province.map(cval => {
        if (String(val) === String(cval.key)) {
          obj = {
            key: cval.key,
            value: cval.value
          };
        }
      });
      return obj;
    });
  }
};

export default {
  state,
  mutations
};
