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
      <el-form :label-position="'right'" label-width="140px" :model="createAppointFrom"  ref="visitRef" :rules="createVisitVaild">
        <el-form-item label="走访主题：" required prop="visitTheme">
          <el-input v-model="createAppointFrom.visitTheme" class="form-input-120" placeholder="请输入主题" />
        </el-form-item>
        <el-form-item label="走访公司：" label-width="140px" required>
          <el-form-item prop="organizeName">
            <el-input v-model="createAppointFrom.organizeName" class="form-input-120" placeholder="集团名称"></el-input>
            <!-- <el-autocomplete class="form-input-half" v-model="createAppointFrom.organizeName" :fetch-suggestions="querySearchAsync" placeholder="集团名称" @select="handleSelect" :trigger-on-focus="false" /> -->
          </el-form-item>
        </el-form-item>
        <el-form-item label="走访对象：" required prop="intervieweeName">
          <el-input v-model="createAppointFrom.intervieweeName" placeholder="姓名" class="form-input-120"></el-input>
        </el-form-item>
        <el-form-item label="走访时间：" label-width="140px" required>
          <el-form-item prop="visitTime">
            <el-date-picker v-model="createAppointFrom.visitTime" @change="getTimeVisit" class="form-input-medium form-input-half" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" placeholder="请选择时间" :editable="false"></el-date-picker>
          </el-form-item>
          <div class="form-input-sep">-</div>
          <el-form-item  prop="timeRange">
            <el-time-picker class="form-input-260" style="margin-top: 5px;" :disabled="checkTime" v-model="createAppointFrom.timeRange" @change="getTimeRange" format="HH:mm:ss" value-format="HH:mm:ss" is-range start-placeholder="开始时间" end-placeholder="结束时间" :editable="false" />
          </el-form-item>
        </el-form-item>
        <!-- <div class="hr"></div> -->
        <el-form-item label="指派走访人：" prop="processor">
          <el-select
            v-if="getProcessorList"
            v-model="createAppointFrom.processor"
            multiple
            filterable
            placeholder="请选择">
            <el-option
              v-for="item in getProcessorList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="指派说明：" required prop="assignNote">
          <el-input v-model="createAppointFrom.assignNote" type="textarea" class="form-input-large" placeholder="请输入指派说明" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitVisitApplication()">立即指派</el-button>
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
      pointAuditor: []
    };
  },
  computed: {
    ...mapState({
      createAppointFrom: ({ visit }) => visit.createAppointFrom,
      orderOrganizeAddressList: ({ order }) => order.orderOrganizeAddressList,
      registerList: ({ visit }) => visit.registerList,
      processorList: ({ visit }) => visit.regionManageList,
      getProcessorList: ({ visit }) => visit.getProcessorList
    })
  },
  beforeMount() {
    this.getRelOpporId('');
    this.queryProcessors({});
    this.getAssignhandler();
    this.queryRegionManager({});
  },
  beforeDestroy() {
    this.clearAppointCreate();
  },
  methods: {
    /* connectOrganize() {
      const isSelected = val => val.organizeName === this.createAppointFrom.organizeName || val.organizeCode === this.createAppointFrom.organizeName;
      let selectedObj = this.localBusinessList.filter(isSelected)[0];
      if (selectedObj) {
        return true;
      } else {
        this.$message.error('集团不存在');
        return false;
      }
    }, */
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
        this.createAppointFrom.visitStartTime = this.createAppointFrom.visitTime + ' ' + time[0];
        this.createAppointFrom.visitEndTime = this.createAppointFrom.visitTime + ' ' + time[1];
      } else {
        this.createAppointFrom.visitStartTime = '';
        this.createAppointFrom.visitEndTime = '';
      }
    },
    /* async querySearchAsync(queryString, cb) {
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
    submitVisitApplication() {
      let { visitTime, timeRange, ...params } = this.createAppointFrom;
      this.$refs.visitRef.validate((valid) => {
        if (valid) {
          // if (!this.connectOrganize()) return false;
          this.addCreateAppiont(params);
        } else {
          return false;
        }
      });
    },
    cancel() {
      this.$router.push({path: '/visit/visit-appoint'});
    },
    ...mapMutations({
      // updateOrderCreate: 'ORDER_UPDATE_CREATE',
      clearAppointCreate: 'APPOINT_CREATE'
    }),
    ...mapActions([
      'addCreateAppiont',
      // 'getOrganizeAddress',
      'getAssignhandler',
      'queryRegisterList',
      'queryRegionManager',
      'queryProcessors'
    ])
  }
};
</script>

<style lang="scss" src="./style.scss"></style>
