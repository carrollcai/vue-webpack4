import _ from 'lodash';
import moment from 'moment';
import {mapState} from 'vuex';
export default {
  computed: {
    ...mapState({
      provinces: ({ root }) => root.province,
      staticData: ({ root }) => root.staticData
    }),
    // 集团规模
    MEMBER_NUM() {
      return this.staticData.MEMBER_NUM || [];
    },
    // 证件类型
    CERTIFICATE_TYPE() {
      return this.staticData.CERTIFICATE_TYPE || [];
    },
    // 集团属性
    ORGANIZE_TYPE() {
      return this.staticData.ORGANIZE_TYPE || [];
    },
    // 注册资金类型
    REGISTER_FUND_TYPE() {
      return this.staticData.CM_MONEY_TYPE || [];
    },
    // 机构类型
    ORG_INDUSTRY_TYPE() {
      return this.staticData.ORG_INDUSTRY_TYPE || [];
    },
    // 行业类别
    INDUSTRY_TYPE() {
      return this.staticData.industryType || [];
    },
    GENDER() {
      return this.staticData.SEX || [];
    },
    AGE() {
      return this.staticData.AGE || [];
    },
    MARITAL_STATUS() {
      return this.staticData.maritalStatus || [];
    }
  },
  methods: {
    /**
     * 集团客户-集团客户规模
     * @param {*} value
     */
    memberNumFilter(value) {
      let result = _.find(this.MEMBER_NUM, {value});

      return result ? result.label : '';
    },
    /**
     * 集团客户-性别
     * @param {String} value 原始值
     */
    genderFilter(value) {
      return value;
    },
    /**
     * 集团客户-年龄
     * @param {String} value 原始值
     */
    ageFilter(value) {
      return value;
    },
    /**
     * 集团客户-所属省份
     * @param {String} value 原始值
     */
    provinceFilter(value) {
      let result = _.find(this.provinces, {key: value});

      return result ? result.value : '';
    },
    /**
     * 集团客户-婚姻状况
     * @param {String} value 原始值
     */
    maritalFilter(value) {
      return value;
    },
    /**
     * 集团客户-证件类型
     * @param {String} value 原始值
     */
    certificateTypeFilter(value) {
      let result = _.find(this.CERTIFICATE_TYPE, {value});

      return result ? result.label : '';
    },
    /**
     * 集团客户-集团属性
     * @param {String} value 原始值
     */
    orgTypeFilter(value) {
      let result = _.find(this.ORGANIZE_TYPE, {value});

      return result ? result.label : '';
    },
    /**
     * 集团客户-注册资金类型
     * @param {String} value 原始值
     */
    registerFundTypeFilter(value) {
      let result = _.find(this.REGISTER_FUND_TYPE, {value});

      return result ? result.label : '';
    },
    /**
     * 集团客户-机构类型
     * @param {String} value 原始值
     */
    orgIndustryTypeFilter(value) {
      let result = _.find(this.ORG_INDUSTRY_TYPE, {value});

      return result ? result.label : '';
    },
    /**
     * 集团客户-行业类别
     * @param {String} value 原始值
     */
    industryTypeFilter(value) {
      let result = _.find(this.INDUSTRY_TYPE, {value});

      return result ? result.label : '';
    },
    formateDate(date) {
      return moment(date).format('YYYY-MM-DD');
    }
  }
};
