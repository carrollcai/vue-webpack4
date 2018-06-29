<template>
<div class="base-info">
  <h3>产品基本信息</h3>
  <ul class="b-i-list">
    <li><span>产品名称：</span>咪咕纪念版Kindle</li>
    <li><span>产品价格：</span>888元</li>
    <li><span>产品类别：</span>政企市场产品</li>
    <li><span>负责人员：</span>张小明-运营支撑部门-运营人员</li>
    <li><span>负责介绍：</span>张小明-运营支撑部门-运营人员</li>
  </ul>
</div>
</template>

<script>
// import { mapState, mapActions } from 'vuex';

export default {
  components: {
  },
  computed: {
  },
  data() {
    return {
    };
  },
  methods: {
  }
};
</script>

<style lang="scss">
.base-info {
  margin-top: 16px;
  padding-bottom: 30px;
  background: #fff;
  h3 {
    height: 48px;
    line-height: 48px;
    font-size: 16px;
    color: #262626;
    margin: 0;
    border-bottom: 1px #E6E6E6 solid;
    padding: 0px 32px;
  }
  .b-i-list {
    display: flex;
    flex-flow: wrap;
    padding: 10px 32px 0;
    li {
      height: 28px;
      line-height: 28px;
      font-size: 14px;
      width: 33%;
      color: #262626;
      span {
        color: #c0c0c0;
      }
    }
  }
}
</style>
