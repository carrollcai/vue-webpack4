<template>
  <div>
    <div class="demo-title">hello，welcome to Demo page！</div>
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
