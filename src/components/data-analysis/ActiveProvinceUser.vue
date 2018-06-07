<template>
  <div class="province-user block-containter">
    <div class="province-user-header">
      <div>活跃度趋势分析</div>
      <div>
        <span>查询：</span>
        <el-date-picker>

        </el-date-picker>
      </div>
    </div>
    <div class="province-user-chart">
      <Map :id="'map'" :charData="charData" :width="500" :height="400" />
    </div>
  </div>
</template>

<script>
import Map from 'components/chart/Map.vue';
export default {
  components: {
    Map
  },
  data() {
    return {
      charData: [
        {
          name: '江苏',
          value: 100
        },
        {
          name: '浙江',
          value: 200
        }
      ]
    }
  }
};
</script>
