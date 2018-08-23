import _ from 'lodash';
import {mapState} from 'vuex';
import moment from 'moment';

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
    },
    startOptions(endDate) {
      return {
        disabledDate(time) {
          if (endDate) {
            return (time.getTime() < moment(endDate).add(-12, 'months').toDate().getTime()) || (time.getTime() > new Date(endDate).getTime());
          } else {
            return time.getTime() > Date.now();
          }
        }
      };
    },
    endOptions(startDate) {
      return {
        disabledDate(time) {
          if (startDate) {
            return (time.getTime() > moment(startDate).add(12, 'months').toDate().getTime()) || (time.getTime() < new Date(startDate).getTime());
          } else {
            return time.getTime() > Date.now();
          }
        }
      };
    }
  }
};
