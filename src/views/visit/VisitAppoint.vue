<template>
<div>
  <div class="m-container">
    <el-form class="visit-form" ref="myVisitManageForm" v-model="myVisitForm">
      <div class="flex">
        <el-form-item prop="date">
          <el-date-picker v-model="timeRange" @change="getTimeRange" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item class="visit-form-item__lable"></el-form-item>
        <el-form-item class="visit-form-item__input">
          <el-input v-model="appointVisitForm.organizeName" placeholder="走访公司名称" />
        </el-form-item>
        <el-form-item class="visit-form-item__lable"></el-form-item>
        <el-form-item class="visit-form-item__input">
          <el-select v-model="appointVisitForm.isFirstGuest" placeholder="是否首客">
            <el-option
              v-for="item in firstGuestOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="visit-form-item__lable"></el-form-item>
        <el-form-item class="visit-form-item__input">
          <el-input v-model="appointVisitForm.isFirstVisit" placeholder="指派走访人" />
        </el-form-item>
      </div>
      <div class="flex">
        <el-form-item class="visit-form-item">
          <el-button type="primary" @click="query">查询</el-button>
        </el-form-item>
        <el-form-item class="visit-form-item">
          <el-button class="el-button--have-icon" @click.prevent="createVisitApplication" icon="el-icon-plus">新建走访指派</el-button>
        </el-form-item>
      </div>
    </el-form>
    <el-tabs v-model="visitStatus" @tab-click="getState">
      <el-tab-pane label="全部" name=""></el-tab-pane>
      <el-tab-pane label="待执行" name="2"></el-tab-pane>
      <el-tab-pane label="已执行" name="4"></el-tab-pane>
    </el-tabs>
   </div>
   <div class="m-container table-container">
    <wm-table
      :source="appointVisitList.list"
      :total="appointVisitList.totalCount"
      :pageNo="appointVisitForm.pageNo"
      :pageSize="appointVisitForm.pageSize"
      @onPagination="onPagination"
      @onSizePagination="onSizePagination">
      <el-table-column label="走访编号" property="visitCode" width="180" />
      <el-table-column label="走访时间"  property="visitStartTime" width="180" />
      <el-table-column label="走访公司" property="organizeName" show-overflow-tooltip />
      <el-table-column label="指派走访人" property="visitStatus"  width="210"/>
      <el-table-column label="是否首客"  property="isFirstVisit" width="90" :formatter="isFirstVisitFn" />
      <el-table-column label="走访状态"  property="visitStatus" width="90" :formatter="visitStatusFn" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="viewDetail(scope.row, false)">
            查看
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
      appointVisitForm: ({ visit }) => visit.appointVisitForm,
      appointVisitList: ({ visit }) => visit.appointVisitList
    })
  },
  data() {
    return {
      timeRange: '',
      visitStatus: '',
      myVisitForm: {},
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
      console.log(value);
      if (value === '0') {
        return '否';
      } else {
        return '是';
      }
    },
    visitStatusFn(row, clo, value) {
      if (value === '1') {
        return '待审核';
      } else if (value === '2') {
        return '待执行';
      } else if (value === '3') {
        return '已驳回';
      } else {
        return '已完成';
      }
    },
    getTimeRange(time) {
      if (time) {
        this.appointVisitForm.visitStartTime = time[0];
        this.appointVisitForm.visitEndTime = time[1];
      } else {
        this.appointVisitForm.visitStartTime = '';
        this.appointVisitForm.visitEndTime = '';
      }
    },
    onPagination(value) {
      this.appointVisitForm.pageNo = value;
      this.query();
    },
    onSizePagination(value) {
      this.appointVisitForm.pageSize = value;
      this.query();
    },
    getState(value) {
      if (value.name !== '') {
        this.appointVisitForm.visitStatus = [value.name];
      } else {
        this.appointVisitForm.visitStatus = [];
      }
      this.query();
    },
    viewDetail(row, execution) {
      let path = `/visit/visit-appoint-detail/${row.visitId}?isExecute=${execution}&point=true`;
      this.$router.push(path);
    },
    query() {
      console.log(this.appointVisitForm);
      this.getAppointVisitList(this.appointVisitForm);
    },
    createVisitApplication() {
      const path = '/visit/create-visit-appoint';
      this.$router.push(path);
    },
    ...mapActions([
      'getAppointVisitList'
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
  width: 135px;
}
.visit-form-item {
  margin-left: $formWidth;
}
</style>
