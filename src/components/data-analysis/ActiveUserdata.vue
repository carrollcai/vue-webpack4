<template>
  <div class="active-userdata block-containter">
    <div class="userdata-header">
      <el-radio-group v-model="dateType" size="small">
        <el-radio-button :label="0">按日</el-radio-button>
        <el-radio-button :label="1">按月</el-radio-button>
      </el-radio-group>
      <span>5-26日关键指标（展示“T-2”日关键指标数据，”T“为今日数据）</span>
    </div>
    <div class="userdata-main">
      <div class="userdata-main-left">
        <div class="userdata-main-left__outer">
          <div class="userdata-main-left__title ellipsis">日活跃用户数</div>
          <div class="userdata-main-left__num">728972</div>
        </div>
        <div class="userdata-main-left__outer">
          <div class="userdata-main-left__title ellipsis">日活跃用户数</div>
          <div class="userdata-main-left__num">728972</div>
        </div>
        <div class="userdata-main-left__outer">
          <div class="userdata-main-left__title ellipsis">移动IP用户/非移动IP用户</div>
          <div class="userdata-main-left__num">24255/21333</div>
        </div>
        <div class="userdata-main-left__outer">
          <div class="userdata-main-left__title ellipsis">日活跃用户数</div>
          <div class="userdata-main-left__num">728972</div>
        </div>
      </div>
      <div class="userdata-main-right">
        <div class="userdata-main-right__chart">
          <Pie :id="'mountNode'" :charData="charData" :width="200" :height="200" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pie from 'components/chart/Pie.vue';

export default {
  data() {
    return {
      dateType: 0,
      charData: [{
        item: '事例一',
        count: 40
      }, {
        item: '事例二',
        count: 21
      }, {
        item: '事例三',
        count: 17
      }, {
        item: '事例四',
        count: 13
      }, {
        item: '事例五',
        count: 9
      }]
    };
  },
  components: {
    Pie
  },
  beforeMount() {

  },
  beforeUpdate() {
    this.test();
  },
  methods: {
  }
};
</script>
