<template>
  <div class="visit-datil">
    <div class="visit-title" v-if="visitDetails.visitStatus === '1' || visitDetails.visitStatus === '待审核'">
      <div class="task-detail-item">
        <div class="left">走访状态：</div>
        <div class="right">{{visitDetails.visitStatus}}</div>
      </div>
      <div class="task-detail-item">
        <div class="left">审核人：</div>
        <div class="right" v-if="visitDetails.visitAuditorCN">{{visitDetails.visitAuditorCN}}</div>
      </div>
    </div>
    <div class="visit-title" v-if="routeName === 'visit-application-detail' && (visitDetails.visitStatus === '2' || visitDetails.visitStatus === '待执行')">
      <div v-if="isExecute === 'false'" class="task-detail-item">
        <div class="left">走访状态：</div>
        <div class="right">{{visitDetails.visitStatus}}</div>
      </div>
      <div v-if="visitDetails.visitResource === 2 || visitDetails.visitResource === '2'" class="task-detail-item">
        <div class="left">指派人：</div>
        <div class="right" v-if="visitDetails.opId">{{visitDetails.opId}}</div>
      </div>
      <div v-if="visitDetails.visitResource === 2 || visitDetails.visitResource === '2'" class="task-detail-item">
        <div class="left">指派说明：</div>
        <div class="right" v-if="visitDetails.assignNote">{{visitDetails.assignNote}}</div>
      </div>
    </div>
    <div class="visit-title" v-if="routeName === 'visit-appoint-detail' && (visitDetails.visitStatus === '2' || visitDetails.visitStatus === '待执行')">
      <div v-if="visitDetails.visitResource === 2 || visitDetails.visitResource === '2'" class="task-detail-item">
        <div class="left">指派走访人：</div>
        <div class="right" v-if="visitDetails.processorCN">{{visitDetails.processorCN}}</div>
      </div>
      <div class="task-detail-item">
        <div class="left">走访状态：</div>
        <div class="right">{{visitDetails.visitStatus}}</div>
      </div>
      <div v-if="visitDetails.visitResource === 2 || visitDetails.visitResource === '2'" class="task-detail-item">
        <div class="left">指派说明：</div>
        <div class="right" v-if="visitDetails.assignNote">{{visitDetails.assignNote}}</div>
      </div>
    </div>
    <div class="visit-title" v-if="visitDetails.visitStatus === '3' || visitDetails.visitStatus === '已驳回'">
      <div class="task-detail-item">
        <div class="left">走访状态：</div>
        <div class="right">{{visitDetails.visitStatus}}</div>
      </div>
      <div class="task-detail-item">
        <div class="left">审核人：</div>
        <div class="right" v-if="visitDetails.visitAuditorCN">{{visitDetails.visitAuditorCN}}</div>
      </div>
      <div class="task-detail-item">
        <div class="left">驳回原因：</div>
        <div class="right" v-if="visitDetails.advice">{{visitDetails.advice}}</div>
      </div>
    </div>
    <div class="visit-title" v-if="visitDetails.visitStatus === '4' || visitDetails.visitStatus === '已完成'">
      <div class="task-detail-item">
        <div class="left">走访状态：</div>
        <div class="right">{{visitDetails.visitStatus}}</div>
      </div>
      <div class="task-detail-item">
        <div class="left">执行汇报：</div>
        <div class="right" v-if="visitDetails.feedback">
          <span style="display: block;">{{visitDetails.feedback}}</span>
          <p v-if="isFileInputId" class="download-style"><span v-for="item in fileArrList" :key="item" @click="dowloadFile(item.name, item.path)" class="blue">{{item.name}}</span></p>
        </div>
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
      <div class="right">{{visitDetails.visitStartTime}} ~ {{visitDetails.visitEndTime}}</div>
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
  </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  props: {
    visitDetail: {
      type: Object
    }
  },
  data() {
    return {
      routeName: this.$route.name,
      isExecute: this.$route.query.isExecute,
      fileArr: [],
      uploadData: {
        fileTypeId: 502,
        fileSaveName: '',
        fileName: ''
      }
    };
  },
  async beforeMount() {
    await this.queryFiles();
  },
  computed: {
    isFileInputId() {
      if (this.visitDetail.fileInputId) {
        console.log(this.visitDetail.fileInputId);
        return this.visitDetail.fileInputId;
      }
    },
    fileArrList() {
      if (this.fileArr) {
        return this.fileArr;
      }
    },
    visitDetails() {
      let _this = this;
      if (this.visitDetail) {
        let state = this.visitDetail.visitStatus;
        if (state === '1') {
          _this.visitDetail.visitStatus = '待审核';
        } else if (state === '2' || state === '0') {
          _this.visitDetail.visitStatus = '待执行';
        } else if (state === '3') {
          _this.visitDetail.visitStatus = '已驳回';
        } else if (state === '4') {
          _this.visitDetail.visitStatus = '已完成';
        }
        return this.visitDetail;
      }
    }
  },
  methods: {
    async queryFiles() {
      if (this.visitDetail.fileInputId) {
        await this.queryElec({
          fileInputId: this.visitDetail.fileInputId
        }).then((res) => {
          (res.data).map(item => {
            let data = {
              path: item.fileSaveName,
              name: item.fileName
            };
            this.fileArr.push(data);
          });
        });
      }
    },
    async dowloadFile(name, path) {
      this.uploadData = {
        fileTypeId: 502,
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
    background: #FAFAFA;
    .task-detail-item {
      width: 50%;
      margin-bottom: 16px;
    }
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
