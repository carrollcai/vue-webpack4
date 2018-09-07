import _ from 'lodash';
import { mapState } from 'vuex';
import dayjs from 'dayjs';

import * as types from '@/store/types';

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
      let list = _.cloneDeep(this.staticData.MEMBER_TYPE) || [];

      list.shift();

      if (list.length) {
        this.$store.commit(types.INIT_ADD_USER_VIP_TYPE, list[0].value);
      }
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
            return (time.getTime() < dayjs(endDate).add(-12, 'month').toDate().getTime()) || (time.getTime() > new Date(endDate).getTime());
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
            return (time.getTime() > dayjs(startDate).add(12, 'month').toDate().getTime()) || (time.getTime() < new Date(startDate).getTime());
          } else {
            return time.getTime() > Date.now();
          }
        }
      };
    }
  }
};
