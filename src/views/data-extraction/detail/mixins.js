import { mapState, mapActions } from 'vuex';
import { inputLengthTwenty } from '@/utils/rules.js';

export default {
  data() {
    return {
      auditFromVaild: {
        resultStatus: [
          { required: true, message: '请选择审核结果', trigger: ['change', 'blur'] }
        ],
        dealResult: [
          { required: true, message: '请输入备注', trigger: ['change', 'blur'] },
          { required: true, validator: inputLengthTwenty, trigger: 'blur' }
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
    remarkVaild(value) {
    },
    onSubmit() {
      this.$refs.refName.validate((valid) => {
        this.dataFrom = Object.assign(this.dataFrom, this.auditForm);
        if (valid) {
          this.auditDataExtraction(this.dataFrom);
        }
      });
    },
    cancel() {
      this.$router.push({path: '/data-extraction/data-audit'});
    },
    ...mapActions([
      'queryDataExtractionSteps',
      'queryDataDetail',
      'auditDataExtraction'
    ])
  }
};
