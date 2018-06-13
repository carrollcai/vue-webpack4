<template>
  <div>这是Dashboard</div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  beforeMount() {
    // this.getDemo();
  },
  methods: {
    ...mapActions([
      // 'getDemo'
    ])
  }
};
</script>

<style>

</style>
