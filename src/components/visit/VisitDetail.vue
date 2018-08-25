<template>
  <div class="visit-datil">
    <div class="visit-title" v-if="visitDetails.visitResource === 1">
      <div class="task-detail-item">
        <div class="left">指派人：</div>
        <div class="right">无</div>
      </div>
      <div class="task-detail-item">
        <div class="left">走访人：</div>
        <div class="right">{{visitDetails.opId}}</div>
      </div>
      <div class="task-detail-item">
        <div class="left">走访状态：</div>
        <div class="right">{{visitDetails.visitStatusCN}}</div>
      </div>
      <div class="task-detail-item w100" v-if="visitDetails.feedback">
        <div class="left">执行汇报：</div>
        <div class="right" v-if="visitDetails.feedback">
          <span style="display: block;">{{visitDetails.feedback}}</span>
          <p v-if="isFileInputId" class="download-style"><span v-if="filesArr && filesArr.length" v-for="item in filesArr" :key="item" @click="dowloadFile(item.name, item.path)" class="blue">{{item.name}}</span></p>
        </div>
      </div>
    </div>
    <div class="visit-title" v-else>
      <div class="task-detail-item">
        <div class="left">指派人：</div>
        <div class="right">{{visitDetails.opId}}</div>
      </div>
      <div class="task-detail-item">
        <div class="left">走访人：</div>
        <div class="right">{{visitDetails.processorCN}}</div>
      </div>
      <div class="task-detail-item">
        <div class="left">走访状态：</div>
        <div class="right">{{visitDetails.visitStatusCN}}</div>
      </div>
      <div class="task-detail-item w100" v-if="visitDetails.visitStatusCN === '已取消'">
        <div class="left">驳回原因：</div>
        <div class="right" v-if="visitDetails.advice">{{visitDetails.advice}}</div>
      </div>
    </div>
    <div class="task-detail-item">
      <div class="left">走访主题：</div>
      <div class="right">{{visitDetails.visitTheme}}</div>
    </div>
    <div class="task-detail-item">
      <div class="left">走访公司：</div>
      <div class="right">{{visitDetails.organizeName}}；{{visitDetails.visitAddress}}</div>
    </div>
    <div class="task-detail-item">
      <div class="left">走访对象：</div>
      <div class="right">{{visitDetails.intervieweeName}}；{{visitDetails.intervieweeMobile}}</div>
    </div>
    <div class="task-detail-item">
      <div class="left">我方出席人员：</div>
      <div class="right">{{visitDetails.visitPresentMembers}}</div>
    </div>
    <div class="task-detail-item">
      <div class="left">走访时间：</div>
      <div class="right">{{(visitDetails.visitStartTime || '').split(' ')[0]}}<span style="margin-left: 15px"></span>{{(visitDetails.visitStartTime || '').split(' ')[1]}}-{{(visitDetails.visitEndTime || '').split(' ')[1]}}</div>
    </div>
    <div class="task-detail-item">
      <div class="left">走访内容：</div>
      <div class="right">{{visitDetails.visitContent}}</div>
    </div>
    <div class="task-detail-item">
      <div class="left">涉及商机编码：</div>
      <div class="right">{{visitDetails.relOpporCode}}</div>
    </div>
    <div class="task-detail-item">
      <div class="left">问题协调：</div>
      <div class="right">{{visitDetails.problemCoordinate}}</div>
    </div>
    <div class="task-detail-item">
      <div class="left">是否首客走访：</div>
      <div class="right">{{visitDetails.isFirstVisit === 0 || visitDetails.isFirstVisit === '0' ? '否' : '是'}}</div>
    </div>
    <div class="task-detail-item">
      <div class="left">走访评价：</div>
      <div class="right">{{visitDetails.visitEvaluate}}</div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import { FILE_TYPE_ID } from '@/config/index.js';

export default {
  props: {
    visitDetail: {
      type: Object
    },
    filesArr: {
      type: Array
    }
  },
  data() {
    return {
      routeName: this.$route.name, // 指派或者创建
      isExecute: this.$route.query.isExecute, // 详情还是执行处理
      uploadData: {
        fileTypeId: FILE_TYPE_ID.visit,
        fileSaveName: '',
        fileName: ''
      }
    };
  },
  computed: {
    isFileInputId() {
      if (this.visitDetail.fileInputId) {
        return this.visitDetail.fileInputId;
      }
    },
    visitDetails() {
      if (this.visitDetail) {
        return this.visitDetail;
      }
    }
  },
  methods: {
    async dowloadFile(name, path) {
      this.uploadData = {
        fileTypeId: FILE_TYPE_ID.visit,
        fileSaveName: path,
        fileName: name
      };
      await this.downloadUplodFile(this.uploadData);
    },
    ...mapActions([
      'queryElec',
      'downloadUplodFile'
    ])
  }
};
</script>
<style lang="scss">
.visit-datil {
  .ml15 {margin-left: 15px;}
  .visit-title {
    display: flex;
    flex-wrap: wrap;
    background: #FAFAFA;
    .task-detail-item {
      width: 50%;
      margin-bottom: 16px;
    }
    .w100 {width: 100% !important;}
  }
  .task-detail-item {
    .left {
      min-width: 120px;
    }
    .right {
      word-break: break-all;
    }
  }
  .download-style {
    display: block;
    span {
      display: block;
    }
  }
}
</style>
