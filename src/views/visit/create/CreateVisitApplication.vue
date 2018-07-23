<template>
  <div>
    <div class="m-container">
      <div class="breadcrumb">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/visit/my-visit-manage' }">我的走访管理</el-breadcrumb-item>
          <el-breadcrumb-item>{{visitId && visitId > 0 ? '编辑' : '新建'}}走访申请</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="m-container visit-create">
      <el-form :label-position="'right'" :model="createVisitFrom" ref="visitRef" :rules="createVisitVaild">
        <el-form-item label="走访主题：" label-width="140px" required prop="visitTheme">
          <el-input v-model="createVisitFrom.visitTheme" class="form-input-medium" placeholder="请输入主题" />
        </el-form-item>
        <el-form-item label="合作企业：" label-width="140px" required>
          <el-form-item prop="organizeName" style="display:inline-block;">
            <el-autocomplete class="form-input-half" v-model="createVisitFrom.organizeName" :fetch-suggestions="querySearchAsync" placeholder="合作名称" @select="handleSelect" :trigger-on-focus="false" />
          </el-form-item>
          <div class="form-input-sep" style="display:inline-block;">-</div>
          <el-form-item prop="visitAddress" style="display:inline-block;">
            <el-input class="form-input-half" v-model="createVisitFrom.visitAddress" placeholder="办公地址"></el-input>
          </el-form-item>
        </el-form-item>
        <!-- <el-form-item label="合作企业：">
          <el-input v-model="createVisitFrom.organizeName" class="form-input-medium" placeholder="企业名称">
          </el-input>
          <div class="form-input-sep">-</div>
          <el-input v-model="createVisitFrom.visitAddress" class="form-input-large" placeholder="企业地址">
          </el-input>
        </el-form-item> -->
        <el-form-item label="走访对象：" label-width="140px" required>
          <el-form-item style="display: inline-block;" prop="intervieweeName">
            <el-input v-model="createVisitFrom.intervieweeName" class="form-input-80" placeholder="姓名"></el-input>
          </el-form-item>
          <div class="form-input-sep">-</div>
          <el-form-item style="display: inline-block;" prop="intervieweeMobile">
            <el-input v-model="createVisitFrom.intervieweeMobile" maxlength="11" class="form-input-120" placeholder="联系电话"></el-input>
          </el-form-item>
        </el-form-item>
        <el-form-item label="我方出席人员：" label-width="140px" required prop="visitPresentMembers">
          <el-input v-model="createVisitFrom.visitPresentMembers" class="form-input-large" placeholder="可输入多个人员，用“；”隔开" />
        </el-form-item>

        <el-form-item label="走访时间：">
          <el-form-item style="width: 230px; float: left;" prop="visitTime">
            <el-date-picker v-model="visitTime" class="form-input-medium" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" placeholder="请选择时间"></el-date-picker>
          </el-form-item>
          <div class="form-input-sep" label-width="140px" style="width: 30px; float: left;">-</div>
          <el-form-item style="width: 210px; float: left" prop="timeRange">
            <el-time-picker style="width: 210px;" :disabled="checkTime" v-model="timeRange" @change="getTimeRange" format="HH:mm:ss" value-format="HH:mm:ss" is-range range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围"></el-time-picker>
          </el-form-item>
        </el-form-item>
        <el-form-item label="走访内容：" label-width="140px" required prop="visitContent">
          <el-input v-model="createVisitFrom.visitContent" type="textarea" class="form-input-large" placeholder="请输入走访内容" />
        </el-form-item>
        <el-form-item label="涉及商机编码：" label-width="140px" required prop="relOpporCode">
          <el-select
            v-model="createVisitFrom.relOpporCode"
            @change="relOpporValue"
            filterable placeholder="请选择">
            <el-option
              v-for="item in registerList"
              :key="item.opporCode"
              :label="item.id"
              :value="item.opporCode">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="涉及商机编码：" required>
          <el-input v-model="createVisitFrom.relOpporCode" class="form-input-medium" placeholder="请输入商机编码" />
          <div class="form-input-sep">-</div>
          <el-input v-model="createVisitFrom.relOpporName" class="form-input-large" placeholder="请输入商机名称">
          </el-input>
        </el-form-item> -->
        <el-form-item label="问题协调：" label-width="140px" required prop="problemCoordinate">
          <el-input v-model="createVisitFrom.problemCoordinate" type="textarea" class="form-input-large" placeholder="请输入问题协调内容" />
        </el-form-item>
        <el-form-item label="是否首客走访：" label-width="140px" required prop="isFirstVisit">
          <el-radio v-model="createVisitFrom.isFirstVisit" :value="1" :label="1">是</el-radio>
          <el-radio v-model="createVisitFrom.isFirstVisit" :value="0" :label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="是否提交申请：" label-width="140px" required prop="isSubmit">
          <el-radio v-model="createVisitFrom.isSubmit" :value="1" :label="1">是</el-radio>
          <el-radio v-model="createVisitFrom.isSubmit" :value="0" :label="0">否</el-radio>
        </el-form-item>
        <div class="hr"></div>
        <el-form-item label="选择审核人：" label-width="140px" prop="visitAuditor">
          <el-select
            v-if="processorList"
            v-model="createVisitFrom.visitAuditor"
            filterable placeholder="请选择">
            <el-option
              v-for="item in processorList"
              :key="item.operatorId"
              :label="item.staffName"
              :value="item.operatorId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label-width="140px" >
          <el-button type="primary" @click="query()">提交</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import { PAGE_NO, PAGE_SIZE } from '@/config/index.js';
