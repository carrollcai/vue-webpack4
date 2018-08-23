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
      this.queryDataDetail({id: Number(this.id)});
    });
  },
  computed: {
    ...mapState({
      dataDetailList: ({ dataExtraction }) => dataExtraction.dataDetailList
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
      'queryDataDetail',
      'auditDataExtraction'
    ])
  }
};
