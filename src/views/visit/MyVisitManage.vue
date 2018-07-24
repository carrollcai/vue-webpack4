<template>
<div>
  <div class="m-container">
    <el-form class="visit-form" ref="myVisitManageForm" v-model="myVisitManageFrom">
      <div class="flex">
        <el-form-item prop="date">
          <el-col>
            <el-date-picker v-model="timeRange" @change="getTimeRange" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00','23:59:59']">
            </el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item class="visit-form-item__lable"></el-form-item>
        <el-form-item>
          <el-input v-model="myVisitManageFrom.organizeName" clearable placeholder="走访公司名称"></el-input>
        </el-form-item>
        <el-form-item class="visit-form-item__lable"></el-form-item>
        <el-form-item class="visit-form-item__input">
          <el-select v-model="myVisitManageFrom.isFirstVisit" clearable placeholder="是否首客">
            <el-option
              v-for="item in firstGuestOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="flex">
        <el-form-item class="visit-form-item">
          <el-button type="primary" @click="query">查询</el-button>
        </el-form-item>
        <el-form-item class="visit-form-item">
          <el-button class="el-button--have-icon" @click.prevent="createVisit" icon="el-icon-plus">新建走访申请</el-button>
        </el-form-item>
      </div>
    </el-form>
    <el-tabs v-model="visitStatus" @tab-click="getState">
      <el-tab-pane label="全部" name=""></el-tab-pane>
      <el-tab-pane label="待执行" name="2"></el-tab-pane>
      <el-tab-pane label="已完成" name="4"></el-tab-pane>
      <el-tab-pane label="待审核" name="1"></el-tab-pane>
      <el-tab-pane label="已驳回" name="3"></el-tab-pane>
    </el-tabs>
  </div>
  <div class="m-container table-container">
    <wm-table
      :source="myVisitManageList.list"
      :total="myVisitManageList.totalCount"
      :pageNo="myVisitManageFrom.pageNo"
      :pageSize="myVisitManageFrom.pageSize"
      @onPagination="onPagination"
      @onSizePagination="onSizePagination">
      <el-table-column label="走访编号" property="visitCode" width="180"/>
      <el-table-column label="走访时间" property="visitStartTime" />
      <el-table-column label="走访公司" property="organizeName" show-overflow-tooltip />
      <el-table-column label="是否首客" property="isFirstVisit" :formatter="isFirstVisitFn" />
      <el-table-column label="走访状态" property="visitStatus" :formatter="visitStatusFn" />
      <el-table-column label="操作" width="230">
        <template slot-scope="scope">
          <el-button type="text" @click="viewDetail(scope.row, false)">
            查看
          </el-button>
          <el-button v-if="scope.row.visitStatus === '2' || scope.row.visitStatus === '0'" type="text" @click="viewDetail(scope.row, true)">
            执行处理
          </el-button>
          <el-button v-if="scope.row.visitStatus === '0'" type="text" @click="createVisit(scope.row)">
            修改
          </el-button>
          <el-button v-if="scope.row.visitStatus === '0'" type="text" @click="deleteVisite(scope.row)">
            删除
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
    ...mapState({
      myVisitManageFrom: ({ visit }) => visit.myVisitManageFrom,
      myVisitManageList: ({ visit }) => visit.myVisitManageList
    })
  },
  data() {
    return {
      timeRange: '',
      visitStatus: '',
      firstGuestOption: [{
        value: '0',
        label: '否'
      }, {
        value: '1',
        label: '是'
      }]
    };
  },
  watch: {
    status(newValue) {
    }
  },
  beforeMount() {
    this.query();
  },
  methods: {
    isFirstVisitFn(row, clo, value) {
      if (value === '0') {
        return '否';
      } else {
        return '是';
      }
    },
    visitStatusFn(row, clo, value) {
      if (value === '1') {
        return '待审核';
      } else if (value === '2' || value === '0') {
        return '待执行';
      } else if (value === '3') {
        return '已驳回';
      } else {
        return '已完成';
      }
    },
    getTimeRange(time) {
      if (time) {
        this.myVisitManageFrom.visitStartTime = time[0];
        this.myVisitManageFrom.visitEndTime = time[1];
      } else {
        this.myVisitManageFrom.visitStartTime = '';
        this.myVisitManageFrom.visitEndTime = '';
      }
    },
    getState(value) {
      if (value.name !== '') {
        if (value.name === '2') {
          this.myVisitManageFrom.visitStatus = ['0', '2'];
        } else {
          this.myVisitManageFrom.visitStatus = [value.name];
        }
      } else {
        this.myVisitManageFrom.visitStatus = [];
      }
      this.query();
    },
    onPagination(value) {
      this.myVisitManageFrom.pageNo = value;
      this.query();
    },
    onSizePagination(value) {
      this.myVisitManageFrom.pageSize = value;
      this.query();
    },
    viewDetail(row, execution) {
      let path = `/visit/visit-application-detail/${row.visitId}?isExecute=${execution}&point=false`;
      this.$router.push(path);
    },
    query() {
      this.getMyVisitManageList(this.myVisitManageFrom);
    },
    createVisit(row) {
      let path = '/visit/create-visit-application';
      if (row.visitId) {
        path = `/visit/create-visit-application/${row.visitId}`;
      }
      this.$router.push(path);
    },
    async deleteVisite(row) {
      await this.deleteVisitApp({visitId: row.visitId});
      this.query();
    },
    ...mapActions([
      'getMyVisitManageList',
      'deleteVisitApp'
    ])
  }
};
</script>

<style lang="scss">
@import "scss/variables.scss";
.table-container {
  .el-button + .el-button {margin-left: 0}
}
.visit-form-item__lable {
  margin-left: $blockWidth;
}
.visit-form {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.visit-form-item__input {
  width: $inputWidthQuery;
}
.visit-form-item {
  margin-left: $formWidth;
}
</style>
