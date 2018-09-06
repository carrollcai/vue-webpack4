import moment from 'moment';
import find from 'lodash/find';
import WmTable from 'components/Table.vue';
import {REQUIREMENT_TYPE} from '@/config';
export default {
  components: {
    WmTable
  },
  data() {
    return {
      REQUIREMENT_TYPE
    };
  },
  beforeMount() {
    this.query();
  },
  methods: {
    onPagination(value) {
      this.pageNo = value;
      this.query();
    },
    onSizePagination(value) {
      this.pageSize = value;
      this.query();
    },
    reqTypeFilter(val) {
      let result = find(this.REQUIREMENT_TYPE, {value: val});

      return result ? result.label : '';
    },

    formateDate(date) {
      return moment(date).format('YYYY-MM-DD HH:MM:SS');
    },
    handleClick() {
      this.pageNo = 1;
      this.query();
    }
  }
};
