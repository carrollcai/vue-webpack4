<template>
  <div>
    <div class="m-container">
      <div class="breadcrumb">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/system/role/management' }">我的待办</el-breadcrumb-item>
          <el-breadcrumb-item>去处理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="task-detail">
      <display-title label="安徽省日活明细下载申请" />
    </div>
    <div class="m-container">
      <div class="task-detail-content">
        <div class="task-detail-item">
          <div class="left">提交人：</div>
          <div class="right">张晓明</div>
        </div>
        <div class="task-detail-item">
          <div class="left">数据省份：</div>
          <div class="right">北京；上海；广州；深圳</div>
        </div>
        <div class="task-detail-item">
          <div class="left">数据客户端：</div>
          <div class="right">影视、音乐、善跑、灵犀</div>
        </div>
        <div class="task-detail-item">
          <div class="left">数据时间：</div>
          <div class="right">2018年5月1日</div>
        </div>
        <div class="task-detail-item">
          <div class="left">备注：</div>
          <div class="right">急需这些数据，希望申请通过</div>
        </div>
      </div>

      <audit-steps :title="'审核进度'"></audit-steps>
    </div>
    <div class="task-detail-form m-container">
      <el-form :model="form" label-width="112px" ref="approveRef" :rules="approveRules">
        <el-form-item label="审核结果：">
          <el-radio-group v-model="form.approveStatus">
            <el-radio :label="0">通过</el-radio>
            <el-radio :label="1">不通过</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="审核建议：" prop="content">
          <el-input type="textarea" v-model="form.content" placeholder="如审核不通过，请填写原因告知申请人。" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">确认审核</el-button>
          <form-cancel :path="'/task/management'">取消</form-cancel>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import DisplayTitle from 'components/task/DisplayTitle.vue';
import AuditSteps from 'components/task/AuditSteps.vue';
import { mapActions, mapState } from 'vuex';
import { textareaLimit } from '@/utils/rules.js';

export default {
  components: {
    DisplayTitle,
    AuditSteps
  },
  data() {
    return {
      approveRules: {
        content: [
          { required: true, message: '请输入审核建议', trigger: 'blur' },
          { validator: textareaLimit, trigger: 'blur' }
        ]
      },
      form: {
        approveStatus: 0,
        content: ''
      }
    };
  },
  computed: {
    ...mapState({
      taskDetail: ({ task }) => task.taskDetail
    })
  },
  beforeMount() {
    const { id } = this.$route.params;
    this.getTaskDetail({ id });
  },
  methods: {
    submitForm() {
      let params = Object.assign({}, this.form);
      this.$refs.approveRef.validate(valid => {
        if (!valid) return false;

        this.taskSubmitAudit(params);
      });
    },
    ...mapActions([
      'taskSubmitAudit',
      'getTaskDetail'
    ])
  }
};
</script>
