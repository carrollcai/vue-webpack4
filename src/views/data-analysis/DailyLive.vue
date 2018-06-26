<template>
  <div>
    <div class="m-container">
      <div class="breadcrumb">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/analysis/active' }">活跃度分析</el-breadcrumb-item>
          <el-breadcrumb-item>日活明细下载申请</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="m-container dailyL-form">
      <el-form :label-position="'right'" label-width="120px" :model="form" ref="dailyLRef" :rules="dailyLRules">
        <el-form-item label="任务名称：">
          <el-input class="form-input" type="text" v-model="form.content" placeholder="给下载申请取个名字吧" />
        </el-form-item>
        <el-form-item label="申请省份：" prop="content">
          <el-select class="form-input" v-model="form.content" placeholder="请选择要下载数据的省份">
            <!-- <el-option /> -->
          </el-select>
        </el-form-item>
        <el-form-item label="申请客户端：" prop="content">
          <el-input class="form-input" type="text" v-model="form.content" placeholder="请选择要下载数据的客户端" />
        </el-form-item>
        <el-form-item label="数据日期：" prop="content">
          <el-date-picker class="form-input" v-model="form.content" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备注：" prop="content">
          <el-input class="form-input" type="textarea" v-model="form.content" placeholder="请填写备注" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">确认</el-button>
          <form-cancel :path="'/analysis/active'">取消</form-cancel>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      dailyLRules: {
      }
    };
  },
  methods: {
    submitForm() {

    }
  }
};
</script>

<style lang="scss">
@import "scss/variables.scss";
.dailyL-form {
  margin-top: $blockWidth;
  display: flex;
  justify-content: center;
}
</style>
