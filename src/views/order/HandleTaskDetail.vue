<template>
  <div>
    <div class="m-container">
      <div class="breadcrumb">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/order/overview' }">订单总览</el-breadcrumb-item>
          <el-breadcrumb-item>订单详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="m-container o-overview-detail">
      <div class="task-detail-content">
        <audit-steps></audit-steps>

        <detail-content />
      </div>

      <div class="line">

      </div>

      <el-form>
        <el-form-item label="处理结果：">
          <el-radio v-model="form.radio" :label="1">是</el-radio>
          <el-radio v-model="form.radio" :label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="上传文件：">
          <el-upload class="upload-demo" ref="upload" :before-upload="beforeUpload" :auto-upload="false" :on-change="fileChange" :multiple="false" :on-remove="removeFile">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">提交</el-button>
          <form-cancel :path="'/order/handle-task'">取消</form-cancel>
        </el-form-item>

      </el-form>
      <div class="task-submit-button">
        <el-button type="primary" @click="submitSign">签约处理</el-button>
      </div>

    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import AuditSteps from 'components/task/AuditSteps.vue';
import DetailContent from 'components/order/DetailContent.vue';

export default {
  data() {
    return {
      form: {
        radio: 1,
        file: null
      }
    };
  },
  components: {
    AuditSteps,
    DetailContent
  },
  methods: {
    fileChange(files, fileList) {
      if (fileList.length > 1) {
        fileList.splice(0, 1);
      }
      this.form.file = files.raw;
    },
    removeFile(files, fileList) {
      this.form.file = null;
    },
    submitSign() {
      //
    },
    submitForm() {
      // 不能利用submit事件，因为会重复提交一次action
      // this.$refs.upload.submit();
      let fileData = new FormData();
      fileData.append('radio', this.form.radio);
      fileData.append('file', this.form.file);

      this.uploadOrderHandleTask(fileData);
    },
    ...mapActions([
      'uploadOrderHandleTask'
    ])
  }
};
</script>

<style lang="scss">
.o-overview-detail {
  margin-top: 16px;
}
.line {
  margin-top: 20px;
  margin-bottom: 20px;
  width: 100%;
  border: 1px solid rgba(229, 229, 229, 1);
}
</style>
