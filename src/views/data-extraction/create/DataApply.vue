<template>
<div class="apply">
  <div class="m-container">
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/data-extraction/data-download' }">明细数据下载</el-breadcrumb-item>
      <el-breadcrumb-item>数据提取申请</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div class="m-container table-container">
    <el-form :label-position="'right'" :model="applyFrom" ref="refName" :rules="applyFromVaild">
      <h3 class="data-title">数据基本信息</h3>
      <div class="base-info">
        <el-form-item label="任务名称：" required prop="name">
          <el-input v-model="applyFrom.name" style="width: 320px !important;" placeholder="请输入任务名称" />
        </el-form-item>
        <el-form-item label="选择地区：">
          <div class="flex-row">

            <el-form-item prop="visitAuditor">
              <el-cascader style="width: 392px;" v-if="processorList"
                @change="getRegion"
                :options="processorList"
                v-model="applyFrom.province">
              </el-cascader>
            </el-form-item>
            <el-form-item style="margin-left: 26px;">
              <el-checkbox v-model="restrictedCity" label="地市"></el-checkbox>
            </el-form-item>
          </div>
        </el-form-item>
        <el-form-item label="数据日期：" required>
          <div class="flex-row">
            <el-form-item style="margin-right: 34px;">
              <el-select
                v-model="applyFrom.extractDateType"
                @change="changeDate">
                <el-option v-for="item in extractDateType" :key="item" :value="item.value" :label="item.label"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="ml16" prop="extractDate">
              <el-date-picker
                value-format="yyyy-MM-dd"
                v-model="applyFrom.extractDate"
                :type="applyFrom.extractDateType === '1' ? 'date' : 'month'"
                :placeholder="applyFrom.extractDateType === '1' ? '请选择日期' : '请选择月份'">
              </el-date-picker>
            </el-form-item>
          </div>
        </el-form-item>
        <el-form-item label="用户信息：" required prop="userInfo">
          <el-checkbox-group v-model="applyFrom.userInfo">
            <el-checkbox
              :disabled="item.type === 1 && restrictedCity.length > 0 ? true : false"
              v-for="item in userInfoList"
              :key="item"
              :label="item.name"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="客户端：" required prop="clientType">
          <el-checkbox-group v-model="applyFrom.clientType" @change="clientFn">
            <el-checkbox v-for="item in clientTypeList" :key="item" :label="item.label"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="用户类型：" required prop="dataType">
          <el-checkbox-group v-model="applyFrom.dataType">
            <el-checkbox :disabled="item.type === 1 ? isByDay : false" v-for="item in dataTypeList" :key="item" :label="item.name"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </div>
      <h3 class="data-title">数据明细设置</h3>
      <div class="detail-set">
        <el-form-item label="来源渠道：">
          <span class="cancel" @click="resetData('source')">{{sourceSet ? '取消设置' : '设置'}}</span>
          <div v-if="sourceSet">
            <el-checkbox class="all-label" v-model="sourceAll" label="全部" @change="isAllChecked2('sourceAll', 'source', sourceList)"></el-checkbox>
            <el-checkbox-group v-model="applyFrom.source" @change="handleChecked('sourceAll', 'source', sourceList)">
              <el-checkbox v-for="item in sourceList" :key="item" :label="item.label"></el-checkbox>
            </el-checkbox-group>
          </div>
        </el-form-item>
        <el-form-item label="会员类型：">
          <span class="cancel" @click="resetData('vipType')">{{vipTypeSet ? '取消设置' : '设置'}}</span>
          <div v-if="vipTypeSet">
            <el-checkbox class="all-label" v-model="vipTypeAll" label="全部" @change="isAllChecked2('vipTypeAll', 'vipType', vipTypeList)"></el-checkbox>
            <el-checkbox-group v-model="applyFrom.vipType" @change="handleChecked('vipTypeAll', 'vipType', vipTypeList)">
              <el-checkbox v-for="item in vipTypeList" :key="item" :label="item.label"></el-checkbox>
            </el-checkbox-group>
          </div>
        </el-form-item>
        <el-form-item label="用户性别：">
          <span class="cancel" @click="resetData('sex')">{{sexSet ? '取消设置' : '设置'}}</span>
          <!-- <el-radio-group v-model="applyFrom.sex" @change="getSex">
            <el-radio v-for="item in sexList" :key="item" :label="item.label"></el-radio>
          </el-radio-group> -->
          <div v-if="sexSet">
            <el-checkbox class="all-label" v-model="sexAll" label="全部" @change="isAllChecked2('sexAll', 'sex', sexList)"></el-checkbox>
            <el-checkbox-group v-model="applyFrom.sex">
              <el-checkbox v-for="item in sexList" :key="item" :label="item.label"></el-checkbox>
            </el-checkbox-group>
          </div>
        </el-form-item>
        <el-form-item label="用户年龄：">
          <span class="cancel" @click="resetData('age')">{{ageSet ? '取消设置' : '设置'}}</span>
          <div v-if="ageSet">
            <el-checkbox class="all-label" v-model="ageAll" label="全部" @change="isAllChecked2('ageAll', 'age', ageList)"></el-checkbox>
            <el-checkbox-group v-model="applyFrom.age" @change="handleChecked('ageAll', 'age', ageList)">
              <el-checkbox v-for="item in ageList" :key="item" :label="item.label"></el-checkbox>
            </el-checkbox-group>
          </div>
        </el-form-item>
        <el-form-item label="用户行为：">
          <span class="cancel" @click="resetData('userActive')">{{userActiveSet ? '取消设置' : '设置'}}</span>
          <div v-if="userActiveSet">
            <el-select v-if="userActiveSet" v-model="applyFrom.userActive" multiple placeholder="请选择">
              <el-option
                v-for="item in userActiveList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="上网方式：">
          <span class="cancel" @click="resetData('netType')">{{netTypeSet ? '取消设置' : '设置'}}</span>
          <div v-if="netTypeSet">
            <el-checkbox class="all-label" v-model="netTypeAll" label="全部" @change="isAllChecked2('netTypeAll', 'netType', netTypeList)"></el-checkbox>
            <el-checkbox-group v-model="applyFrom.netType" @change="handleChecked('netTypeAll', 'netType', netTypeList)">
              <el-checkbox v-for="item in netTypeList" :key="item" :label="item.label"></el-checkbox>
            </el-checkbox-group>
          </div>
        </el-form-item>
        <el-form-item label="使用时长：">
          <el-radio-group v-model="applyFrom.serviceTime" @change="getServiceTime">
          <el-radio :disabled="applyFrom.isserviceTime" v-for="item in serviceTimeList" :key="item" :label="item.label"></el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button type="primary" @click="onSubmit()">申请</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>

