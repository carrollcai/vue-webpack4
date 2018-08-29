<template>
  <div class="tabs">
    <div class="tab-more" :class="isOpen ? 'blue' : ''" @click.stop="isShow">
      更多 <i class="el-icon el-icon-arrow-down" :class="isOpen ? 'el-table__expand-icon--expanded' : ''"></i>
    </div>
    <div v-if="String(isOpen) === 'true'" class="open-tabs">
      <p class="open-tabs_tab" :class="statusData === item.value ? 'blue' : ''" v-for="item in stateList" :key="item.value" @click="getState(item)">{{statusDatas}}{{item.name}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    statusData: {
      type: Number
    },
    isOpen: {
      type: Boolean
    }
  },
  data() {
    return {
      stateList: [
        {value: 6, name: '生成不成功'},
        {value: 4, name: '审核不通过'},
        {value: 5, name: '已取消'}
      ]
    };
  },
  methods: {
    isShow() {
      if (this.isOpen) {
        this.isOpen = false;
      } else {
        this.isOpen = true;
      }
    },
    getState(item) {
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
  .open-tabs_tab, .tab-more{
    cursor: pointer;
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
