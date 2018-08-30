<template>
<div>
  <div class="m-container">
    <el-form class="form-manage" ref="businessForm">
      <div class="flex">
        <el-form-item>
          <el-date-picker v-model="businessForm.date" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item class="form-query-input-width form-left-width">
          <el-input clearable v-model="businessForm.organizeNameOrCode" placeholder="合作集团/编码" />
          <!--<el-autocomplete clearable v-model="businessForm.organizeNameOrCode" :fetch-suggestions="querySearchAsync" placeholder="合作集团/编码" @select="handleSelect"></el-autocomplete>-->
        </el-form-item>
        <el-form-item class="form-query-input-width form-left-width">
          <el-input clearable v-model="businessForm.opporCodeOrName" placeholder="商机名称/编号" />
        </el-form-item>
        <el-form-item class="form-query-input-width form-left-width">
          <el-input clearable v-model="businessForm.opName" placeholder="提供人" />
        </el-form-item>
      </div>
      <div class="flex">
        <el-form-item class="form-left-width">
          <el-button type="primary" @click="searchQuery">查询</el-button>
        </el-form-item>
      </div>
    </el-form>
    <el-tabs v-model="businessForm.opporStatus" @tab-click="tabChange">
      <el-tab-pane label="全部"></el-tab-pane>
      <el-tab-pane label="待处理" :name="'1'"></el-tab-pane>
      <el-tab-pane label="已转订单" :name="'2'"></el-tab-pane>
      <el-tab-pane label="已作废" :name="'3'"></el-tab-pane>
    </el-tabs>
    </div>
    <div class="m-container table-container">
      <wm-table :source="businessList.list" :pageNo="businessForm.pageNo" :pageSize="businessForm.pageSize" :total="businessList.totalCount" @onPagination="onPagination" @onSizePagination="onSizePagination">
        <el-table-column label="商机编号" show-overflow-tooltip property="opporCode" />
        <el-table-column label="商机名称" show-overflow-tooltip property="opporName" />
        <el-table-column label="合作集团" show-overflow-tooltip property="organizeName" />
        <el-table-column label="创建时间" show-overflow-tooltip property="createDate" />
        <el-table-column label="提供人" show-overflow-tooltip property="opName" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" class="table-button" @click="handleDetail(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </wm-table>
    </div>
</div>
</template>

<script>
import WmTable from 'components/Table.vue';
import { mapState, mapActions } from 'vuex';
import moment from 'moment';
export default {
  components: {
    WmTable
  },
  computed: {
    cooperNumList() {
      if (this.cooperationGroupList) {
        return this.cooperationGroupList;
      }
    },
    ...mapState({
      cooperationGroupList: ({ business }) => business.cooperationGroupList,
      businessForm: ({ business }) => business.businessForm,
      businessList: ({ business }) => business.businessList
    })
  },
  data() {
    return {
      status: '',
      cooperNum: '',
      timeRange: '',
      organizeNameList: []
    };
  },
  beforeMount() {
    let { date, ..._params } = this.businessForm;
    if (_params.opporStatus === '0') {
      _params.opporStatus = '';
    } else {
    }
    this.getBusinessList(_params);
  },
  methods: {
    tabChange(val) {
      this.businessForm.pageNo = 1;
      this.businessForm.pageSize = 20;
      this.query();
    },
    onPagination(value) {
      this.businessForm.pageNo = value;
      this.query();
    },
    onSizePagination(value) {
      this.businessForm.pageSize = value;
      this.query();
    },
    handleDetail(row) {
      const path = `/business-manage/business-detail/${row.opporId}/0/0/0`;
      this.$router.push(path);
    },
    searchQuery() {
      this.businessForm.pageNo = 1;
      this.query();
    },
    query() {
      const params = this.businessForm;

      if (params.date !== null && params.date.length === 2) {
        params.startDate = moment(params.date[0]).format('YYYY-MM-DD');
        params.endDate = moment(params.date[1]).format('YYYY-MM-DD');
      } else {
        params.startDate = '';
        params.endDate = '';
      }
      let { date, ..._params } = this.businessForm;
      if (_params.opporStatus === '0') {
        _params.opporStatus = '';
      } else {
      }
      this.getBusinessList(_params);
    },
    async querySearchAsync(queryString, cb) {
      if (!queryString) return false;
      let params = {
        pageSize: 20,
        organizeName: queryString
      };
      await this.getCooperationGroupList(params);

      await clearTimeout(this.timeout);
      this.timeout = await setTimeout(() => {
        this.organizeNameList = this.cooperationGroupList;

        cb(this.cooperationGroupList);
      }, 1000);
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
    },
    getTimeRange(time) {
      if (time) {
        this.businessForm.startDate = time[0];
        this.businessForm.endDate = time[1];
      } else {
        this.businessForm.startDate = '';
        this.businessForm.endDate = '';
      }
    },
    ...mapActions([
      'getCooperationGroupList', 'getBusinessList'
    ])
  }
};
</script>

<style lang="scss">
@import "scss/variables.scss";
</style>
