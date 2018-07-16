<template>
  <div>
    <div class="m-container">
      <div class="breadcrumb">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/visit/my-visit-manage' }">我的走访管理</el-breadcrumb-item>
          <el-breadcrumb-item>新建走访申请</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="m-container visit-create">
      <el-form :label-position="'right'" label-width="140px">
        <el-form-item label="走访主题：">
          <el-input v-model="createVisitFrom.visitTheme" class="form-input-medium" placeholder="请输入主题" />
        </el-form-item>
        <el-form-item label="走访公司：">
          <el-input v-model="createVisitFrom.organizeCode" class="form-input-120" placeholder="公司编码">
          </el-input>
          <div class="form-input-sep">-</div>
          <el-input v-model="createVisitFrom.organizeName" class="form-input-medium" placeholder="公司名称">
          </el-input>
          <div class="form-input-sep">-</div>
          <el-input v-model="createVisitFrom.visitAddress" class="form-input-large" placeholder="走访地址">
          </el-input>
        </el-form-item>
        <el-form-item label="走访对象：" prop="name">
          <el-input v-model="createVisitFrom.intervieweeName" maxlength="6" class="form-input-80" placeholder="姓名"></el-input>
          <div class="form-input-sep">-</div>
          <el-form-item prop="gender" style="display: inline-block;">
            <el-select class="form-input-80" placeholder="级别">
              <el-option v-for="item in levelOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <div class="form-input-sep">-</div>
          <el-form-item prop="tel" style="display: inline-block;">
            <el-input v-model="createVisitFrom.intervieweeMobile" maxlength="11" class="form-input-120" placeholder="联系电话"></el-input>
          </el-form-item>
        </el-form-item>
        <el-form-item label="我方出席人员：">
          <el-input v-model="createVisitFrom.visitPresentMembers" class="form-input-large" placeholder="可输入多个人员，用“；”隔开" />
        </el-form-item>
        <el-form-item label="走访时间：">
          <el-date-picker v-model="createVisitFrom.visitStartTime" class="form-input-medium" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" placeholder="请选择时间"></el-date-picker>
          <div class="form-input-sep">-</div>
          <el-time-picker is-range range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围"></el-time-picker>
        </el-form-item>
        <el-form-item label="走访内容：">
          <el-input v-model="createVisitFrom.visitContent" type="textarea" class="form-input-large" placeholder="请输入走访内容" />
        </el-form-item>
        <el-form-item label="涉及商机编码：">
          <el-input v-model="createVisitFrom.relOpporCode" class="form-input-medium" placeholder="请输入商机编码" />
        </el-form-item>
        <el-form-item label="问题协调：">
          <el-input v-model="createVisitFrom.problemCoordinate" type="textarea" class="form-input-large" placeholder="请输入问题协调内容" />
        </el-form-item>
        <el-form-item label="是否首客走访：">
          <el-radio v-model="createVisitFrom.isFirstVisit" :value="1" :label="1">是</el-radio>
          <el-radio v-model="createVisitFrom.isFirstVisit" :value="0" :label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="是否提交申请：">
          <el-radio :value="1" :label="1">是</el-radio>
          <el-radio :value="0" :label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="选择审核人：">
          <el-select v-model="createVisitFrom.visitAuditor" class="form-input-medium" placeholder="请选择">
            <el-option v-for="item in auditorOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitVisitApplication()">提交</el-button>
          <el-button @click="cancelVisitApplication()">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      levelOptions: [],
      auditorOptions: [],
      fromVaild: {}
    };
  },
  computed: {
    ...mapState({
      createVisitFrom: ({ visit }) => visit.createVisitFrom
    })
  },
  beforeMount() {
  },
  methods: {
    submitVisitApplication() {
      console.log(this.createVisitFrom);
      this.setCreateVisit(this.createVisitFrom).then((res) => {
        if (res.errorInfo.code === 200) {
          this.$message({message: '请求成功', type: 'success'});
        }
      });
    },
    cancelVisitApplication() {},
    ...mapActions([
      'setCreateVisit'
    ])
  }
};
</script>

<style lang="scss">
@import "scss/variables.scss";

.visit-create {
  margin-top: $blockWidth;
  display: flex;
  justify-content: center;
}
</style>
