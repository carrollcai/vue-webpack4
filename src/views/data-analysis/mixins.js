export default {
  methods: {
    // 省份
    isProvince() {
      return true;
    },
    // 大区
    isDistrict() {
      return false;
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
