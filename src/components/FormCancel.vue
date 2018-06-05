<template>
  <el-button @click="cancel">取消</el-button>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'FormCancel',
  props: {
    path: String
  },
  methods: {
    cancel() {
      this.$confirm('您当前编辑的数据未保存！是否继续取消？', ' ', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.closeCurrentTab({
          path: this.path
        })
      }).catch(() => {
        this.$message('已取消');
      });
    },
    ...mapMutations({
      closeCurrentTab: 'ROUTE_CHANGE'
    })
  }
};
</script>