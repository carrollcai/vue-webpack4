<template>
  <div>
    <div class="m-container">
      <div class="breadcrumb">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/visit/visit-appoint' }">走访指派</el-breadcrumb-item>
          <el-breadcrumb-item>新建走访指派</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="m-container visit-create">
      <el-form :label-position="'right'" label-width="140px" :model="createAppointFrom"  ref="visitRef" :rules="createVisitVaild">
        <el-form-item label="走访主题：" required prop="visitTheme">
          <el-input :maxlength="25" :disabled="visitId && visitId > 0" v-model="createAppointFrom.visitTheme" class="form-input-120" placeholder="请输入主题" />
        </el-form-item>
        <el-form-item label="走访公司：" label-width="140px" required prop="organizeName">
          <el-input :maxlength="25" :disabled="visitId && visitId > 0" v-model="createAppointFrom.organizeName" class="form-input-120" placeholder="集团名称"></el-input>
          <!-- <el-autocomplete class="form-input-half" v-model="createAppointFrom.organizeName" :fetch-suggestions="querySearchAsync" placeholder="集团名称" @select="handleSelect" :trigger-on-focus="false" /> -->
        </el-form-item>
        <el-form-item label="走访对象：" required prop="intervieweeName">
          <el-input :maxlength="50" v-model="createAppointFrom.intervieweeName" placeholder="姓名" class="form-input-120"></el-input>
        </el-form-item>
        <el-form-item label="计划走访时间：" label-width="140px" required prop="visitTime">
          <el-date-picker v-model="createAppointFrom.visitTime" @change="getTimeRange" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00','23:59:59']"></el-date-picker>
        </el-form-item>
        <!-- <div class="hr"></div> -->
        <el-form-item label="指派走访人：" required>
          <el-form-item class="visit-linkage">
            <multilevelLinkage
              :listData.sync="getProcessorList"
              :storeData.sync="createAppointFrom.regionData">
            </multilevelLinkage>
            <!-- <el-cascader v-if="getProcessorList"
              @change="getProcessor"
              :options="getProcessorList"
              v-model="createAppointFrom.processorData"
              :placeholder="''"
              :change-on-select="false">
            </el-cascader>
            <div class="tag-list">
              <el-tag
                :key="tag"
                v-for="tag in createAppointFrom.regionData.processorList"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)">
                {{tag}}
              </el-tag>
            </div> -->
          </el-form-item>
        </el-form-item>
        <el-form-item label="指派说明：" required prop="assignNote">
          <el-input :maxlength="500" v-model="createAppointFrom.assignNote" type="textarea" class="form-input-large" placeholder="请输入指派说明" />
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
import multilevelLinkage from '@/components/multilevelLinkage.vue';
import { mapState, mapActions, mapMutations } from 'vuex';
export default {
  mixins: [mixins],
  components: {
    multilevelLinkage
  },
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
    getTimeRange(time) {
      if (time) {
        this.createAppointFrom.visitStartTime = time[0];
        this.createAppointFrom.visitEndTime = time[1];
      } else {
        this.createAppointFrom.visitStartTime = '';
        this.createAppointFrom.visitEndTime = '';
      }
    },
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
      this.createAppointFrom.processor = this.createAppointFrom.regionData.processor;
      let { visitTime, timeRange, ...params } = this.createAppointFrom;
      this.$refs.visitRef.validate((valid) => {
        if (valid) {
          if (this.getProcessorList && this.getProcessorList.length) {
            let region = this.createAppointFrom.regionData.regionList;
            if (region && region.length <= 0) {
              this.$message({ showClose: true, message: '请选择指派人', type: 'info' });
              return false;
            }
          }
          delete params.processorData;
          delete params.regionData;
          // params.visitId = this.visitId;
          // if (!this.connectOrganize()) return false;
          this.addCreateAppiont(params).then(() => {
            this.cancel();
          });
        } else {
          return false;
        }
      });
    },
    cancel() {
      this.$router.push({path: '/visit/visit-appoint'});
    },
    ...mapMutations({
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
