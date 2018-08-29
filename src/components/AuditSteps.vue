<template>
  <div>
    <div class="audit-steps"
      :style="{'background-color': backgroundColor}">
      <div v-if="title"
        class="title">{{title}}</div>
      <div>
        <div class="flex">
          <div class="child-title"
            v-for="(item, i) in processList"
            :key="item.processId"
            :style="{'flex-basis': percent()}">
            <!-- 商机转订单特殊处理 -->
            {{!(businessToOrderId && i === 0) ? item.taskName : '商机转订单'}}
          </div>
        </div>
        <el-steps :active="activeIndex()"
          align-center>
          <el-step v-for="item in processList"
            :key="item.processId"
            :title="`${titleFilter(item)} ${taskDesc(item)}`"
            :description="item.dealResult">
          </el-step>
        </el-steps>
        <div class="flex">
          <div class="child"
            v-for="item in processList"
            :key="item.processId"
            :style="{'flex-basis': percent()}">
            <!-- 只有已签约会展示文件 -->
            <span v-if="Object.isExistArray(fileList) && hasSignStatus === Number(item.businessStatus)"
              class="blue"
              v-for="(file, k) in fileList"
              :key="k"
              @click="downloadFile(file)">
              {{file.fileName}}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/*
 * 公共的进度流程封装
 */
import { mapActions } from 'vuex';
export default {
  props: {
    backgroundColor: {
      type: String,
      default: 'rgba(250, 250, 250, 1)'
    },
    businessToOrderId: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    processList: {
      type: Array,
      default: () => []
    },
    fileList: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      hasSignStatus: 5
    };
  },
  methods: {
    titleFilter(item) {
      return item.doneDate ? item.doneDate : '';
    },
    taskDesc(item) {
      let result = '';
      if (item.hasComplete === 1) {
        result = (item.opName ? item.opName : '') + (item.businessStatusName ? item.businessStatusName : (item.businessStatus ? item.businessStatus : ''));
      }

      return result;
    },
    isNotPassed(item) {
      return item.businessStatus === '0' && !!item.dealResult;
    },
    percent() {
      return this.processList.length && parseFloat(1 / this.processList.length * 100).toFixed(4) + '%';
    },
    activeIndex() {
      // hasComplete为1代表已完成
      let index = this.processList
        .map(val => val.hasComplete)
        .lastIndexOf(1);
      return index > -1 ? index + 1 : 0;
    },
    downloadFile(obj) {
      let params = {
        fileTypeId: obj.fileTypeId,
        fileSaveName: obj.fileSaveName,
        fileName: obj.fileName
      };
      this.orderDownloadFile(params);
    },
    ...mapActions([
      'orderDownloadFile',
    ]),
  }
};
</script>

<style lang="scss" scoped>
.child-title {
  text-align: center;
  font-size: 16px;
  font-weight: bold;
}
.child {
  text-align: center;
}
.audit-steps {
  border-radius: 2px;
  // // background-color: rgba(250, 250, 250, 1);
  margin-bottom: 24px;
  margin-top: 24px;
  .title {
    height: 24px;
    line-height: 24px;
    font-size: 16px;
    font-weight: bold;
    padding: 32px 0;
    margin-left: 40px;
  }
}
</style>
