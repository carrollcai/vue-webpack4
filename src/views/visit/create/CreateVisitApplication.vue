<template>
  <div>
    <div class="m-container">
      <div class="breadcrumb">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/visit/my-visit-manage' }">我的走访管理</el-breadcrumb-item>
          <el-breadcrumb-item>{{visitId && visitId > 0 ? '编辑' : '新建'}}走访计划</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="m-container visit-create">
      <el-form :label-position="'right'" :model="createVisitFrom" ref="visitRef" :rules="createVisitVaild">
        <el-form-item label="走访主题：" label-width="140px" required prop="visitTheme">
          <el-input maxlength="25" v-model="createVisitFrom.visitTheme" :disabled="visitId && visitId > 0" class="form-input-medium" placeholder="请输入主题" />
        </el-form-item>
        <el-form-item label="走访公司：" label-width="140px" required>
          <el-form-item prop="organizeName">
            <el-input maxlength="25" v-model="createVisitFrom.organizeName" :disabled="visitId && visitId > 0" class="form-input-260" style=" margin-right: 20px;" placeholder="集团名称"></el-input>
            <!-- <el-autocomplete class="form-input-half" v-model="createVisitFrom.organizeName" :fetch-suggestions="querySearchAsync" placeholder="集团名称" @select="handleSelect" :trigger-on-focus="false" /> -->
          </el-form-item>
          <div class="form-input-sep">-</div>
          <el-form-item prop="visitAddress">
            <el-input maxlength="50" v-model="createVisitFrom.visitAddress" class="form-input-260" style=" margin-right: 20px;" placeholder="办公地址"></el-input>
          </el-form-item>
        </el-form-item>
        <el-form-item label="走访对象：" label-width="140px" required>
          <el-form-item prop="intervieweeName">
            <el-input maxlength="50" v-model="createVisitFrom.intervieweeName" class="form-input-half" placeholder="姓名"></el-input>
          </el-form-item>
          <div class="form-input-sep">-</div>
          <el-form-item prop="intervieweeMobile">
            <el-input v-model="createVisitFrom.intervieweeMobile" maxlength="11" class="form-input-260" style=" margin-right: 20px;" placeholder="联系电话"></el-input>
          </el-form-item>
        </el-form-item>
        <el-form-item label="我方出席人员：" label-width="140px" required prop="visitPresentMembers">
          <el-input maxlength="50" v-model="createVisitFrom.visitPresentMembers" class="form-input-large" placeholder="可输入多个人员，用“;”隔开" />
        </el-form-item>
        <el-form-item label="计划走访时间：" label-width="140px" required>
          <el-form-item prop="visitTime">
            <el-date-picker v-model="createVisitFrom.visitTime" @change="getTimeVisit" class="form-input-medium form-input-half" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" placeholder="请选择时间" :editable="false"></el-date-picker>
          </el-form-item>
          <div class="form-input-sep">-</div>
          <el-form-item prop="timeRange">
            <el-time-picker class="form-input-260" style="margin-top: 5px;" :disabled="checkTime" v-model="createVisitFrom.timeRange" @change="getTimeRange" format="HH:mm:ss" value-format="HH:mm:ss" is-range start-placeholder="开始时间" end-placeholder="结束时间" :editable="false" />
          </el-form-item>
        </el-form-item>
        <el-form-item label="涉及商机编码：" label-width="140px" prop="relOpporCode">
          <el-autocomplete
            class="form-input-260"
            v-model="createVisitFrom.relOpporCode"
            :fetch-suggestions="getRelOpporId"
            placeholder="涉及商机编码"
            :value-key="opporId"
            @select="relOpporValue"
            :trigger-on-focus="false" />
          <!-- <el-select
            v-model="createVisitFrom.relOpporCode"
            @change="relOpporValue"
            filterable placeholder="请选择">
            <el-option
              v-for="item in registerList"
              :key="item.opporCode"
              :label="item.id"
              :value="item.opporCode">
            </el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item label="走访内容：" label-width="140px" prop="visitContent">
          <el-input :maxlength="500" v-model="createVisitFrom.visitContent" type="textarea" class="form-input-large" placeholder="请输入走访内容" />
        </el-form-item>
        <el-form-item label="问题协调：" label-width="140px" prop="problemCoordinate">
          <el-input :maxlength="500" v-model="createVisitFrom.problemCoordinate" type="textarea" class="form-input-large" placeholder="请输入问题协调内容" />
        </el-form-item>
        <el-form-item label="是否首客走访：" label-width="140px" required prop="isFirstVisit">
          <el-radio style="margin-top: 14px;" v-model="createVisitFrom.isFirstVisit" :value="1" :label="1">是</el-radio>
          <el-radio style="margin-top: 14px;" v-model="createVisitFrom.isFirstVisit" :value="0" :label="0">否</el-radio>
        </el-form-item>
        <el-form-item label-width="140px" >
          <el-button type="primary" @click="query()">提交</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import mixins from './mixins';
