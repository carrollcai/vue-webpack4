import {mapActions, mapState} from 'vuex';
export default {
  components: {
  },
  data() {
    const that = this;
    const filesValidator = function(rule, val, callback) {
      const {requirement, uploadFiles} = that;
      if (requirement.resType !== '2' && !uploadFiles.length) {
        callback(new Error('请上传需求附件'));
      } else {
        callback();
      }
    };

    const processorValidator = function(rule, val, callback) {
      const {requirement} = that;
      if (requirement.needSms === '1' && !requirement.processor) {
        callback(new Error('请选择指派处理人'));
      } else {
        callback();
      }
    };

    return {
      uploadFiles: [],
      baseInfoRules: {
        organizeName: [
          { required: true, message: '请输入集团编码', trigger: 'blur' }
        ],
        reqType: [
          { required: true, message: '请选择需求类型', trigger: 'change' }
        ],
        reqDesc: [
          { required: true, message: '请输入需求描述', trigger: 'blur' }
        ],
        uploadFiles: [
          {
            validator: filesValidator,
            trigger: 'change'
          }
        ],
        materialName: [
          { required: true, message: '请输入物料名称', trigger: 'blur' }
        ],
        materialSupplyType: [
          { required: true, message: '请选择物料格式要求', trigger: 'change' }
        ],
        materialUseCreateTime: [
          { required: true, message: '请选开始时间', trigger: 'change' }
        ],
        materialUseEndTime: [
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
          { validator: processorValidator, trigger: 'change' }
        ]
      }
    };
  },
  computed: {
    ...mapState({
      orderOrganizeAddressList: ({ order }) => order.orderOrganizeAddressList
    })
  },
  methods: {
    querySearchAsync(queryString, cb) {
      if (!queryString) {
        return false;
      }
      let params = {
        pageSize: 20,
        organizeName: queryString
      };
      this.getOrganizeAddress(params).then(() => {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(this.orderOrganizeAddressList);
        }, 1000);
      });
    },
    handleSelect(item) {
    },
    ...mapActions([
      'queryCustomerManagers',
      'getOrganizeAddress'
    ])
  }
};
