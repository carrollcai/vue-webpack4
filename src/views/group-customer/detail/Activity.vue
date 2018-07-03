<template>
  <div class="activity">
    <div class="el-steps el-steps--horizontal">
      <div class="el-step is-horizontal is-center" v-for="(item, index) in processes" :key="index">
          <div class="el-step__head is-finish">
              <div class="el-step__line">
                <i class="el-step__line-inner"></i>
              </div>
              <div class="el-step__icon is-text">
              </div>
          </div>
          <div class="el-step__main">
              <div class="el-step__title is-finish">{{formateDate(item.createDate)}}</div>
              <div class="el-step__title el-step__title_sub is-finish">{{item.opName}}{{item.taskName}}</div>
              <div class="el-step__description is-finish" v-if="item.dealResult">
                <el-popover
                  placement="top"
                  width="200"
                  v-if="item.dealResult"
                  trigger="click"
                  :content="item.dealResult">
                  <el-button  slot="reference" type="text">查看原因</el-button>
                </el-popover>
              </div>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions} from 'vuex';
import moment from 'moment';
export default {
  name: 'Activity',
  props: {
    processId: {
      type: String,
      default: ''
    }
  },
  computed: {
    processes() {
      return this.$store.getters.processes;
    }
  },
  watch: {
    processId() {
      this.init();
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      const {processId} = this;
      if (processId) {
        this.queryProcesses(processId);
      }
    },
    formateDate(date) {
      return moment(date).format('YYYY-MM-DD');
    },
    ...mapActions(['queryProcesses'])
  }
};
</script>
<style lang="scss">
.activity{
  border-radius: 2px;
  background-color: #FAFAFA;
  box-sizing: border-box;
  height: 163px;
  padding-top: 56px;

  * {
    box-sizing: border-box;
  }

  $active-color: #3778FF;

  .el-step{
    flex-basis: 25%; margin-right: 0px;
  }

  .el-step__line{
    margin: 0 8px;
    background-color: $active-color;
  }

  .el-step__icon{
    height: 12px;
    width: 12px;
    background-color: $active-color;
  }

  .el-step__line-inner{
    transition-delay: 0ms;
    border-width: 1px;
    width: 100%;
  }

  .el-step__head.is-finish{
    color: $active-color;
    border-color: $active-color;
  }

  .el-step__title{
    color: $active-color;
    word-break: break-all;
    line-height: 22px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
  }

  .el-step__title_sub{
    height: 20px;
    line-height: 20px;
    color: rgba(0, 0, 0, 0.65);
    font-size: 12px;
  }

  .el-step__description{
    color: $active-color;

    .el-button{
      height: 17px;
      line-height: 17px;
      font-size: 12px;
    }
  }
}
</style>
