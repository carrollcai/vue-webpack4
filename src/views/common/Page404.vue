<template>
  <div class="error-page">
    <div class="error-body">
      <div class="error-image-block">
        <div class="error-image error-image-404"></div>
      </div>
      <div class="error-msg">
        <h1>404</h1>
        <div class="error-msg_desc">
          抱歉，你访问的页面不存在
        </div>
        <div class="error-msg_actions">
          <router-link to="/">
            <el-button type="primary">返回首页</el-button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Page404'
};
</script>
