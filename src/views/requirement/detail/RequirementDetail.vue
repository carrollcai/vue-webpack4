<template>
  <div class="requirement-detail">
    <div class="m-container">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/requirement/manage' }">需求创建管理</el-breadcrumb-item>
        <el-breadcrumb-item>查看</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="m-container info-block">
      <detail-info :requirement="requirement" v-model="files"></detail-info>
      <!-- 已处理 -->
      <el-form class="handle-detail" v-if="requirement.reqStatus === '2'"
        label-width="86px"
        >
        <!-- 投诉、日常 -->
        <template v-if="requirement.reqType !== '2'">
          <el-form-item label="处理人">
            {{requirement.processor}}
          </el-form-item>
          <el-form-item label="处理方式" v-if="requirement.reqType === '1'">
            {{requirement.handleTypeName}}
          </el-form-item>
          <el-form-item label="处理方案" v-if="requirement.handleType !== '2'">
            {{requirement.reqScheme}}
          </el-form-item>
        </template>

        <!-- 物料 -->
        <template v-if="requirement.reqType === '2'">
          <el-form-item label="物料">
            <span v-for="(file, index) in files" :key="index" @click="handleDownload(file)" class="file-name">
              {{file.fileName + (index === files.length - 1 ? '' : '；')}}
            </span>
          </el-form-item>
        </template>
        <el-form-item label="备注" v-if="requirement.handleType !== '2'">
          {{requirement.processorRemark}}
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import mixins from './mixins';
export default {
  name: 'RequirementDetail',
  mixins: [mixins],
  data() {
    return {
      files: []
    };
  },
  methods: {
    handleDownload(file) {
      this.downloadUplodFile({
        fileTypeId: file.fileTypeId,
        fileSaveName: file.fileSaveName,
        fileName: file.fileName
      });
    }
  }
};
</script>
<style lang="scss">
@import '@/assets/scss/variables.scss';
.requirement-detail{
  .info-block{
    margin-top: 16px;
  }

  .handle-detail{
    background-color: #FAFAFA;
    padding: 24px 72px 24px 0;

    .el-form-item{
      margin-bottom: 0;
    }
  }
  .file-name{
    cursor: pointer;
    color: $primary-color;
    min-width: 50px;
    border-bottom: 1px solid $primary-color;
    margin-right: 16px;
  }
}
</style>
