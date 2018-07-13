import { mapState, mapActions } from 'vuex';
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
      STATUS: {
        'first': '',
        'second': '1',
        'third': '2'
      },
      REQUIREMENT_TYPE
    };
  },
  computed: {
    ...mapState({
      requirements: ({ requirement }) => requirement.requirementList
    })
  },
  beforeMount() {
    this.query();
  },
  methods: {
    onPagination(value) {
      this.pageNo = value;
      this.query();
    },
    reqTypeFilter(val) {
      let result = find(this.REQUIREMENT_TYPE, {value: val});

      return result ? result.label : '';
    },
    onSizePagination(value) {
      this.pageSize = value;
      this.query();
    },
    getParams() {
      this.rangeDate = this.rangeDate || [];

      const {
        rangeDate,
        activeName,
        organizeName,
        reqType,
        STATUS
      } = this;

      return {
        startDate: rangeDate[0],
        endDate: rangeDate[1],
        organizeName,
        reqType,
        taskStatus: STATUS[activeName]
      };
    },
    query() {
      this.queryRequirementList(this.getParams());
    },
    formateDate(date) {
      return moment(date).format('YYYY-MM-DD HH:MM:SS');
    },
    handleClick() {
      this.pageNo = 1;
      this.query();
    },
    ...mapActions([
      'queryRequirementList'
    ])
  }
};
