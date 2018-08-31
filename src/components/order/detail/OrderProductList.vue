<template>
  <div class="order-p-table">
    <dl class="tHead">
      <dt class="tH01">订购产品</dt>
      <dd class="tH02 tHead-title">订单状态</dd>
    </dl>
    <dl class="tTr"
      v-for="(item, index) in processList"
      :key="index">
      <dt class="tH01">您暂无权限处理~您暂无权限处理~您暂无权限处理~您暂无权限处理~您暂无权限处理~</dt>
      <dd class="tH02"
        v-if="premissionDenied(item)">
        <audit-steps v-if="item.list && item.list.length"
          background-color="#fff"
          :processList="item.list"
          :fileList="item.fileList" />
      </dd>
      <dd class="tH02 p-table-denied"
        v-if="!premissionDenied(item)">您暂无权限处理~</dd>
    </dl>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AuditSteps from 'components/AuditSteps.vue';

export default {
  components: {
    AuditSteps,
  },
  props: {
    isShowAll: {
      default: false,
      type: Boolean,
    },
    processList: {
      default: () => [],
      type: Array,
    }
  },
  computed: {
    ...mapState({
      opRegion: ({ root }) => root.currentUser.operator.opRegion,
    })
  },
  methods: {
    premissionDenied(item) {
      if (this.isShowAll) return true;

      // 如果当前用户所属归属地和流程归属地相同
      if (Number(this.opRegion) === item.companyBelong) {
        return true;
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.order-p-table {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px #eee solid;
  border-bottom: 0;
  .tH01,
  .tH02 {
    min-height: 40px; // line-height: 40px;
  }
  .tHead,
  .tTr {
    border-bottom: 1px #eee solid;
    -webkit-margin-before: 0;
    -webkit-margin-after: 0;
  }
  .tH01,
  .tHead-title {
    width: 210px;
    padding: 0 20px;
    border-right: 1px #eee solid;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .tHead-title {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .tH02 {
    flex: 1;
  }
  .tHead {
    display: flex;
    background: #f0f2f5;
    opacity: 0.8;
    text-align: center;
  }
  .tTr {
    display: flex;
  }
  .p-table-denied {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20px;
    line-height: 20px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
  }
}
</style>
