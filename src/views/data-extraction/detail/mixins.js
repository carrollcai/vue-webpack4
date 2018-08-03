import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      auditFromVaild: {
        audit: [
          { required: true, message: '请选择审核结果', trigger: ['change', 'blur'] }
        ]
      }
    };
  },
  beforeMount() {
    this.$nextTick(() => {
      this.queryDataExtractionSteps();
      this.queryDataDetail();
    });
  },
  computed: {
    ...mapState({
      dataSteps: ({ dataExtraction }) => dataExtraction.dataSteps.list,
      dataDetailList: ({ dataExtraction }) => dataExtraction.dataDetailList.list
    })
  },
  methods: {
    ...mapActions([
      'queryDataExtractionSteps',
      'queryDataDetail'
    ])
  }
};
