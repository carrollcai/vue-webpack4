<template>
  <div class="m-container">
  </div>
</template>

<script>
import WmTable from 'components/Table.vue';
import { mapState, mapActions } from 'vuex';
export default {
  components: {
    WmTable
  },
  computed: {
    ...mapState({})
  },
  data() {
    return {
    };
  },
  watch: {
    status(newValue) {
    }
  },
  beforeMount() {
    this.query();
  },
  methods: {
    query() {
    },
    ...mapActions([
    ])
  }
};
</script>

<style lang="scss">
@import "scss/variables.scss";
</style>
