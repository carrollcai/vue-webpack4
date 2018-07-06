<template>
  <div>
    <div class="m-container">
      <div class="breadcrumb">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/order/handle-task' }">订单总览</el-breadcrumb-item>
          <el-breadcrumb-item v-if="routeType === 'sign'">签约处理</el-breadcrumb-item>
          <el-breadcrumb-item v-else-if="routeType === 'pay'">付款处理</el-breadcrumb-item>
          <el-breadcrumb-item v-else>详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="m-container o-overview-detail">
      <div class="task-detail-content">
        <audit-steps></audit-steps>
        <detail-bar v-if="routeType === 'detail'" :title="['处理结果：', '付款金额：']" :content="['已完成', '1000万元']" />
        <detail-content />
      </div>

      <div class="line"></div>

      <el-form class="handle-task-detail-form" label-width="112px" ref="assign" v-if="routeType === 'sign'" :model="assignForm" :rules="assignRules">
        <el-form-item label="处理结果：">
          <el-radio v-model="assignForm.radio" :label="1">是</el-radio>
          <el-radio v-model="assignForm.radio" :label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="签约合同：" prop="file">
          <el-upload class="upload-demo" :auto-upload="false" :on-change="fileChange" :multiple="false" :on-remove="removeFile">
            <el-button slot="trigger" size="small">
              <i class="icon-up margin-right-8"></i>上传文件</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitAssignForm()">提交</el-button>
          <form-cancel :path="'/order/handle-task'">取消</form-cancel>
        </el-form-item>
      </el-form>

      <el-form class="handle-task-detail-form" label-width="112px" v-if="routeType === 'pay'" ref="pay" :model="payForm" :rules="payRules">
        <el-form-item label="付款金额：" prop="money">
          <el-input class="form-input-medium" v-model="payForm.money" placeholder="请输入合同金额">
            <template slot="append">万元/月</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitPayForm()">提交</el-button>
          <form-cancel :path="'/order/handle-task'">取消</form-cancel>
        </el-form-item>
      </el-form>

      <div class="task-submit-button" v-if="routeType === 'detail-sign' || routeType === 'detail-pay'">
        <el-button type="primary" @click="submitSign">签约处理</el-button>
      </div>

    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import AuditSteps from 'components/task/AuditSteps.vue';
import DetailContent from 'components/order/DetailContent.vue';
import DetailBar from 'components/order/DetailBar.vue';

export default {
  data() {
    const fileCheck = (rule, value, callback) => {
      if (!this.assignForm.file) {
        callback(new Error('请上传文件'));
      } else {
        callback();
      }
    };
    return {
      payForm: {
        money: null
      },
      payRules: {
        money: [
          { required: true, message: '请输入合同金额', trigger: 'blur' }
        ]
      },
      assignForm: {
        radio: 1,
        file: null
      },
      assignRules: {
        file: [
          { validator: fileCheck }
        ]
      },
      // routeType和id不能直接通过在created创建，因为created生命周期里创建的对象不再Vue实例劫持对象里。
      routeType: '',
      id: ''
    };
  },
  components: {
    AuditSteps,
    DetailContent,
    DetailBar
  },
  created() {
    this.routeChange();
  },
  beforeMount() {
    this.getHandleTaskDetail(this.id);
  },
  watch: {
    '$route'() {
      this.routeChange();
    }
  },
  methods: {
    routeChange() {
      this.routeType = this.$route.params.type;
      this.id = this.$route.params.id;
    },
    fileChange(file, fileList) {
      if (fileList.length > 1) {
        fileList.splice(0, 1);
      }
      this.assignForm.file = file.raw;
      // 校验文件
      this.$refs.assign.validateField('file');
    },
    removeFile(files, fileList) {
      this.assignForm.file = null;
    },
    submitAssignForm() {
      this.$refs.assign.validate(valid => {
        if (!valid) return false;

        this.uploadOrderHandleTask(this.assignForm);

        // 不能利用submit事件，因为会重复提交一次action
        // this.$refs.upload.submit();
        // let fileData = new FormData();
        // fileData.append('radio', this.assignForm.radio);
        // fileData.append('file', this.assignForm.file);

        // 先获取附件id再上传。
        // this.getNewFileInputId().then(() => {
        //   this.uploadOrderHandleTask(fileData);
        // });
      });
    },
    submitSign() {
      // 跳转到付款的详情
      let path = '';
      if (this.routeType === 'detail-sign') {
        path = `/order/handle-task/sign/${this.id}`;
      } else {
        path = `/order/handle-task/pay/${this.id}`;
      }
      this.$router.push(path);
    },
    submitPayForm() {
      this.$refs.pay.validate(valid => {
        if (!valid) return false;

        this.uploadOrderHandleTask();
      });
    },
    ...mapActions([
      'getNewFileInputId',
      'getHandleTaskDetail',
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
.handle-task-detail-form {
  & .el-form-item__label {
    color: rgba(0, 0, 0, 0.45);
  }
}
.margin-right-8 {
  margin-right: 8px;
}
</style>
