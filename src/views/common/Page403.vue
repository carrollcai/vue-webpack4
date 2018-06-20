<template>
  <div class="error-page">
    <div class="error-body">
      <div class="error-image-block">
        <div class="error-image error-image-403"></div>
      </div>
      <div class="error-msg">
        <h1>403</h1>
        <div class="error-msg_desc">
          抱歉，你无权访问该页面
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
  name: 'Page403'
};
</script>