import { checkPhone, textLimit, textareaLimit, textareaMaxLimit } from '@/utils/rules.js';

export default {
  data() {
    return {
      visitId: Number(this.$route.params.id),
      pageNo: PAGE_NO,
      pageSize: PAGE_SIZE,
      timeout: null,
      timeRange: '',
      visitTime: '',
      checkTime: true,
      levelOptions: [],
      auditorOptions: [],
      fromVaild: {},
      pointAuditor: [],
      editValue: {
        visitId: '',
        visitTheme: '',
        organizeId: '',
        organizeName: '',
        visitAddress: '',
        intervieweeName: '',
        intervieweeMobile: '',
        visitPresentMembers: '',
        visitContent: '',
        relOpporId: '',
        relOpporCode: '',
        problemCoordinate: '',
        visitAuditor: '',
        isFirstVisit: 0,
        visitStartTime: '',
        visitEndTime: '',
        isSubmit: 0
      },
      createVisitVaild: {
        visitTheme: [
          { required: true, message: '请输入', trigger: 'blur' },
          { validator: textLimit, trigger: 'blur' }
        ],
        organizeId: [
          { required: true, message: '请输入', trigger: 'blur' },
          { validator: textLimit, trigger: 'blur' }
        ],
        organizeName: [
          { required: true, message: '请输入', trigger: 'blur' },
          { validator: textLimit, trigger: 'blur' }
        ],
        visitAddress: [
          { required: true, message: '请输入', trigger: 'blur' },
          { validator: textareaLimit, trigger: 'blur' }
        ],
        intervieweeName: [
          { required: true, message: '请输入', trigger: 'blur' },
          { validator: textLimit, trigger: 'blur' }
        ],
        intervieweeMobile: [
          { required: true, message: '请输入', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ],
        visitPresentMembers: [
          { required: true, message: '请输入', trigger: 'blur' },
          { validator: textareaLimit, trigger: 'blur' }
        ],
        visitContent: [
          { required: true, message: '请输入', trigger: 'blur' },
          { validator: textareaMaxLimit, trigger: 'blur' }
        ],
        relOpporCode: [
          { required: true, message: '请输入', trigger: 'blur' },
          { validator: textareaLimit, trigger: 'blur' }
        ],
        problemCoordinate: [
          { required: true, message: '请输入', trigger: 'blur' },
          { validator: textareaMaxLimit, trigger: 'blur' }
        ],
        visitAuditor: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        isFirstVisit: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        isSubmit: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        visitTime: [
          { type: 'date', message: '请选择日期', trigger: 'change' },
          { type: 'date', message: '请选择日期', trigger: 'blur' }
        ],
        timeRange: [
          { type: 'date', message: '请选择时间', trigger: 'change' },
          { type: 'date', message: '请选择时间', trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
    ...mapState({
      createVisitFrom: ({ visit }) => visit.createVisitFrom,
      productList: ({ order }) => order.productList,
      orderOrganizeAddressList: ({ order }) => order.orderOrganizeAddressList,
      assignHandlers: ({ order }) => order.assignHandlers,
      registerList: ({ visit }) => visit.registerList,
      p: ({ visit }) => visit.regionManageList,
      visitAppointDetail: ({ visit }) => visit.visitAppointDetail,
      processorList: ({ visit }) => visit.regionManageList
    })
  },
  async beforeMount() {
    this.queryRegionManager({});
    this.getRelOpporId('');
    this.getAssignhandler();
    if (this.visitId && this.visitId > 0) {
      await this.queryVisitAppointDetail({visitId: this.visitId}).then(() => {
        if (this.createVisitFrom.visitStartTime) {
          this.createVisitFrom.isFirstVisit = Number(this.createVisitFrom.isFirstVisit);
          this.checkTime = false;
          this.visitTime = this.createVisitFrom.visitStartTime;
        }
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
        this.createVisitFrom.visitAuditor = this.visitAppointDetail.visitAuditor;
        this.createVisitFrom.isFirstVisit = this.visitAppointDetail.isFirstVisit ? Number(this.visitAppointDetail.isFirstVisit) : 0;
        this.createVisitFrom.visitStartTime = this.visitAppointDetail.visitStartTime;
        this.createVisitFrom.visitEndTime = this.visitAppointDetail.visitEndTime;
        this.createVisitFrom.isSubmit = this.visitAppointDetail.isSubmit ? Number(this.visitAppointDetail.isSubmit) : 0;
        this.visitTime = this.visitAppointDetail.visitStartTime;
      });
    } else {
      this.createVisitFrom.visitTheme = '';
      this.createVisitFrom.organizeId = '';
      this.createVisitFrom.organizeName = '';
      this.createVisitFrom.visitAddress = '';
      this.createVisitFrom.intervieweeName = '';
      this.createVisitFrom.intervieweeMobile = '';
      this.createVisitFrom.visitPresentMembers = '';
      this.createVisitFrom.visitContent = '';
      this.createVisitFrom.relOpporId = '';
      this.createVisitFrom.relOpporCode = '';
      this.createVisitFrom.problemCoordinate = '';
      this.createVisitFrom.visitAuditor = '';
      this.createVisitFrom.isFirstVisit = 1;
      this.createVisitFrom.visitStartTime = '';
      this.createVisitFrom.visitEndTime = '';
      this.createVisitFrom.isSubmit = 1;
    }
  },
  methods: {
    getTimeVisit(time) {
      this.checkTime = false;
    },
    getTimeRange(time) {
      if (time) {
        this.createVisitFrom.visitStartTime = this.visitTime + ' ' + time[0];
        this.createVisitFrom.visitEndTime = this.visitTime + ' ' + time[1];
      } else {
        this.createVisitFrom.visitStartTime = '';
        this.createVisitFrom.visitEndTime = '';
      }
    },
    relOpporValue(value) {
      let _this = this;
      this.registerList.filter(function(element, index, self) {
        if (element.opporCode === value) {
          _this.createVisitFrom.relOpporId = element.opporId;
        }
      });
    },
    async getRelOpporId(item) {
      let data = {
        opporCode: item,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      };
      await this.queryRegisterList(data);
    },
    handleSelect(item) {
      this.createVisitFrom.visitAddress = item.orgAddress;
      this.orderOrganizeAddressList.filter(function(element, index, self) {
        if (element.organizeCode === item.organizeCode) {
          this.createVisitFrom.organizeId = element.organizeId + '';
        }
      }, this);
      this.updateOrderCreate({ address: item.orgAddress });
    },
    async queryProductAsync(queryString, cb) {
      if (!queryString.trim()) return false;
      let params = {
        pageSize: this.pageSize,
        productName: queryString
      };

      await this.queryProductByCodeOrName(params);

      await clearTimeout(this.timeout);
      this.timeout = await setTimeout(() => {
        cb(this.productList);
      }, 1000);
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
        cb(this.orderOrganizeAddressList);
      }, 1000);
    },
    query() {
      var _this = this;
      if (this.visitId > 0) {
        this.editValue = {
          visitId: this.visitId,
          visitTheme: this.createVisitFrom.visitTheme,
          organizeId: this.createVisitFrom.organizeId,
          organizeName: this.createVisitFrom.organizeName,
          visitAddress: this.createVisitFrom.visitAddress,
          intervieweeName: this.createVisitFrom.intervieweeName,
          intervieweeMobile: this.createVisitFrom.intervieweeMobile,
          visitPresentMembers: this.createVisitFrom.visitPresentMembers,
          visitContent: this.createVisitFrom.visitContent,
          relOpporId: this.createVisitFrom.relOpporId,
          relOpporCode: this.createVisitFrom.relOpporCode,
          problemCoordinate: this.createVisitFrom.problemCoordinate,
          visitAuditor: this.createVisitFrom.visitAuditor,
          isFirstVisit: this.createVisitFrom.isFirstVisit,
          visitStartTime: this.createVisitFrom.visitStartTime,
          visitEndTime: this.createVisitFrom.visitEndTime,
          isSubmit: this.createVisitFrom.isSubmit
        };
        this.$refs.visitRef.validate((valid) => {
          if (valid) {
            _this.editVisitApp(this.editValue);
          } else {
            return false;
          }
        });
      } else {
        this.$refs.visitRef.validate((valid) => {
          if (valid) {
            console.log(this.createVisitFrom);
            _this.addCreateVisit(this.createVisitFrom);
          } else {
            return false;
          }
        });
      }
    },
    ...mapMutations({
      updateOrderCreate: 'ORDER_UPDATE_CREATE'
    }),
    ...mapActions([
      'addCreateVisit',
      'getOrganizeAddress',
      'queryProductByCodeOrName',
      'getAssignhandler',
      'queryRegisterList',
      'queryVisitAppointDetail',
      'editVisitApp',
      'queryRegionManager'
    ])
  }
};
</script>

<style lang="scss">
.visit-create {
  display: flex;
  justify-content: center;
  form {
    width: 650px;
  }
  .crumb-bar {
    .el-breadcrumb {
      line-height: 48px;
    }
  }
  .hr {
    margin: 0px 32px;
    margin-bottom: 48px;
    position: relative;
  }
  .hr:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 940px;
    border-bottom: 1px #e5e5e5 solid;
    margin-right: -170px;
  }
  .el-step.is-horizontal .el-step__line {height: 1px; background: #c0c0c0}
  .el-step__head.is-process, .el-step__title.is-process {color: #8c8c8c; font-weight: 400;}
  .el-step.is-simple .el-step__arrow::before, .el-step.is-simple  .el-step__arrow:before {display: none}
  .el-step.is-simple .el-step__arrow::after, .el-step.is-simple  .el-step__arrow:after {-webkit-transform: none; transform: none; height: 1px; width: 320px;}
  .el-step__icon.is-text {border-width: 1px;}
  .creat-content {background: #fff; margin-top: 16px; min-height: 812px; height: auto;}
  .el-steps--simple {background: none;}
  .el-steps--horizontal {width: 480px; padding: 30px; margin: 0 auto;}
  .add-content {width: 460px; margin: 0 auto;}
  .demo-input-size .split {display: inline-block; width: 15px; color: #8c8c8c; text-align: center;}
  .w380 {width: 380px; margin: 0 auto;}
  .pt42 {padding-top: 42px;}
  .pb60 {padding-bottom: 60px;}
}
</style>
