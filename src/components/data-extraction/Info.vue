<template>
  <div class="base-info">
    <h3>数据基本信息</h3>
    <ul class="b-i-list">
      <li><span>任务名称：</span>{{ infoData.name }}</li>
      <li><span>数据日期：</span>{{infoData.extractDate}}</li>
      <li><span>用户类型：</span>{{activeData}}</li>
      <li><span>客户端：</span><label>{{infoData.clientType}}</label></li>
      <li><span>用户信息：</span><label>{{userInfoData}}</label></li>
      <li><span>省份选择：</span>{{infoData.area}}</li>
    </ul>
    <h3>数据明细设置</h3>
    <ul class="b-i-list">
      <li><span>会员类型：</span>{{infoData.memberType}}</li>
      <li><span>性别：</span>{{sexData}}</li>
      <li><span>年龄：</span>{{ageData}}</li>
      <li><span>用户行为：</span><label>{{infoData.content}}</label></li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    infoData: Object
  },
  computed: {
    sexData() {
      if (this.infoData.sex === '0') {
        return '不限';
      } else if (this.infoData.sex === '1') {
        return '男';
      } else if (this.infoData.sex === '2') {
        return '女';
      }
    },
    ageData() {
      if (this.infoData.age === '不限') {
        return '不限';
      } else if (this.infoData.age) {
        let arr = (this.infoData.age).split(';');
        let ageArr = '';
        if (arr && arr.length) {
          arr.filter((item, index, array) => {
            let ageVal = item.substring(1, item.length - 1).split(',');
            let ageStr = `${ageVal[0]}岁~${ageVal[1]}岁`;
            if (index === arr.length - 1) {
              ageArr += `${ageStr}`;
            } else {
              ageArr += `${ageStr}、`;
            }
          });
          return ageArr;
        }
      }
    },
    userInfoData() {
      if (this.infoData.mobliePhone === '1') {
        return '手机号';
      } else if (this.infoData.ip === '1') {
        return 'IP地址';
      } else if (this.infoData.imei === '1') {
        return 'IMEI号码';
      } else if (this.infoData.idfa === '1') {
        return 'IDFA号码';
      }
    },
    activeData() {
      if (this.infoData.active === '1') {
        return '活跃用户';
      } else if (this.infoData.newActive === '1') {
        return '新增活跃用户';
      } else if (this.infoData.newMember === '1') {
        return '新增会员用户';
      } else if (this.infoData.retainMember === '1') {
        return '存留会员用户';
      } else if (this.infoData.dropoutMember === '1') {
        return '流失会员用户';
      }
    }
  },

};
</script>
<style lang="scss">
.base-info {
  margin-top: 16px;
  padding-bottom: 30px;
  background: #fff;
  h3 {
    height: 48px;
    line-height: 48px;
    font-size: 16px;
    color: #262626;
    margin: 0;
    padding: 12px 32px 0;
  }
  .b-i-list {
    padding: 10px 32px 0;
    li {
      height: auto !important;
      display: flex;
      line-height: 1.5 !important;
      font-size: 14px;
      width: 33%;
      color: #262626;
      margin: 5px 0;
      span {
        min-width: 71px;
        color: #c0c0c0;
      }
    }
  }
}
</style>
