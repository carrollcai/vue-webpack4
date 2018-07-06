<template>
  <div>
    <div class="m-container">
      <div class="breadcrumb">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/visit/my-visit-manage' }">我的走访管理</el-breadcrumb-item>
          <el-breadcrumb-item>执行处理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="m-container visit-execute-process">
      <div>
        <handle-bar :title="['指派人：', '指派说明：']" :content="['张三疯', '这个会议很重要，你去一下']" />
        <handle-content />
      </div>
    </div>
    <div class="m-container">
      <div class="visit-execute-body">
        <div>
          <div class="task-detail-item">
            <div class="left">走访汇报：</div>
            <div class="right">
              <el-input class="form-input-320" resize="none" type="textarea" placeholder="简要描述走访汇报"></el-input>
            </div>
          </div>
          <div class="task-detail-item">
            <div class="left">上传附件：</div>
            <div class="right">
              <el-upload
                label="附件："
                action="">
                <el-button size="small" type="primary">+上传附件</el-button>
                <div slot="tip" class="el-upload__tip">
                  <p>1. 附件格式支持“word、excel、ppt、pdf、rar“格式</p>
                  <p>2. 附件大小不超过20M。</p>
                </div>
              </el-upload>
            </div>
          </div>
          <div class="task-detail-item">
            <div class="left">转发人：</div>
            <div class="right">
              <el-select class="form-input-medium" v-model="form.forwarder" placeholder="请选择">
                  <el-option
                  v-for="item in forwarderPerson"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                  </el-option>
              </el-select>
            </div>
          </div>
          <div class="task-detail-item">
            <div class="left">转发说明：</div>
            <div class="right">
              <el-input class="form-input-320" resize="none" type="text" placeholder="转发说明一下"></el-input>
            </div>
          </div>
          <div class="task-detail-item">
            <div class="left"></div>
            <div class="right">
              <el-button type="primary">提交</el-button>
              <el-button>取消</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import HandleBar from 'components/visit/HandleBar.vue';
import HandleContent from 'components/visit/HandleContent.vue';

export default {
  data() {
    return {
      forwarderPerson: [],
      form: {
        forwarder: ''
      }
    };
  },
  components: {
    HandleBar,
    HandleContent
  },
  created() {
  },
  methods: {
    ...mapActions([
    ])
  }
};
</script>

<style lang="scss">
.visit-execute-process {
  margin-top: 16px;
}
.handle-visit-execute-process {
  & .el-form-item__label {
    color: rgba(0, 0, 0, 0.45);
  }
}
.margin-right-8 {
  margin-right: 8px;
}
.visit-execute-body {
  border-radius: 2px;
  background-color: #fafafa;
  padding: 12px 12px;
}
</style>
