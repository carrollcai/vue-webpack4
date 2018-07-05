<template>
  <div>
    <div class="m-container">
      <div class="breadcrumb">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/visit/my-visit-manage' }">我的走访管理</el-breadcrumb-item>
          <el-breadcrumb-item>执行处理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
    };
  },
  components: {
  },
  created() {
  },
  methods: {
    ...mapActions([
    ])
  }
};
</script>

<style lang="scss">
</style>
