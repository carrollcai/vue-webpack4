import _ from 'lodash';
import { mapState } from 'vuex';
import moment from 'moment';

export default {
  computed: {
    ...mapState({
      provinces: ({ root }) => root.province,
      staticData: ({ root }) => root.staticData
    }),
    // 大区
    DISTRICTS() {
      let list = this.staticData.REGION || [];
      list = _.filter(list, (item) => {
        return _.startsWith(item.value, '100003') && item.value !== '100003';
      });
      return list;
    },
    MEMBER_TYPE() {
      let list = Object.cloneDeep(this.staticData.MEMBER_TYPE) || [];

      list.shift();
      return list;
    }
  },
  data() {
    return {
      district: ''
    };
  },
  methods: {
    memberNumFilter(value) {
      let result = _.find(this.DISTRICTS, { value });

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
