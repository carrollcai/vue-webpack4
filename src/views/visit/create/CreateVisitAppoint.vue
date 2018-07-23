<template>
  <div>
    <div class="m-container">
      <div class="breadcrumb">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/visit/visit-appoint' }">我的走访管理</el-breadcrumb-item>
          <el-breadcrumb-item>新建走访指派</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="m-container visit-create">
      <el-form :label-position="'right'" label-width="140px" :model="createAppointFrom"  ref="visitRef" :rules="createAppointVaild">
        <el-form-item label="走访主题：" required prop="visitTheme">
          <el-input v-model="createAppointFrom.visitTheme" class="form-input-medium" placeholder="请输入主题" />
        </el-form-item>
        <el-form-item label="合作企业：" required>
          <el-form-item prop="organizeName" style="display:inline-block;">
            <el-autocomplete class="form-input-half" v-model="createAppointFrom.organizeName" :fetch-suggestions="querySearchAsync" placeholder="合作名称" @select="handleSelect" :trigger-on-focus="false" />
          </el-form-item>
          <div class="form-input-sep">-</div>
          <el-form-item prop="visitAddress" style="display:inline-block;">
            <el-input maxlength="50" class="form-input-half" v-model="createAppointFrom.visitAddress" placeholder="办公地址"></el-input>
          </el-form-item>
        </el-form-item>
        <!-- <el-form-item label="合作企业：">
          <el-input v-model="createAppointFrom.organizeName" class="form-input-medium" placeholder="企业名称">
          </el-input>
          <div class="form-input-sep">-</div>
          <el-input v-model="createAppointFrom.visitAddress" class="form-input-large" placeholder="企业地址">
          </el-input>
        </el-form-item> -->
        <el-form-item label="走访对象：" required prop="intervieweeName">
          <el-input v-model="createAppointFrom.intervieweeName" maxlength="6" class="form-input-80" placeholder="姓名"></el-input>
          <div class="form-input-sep">-</div>
          <el-form-item style="display: inline-block;" prop="intervieweeMobile">
            <el-input v-model="createAppointFrom.intervieweeMobile" maxlength="11" class="form-input-120" placeholder="联系电话"></el-input>
          </el-form-item>
        </el-form-item>
        <el-form-item label="我方出席人员：" required prop="visitPresentMembers">
          <el-input v-model="createAppointFrom.visitPresentMembers" class="form-input-large" placeholder="可输入多个人员，用“；”隔开" />
        </el-form-item>
        <el-form-item label="走访时间：" required>
          <el-form-item style="width: 230px; float: left;" prop="visitTime">
            <el-date-picker v-model="visitTime" @change="getTimeVisit" class="form-input-medium" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" placeholder="请选择时间"></el-date-picker>
          </el-form-item>
          <div class="form-input-sep" style="width: 30px; float: left;">-</div>
          <el-form-item style="width: 230px; float: left;" prop="visitTimeHour">
          <el-time-picker :disabled="checkTime" v-model="timeRange" @change="getTimeRange" format="HH:mm:ss" value-format="HH:mm:ss" is-range range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围"></el-time-picker>
          </el-form-item>
        </el-form-item>
        <el-form-item label="走访内容：" required prop="visitContent">
          <el-input v-model="createAppointFrom.visitContent" type="textarea" class="form-input-large" placeholder="请输入走访内容" />
        </el-form-item>
        <el-form-item label="涉及商机编码：" required  prop="relOpporCode">
          <el-select
            v-model="createAppointFrom.relOpporCode"
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
        <el-form-item label="问题协调：" required prop="problemCoordinate">
          <el-input v-model="createAppointFrom.problemCoordinate" type="textarea" class="form-input-large" placeholder="请输入问题协调内容" />
        </el-form-item>
        <el-form-item label="是否首客走访：" label-width="140px" required prop="isFirstVisit">
          <el-radio v-model="createAppointFrom.isFirstVisit" :value="1" :label="1">是</el-radio>
          <el-radio v-model="createAppointFrom.isFirstVisit" :value="0" :label="0">否</el-radio>
        </el-form-item>
        <div class="hr"></div>
        <el-form-item label="指派审核人：" prop="processor">
          <el-select
            v-if="processorList"
            v-model="createAppointFrom.processor"
            filterable placeholder="请选择">
            <el-option
              v-for="item in processorList"
              :key="item.operatorId"
              :label="item.staffName"
              :value="item.operatorId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="指派说明：" required prop="assignNote">
          <el-input v-model="createAppointFrom.assignNote" type="textarea" class="form-input-large" placeholder="请输入指派说明" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitVisitApplication()">立即指派</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import { PAGE_NO, PAGE_SIZE } from '@/config/index.js';
