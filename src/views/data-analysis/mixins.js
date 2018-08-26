import {mapState} from 'vuex';

export default {
  computed: {
    ...mapState({
      currentUser: ({root}) => root.currentUser
    })
  },
  methods: {
    // 省份
    isProvince() {
      // return false;
      return this.currentUser.analysePrivilege === '3';
    },
    // 大区
    isDistrict() {
      // return false;
      return this.currentUser.analysePrivilege === '2';
    },
    // 全国
    isWholeCountry() {
      // return true;
      return this.currentUser.analysePrivilege === '1';
    },
    getPermissionParams() {
      const {isProvince, isDistrict, isWholeCountry} = this;

      let params = {};

      if (isProvince()) {

      }

      if (isDistrict()) {

      }

      if (isWholeCountry()) {

      }

      return params;
    }
  }
};
