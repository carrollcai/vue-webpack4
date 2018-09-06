import _ from 'lodash';
// import moment from 'moment';
import {mapState} from 'vuex';
export default {
  computed: {
    ...mapState({
      provinces: ({ root }) => root.province,
      staticData: ({ root }) => root.staticData
    }),
    // 性别
    SEX() {
      return this.staticData.SEX || [];
    },
    // 是否招标
    WEATHER() {
      return this.staticData.WEATHER || [];
    },
    // 商机类别
    BIZ_OPPOR_TYPE() {
      return this.staticData.BIZ_OPPOR_TYPE || [];
    },
    // 商机状态
    BIZ_OPPOR_STATUS() {
      return this.staticData.BIZ_OPPOR_STATUS || [];
    },
    // 预计协议期
    PREDICT_AGREEMENT_TIME() {
      return this.staticData.PREDICT_AGREEMENT_TIME || [];
    }
  },
  methods: {
    /**
     * 商机-性别
     * @param {*} value
     */
    sexFilter(value) {
      let result = _.find(this.SEX, {value});

      return result ? result.label : '';
    },
    /**
     * 商机-是否招标
     * @param {String} value 原始值
     */
    weatherFilter(value) {
      let result = _.find(this.WEATHER, {value});

      return result ? result.label : '';
    },
    /**
     * 商机-商机类别
     * @param {String} value 原始值
     */
    bizOpporTypeFilter(value) {
      let result = _.find(this.BIZOPPOR_TYPE, {value});

      return result ? result.label : '';
    },
    /**
     * 商机-商机状态
     * @param {String} value 原始值
     */
    bizOpporStatusFilter(value) {
      let result = _.find(this.BIZOPPOR_STATUS, {key: value});

      return result ? result.value : '';
    },
    /**
     * 商机-预计协议期
     * @param {String} value 原始值
     */
    predictAgreementTimeFilter(value) {
      let result = _.find(this.PREDICT_AGREEMENT_TIME, {value});

      return result ? result.label : '';
    }
  }
};
