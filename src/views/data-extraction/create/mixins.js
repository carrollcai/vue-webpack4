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
        province: [
          { required: true, message: '请选择省份', trigger: ['change', 'blur'] }
        ],
        region: [
          { required: true, message: '请输入区域名称', trigger: ['change', 'blur'] }
        ]
      }
    };
  },
  beforeMount() {
    this.provinceList = null;
    this.processorList = [];
    this.queryProcessor({});
  },
  methods: {
    handleChangeCities(val) {
      if (val) {
        this.applyFrom.userInfo = [];
      }
    },
    getServiceTime(value) {
      if (value === '不显示') {
        this.submitData.serviceTime = '0';
      } else if (value === '显示') {
        this.submitData.serviceTime = '1';
      }
    },
    getWastage(value) {
      let clientStr = String(value);
      if (clientStr.indexOf('存留会员用户') > -1) {
        this.isByDay = true;
      } else {
        this.isByDay = false;
      }
    },
    clientFn(value) {
      let clientStr = String(value);
      if (clientStr.indexOf('咪咕直播') > -1) {
        this.applyFrom.isUseTime = true;
      } else if (clientStr.indexOf('咪咕影院') > -1) {
        this.applyFrom.isUseTime = true;
      } else {
        this.applyFrom.isUseTime = false;
      }
    },
    changeDate(value) {
      if (value === '1') {
        this.isByDay = true;
      } else {
        this.isByDay = false;
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
      if (this.processorList && this.processorList.length) {
        if (this.regionData.regionList && this.regionData.regionList.length <= 0) {
          this.$message({ showClose: true, message: '请选择地区', type: 'info' });
          return false;
        }
      }
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
      this.regionData.regionList && this.regionData.regionList.filter(item => {
        if (item.regionValue) {
          this.submitData.region.push(item.regionValue);
        }
        if (item.provinceValue) {
          this.submitData.province.push(item.provinceValue);
        }
      });
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
        channelType: sourceObj,
        city: this.restrictedCity ? 1 : ''
      };
      this.submitData.province = this.applyFrom.province;
      let parms = Object.assign(this.submitData, data, userObj, activeObj);
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
