import WmTable from 'components/Table.vue';
import { mapState, mapActions } from 'vuex';
import {PAGE_NO, PAGE_SIZE} from '@/config';
export default {
  components: {
    WmTable
  },
  data() {
    return {
      params: {
        pageNo: PAGE_NO,
        pageSize: PAGE_SIZE,
        organizeType: '',
        provinceId: '',
        managerName: ''
      }
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
      this.params.pageNo = value;
      this.query();
    },
    onSizePagination(value) {
      this.params.pageSize = value;
      this.query();
    },
    getParams() {
      const {params} = this;
      let STATUS = {
        'first': [],
        'second': ['1'],
        'third': ['2', '5']
      };

      params.taskStatusList = STATUS[this.activeName];

      return params;
    },
    query() {
      this.queryRequirementList(this.getParams());
    },
    handleClick() {
      this.params.pageNo = 1;
      this.query();
    },
    ...mapActions([
      'queryRequirementList'
    ])
  }
};
