
import {mapActions} from 'vuex';
import DetailInfo from './DetailInfo.vue';
export default {
  components: {
    DetailInfo
  },
  computed: {
    requirement() {
      return this.$store.getters.requirement;
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.queryRequirement(this.$route.params.id);
    },
    ...mapActions(['queryRequirement'])
  }
};
