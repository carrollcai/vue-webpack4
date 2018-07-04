import * as types from '../types';
import { MENU_PERMISSIONS } from '@/config';
import AddRoutes from '@/router/AddRoutes';
import router from '@/router/';

const state = {
  province: [],
  userRoleList: [],
  currentRoute: {
    path: ''
  },
  currentUser: {
    menuIds: [], // 扁平化的menuId数组
    menuList: [],
    operator: {
      staffName: '',
      provinces: []
    }
  },
  pageLoading: false,
  // 全局message状态控制
  globalMessageStatus: false,
  staticData: {}
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
  [types.STATIC_DATA](state, data) {
    let result = {};
    for (let key in data) {
      let value = data[key];
      let list = [];
      for (let item of value) {
        list.push({
          label: item.codeName,
          value: item.codeValue
        });
      }

      result[key] = list;
    }

    state.staticData = result;
  },
  [types.CURRENT_USER_GET_INFO](state, data) {
    let menuIds = [12, 13, 14, 15];
    let sidebars = Object.cloneDeep(MENU_PERMISSIONS);
    const provinces = data.secOperatorDTO.provinces.split(',');

    state.currentUser.operator.staffName = data.secOperatorDTO.staffName;

    // 用户拥有的菜单权限
    data.secMenuDTOList.map(val => {
      menuIds.push(val.menuId);
      val.children && val.children.map(cval => {
        menuIds.push(cval.menuId);
      });
    });
    menuIds.map(val => {
      sidebars.map(cval => {
        if (Number(cval.menuId) === Number(val)) {
          cval.enable = true;
        }
        cval.children && cval.children.map(gval => {
          if (Number(gval.menuId) === Number(val)) {
            gval.enable = true;
          }
        });
      });
    });
    // 当前用户拥有的菜单权限id列表
    state.currentUser.menuIds = menuIds;
    // 当前用户拥有的菜单权限详情列表
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
  },

  [types.ADD_ROUTES](state, data) {
    const routes = new AddRoutes();
    router.addRoutes(routes.addDynamicRoutes(state.currentUser.menuIds));
  }
};

export default {
  state,
  mutations
};
