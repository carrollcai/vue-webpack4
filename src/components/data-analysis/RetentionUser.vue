<template>
  <div class="retention-user block-containter">
    <div class="trend-header-title">上月新增用户留存率
      <el-tooltip class="item" effect="dark" content="留存率=上月留存用户数/ 上月新增用户数" placement="top-start">
        <i class="el-icon-info"></i>
      </el-tooltip>
    </div>
    <div class="retention-user-data-outer">
      <el-progress type="circle" :percentage="25"></el-progress>
      <ul class="retention-user-data">
        <li>
          <p class="retention-user-data__title">上月新增用户数</p>
          <p class="retention-user-data__num">15689701</p>
        </li>
        <li>
          <p class="retention-user-data__title">上月留存用户数</p>
          <p class="retention-user-data__num">15689701</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {

};
</script>

<style>
</style>
