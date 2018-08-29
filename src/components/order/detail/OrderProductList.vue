<template>
  <div class="p-table"
    v-if="processList.length">
    <dl class="tHead">
      <dt class="tH01">订购产品</dt>
      <dd class="tH02 tHead-title">订单状态</dd>
    </dl>
    <dl class="tTr"
      v-for="(item, index) in processList"
      :key="index">
      <dt class="tH01">{{item.productName}}</dt>
      <dd class="tH02"
        v-if="premissionDenied(item)">
        <audit-steps v-if="item.list && item.list.length"
          background-color="#fff"
          :processList="item.list" />
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
      // processList: ({ order }) => order.processList,
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

<style>
</style>
