<template>
  <div class="tabs">
    <div :class="opened==='true' ? 'tab-more blue' : 'tab-more'" @click.stop="isShow">
      更多 <i class="el-icon el-icon-arrow-down" :class="opened === 'true' ? 'el-table__expand-icon--expanded' : ''"></i>
    </div>
    <div v-if="opened === 'true'" class="open-tabs">
      <p :class="statusData === item.value ? 'blue' : ''" v-for="item in stateList" :key="item.value" @click="getState(item)">{{statusDatas}}{{item.name}}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    statusData: {
      type: Number
    }
  },
  data() {
    return {
      open: (this.statusData === 4 || this.statusData === 5) ? 'true' : 'false',
      index: null,
      stateList: [
        {value: 3, name: '审核不通过'},
        {value: 4, name: '已取消'}
      ]
    };
  },
  computed: {
    opened() {
      return this.open;
    }
  },
  methods: {
    isShow() {
      this.open = this.open === 'true' ? 'false' : 'true';
    },
    getState(item) {
      this.index = item.value;
      this.$emit('getStateFn', item.value);
    }
  }
};
</script>
<style lang="scss">
.tab-bar {
  margin: 0;
  padding: 0;
  height: 16px;
  position: relative;
  color: #303133;
  .el-table__expand-icon--expanded {
    transform: rotate(180deg);
  }
  .blue {color: #3778FF;}
  .el-tabs__nav-wrap::after {
    display: none;
  }
}
.tabs {
  position: absolute;
  top: 0;
  left: 30%;
  width: 120px;
  height: 38px;
  background: #fff;
  z-index: 10;
  .tab-more {
    text-align: center;
    line-height: 38px;
  }
  .tab-more:hover {
    color: #3778FF;
  }
}
.open-tabs {
  width: 120px;
  padding: 15px 0;
  box-shadow: 0 0 3px #999;
  border-radius: 2px;
  background: #fff;
  p {
    height: 30px;
    line-height: 30px;
    padding: 0 15px;
    text-align: center;
  }
  p:hover {
    color: #3778FF;
  }
}
</style>
