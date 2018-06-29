<template>
  <div>
    <div class="m-container">
      <div class="breadcrumb">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/business-manage/business' }">商机总览</el-breadcrumb-item>
          <el-breadcrumb-item>商机详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <detail-head></detail-head>
    <detail-body></detail-body>
    <div class="pl">
      <el-button type="primary">转订单</el-button>
      <el-button plain>分派</el-button>
      <el-button plain>作废</el-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import DetailHead from 'components/business/DetailHead.vue';
import DetailBody from 'components/business/DetailBody.vue';
export default {
  components: {
    DetailHead,
    DetailBody
  },
  data() {
    return {
      form: {
        approveStatus: 0
      }
    };
  },
  beforeMount() {
    this.getBusinessDetail();
  },
  computed: {
    ...mapState({
      businessDetail: ({ business }) => business.businessDetail
    })
  },
  methods: {
    ...mapActions([
      'getBusinessDetail'
    ])
  }
};
</script>

<style lang="scss">
@import "scss/variables.scss";
.pl {
    padding: 0px 0px 40px 135px;
    background: #fff;
}
</style>
