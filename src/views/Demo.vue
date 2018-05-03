<template>
  <div>
    <div class="demo-title">hello，welcome to Demo page！</div>
    <br>
    <div style="margin-bottom: 40px;">{{demoList}}</div>
    <div v-for="(item, index) in demoList" :key="index">
      title: <input type="text" v-model="item.title" />
    </div>

  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  computed: {
    ...mapState({
      // 注意这里的demoList和state下面对象对应
      demoList: ({ demoList }) => demoList
    })
  },
  beforeMount() {
    this.getDemo().then(() => {
      console.log(this.demoList);
    });
  },
  methods: {
    ...mapActions([
      'getDemo'
    ])
  }
};
</script>

<style lang="scss">
  @import '../assets/scss/variables.scss';
  .demo-title {
    background-color: $bg;
  }
</style>
