<template>
<div>
  <div class="m-container">
    <el-form class="visit-form" ref="myVisitManageForm" v-model="myVisitForm">
      <div class="flex">
        <el-form-item prop="date">
          <el-date-picker style="width: 230px !important;" v-model="timeRange" @change="getTimeRange" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期">
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
    <!-- <el-tabs v-model="" @tab-click="getState">
      <el-tab-pane
        v-for="item in visitStatusList"
        :key="item.name"
        :label="item.label"
        :name="item.name"
      >
      </el-tab-pane>
    </el-tabs> -->
   </div>
   <div class="m-container table-container">
    <wm-table
      :source="appointVisitList.list"
      :total="appointVisitList.totalCount"
      :pageNo="appointVisitForm.pageNo"
      :pageSize="appointVisitForm.pageSize"
      @onPagination="onPagination"
      @onSizePagination="onSizePagination">
      <el-table-column label="走访编号" property="visitCode" />
      <el-table-column label="走访时间" property="visitTime" />
      <el-table-column label="走访公司" property="organizeName" />
      <el-table-column label="指派走访人" property="visitStatus" />
      <el-table-column label="是否首客" property="isFirstVisit" />
      <el-table-column label="走访状态" property="visitStatus" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="handleDetail(scope.row)">
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
      myVisitForm: {},
      firstGuestOption: [{
        value: '1',
        label: '否'
      }, {
        value: '2',
        label: '是'
      }],
      visitStatusList: [
        {
          name: '0',
          label: '全部'
        },
        {
          name: '1',
          label: '待执行'
        },
        {
          name: '2',
          label: '已执行'
        }
      ]
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
      this.myVisitManageFrom.visitStatus = [value.name];
    },
    handleDetail(row) {
      const path = '/visit/visit-appoint-detail/' + row.visitId;
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
