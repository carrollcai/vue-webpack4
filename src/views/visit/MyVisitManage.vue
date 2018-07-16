<template>
<div>
  <div class="m-container">
    <el-form class="visit-form" ref="myVisitManageForm" v-model="myVisitManageFrom">
      <div class="flex">
        <el-form-item prop="date">
          <el-date-picker v-model="timeRange" @change="getTimeRange" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item class="visit-form-item__lable"></el-form-item>
        <el-form-item>
          <el-input v-model="myVisitManageFrom.organizeName" placeholder="走访公司名称"></el-input>
        </el-form-item>
        <el-form-item class="visit-form-item__lable"></el-form-item>
        <el-form-item class="visit-form-item__input">
          <el-select v-model="myVisitManageFrom.isFirstGuest" placeholder="是否首客">
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
          <el-button class="el-button--have-icon" @click.prevent="createVisitApplication" icon="el-icon-plus">新建走访申请</el-button>
        </el-form-item>
      </div>
    </el-form>
    <el-tabs v-model="myVisitManageFrom.state" @change="getState">
      <el-tab-pane label="全部"></el-tab-pane>
      <el-tab-pane label="待执行"></el-tab-pane>
      <el-tab-pane label="已完成"></el-tab-pane>
      <el-tab-pane label="待审核"></el-tab-pane>
      <el-tab-pane label="已驳回"></el-tab-pane>
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
      <el-table-column label="走访编号" property="visitCode" />
      <el-table-column label="走访时间" property="visitTime" />
      <el-table-column label="走访公司" property="organizeName" />
      <el-table-column label="是否首客" property="isFirstGuest" />
      <el-table-column label="走访状态" property="visitStatus" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="handleDetail(scope.row)">
            查看
          </el-button>
          <el-button type="text" @click="handleDetail(scope.row)">
            执行处理
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
      firstGuestOption: [{
        value: '1',
        label: '否'
      }, {
        value: '2',
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
    getTimeRange(time) {
      if (time) {
        this.myVisitManageFrom.startDate = time[0];
        this.myVisitManageFrom.endDate = time[1];
      } else {
        this.myVisitManageFrom.startDate = '';
        this.myVisitManageFrom.endDate = '';
      }
    },
    getState(value) {
      this.myVisitManageFrom.state = value;
    },
    onPagination(value) {
      this.myVisitManageFrom.pageNo = value;
      this.query();
    },
    onSizePagination(value) {
      this.myVisitManageFrom.pageSize = value;
      this.query();
    },
    handleDetail(row) {
    },
    query() {
      debugger;
      console.log(this.myVisitManageFrom);
      this.getMyVisitManageList(this.myVisitManageFrom);
    },
    createVisitApplication() {
      const path = '/visit/create-visit-application';
      this.$router.push(path);
    },
    ...mapActions([
      'getMyVisitManageList'
    ])
  }
};
</script>

<style lang="scss">
@import "scss/variables.scss";
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
