<template>
  <div>
    <div class="task-three-detail">
      <div class="task-three-detail-item">
        <div class="left">商机类别：</div>
        <div class="right">{{detailData.opporTypeName}}</div>
      </div>
      <div class="task-three-detail-item">
        <div class="left">商机名称：</div>
        <div class="right">{{detailData.opporName}}</div>
      </div>
      <div class="task-three-detail-item">
        <div class="left">商机有效期：</div>
        <div class="right">{{detailData.busiValidity}}月</div>
      </div>
    </div>
    <div class="task-three-detail">
      <div class="task-three-detail-item">
        <div class="left">商机提供人员：</div>
        <div class="right">{{detailData.opId}}（{{detailData.opMobile}}）</div>
      </div>
    </div>
    <div class="task-detail-item">
      <div class="left">联系人员：</div>
      <div class="right">{{detailData.contactName}} ；{{detailData.contactGenderName}} ；{{detailData.contactMobile}} ；{{detailData.contactEmail}}</div>
    </div>
    <div class="task-detail-item">
      <div class="left">合作集团：</div>
      <div class="right">{{detailData.organizeName}}（{{detailData.organizeCode}}）;{{detailData.address}}</div>
    </div>
    <div class="task-detail-item">
      <div class="left">业务描述：</div>
      <div class="right">{{detailData.busiDesc}}</div>
    </div>
    <div class="task-detail-item">
      <div class="left">合作建议：</div>
      <div class="right">{{detailData.busiOperating}}</div>
    </div>
    <div class="task-detail-item">
      <div class="left">附件下载：</div>
      <div class="right"
        v-if="detailData.fileInputId && files.length">
        <span class="blue"
          style="margin-right: 20px;cursor:pointer;"
          v-for="item in files"
          :key="item"
          @click="downloadFile(item)">{{item.fileName}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  props: {
    detailData: JSON,
    files: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  computed: {
  },
  methods: {
    downloadFile(res) {
      this.orderDownloadFile({
        fileTypeId: res.fileTypeId,
        fileSaveName: res.fileSaveName,
        fileName: res.fileName
      });
    },
    ...mapActions([
      'orderDownloadFile'
    ])
  }
};
</script>

<style lang="less" scoped>
@import "~scss/variables.less";
.detail-container {
  background: #fff;
  padding-bottom: 40px;
  margin-top: 0px;
}
</style>
