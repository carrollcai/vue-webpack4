export default {
  methods: {
    // 省份
    isProvince() {
      return false;
    },
    // 大区
    isDistrict() {
      return false;
    },
    // 全国
    isWholeCountry() {
      return true;
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
