<template>
  <el-form class="requirement-detail-info" label-width="130px">
    <el-form-item label="需求客户">
      {{requirement.organizeName}}
    </el-form-item>

    <el-form-item label="需求类型">
      {{requirement.reqTypeName}}
    </el-form-item>

    <template v-if="requirement.reqType !== '2'">
      <el-form-item label="需求描述">
        {{requirement.reqDesc}}
      </el-form-item>

      <el-form-item label="需求附件">
        <span v-for="(file, index) in files" :key="index" @click="handleDownload(file)" class="file-name">
          {{file.fileName + (index === files.length - 1 ? '' : '；')}}
        </span>
      </el-form-item>
    </template>

    <template v-if="requirement.reqType === '2'">
      <el-form-item label="物料名称">
        {{requirement.materialName}}
      </el-form-item>

      <el-form-item label="物料格式要求">
        {{requirement.materialSupplyType}}
      </el-form-item>

      <el-form-item label="物料使用时间">
        {{requirement.materialUseCreateTime}}-{{requirement.materialUseEndTime}}
      </el-form-item>

      <el-form-item label="物料描述">
        {{requirement.materialDesc}}
      </el-form-item>
    </template>

    <el-form-item label="联系人">
      {{requirement.contactName}}；{{requirement.contactMobile}}；{{requirement.contactEmail}}
    </el-form-item>
  </el-form>
</template>
<script>
import {mapActions} from 'vuex';
export default {
  name: 'RequirementDetailInfo',
  props: {
    requirement: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      files: []
    };
  },
  watch: {
    requirement() {
      this.initFiles();
    }
  },
  methods: {
    handleDownload(file) {
      this.downloadUplodFile({
        fileTypeId: file.fileTypeId,
        fileSaveName: file.fileSaveName,
        fileName: file.fileName
      });
    },
    initFiles() {
      const that = this;
      if (that.requirement.fileInputId) {
        that.queryElec({
          fileInputId: (that.requirement.fileInputId)
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
@import '@/assets/scss/variables.scss';
.requirement-detail-info{
  .file-name{
    cursor: pointer;
    color: $primary-color;
    min-width: 50px;
    border-bottom: 1px solid $primary-color;
    margin-right: 16px;
  }
}
</style>
