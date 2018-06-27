import DetailInfo from './DetailInfo.vue';
import {mapActions} from 'vuex';
import filters from '../filters';
export default {
  mixins: [filters],
  components: {
    DetailInfo
  },
  data() {
    return {
      auditInfo: {
        status: 'Y'
      },
      auditRules: {

      },
      showMore: false
    };
  },
  computed: {
    customer() {
      return this.$store.getters.groupCustomer;
    }
  },
  created() {
    this.init();
  },
  methods: {
    back() {

    },
    init() {
      this.queryCustomer(this.$route.params.id).then(() => {
        this.$nextTick(() => {
          let list = document.querySelectorAll('.el-table__expand-icon');
          for (let dom of list) {
            dom.innerHTML = '详情<i class="el-icon el-icon-arrow-right"></i>';
          }
        });
      });
    },
    ...mapActions(['queryCustomer'])
  }
};
