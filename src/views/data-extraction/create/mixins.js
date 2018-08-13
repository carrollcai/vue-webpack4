import {mapActions} from 'vuex';
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
    clientFn(value) {
      this.isUseTimeFn();
    },
    isUseTimeFn() {
      let clientStr = String(this.applyFrom.client);
      if (clientStr.indexOf('咪咕直播') !== -1 || clientStr.indexOf('咪咕影院') !== -1) {
        this.applyFrom.isUseTime = true;
        return true;
      } else {
        this.applyFrom.isUseTime = false;
        return false;
      }
    },
    changeDate(value) {
      if (value === '1') {
        this.isByDay = true;
      } else {
        this.isByDay = false;
      }
    },
    resetData(el) {
      this.applyFrom[el] = [];
      this[el + 'All'] = false;
    },
    isAllChecked(el, active, original) {
      this.applyFrom[active] = this[el] ? original : [];
    },
    handleChecked(el, active, original) {
      let len = this.applyFrom[active].length;
      this[el] = len === original.length;
    },
    isAllChecked2(el, active, original) {
      let nameArr = [];
      original.filter((item) => {
        return nameArr.push(item.name);
      });
      this.applyFrom[active] = this[el] ? nameArr : [];
    },
    onSubmit() {
      this.$refs.refName.validate((valid) => {
        if (valid) {
          this.applyDataExtraction(this.applyFrom);
        }
      });
    },
    cancel() {
      this.$router.push({path: '/data-extraction/data-download'});
    },
    ...mapActions([
      'applyDataExtraction'
    ])
  }
};
