import {mapActions} from 'vuex';
export default {
  components: {
  },
  data() {
    return {
      step: 0,
      isAddingContact: false,
      dateOptions: {
        disabledDate(time) {
          return time.getTime() > new Date().getTime();
        }
      },
      baseInfoRules: {
        orgCode: [
          { required: true, message: '请输入集团编码', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择需求类型', trigger: 'change' }
        ],
        requirementDesc: [
          { required: true, message: '请输入需求描述', trigger: 'blur' }
        ],
        uploadFiles: [
          {
            require: true,
            type: 'array',
            message: '请上传需求附件',
            trigger: 'change'
          }
        ],
        materialName: [
          { required: true, message: '请输入物料名称', trigger: 'blur' }
        ],
        materialType: [
          { required: true, message: '请选择物料提供方式', trigger: 'change' }
        ],
        materialStart: [
          { required: true, message: '请选开始时间', trigger: 'change' }
        ],
        materialEnd: [
          { required: true, message: '请选择结束时间', trigger: 'change' }
        ],

        materialDesc: [
          { required: true, message: '请输入物料描述', trigger: 'blur' }
        ],
        contactName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        contactMobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { type: 'string', pattern: /^1\d{10}$/, message: '请输入手机号', trigger: 'blur' }
        ],
        contactEmail: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入邮箱', trigger: 'blur' }
        ],
        processor: [
          { required: true, message: '请选择处理人', trigger: 'change' }
        ]
      }
    };
  },
  computed: {
  },
  methods: {
    querySearchAsync(queryString, cb) {
      this.queryCustomerManagers(queryString).then((res) => {
        cb(res.data);
      });
    },
    handleSelect(item) {
      this.requirement.managerName = item.staffName;
      this.requirement.managerMobile = item.mobile;
      this.requirement.managerNo = `${item.operatorId}`;
      this.requirement.managerPosition = item.postion;
    },
    ...mapActions(['queryCustomerManagers'])
  }
};
