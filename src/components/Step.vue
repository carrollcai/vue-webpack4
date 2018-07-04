<template>
  <div
    class="step"
    :class="['is-' + $parent.direction]">
    <div
      class="step__head"
      :class="['is-' + currentStatus, { 'is-text': !icon }]">
      <span class="step__icon">
        <slot
          v-if="currentStatus !== 'success' && currentStatus !== 'error'"
          name="icon">
          <i v-if="icon" :class="['icon-' + icon]"></i>
          <div v-else>{{ index + 1 }}</div>
        </slot>
        <i
          v-else
          :class="['el-icon-' + (currentStatus === 'success' ? 'check' : 'close')]">
        </i>
      </span>
    </div>
    <div
      class="step__main">
      <div
        class="step__title"
        ref="title"
        :class="['is-' + currentStatus]">
        <slot name="title">{{ title }}</slot>
      </div>
    </div>
    <div
      class="step__line"
      :class="['is-' + currentStatus]">
      <i class="step__line-inner" :style="lineStyle"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Step',

  props: {
    title: String,
    icon: String,
    description: String,
    status: String
  },

  data() {
    return {
      index: -1,
      style: {},
      lineStyle: {},
      mainOffset: 0,
      isLast: false,
      internalStatus: ''
    };
  },

  beforeCreate() {
    this.$parent.steps.push(this);
  },

  computed: {
    currentStatus() {
      return this.status || this.internalStatus;
    }
  },

  methods: {
    updateStatus(val) {
      const prevChild = this.$parent.$children[this.index - 1];

      if (val > this.index) {
        this.internalStatus = this.$parent.finishStatus;
      } else if (val === this.index) {
        this.internalStatus = this.$parent.processStatus;
      } else {
        this.internalStatus = 'wait';
      }

      if (prevChild) prevChild.calcProgress(this.internalStatus);
    },

    calcProgress(status) {
      let step = 100;
      const style = {};

      style.transitionDelay = 150 * this.index + 'ms';
      if (status === this.$parent.processStatus) {
        step = 50;
      } else if (status === 'wait') {
        step = 0;
        style.transitionDelay = (-150 * this.index) + 'ms';
      }

      style.borderWidth = step ? '1px' : 0;

      this.lineStyle = style;
    },

    adjustPosition() {
      this.style = {};
      this.$parent.stepOffset = this.$el.getBoundingClientRect().width / (this.$parent.steps.length - 1);
    }
  },

  mounted() {
    const unwatch = this.$watch('index', val => {
      this.$watch('$parent.active', this.updateStatus, { immediate: true });
      unwatch();
    });
  }
};
</script>
<style lang="scss">
  @import "@/assets/scss/variables.scss";
  $active-color: $primary-color;
  $process-color: #333333;
  $icon-height: 24px;

  .step__head.is-text{
    color: #DCDCDC;
    background: #FFFFFF;
    border: 1px solid #DCDCDC;
    font-size: 14px;

    &.is-success {
      color: #FFFFFF;
      background-color: #FFFFFF;
      border-color: $active-color;
    }
    &.is-process{
      background-color: $active-color;
      border-color: $active-color;
      font-size: 14px;
      color: #FFFFFF;
    }
  }

  .step.is-horizontal, .step__line {
    display: inline-block;
  }

  .step.is-horizontal {
    display: inline-flex;
    align-items: center;
    .step__main{
      margin: 0 5px;
      padding: 0;
      font-size: 14px;
      color: #CECECE;
      &.is-success{
        color: $active-color;
      }
      &.is-process{
        color: $process-color;
      }
    }
  }

  .step__line{
    width: 50px;
    height: 2px;
    margin: 0 5px 0 0;
    border-color: inherit;
    background-color: #DCDCDC;
    &.is-horizontal{
      top: 0;
      left: 0;
    }
    &.is-success{
      background: $active-color;
    }
  }

  .steps>:last-child .step__line {
    display: none;
  }

  .step__head{
    width: $icon-height;
    height: $icon-height;
    line-height: $icon-height;
    font-size: $icon-height;
    border-radius: 50%;
    background-color: transparent;
    text-align: center;
    vertical-align: top;
  }

  .step__icon{
    display: block;
    line-height:$icon-height;
    .el-icon-check{
      font-size: 14px;
    }
  }

  .is-success {
    &.step__head{
      color: $active-color;
    }

    .step__icon{
      font-size: 14px;
      color: $active-color;
    }

    &.step__title{
      color: $active-color;
    }

    &.step__line{
      background-color: $active-color;
    }

  }

  .is-process{
    &.step__title{
      color: $process-color;
      font-weight: normal;
    }
  }

  .step__line-inner{
    border: none;
  }
</style>
