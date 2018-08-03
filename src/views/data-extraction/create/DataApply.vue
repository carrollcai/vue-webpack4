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
        <el-form-item required prop="name" style="width: 320px !important;">
          <p>任务名称</p>
          <el-input v-model="applyFrom.name" style="width: 320px !important;" placeholder="请输入任务名称" />
        </el-form-item>
        <el-form-item required>
          <p>选择地区</p>
          <div class="flex-row">
            <el-form-item prop="region" style="width: 320px; margin-right: 34px;">
              <el-input v-model="applyFrom.region" :placeholder="`请输入区域`" />
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="restrictedCity" label="限制地市"></el-checkbox>
            </el-form-item>
          </div>
        </el-form-item>
        <el-form-item required>
          <p>数据日期</p>
          <div class="flex-row">
            <el-form-item style="margin-right: 34px;">
              <el-select
                v-model="applyFrom.checkDate"
                @change="changeDate">
                <el-option v-for="item in checkDate" :key="item" :value="item.value" :label="item.label"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="ml16" prop="date">
              <el-date-picker
                v-model="applyFrom.date"
                :type="applyFrom.checkDate === '1' ? 'date' : 'month'"
                :placeholder="applyFrom.checkDate === '1' ? '请选择日期' : '请选择月份'">
              </el-date-picker>
            </el-form-item>
          </div>
        </el-form-item>
        <el-form-item required prop="userInfo">
          <p>用户信息</p>
          <el-checkbox-group v-model="applyFrom.userInfo">
            <el-checkbox :disabled="item.type === 1 && restrictedCity.length > 0 ? true : false" v-for="item in userInfoList" :key="item" :value="item.name" :label="item.name"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item required prop="client">
          <p>客户端</p>
          <el-checkbox-group v-model="applyFrom.client">
            <el-checkbox v-for="item in clientList" :key="item" :value="item.name" :label="item.name"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item required prop="dataType">
          <p>数据类型</p>
          <el-checkbox-group v-model="applyFrom.dataType">
            <el-checkbox :disabled="item.type === 1 ? isByDay : false" v-for="item in dataTypeList" :key="item" :value="item.name" :label="item.name"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </div>
      <h3 class="data-title">数据明细设置</h3>
      <el-form-item label="来源渠道：">
        <span class="cancel" @click="resetData('source')">取消设置</span>
        <el-checkbox-group v-model="applyFrom.source">
          <el-checkbox v-for="item in sourceList" :key="item" :value="item.name" :label="item.name"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="会员类型：">
        <span class="cancel" @click="resetData('vipType')">取消设置</span>
        <el-checkbox-group v-model="applyFrom.vipType">
          <el-checkbox v-for="item in vipTypeList" :key="item" :value="item.name" :label="item.name"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="用户性别：">
        <span class="cancel" @click="resetData('sex')">取消设置</span>
        <el-checkbox-group v-model="applyFrom.sex">
          <el-checkbox v-for="item in sexList" :key="item" :value="item.name" :label="item.name"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="用户年龄：">
        <span class="cancel" @click="resetData('age')">取消设置</span>
        <el-checkbox-group v-model="applyFrom.age">
          <el-checkbox v-model="ageAll" value="全部" label="全部" @change="isAllChecked()"></el-checkbox>
          <el-checkbox v-for="item in ageList" :key="item" :value="item.name" :label="item.name"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="用户行为：">
        <span class="cancel" @click="resetData('userActive')">取消设置</span>
        <el-checkbox-group v-model="applyFrom.userActive">
          <el-checkbox v-for="item in userActiveList" :key="item" :value="item.name" :label="item.name"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="上网方式：">
        <span class="cancel" @click="resetData('flow')">取消设置</span>
        <el-checkbox-group v-model="applyFrom.flow">
          <el-checkbox v-for="item in flowList" :key="item" :value="item.name" :label="item.name"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="使用时长：" v-model="applyFrom.useTime">
        <el-radio-group>
        <el-radio v-for="item in useTimeList" :key="item" :value="item.name" :label="item.name"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item >
        <el-button type="primary" @click="onSubmit()">提交</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>

<script>
import mixins from './mixins';
import {mapActions} from 'vuex';
export default {
  mixins: [mixins],
  data() {
    return {
      restrictedCity: [],
      checkDate: [{value: '1', label: '按日'}, {value: '2', label: '按月'}],
      dataTypeList: [
        {name: '活跃用户', type: 0},
        {name: '新增用户', type: 0},
        {name: '存留会员用户', type: 1},
        {name: '流失会员用户', type: 1}
      ],
      clientList: [
        {name: '咪咕视频', type: 0},
        {name: '咪咕直播', type: 0},
        {name: '咪咕影院', type: 0}
      ],
      userInfoList: [
        {name: '手机号', type: 0},
        {name: 'IP地址', type: 1},
        {name: 'IMEI号码', type: 1},
        {name: 'IDFA号码', type: 1}
      ],
      areaList: [
        {value: '1', label: '大区'},
        {value: '2', label: '地市'}
      ],
      sourceList: [
        {name: '全部', type: 0},
        {name: '省渠道', type: 0},
        {name: '非省渠道', type: 0}
      ],
      vipTypeList: [
        {name: '全部', type: 0},
        {name: '黄金会员', type: 0},
        {name: '钻石会员', type: 0},
        {name: '钻石会员_TV尊享', type: 0}
      ],
      sexList: [
        {name: '全部', type: 0},
        {name: '男', type: 0},
        {name: '女', type: 0}
      ],
      ageAll: false,
      ageList: [
        {name: '15-20周岁', type: 0},
        {name: '21-30周岁', type: 0},
        {name: '31-35周岁', type: 0}
      ],
      userActiveList: [
        {name: '观看世界杯', type: 0}
      ],
      flowList: [
        {name: '全部', type: 0},
        {name: '4G', type: 0},
        {name: 'Wi-Fi', type: 0}
      ],
      useTimeList: [
        {name: '不显示', type: 0},
        {name: '显示', type: 0}
      ],
      applyFrom: {
        name: '',
        date: '',
        checkDate: '1',
        dataType: [],
        client: [],
        userInfo: [],
        area: '大区',
        region: '',
        source: [],
        vipType: [],
        sex: [],
        age: [],
        userActive: [],
        flow: [],
        useTime: ''
      }
    };
  },
  methods: {
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
</script>

<style lang="scss">
.data-title {
  font-size: 18px;
  font-weight: 400;
}
.apply {
  .cancel {float: right; color: #3778FF;}
  .base-info {
    display: flex;
    flex-flow: row wrap;
    > .el-form-item {
      display: flex !important;
      width: 470px;
      margin-right: 34px;
    }
    > .el-form-item:nth-child(odd) {
      width: 320px;
      margin-right: 128px;
    }
    .flex-row {
      display: flex !important;
      justify-content: space-between;
      flex: 1;
    }
  }
}
</style>
