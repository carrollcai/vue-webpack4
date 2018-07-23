import {mapActions, mapState} from 'vuex';
import {
  isEmpty as emptyValidator
} from '@/utils/rules';
export default {
  components: {
  },
  data() {
    const that = this;
    const filesValidator = function(rule, val, callback) {
      const {requirement, uploadFiles} = that;
      if (requirement.resType !== '2' && !uploadFiles.length) {
        callback(new Error('请选择需求附件'));
      } else {
        callback();
      }
    };

    const processorValidator = function(rule, val, callback) {
      const {requirement} = that;
      if (!requirement.processor) {
        callback(new Error('请选择指派处理人'));
      } else {
        callback();
      }
    };

    return {
      uploadFiles: [],
      baseInfoRules: {
        organizeName: [
          { required: true, message: '请输入集团名称', trigger: ['blur', 'change'] },
          { min: 1, max: 25, message: '请输入25个以内字符', trigger: ['blur', 'change'] },
          { validator: emptyValidator, trigger: ['blur', 'change'] }
        ],
        reqType: [
          { required: true, message: '请选择需求类型', trigger: 'change' }
        ],
        reqDesc: [
          { required: true, message: '请输入需求描述', trigger: ['blur', 'change'] },
          { validator: emptyValidator, trigger: ['blur', 'change'] }
        ],
        uploadFiles: [
          {
            required: true,
            validator: filesValidator,
            trigger: 'change'
          }
        ],
        materialName: [
          { required: true, message: '请输入物料名称', trigger: ['blur', 'change'] },
          { validator: emptyValidator, trigger: ['blur', 'change'] }
        ],
        materialSupplyType: [
          { required: true, message: '请选择物料格式要求', trigger: ['blur', 'change'] },
          { validator: emptyValidator, trigger: ['blur', 'change'] }
        ],
        materialUseCreateTime: [
          { required: true, message: '请选开始时间', trigger: 'change' }
        ],
        materialUseEndTime: [
          { required: true, message: '请选择结束时间', trigger: 'change' }
        ],

        materialDesc: [
          { required: true, message: '请输入物料描述', trigger: ['blur', 'change'] },
          { validator: emptyValidator, trigger: ['blur', 'change'] }
        ],
        contactName: [
          { required: true, message: '请输入姓名', trigger: ['blur', 'change'] },
          { validator: emptyValidator, trigger: ['blur', 'change'] }
        ],
        contactMobile: [
          { required: true, message: '请输入手机号', trigger: ['blur', 'change'] },
          { type: 'string', pattern: /^1\d{10}$/, message: '请输入手机号', trigger: ['blur', 'change'] }
        ],
        contactEmail: [
          { required: true, message: '请输入邮箱', trigger: ['blur', 'change'] },
          { type: 'email', message: '请输入邮箱', trigger: ['blur', 'change'] }
        ],
        processor: [
          { required: true, validator: processorValidator, trigger: 'change' }
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
    handleSelect() {
    },
    ...mapActions([
      'queryCustomerManagers',
      'getOrganizeAddress'
    ])
  }
};
