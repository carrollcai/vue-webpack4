import {mapActions, mapState} from 'vuex';
import {
  isEmpty as emptyValidator
} from '@/utils/rules';
export default {
  components: {
  },
  data() {
    const that = this;
    const orgValidator = function(rule, val, callback) {
      const {requirement} = that;
      if (!requirement.orgId) {
        callback(new Error('请选择正确的集团'));
      } else {
        callback();
      }
    };

    return {
      uploadFiles: [],
      baseInfoRules: {
        organizeName: [
          { required: true, message: '请输入集团名称', trigger: 'blur' },
          { validator: orgValidator, trigger: 'blur' },
          { validator: emptyValidator, trigger: 'blur' }
        ],
        reqType: [
          { required: true, message: '请选择需求类型', trigger: 'change' }
        ],
        reqDesc: [
          { required: true, message: '请输入需求描述', trigger: 'blur' },
          { validator: emptyValidator, trigger: 'blur' }
        ],
        materialName: [
          { required: true, message: '请输入物料名称', trigger: 'blur' },
          { validator: emptyValidator, trigger: 'blur' }
        ],
        materialSupplyType: [
          { required: true, message: '请选择物料格式要求', trigger: 'blur' },
          { validator: emptyValidator, trigger: 'blur' }
        ],
        materialUseCreateTime: [
          { required: true, message: '请选开始时间', trigger: 'change' }
        ],
        materialUseEndTime: [
          { required: true, message: '请选择结束时间', trigger: 'change' }
        ],

        materialDesc: [
          { required: true, message: '请输入物料描述', trigger: 'blur' },
          { validator: emptyValidator, trigger: 'blur' }
        ],
        contactName: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { validator: emptyValidator, trigger: 'blur' }
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
          { required: true, message: '请选择指派处理人', trigger: 'change' }
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
      this.requirement.orgId = '';
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
      this.requirement.orgId = item.organizeId;
    },
    ...mapActions([
      'queryCustomerManagers',
      'getOrganizeAddress'
    ])
  }
};
