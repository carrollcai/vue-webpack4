<template>
<div>
  <div class="m-container">
    <el-form class="task-form" ref="businessForm">
      <div class="flex">
        <el-form-item>
          <el-date-picker v-model="businessForm.date" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" style="width: 225px" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']">
          </el-date-picker>
        </el-form-item>

        <el-form-item class="task-form-item__input group-form-item__lable">
          <el-autocomplete clearable v-model="businessForm.organizeNameOrCode" :fetch-suggestions="querySearchAsync" placeholder="合作集团/编码" @select="handleSelect"></el-autocomplete>
        </el-form-item>
        <el-form-item class="task-form-item__input group-form-item__lable">
          <el-input clearable v-model="businessForm.opporCode" placeholder="商机编码" />
        </el-form-item>
      </div>
      <div class="flex">
        <el-form-item class="task-form-item group-form-item__lable">
          <el-button type="primary" @click="query">查询</el-button>
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
        <el-table-column label="商机描述" show-overflow-tooltip property="busiDesc" />
        <el-table-column label="合作集团" show-overflow-tooltip property="organizeName" />
        <el-table-column label="创建时间" show-overflow-tooltip property="createDate" />
        <el-table-column label="联系人" show-overflow-tooltip property="contactName" />
        <el-table-column label="处理人" show-overflow-tooltip property="processor" />
        <el-table-column label="处理结果" property="opporStatusName" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleDetail(scope.row)">
              详情
            </el-button>
          </template>
        </el-table-column>
      </wm-table>
    </div>
</div>
</template>

<script>
import WmTable from 'components/Table.vue';
import { mapState, mapActions } from 'vuex';
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
    query() {
      const params = this.businessForm;

      if (params.date !== null && params.date.length === 2) {
        params.startDate = params.date[0];
        params.endDate = params.date[1];
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

.group-form-item__lable {
  margin-left: $blockWidth;
}
.task-header {
  margin-bottom: 16px;
}
.task-form-item__lable {
  margin-left: $blockWidth;
}
.task-form {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.task-form-item__input {
  width: $inputWidthQuery;
}
.task-form-item {
  margin-left: $formWidth;
}
</style>
