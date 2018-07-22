\<template>
  <div>
    <div class="m-container">
      <div class="breadcrumb">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/visit/my-visit-manage' }">我的走访管理</el-breadcrumb-item>
          <el-breadcrumb-item>执行处理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="m-container visit-execute-process">
      <div>
        <handle-bar :title="['走访状态：', '审核人：']" :content="['待审核', '张三疯']" />
        <handle-content />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import HandleBar from 'components/visit/HandleBar.vue';
import HandleContent from 'components/visit/HandleContent.vue';

export default {
  data() {
    return {
      forwarderPerson: [],
      form: {
        forwarder: ''
      }
    };
  },
  components: {
    HandleBar,
    HandleContent
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
.visit-execute-process {
  margin-top: 16px;
}
.handle-visit-execute-process {
  & .el-form-item__label {
    color: rgba(0, 0, 0, 0.45);
  }
}
.margin-right-8 {
  margin-right: 8px;
}
.visit-execute-body {
  border-radius: 2px;
  background-color: #fafafa;
  padding: 12px 12px;
}
</style>
