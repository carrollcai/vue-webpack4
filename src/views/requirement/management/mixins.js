import WmTable from 'components/Table.vue';
import { mapState, mapActions } from 'vuex';
export default {
  components: {
    WmTable
  },
  data() {
    return {
      STATUS: {
        'first': [],
        'second': ['1'],
        'third': ['2', '5']
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
      this.pageNo = value;
      this.query();
    },
    onSizePagination(value) {
      this.pageSize = value;
      this.query();
    },
    getParams() {
      const {
        organizeType,
        provinceId,
        managerName
      } = this;

      return {
        organizeType,
        provinceId,
        managerName,
        taskStatusList: STATUS[this.activeName]
      };
    },
    query() {
      this.queryRequirementList(this.getParams());
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
