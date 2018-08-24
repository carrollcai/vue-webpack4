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
        extractDate: [
          { required: true, message: '请选择', trigger: ['change', 'blur'] }
        ],
        dataType: [
          { required: true, message: '请选择数据类型', trigger: ['change', 'blur'] }
        ],
        clientType: [
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
  beforeMount() {
    this.queryProcessor({});
  },
  methods: {
    itemChange(value) {
      console.log(value, 'itemChange');
    },
    getRegion(value) {
      console.log(value, 'getRegion');
      this.applyFrom.province = [];
      this.applyFrom.provinceList.push(value[1]);
    },
    handleClose(value) {
      console.log(value, 'handleClose');
    },
    getServiceTime(value) {
      if (value === '不显示') {
        this.submitData.serviceTime = '0';
      } else if (value === '显示') {
        this.submitData.serviceTime = '1';
      }
    },
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
      if (this[el + 'All']) {
        this[el + 'All'] = false;
      }
      if (this[el + 'Set']) {
        this[el + 'Set'] = false;
      } else {
        this[el + 'Set'] = true;
      }
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
        return nameArr.push(item.label);
      });
      this.applyFrom[active] = this[el] ? nameArr : [];
    },
    openDataFn(val, list, map) {
      list.filter((item, index, arr) => {
        map.set(item['field'], '0');
        val.map((active) => {
          if (item.name === active) {
            map.set(item['field'], '1');
          }
        });
      });
      let obj = this.strMapToObj(map);
      return obj;
    },
    getDataValueFn(val, list, field) {
      val.map((active) => {
        list.filter((item, index, arr) => {
          if (item.label === active) {
            field.push(item.value);
          }
        });
      });
      return field;
    },
    strMapToObj(strMap) {
      let obj = Object.create(null);
      for (let [k, v] of strMap) {
        obj[k] = v;
      }
      return obj;
    },
    onSubmit() {
      let userObj = this.openDataFn(this.applyFrom.userInfo, this.userInfoList, this.userMap);
      let activeObj = this.openDataFn(this.applyFrom.dataType, this.dataTypeList, this.activeMap);
      let sourceObj = this.getDataValueFn(this.applyFrom.source, this.sourceList, []);
      let clientTypeObj = this.getDataValueFn(this.applyFrom.clientType, this.clientTypeList, []);
      let memberTypeObj = this.getDataValueFn(this.applyFrom.vipType, this.vipTypeList, []);
      let ageObj = this.getDataValueFn(this.applyFrom.age, this.ageList, []);
      let netTypeObj = this.getDataValueFn(this.applyFrom.netType, this.netTypeList, []);
      let sexObj = this.getDataValueFn(this.applyFrom.sex, this.sexList, []);
      sourceObj = this.sourceAll ? [0] : sourceObj;
      memberTypeObj = this.vipTypeAll ? [0] : memberTypeObj;
      ageObj = this.ageAll ? [0] : ageObj;
      netTypeObj = this.netTypeAll ? [0] : netTypeObj;
      sexObj = this.sexAll ? [0] : sexObj;
      let data = {
        name: this.applyFrom.name,
        extractDate: this.applyFrom.extractDate,
        extractDateType: this.applyFrom.extractDateType,
        clientType: clientTypeObj,
        // clientType: 2,
        memberType: memberTypeObj,
        age: ageObj,
        content: this.applyFrom.userActive,
        sex: sexObj,
        netType: netTypeObj,
        channelType: sourceObj
      };
      let parms = Object.assign(this.submitData, data, userObj, activeObj);
      console.log(parms);
      this.$refs.refName.validate((valid) => {
        if (valid) {
          this.applyDataExtraction(parms);
        }
      });
    },
    cancel() {
      this.$router.push({path: '/data-extraction/data-download'});
    },
    ...mapActions([
      'applyDataExtraction',
      'queryProcessor'
    ])
  }
};
