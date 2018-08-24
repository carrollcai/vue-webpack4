import { PAGE_NO, PAGE_SIZE } from '@/config/index.js';
import { checkPhone, textareaLimit, textareaMaxLimit } from '@/utils/rules.js';

export default {
  data() {
    const textLimit = (rule, value, callback) => {
      if (String(value).trim() === '') {
        callback(new Error('输入内容不能为空'));
      } else if (String(value).trim().length > 25) {
        callback(new Error(`输入内容字符不能超过25`));
      } else {
        callback();
      }
    };
    const textFormat = (rule, value, callback) => {
      let reg = /^[A-Za-z0-9\u4e00-\u9fa5??;]+[?!;]$/;
      if (String(value).trim() === '') {
        callback(new Error('输入内容不能为空'));
      } else if (String(value).trim().length > 50) {
        callback(new Error(`输入内容字符不能超过50`));
      } else if (reg.test(value) || (!reg.test(value) && value.indexOf(';;') !== -1)) {
        callback(new Error(`输入格式不正确`));
      } else {
        callback();
      }
    };
    return {
      pageNo: PAGE_NO,
      pageSize: PAGE_SIZE,
      createVisitVaild: {
        visitTheme: [
          { required: true, message: '请输入走访主题', trigger: ['change', 'blur'] },
          { validator: textLimit, trigger: 'blur' }
        ],
        organizeName: [
          { required: true, message: '请输入公司名称', trigger: ['change', 'blur'] },
          { validator: textLimit, trigger: 'blur' }
        ],
        visitAddress: [
          { required: true, message: '请输入公司地址', trigger: ['change', 'blur'] },
          { validator: textareaLimit, trigger: 'blur' }
        ],
        intervieweeName: [
          { required: true, message: '请输入走访对象姓名', trigger: ['change', 'blur'] },
          { validator: textLimit, trigger: 'blur' }
        ],
        intervieweeMobile: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ],
        visitPresentMembers: [
          { required: true, message: '请输入我方出席人员', trigger: ['change', 'blur'] },
          { validator: textFormat, trigger: 'blur' }
        ],
        visitContent: [
          { required: true, message: '请输入走访内容', trigger: ['change', 'blur'] },
          { validator: textareaMaxLimit, trigger: 'blur' }
        ],
        relOpporCode: [
          { required: true, message: '请输入涉及商机', trigger: ['change', 'blur'] },
          { validator: textareaLimit, trigger: 'blur' }
        ],
        problemCoordinate: [
          { required: true, message: '请输入问题协调', trigger: ['change', 'blur'] },
          { validator: textareaMaxLimit, trigger: 'blur' }
        ],
        isFirstVisit: [
          { required: true, message: '请选择是否首课走访', trigger: 'change' }
        ],
        visitTime: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        timeRange: [
          { required: true, message: '请选择时间', trigger: 'change' }
        ],
        assignNote: [
          { required: true, message: '请输入指派说明', trigger: ['change', 'blur'] },
          { validator: textareaMaxLimit, trigger: 'blur' }
        ],
        processor: [
          { required: true, message: '请选择指派人', trigger: 'change' }
        ]
      }
    };
  }
};
