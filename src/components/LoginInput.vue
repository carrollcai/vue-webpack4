<template>
  <div
    class="login-input"
  >
    <div v-if="showClear" class="placeholder">{{placeholder}}</div>
    <el-input
      :type="type"
      v-model="internalValue"
      auto-complete="off"
      :placeholder="placeholder"
      ref="loginInput"
      @focus="handleFocus"
      @blur="handleBlur"
    >
    </el-input>
  </div>
</template>
<script>
export default {
  name: 'LoginInput',

  componentName: 'LoginInput',

  components: {
  },

  props: {
    value: String,
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  data() {
    return {
      internalValue: ''
    };
  },
  computed: {
    showClear() {
      return this.internalValue !== '';
    }
  },
  watch: {
    internalValue(val) {
      let value = this.getValue();
      this.$emit('input', value);
      this.$emit('change', value);
    }
  },
  methods: {
    initialize() {
      this.initializeValue();
    },

    getValue() {
      return this.internalValue;
    },

    getInitializeValue(value) {
      return this.value === undefined || this.value === null ? '' : this.value;
    },

    initializeValue() {
      this.internalValue = this.getInitializeValue(this.value);
    },

    handleFocus() {
      this.$emit('focus');
    },

    handleBlur() {
      this.$emit('blur');
    }
  },
  created() {
    this.initialize();
  },
  mounted() {
  },
  beforeDestroy() {
  }
};
</script>
<style lang="scss">
@import "scss/variables.scss";
.login-input{
  .placeholder{
    color: rgba(0, 0, 0, 0.25);
    margin-bottom: $fontWidth;
  }

  .el-input__inner{
    border: none;
    border-bottom: 1px solid rgba(163, 195, 254, 1);
    height: 24px;
    line-height: 24px;
    width: 429px;
    font-size: 18px;
    border-radius: 0;
    padding: 0;
    &:focus{
      border: none;
      border-bottom: 1px solid rgba(163, 195, 254, 1);
      outline: none;
    }
  }
}
</style>
