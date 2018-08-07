import { mapState, mapActions } from 'vuex';
import { inputLengthTwenty } from '@/utils/rules.js';

export default {
  data() {
    return {
      auditFromVaild: {
        audit: [
          { required: true, message: '请选择审核结果', trigger: ['change', 'blur'] }
        ],
        remark: [
          { required: true, message: '请输入备注', trigger: ['change', 'blur'] },
          { validator: inputLengthTwenty, trigger: 'blur' }
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
    onSubmit() {
      this.$refs.refName.validate((valid) => {
        if (valid) {
          this.auditDataExtraction(this.auditForm);
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