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
      <h3>数据基本信息</h3>
      <el-form-item label="任务名称：" label-width="140px" required prop="name">
        <el-input v-model="applyFrom.name" class="form-input-medium" placeholder="请输入任务名称" />
      </el-form-item>
      <el-form-item label="数据日期：" label-width="140px" required>
        <el-form-item>
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
      </el-form-item>
      <el-form-item label="数据类型：" label-width="140px" required prop="dataType">
        <el-checkbox-group v-model="applyFrom.dataType">
          <el-checkbox :disabled="item.type === 1 ? isByDay : false" v-for="item in dataTypeList" :key="item" :value="item.name" :label="item.name"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="客户端：" label-width="140px" required prop="client">
        <el-checkbox-group v-model="applyFrom.client">
          <el-checkbox v-for="item in clientList" :key="item" :value="item.name" :label="item.name"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="用户信息：" label-width="140px" required prop="userInfo">
        <el-checkbox-group v-model="applyFrom.userInfo">
          <el-checkbox :disabled="item.type === 1 ? isByArea : false" v-for="item in userInfoList" :key="item" :value="item.name" :label="item.name"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="地域：" label-width="140px" required>
        <el-form-item>
          <el-select v-model="applyFrom.area" prop="area" @change="changeArea">
            <el-option v-for="item in areaList" :key="item" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="ml16" prop="region">
          <el-input v-model="applyFrom.region" class="form-input-medium" :placeholder="`请输入区域`" />
        </el-form-item>
      </el-form-item>
      <h3>数据明细设置</h3>
      <el-form-item label="来源渠道：" label-width="140px">
        <el-checkbox-group v-model="applyFrom.source">
          <el-checkbox v-for="item in sourceList" :key="item" :value="item.name" :label="item.name"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="会员类型：" label-width="140px">
        <el-checkbox-group v-model="applyFrom.vipType">
          <el-checkbox v-for="item in vipTypeList" :key="item" :value="item.name" :label="item.name"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="性别：" label-width="140px">
        <el-checkbox-group v-model="applyFrom.sex">
          <el-checkbox v-for="item in sexList" :key="item" :value="item.name" :label="item.name"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="年龄：" label-width="140px">
        <el-checkbox-group v-model="applyFrom.age">
          <el-checkbox v-for="item in ageList" :key="item" :value="item.name" :label="item.name"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="用户行为：" label-width="140px">
        <el-checkbox-group v-model="applyFrom.userActive">
          <el-checkbox v-for="item in userActiveList" :key="item" :value="item.name" :label="item.name"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="流量：" label-width="140px">
        <el-checkbox-group v-model="applyFrom.flow">
          <el-checkbox v-for="item in flowList" :key="item" :value="item.name" :label="item.name"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="使用时长：" label-width="140px">
        <el-checkbox-group v-model="applyFrom.useTime">
          <el-checkbox v-for="item in useTimeList" :key="item" :value="item.name" :label="item.name"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label-width="140px" >
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
        {name: 'IP', type: 1},
        {name: 'IMEI', type: 1},
        {name: 'IDFA', type: 1}
      ],
      areaList: [
        {value: '1', label: '大区'},
        {value: '2', label: '地市'}
      ],
      sourceList: [
        {name: '全部', type: 0},
        {name: '省公司渠道', type: 0},
        {name: '其他渠道', type: 0}
      ],
      vipTypeList: [
        {name: '全部', type: 0},
        {name: '黄金会员', type: 0},
        {name: '钻石会员', type: 0},
        {name: '钻石会员_TV尊享', type: 0}
      ],
      sexList: [
        {name: '男', type: 0},
        {name: '女', type: 0}
      ],
      ageList: [
        {name: '待补充1', type: 0},
        {name: '待补充2', type: 0}
      ],
      userActiveList: [
        {name: '世界杯', type: 0}
      ],
      flowList: [
        {name: '4G', type: 0},
        {name: 'Wi-Fi', type: 0}
      ],
      useTimeList: [
        {name: '待确认1', type: 0},
        {name: '待确认2', type: 0}
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
        useTime: []
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
    ...mapActions([
      'applyDataExtraction'
    ])
  }
};
</script>

<style lang="scss">
.apply {
  .table-container {
    display: flex;
    justify-content: center;
    .ml16 {margin-left: 16px;}
  }
  .el-form-item__content {
    display: flex !important;
    margin-right: 0;
    .form-input-medium, .el-input, .form-input-large, .el-select {
      flex: 1;
    }
  }
}
</style>
