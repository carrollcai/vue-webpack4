<template>
  <div
    class="login-input"
    :class="{'show-placeholder': showClear}"
  >
    <transition name="el-fade-in">
      <div class="placeholder">{{showClear ? placeholder : '&nbsp;'}}</div>
    </transition>
    <el-input
      :maxlength="maxlength"
      :type="type"
      v-model="internalValue"
      auto-complete="off"
      :placeholder="placeholder"
      ref="loginInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @keyup.enter.native="handleKeyup"
    >
    </el-input>
    <slot></slot>
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
    },
    maxlength: {
      type: Number,
      default: 40
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
    },
    value(val) {
      this.initializeValue();
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
    },

    handleKeyup() {
      this.$emit('keyup');
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
  width: 100%;
  position: relative;

  .el-input{
    /* padding-top: 24px; */
  }

  &.show-placeholder{
    .el-input{
     /*  padding-top: 0; */
    }
  }

  .placeholder{
    color: rgba(0, 0, 0, 0.25);
    margin: 16px 0 $fontWidth 0;
    height: 24px;
  }

  .el-input__inner{
    border: none;
    border-bottom: 1px solid rgba(163, 195, 254, 1);
    height: 24px;
    line-height: 24px;
    width: 100%;
    font-size: 14px;
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
