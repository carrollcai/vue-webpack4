import _ from 'lodash';
import {mapState} from 'vuex';
export default {
  computed: {
    ...mapState({
      provinces: ({ root }) => root.province,
      staticData: ({ root }) => root.staticData
    }),
    // 大区
    DISTRICTS() {
      return this.staticData.DISTRICTS || [];
    }
  },
  data() {
    return {
      district: ''
    };
  },
  methods: {
    memberNumFilter(value) {
      let result = _.find(this.DISTRICTS, {value});

      return result ? result.label : '';
    }
  }
};
