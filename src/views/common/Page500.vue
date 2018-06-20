<template>
  <div class="error-page">
    <div class="error-body">
      <div class="error-image-block">
        <div class="error-image error-image-500"></div>
      </div>
      <div class="error-msg">
        <h1>500</h1>
        <div class="error-msg_desc">
          抱歉，服务器出错了
        </div>
        <div class="error-msg_actions">
          <!-- <router-link to="/">
            <el-button type="primary">返回首页</el-button>
          </router-link> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Page500'
};
</script>
