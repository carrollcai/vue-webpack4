import { inputLengthTwenty } from '@/utils/rules.js';

export default {
  data() {
    return {
      isByDay: true,
      applyFromVaild: {
        name: [
          { required: true, message: '请输入任务名称', trigger: ['change', 'blur'] },
          { validator: inputLengthTwenty, trigger: 'blur' }
        ],
        date: [
          { required: true, message: '请选择', trigger: ['change', 'blur'] }
        ],
        dataType: [
          { required: true, message: '请选择数据类型', trigger: ['change', 'blur'] }
        ],
        client: [
          { required: true, message: '请选择客户端', trigger: ['change', 'blur'] }
        ],
        userInfo: [
          { required: true, message: '请选择用户信息', trigger: ['change', 'blur'] }
        ],
        area: [
          { required: true, message: '请选择地域', trigger: ['change', 'blur'] }
        ],
        region: [
          { required: true, message: '请输入区域名称', trigger: ['change', 'blur'] }
        ]
      }
    };
  },
  methods: {
    changeDate(value) {
      if (value === '1') {
        this.isByDay = true;
      } else {
        this.isByDay = false;
      }
    },
    resetData(el) {
      this.applyFrom[el] = [];
    },
    isAllChecked(validator) {
    }
  }
};
