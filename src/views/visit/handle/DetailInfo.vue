<template>
  <el-form label-width="130px" class="visit-mission-detail-info">
    <el-form-item label="走访主题">
      {{visit.visitTheme}}
    </el-form-item>

    <el-form-item label="走访公司">
      {{visit.organizeName}}；{{visit.visitAddress}}
    </el-form-item>

    <el-form-item label="走访对象">
      {{visit.intervieweeName}}； {{visit.intervieweeMobile}}
    </el-form-item>

    <el-form-item label="我方出席人员">
      {{visit.visitPresentMembers}}
    </el-form-item>

    <el-form-item label="走访时间">
      {{date}} {{time}}
    </el-form-item>

    <el-form-item label="走访内容" class="too-long-content">
      {{visit.visitContent}}
    </el-form-item>

    <el-form-item label="涉及商机编码">
      {{visit.relOpporCode}}
    </el-form-item>

    <el-form-item label="问题协调" class="too-long-content">
      {{visit.problemCoordinate}}
    </el-form-item>

    <el-form-item label="是否首客走访">
      {{visit.isFirstVisit === '1' ? '是' : '否'}}
    </el-form-item>

    <template v-if="visit.visitStatus === ''">
      <div class="line"></div>

      <el-form-item label="执行汇报">
        {{visit.name}}
      </el-form-item>

      <el-form-item label="上传附件">
        <span v-for="(file, index) in files" :key="index" @click="handleDownload(file)" class="file-name">
          {{file.fileName + (index === files.length - 1 ? '' : '；')}}
        </span>
      </el-form-item>
    </template>
  </el-form>
</template>
<script>
import {mapActions} from 'vuex';
export default {
  name: 'VisitDetailInfo',
  props: {
    visit: {
      typeL: Object,
      dafault() {
        return {};
      }
    }
  },
  data() {
    return {
      files: [],
      date: '',
      time: ''
    };
  },
  watch: {
    visit(newVal) {
      this.initFiles();
      this.initTime(newVal);
    }
  },
  methods: {
    initTime(visit) {
      if (visit.visitStartTime && visit.visitEndTime) {
        let start = visit.visitStartTime.split(' ');
        let end = visit.visitEndTime.split(' ');
        this.date = start[0];
        this.time = `${start[1]} - ${end[1]}`;
      } else {
        this.date = '';
        this.time = '';
      }
    },
    handleDownload(file) {
      this.downloadUplodFile({
        fileTypeId: file.fileTypeId,
        fileSaveName: file.fileSaveName,
        fileName: file.fileName
      });
    },
    initFiles() {
      const that = this;
      if (that.visit.fileInputId) {
        that.queryElec({
          fileInputId: (that.visit.fileInputId)
        }).then((res) => {
          if (res.data && res.data.length) {
            that.files = res.data;
          } else {
            that.files = [];
          }
        });
      }
    },
    ...mapActions([
      'queryElec',
      'downloadUplodFile'
    ])
  }
};
</script>
<style lang="scss">
.visit-mission-detail-info{
  .line{
    height: 1px;
    border-top: 1px solid rgba(229, 229, 229, 1);
    margin: 2px 0 24px 0;
  }

  .too-long-content{
    .el-form-item__content{
      word-break: break-all;
    }
  }
}
</style>
