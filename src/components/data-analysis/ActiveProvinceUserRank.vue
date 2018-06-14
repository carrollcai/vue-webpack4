<template>
  <div class="p-user-rank">
    <div>日活排名情况：</div>

    <div class="dailyLive-rank">
      <el-scrollbar style="height: 100%;">
        <li class="dailyLive-rank-item" v-for="(item, i) in provinceUserList" :key="i">
          <div class="dailyLive-rank__circle" :style="{backgroundColor: filterTop3(i)}">
            {{i + 1}}
          </div>
          <div class="dailyLive-rank__name">
            {{item.name}}
          </div>
          <el-progress :style="{width: `${calcPercentWidth(item.value)}px`}" :percentage="100" :show-text="false" :stroke-width="10" :status="i <= 2 ? 'exception' : ''"></el-progress>
          <div class="dailyLive-rank__num">
            {{item.value}}
          </div>
        </li>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
const defaultWidth = 160;
export default {
  props: {
    provinceUserList: Array
  },
  data() {
    const maxNum = this.provinceUserList[0] ? this.provinceUserList[0].value : 10000;
    return {
      maxNum
    };
  },
  methods: {
    calcPercentWidth(val) {
      return parseInt(val / this.maxNum * defaultWidth);
    },
    filterTop3(i) {
      return i <= 2 ? '#FF5A57' : '#6C9CFF';
    }
  }
};
</script>

<style lang="scss">
@import "scss/variables.scss";
.p-user-rank {
  min-width: 300px;
  padding-top: 32px;
}
.dailyLive-rank {
  height: 450px;
  margin: $blockWidth 0 0;
  padding: 0;
  list-style: none;
}
.dailyLive-rank-item {
  display: flex;
  align-items: center;
  zoom: 1;
  margin-top: $blockWidth;
}
.dailyLive-rank__circle {
  color: #fff;
  background-color: #f5f5f5;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  height: 20px;
  line-height: 20px;
  width: 20px;
  text-align: center;
}
.dailyLive-rank__name {
  margin: 0 4px 0 $blockWidth;
  width: 42px;
}
.dailyLive-rank__num {
  margin-left: $blockWidth;
}
</style>