import { checkPhone, textareaLimit, textareaMaxLimit } from '@/utils/rules.js';

export default {
  data() {
    const textLimit = (rule, value, callback) => {
      if (String(value).trim() === '') {
        callback(new Error('输入内容不能为空'));
      } else if (String(value).trim().length > 25) {
        callback(new Error(`输入内容字符不能超过25`));
      } else {
        callback();
      }
    };
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
      createAppointVaild: {
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
          { validator: textareaLimit, trigger: 'blur' }
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
        processor: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        isFirstVisit: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        isSubmit: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        visitTime: [
          { required: true, type: 'date', message: '请输入', trigger: 'blur' }
        ],
        visitTimeHour: [
          { required: true, type: 'date', message: '请输入', trigger: 'blur' }
        ],
        assignNote: [
          { required: true, message: '请输入', trigger: 'blur' },
          { validator: textareaMaxLimit, trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
    ...mapState({
      createAppointFrom: ({ visit }) => visit.createAppointFrom,
      productList: ({ order }) => order.productList,
      orderOrganizeAddressList: ({ order }) => order.orderOrganizeAddressList,
      assignHandlers: ({ order }) => order.assignHandlers,
      registerList: ({ visit }) => visit.registerList,
      processorList: ({ visit }) => visit.regionManageList
    })
  },
  beforeMount() {
    this.getRelOpporId('');
    this.getAssignhandler();
    this.queryRegionManager({});
  },
  methods: {
    relOpporValue(value) {
      let _this = this;
      this.registerList.filter(function(element, index, self) {
        if (element.opporCode === value) {
          _this.createAppointFrom.relOpporId = element.opporId + '';
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
    getTimeVisit(time) {
      this.checkTime = false;
    },
    getTimeRange(time) {
      if (time) {
        this.createAppointFrom.visitStartTime = this.visitTime + ' ' + time[0];
        this.createAppointFrom.visitEndTime = this.visitTime + ' ' + time[1];
      } else {
        this.createAppointFrom.visitStartTime = '';
        this.createAppointFrom.visitEndTime = '';
      }
    },
    handleSelect(item) {
      this.createAppointFrom.visitAddress = item.orgAddress;
      this.orderOrganizeAddressList.filter(function(element, index, self) {
        if (element.organizeCode === item.organizeCode) {
          this.createAppointFrom.organizeId = element.organizeId + '';
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
    submitVisitApplication() {
      let _this = this;
      this.$refs.visitRef.validate((valid) => {
        if (valid) {
          _this.addCreateAppiont(this.createAppointFrom);
        } else {
          return false;
        }
      });
    },
    ...mapMutations({
      updateOrderCreate: 'ORDER_UPDATE_CREATE'
    }),
    ...mapActions([
      'addCreateAppiont',
      'getOrganizeAddress',
      'queryProductByCodeOrName',
      'getAssignhandler',
      'queryRegisterList',
      'queryRegionManager'
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
    width: 960px;
    margin-right: -190px;
    border-bottom: 1px #e5e5e5 solid;
    margin-right: -170px;
  }
}
</style>
