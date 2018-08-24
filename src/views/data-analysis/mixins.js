export default {
  methods: {
    // 省份
    isProvince() {
      return false;
    },
    // 大区
    isDistrict() {
      return true;
    },
    // 全国
    isWholeCountry() {
      return false;
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
