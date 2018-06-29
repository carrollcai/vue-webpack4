<template>
  <div class="m-container">
    <el-form class="o-overview-form" ref="overviewForm" :rules="overviewRules">
      <div class="flex">
        <el-form-item prop="date">
          <el-date-picker v-model="taskForm.date" type="daterange" placeholder="创建时间范围">
          </el-date-picker>
        </el-form-item>
        <el-form-item class="">
          <el-input v-model="taskForm.name" placeholder="合作集团/编码" />
        </el-form-item>
      </div>
      <div class="flex">
        <el-form-item class="task-form-item">
          <el-button type="primary" @click="query">查询</el-button>
        </el-form-item>
        <el-form-item class="role-form-item">
          <el-button class="el-button--have-icon" @click.prevent="handleCreate" icon="el-icon-plus">创建角色</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  methods: {
    query() {

    }
  }
};
</script>

<style>
</style>