<script>
import mixins from './mixins';
import {mapState} from 'vuex';
const sexList = [{label: '男', value: '0'}, {label: '女', value: '1'}];
export default {
  mixins: [mixins],
  data() {
    return {
      activeMap: new Map(),
      userMap: new Map(),
      sourceSet: false,
      vipTypeSet: false,
      sexSet: false,
      ageSet: false,
      netTypeSet: false,
      userActiveSet: false,
      sourceAll: false,
      vipTypeAll: false,
      sexAll: false,
      ageAll: false,
      netTypeAll: false,
      restrictedCity: [],
      extractDateType: [{value: '1', label: '按日'}, {value: '2', label: '按月'}],
      dataTypeList: [
        {name: '活跃用户', type: 0, field: 'active'},
        {name: '新增活跃用户', type: 0, field: 'newActive'},
        {name: '新增会员用户', type: 0, field: 'newMember'},
        {name: '存留会员用户', type: 1, field: 'retainMember'},
        {name: '流失会员用户', type: 1, field: 'dropoutMember'}
      ],
      userInfoList: [
        {name: '手机号', type: 0, field: 'mobliePhone'},
        {name: 'IP地址', type: 1, field: 'ip'},
        {name: 'IMEI号码', type: 1, field: 'imei'},
        {name: 'IDFA号码', type: 1, field: 'idfa'}
      ],
      areaList: [
        {value: '1', label: '大区'},
        {value: '2', label: '地市'}
      ],
      sexList: sexList,
      serviceTimeList: [
        {label: '不显示', value: '0', type: 0},
        {label: '显示', value: '1', type: 0}
      ],
      applyFrom: {
        name: '',
        extractDate: '',
        extractDateType: '1',
        dataType: [],
        clientType: [],
        userInfo: [],
        area: '大区',
        region: '',
        source: [],
        vipType: [],
        sex: [],
        age: [],
        userActive: [],
        netType: [],
        serviceTime: '',
        isserviceTime: false
      },
      submitData: {}
    };
  },
  computed: {
    ...mapState({
      staticData: ({ root }) => root.staticData,
      processorList: ({ dataExtraction }) => dataExtraction.processorList
    }),
    clientTypeList() {
      let data = this.staticData.CLIENT_TYPE;
      if (data) {
        return data || [];
      }
    },
    sourceList() {
      let data = this.staticData.CHANNEL_TYPE;
      if (data) {
        data = data.slice(1, data.length);
        return data || [];
      }
    },
    vipTypeList() {
      let data = this.staticData.MEMBER_TYPE;
      if (data) {
        data = data.slice(1, data.length);
        return data || [];
      }
    },
    ageList() {
      let data = this.staticData.EXTRACT_AGE;
      if (data) {
        data = data.slice(1, data.length);
      }
      let ageArr = [];
      if (data && data.length) {
        let extrctAge = data;
        extrctAge.filter((item) => {
          let arr = item.label.substring(1, item.label.length - 1).split(',');
          let ageStr = `${arr[0]}岁~${arr[1]}岁`;
          ageArr.push({label: ageStr, value: item.value});
        });
        return ageArr;
      }
    },
    netTypeList() {
      let data = this.staticData.NET_TYPE;
      if (data) {
        data = data.slice(1, data.length);
        return data || [];
      }
    },
    userActiveList() {
      return this.staticData.CONTENT || [];
    }
  }
};
</script>

<style lang="scss" src="./style.scss"></style>