import { mapState, mapActions, mapMutations } from 'vuex';
export default {
  mixins: [mixins],
  data() {
    return {
      localBusinessList: [],
      visitId: Number(this.$route.params.id),
      timeout: null,
      checkTime: true,
      levelOptions: [],
      auditorOptions: [],
      fromVaild: {},
      pointAuditor: [],
      codeValue: []
    };
  },
  computed: {
    ...mapState({
      createVisitFrom: ({ visit }) => visit.createVisitFrom,
      productList: ({ order }) => order.productList,
      orderOrganizeAddressList: ({ order }) => order.orderOrganizeAddressList,
      assignHandlers: ({ order }) => order.assignHandlers,
      registerList: ({ visit }) => visit.registerList,
      visitAppointDetail: ({ visit }) => visit.visitAppointDetail,
      processorList: ({ visit }) => visit.regionManageList,
      getProcessorList: ({ visit }) => visit.getProcessorList
    })
  },
  async beforeMount() {
    this.queryRegionManager({});
    this.queryProcessors({});
    this.getAssignhandler();
    if (this.visitId && this.visitId > 0) {
      await this.queryVisitAppointDetail({visitId: this.visitId}).then(() => {
        let start = this.visitAppointDetail.visitStartTime;
        let end = this.visitAppointDetail.visitEndTime;
        if (start) {
          this.checkTime = false;
          this.createVisitFrom.visitTime = start;
          if (end) {
            let arr = [start.split(' ')[1], end.split(' ')[1]];
            this.createVisitFrom.timeRange = arr;
          }
        }
        this.createVisitFrom.isFirstVisit = this.visitAppointDetail.isFirstVisit ? Number(this.visitAppointDetail.isFirstVisit) : 0;
        this.createVisitFrom.visitTheme = this.visitAppointDetail.visitTheme;
        this.createVisitFrom.organizeId = this.visitAppointDetail.organizeId;
        this.createVisitFrom.organizeName = this.visitAppointDetail.organizeName;
        this.createVisitFrom.visitAddress = this.visitAppointDetail.visitAddress;
        this.createVisitFrom.intervieweeName = this.visitAppointDetail.intervieweeName;
        this.createVisitFrom.intervieweeMobile = this.visitAppointDetail.intervieweeMobile;
        this.createVisitFrom.visitPresentMembers = this.visitAppointDetail.visitPresentMembers;
        this.createVisitFrom.visitContent = this.visitAppointDetail.visitContent;
        this.createVisitFrom.relOpporId = this.visitAppointDetail.relOpporId;
        this.createVisitFrom.relOpporCode = this.visitAppointDetail.relOpporCode;
        this.createVisitFrom.problemCoordinate = this.visitAppointDetail.problemCoordinate;
        this.createVisitFrom.visitEndTime = this.visitAppointDetail.visitEndTime;
        this.createVisitFrom.visitStartTime = this.visitAppointDetail.visitStartTime;
      });
    }
  },
  beforeDestroy() {
    // 组件注销的时候，需要清空表单数据
    this.clearApplicationCreate();
  },
  methods: {
    /* connectOrganize() {
      const isSelected = val => val.organizeName === this.createVisitFrom.organizeName || val.organizeCode === this.createVisitFrom.organizeName;
      let selectedObj = this.localBusinessList.filter(isSelected)[0];
      if (selectedObj) {
        return true;
      } else {
        this.$message.error('集团不存在');
        return false;
      }
    }, */
    getTimeVisit(time) {
      this.checkTime = false;
    },
    getTimeRange(time) {
      if (time) {
        this.createVisitFrom.visitStartTime = this.createVisitFrom.visitTime + ' ' + time[0];
        this.createVisitFrom.visitEndTime = this.createVisitFrom.visitTime + ' ' + time[1];
      } else {
        this.createVisitFrom.visitStartTime = '';
        this.createVisitFrom.visitEndTime = '';
      }
    },
    relOpporValue(element) {
      this.registerList.filter((item, index, array) => {
        if (item.opporCode === element.value) {
          this.createVisitFrom.relOpporId = item.opporId;
        }
      });
    },
    async getRelOpporId(item, cb) {
      let data = {
        opporCode: item,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      };
      await this.queryRegisterList(data);

      await clearTimeout(this.timeout);
      this.timeout = await setTimeout(() => {
        this.registerList = this.registerList.map(val => Object.assign(val, { value: val.opporCode }));
        cb(this.registerList);
      }, 1000);
    },
    /* handleSelect(item) {
      this.createVisitFrom.visitAddress = item.orgAddress;
      this.orderOrganizeAddressList.filter(function(element, index, self) {
        if (element.organizeCode === item.organizeCode) {
          this.createVisitFrom.organizeId = element.organizeId + '';
        }
      }, this);
      this.updateOrderCreate({ address: item.orgAddress });
    },
    async querySearchAsync(queryString, cb) {
      if (!queryString.trim()) return false;
      let params = {
        pageSize: this.pageSize,
        organizeName: queryString
      };

      await this.getOrganizeAddress(params);

      await clearTimeout(this.timeout);
      this.timeout = await setTimeout(() => {
        this.localBusinessList = this.orderOrganizeAddressList;
        cb(this.orderOrganizeAddressList);
      }, 1000);
    }, */
    query() {
      let { visitTime, timeRange, ...params } = this.createVisitFrom;
      delete params.organizeId;
      delete params.visitAuditor;
      delete params.isSubmit;
      this.$refs.visitRef.validate((valid) => {
        if (valid) {
          if (this.visitId > 0) {
            params.visitId = this.visitId;
            this.editVisitApp(params);
          } else {
            this.addCreateVisit(params);
          }
        } else {
          return false;
        }
      });
    },
    cancel() {
      this.$router.push({path: '/visit/my-visit-manage'});
    },
    ...mapMutations({
      clearApplicationCreate: 'APPLICATION_CREATE'
    }),
    ...mapActions([
      'addCreateVisit',
      // 'getOrganizeAddress',
      'getAssignhandler',
      'queryRegisterList',
      'queryVisitAppointDetail',
      'editVisitApp',
      'queryRegionManager',
      'queryProcessors'
    ])
  }
};
</script>

<style lang="scss" src="./style.scss"></style>
