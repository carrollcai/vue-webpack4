<template>
  <div id="orgTree">
  </div>
</template>
<script>
export default {
  name: 'OrgTree',
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },
  data() {
    return {

    };
  },
  methods: {
    init() {
    }
  }
};
</script>
<style lang="scss">

</style>
