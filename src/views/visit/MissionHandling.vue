<template>
  <div class="mission-handle-management">
    <div class="m-container query-block">
      <el-form class="visit-form">
        <div class="flex">
          <el-form-item>
            <el-date-picker
              v-model="rangeDate"
              type="daterange"
              :editable="false"
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>

          <el-form-item class="visit-form-item__input visit-form-item__lable" prop="staffName">
            <el-input v-model="organizeName" placeholder="走访公司名称" clearable/>
          </el-form-item>

          <el-form-item class="visit-form-item__input visit-form-item__lable" prop="code">
            <el-select v-model="organizeType" clearable placeholder="是否首客">
              <el-option v-for="(item, i) in ORGANIZE_TYPE" :key="i" :value="item.value" :label="item.label" />
            </el-select>
          </el-form-item>
        </div>
        <div class="flex visit-query-btns">
          <el-form-item>
            <el-button type="primary" @click="query">查询</el-button>
          </el-form-item>
        </div>
      </el-form>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="待审核" name="first"></el-tab-pane>
        <el-tab-pane label="待评价" name="second"></el-tab-pane>
        <el-tab-pane label="已审核" name="third"></el-tab-pane>
        <el-tab-pane label="已评价" name="forth"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="m-container visit-list">
      <wm-table
        :source="handleVisits.list"
        :total="handleVisits.totalCount"
        :pageNo="pageNo"
        :pageSize="pageSize"
        @onPagination="onPagination"
        @onSizePagination="onSizePagination">
        <el-table-column label="走访编号" property="organizeCode" />
        <el-table-column label="走访时间" property="organizeName">
        </el-table-column>
        <el-table-column label="走访公司" property="organizeType" >
        </el-table-column>
        <el-table-column label="走访发起人" property="provinceId">
        </el-table-column>
        <el-table-column label="是否首客" property="managerName" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" v-if="activeName === 'first'" @click="toHandle(scope.row)">
              审核
            </el-button>
            <el-button type="text" v-if="activeName === 'second'" @click="toHandle(scope.row)">
              评价
            </el-button>
            <el-button type="text" v-if="activeName === 'third'" @click="toDetail(scope.row)">
              查看
            </el-button>
            <el-button type="text" v-if="activeName === 'forth'" @click="toDetail(scope.row)">
              查看评价
            </el-button>
          </template>
        </el-table-column>
      </wm-table>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import { createHelpers } from 'vuex-map-fields';

import WmTable from 'components/Table.vue';

const { mapFields } = createHelpers({
  getterType: 'getVisitField',
  mutationType: 'updateVisitField'
});

export default {
  components: {
    WmTable
  },
  data() {
    return {
      STATUS: {
        'first': '-1',
        'second': '1',
        'third': '0',
        'forth': '0'
      }
    };
  },
  computed: {
    ...mapState({
      handleVisits: ({ visit }) => visit.handleVisits
    }),
    ...mapFields([
      'handleQuery.rangeDate',
      'handleQuery.organizeName',
      'handleQuery.businessStatus',
      'handleQuery.pageNo',
      'handleQuery.pageSize',
      'handleQuery.activeName'
    ])
  },
  beforeMount() {
    this.query();
  },
  methods: {
    onPagination(value) {
      this.pageNo = value;
      this.query();
    },
    onSizePagination(value) {
      this.pageSize = value;
      this.query();
    },
    toDetail(row) {
      this.$router.push(`/visit/mission/handle-detail/${row.organizeId}`);
    },
    toHandle(row) {
      this.$router.push(`/visit/mission/handle/${row.organizeId}`);
    },
    handleAudit(row) {
      this.$router.push(`/group-customer/audit/${row.organizeId}/${row.taskInsId}`);
    },
    getParams() {
      const {
        pageNo,
        pageSize,
        organizeName
      } = this;

      let rangeDate = this.rangeDate || ['', ''];

      return {
        startDate: rangeDate[0],
        endDate: rangeDate[1],
        pageNo,
        pageSize,
        organizeName,
        businessStatus: this.STATUS[this.activeName]
      };
    },
    query() {
      this.queryHandleVisits(this.getParams());
    },
    handleClick() {
      this.pageNo = 1;
      this.query();
    },
    ...mapActions([
      'queryHandleVisits'
    ])
  }
};
</script>
<style lang="scss">
@import "scss/variables.scss";
.mission-handle-management{
  .visit-form-item__lable {
    margin-left: $blockWidth;
  }
  .visit-form {
    display: flex;
    align-items: center;
  }
  .visit-form-item__input {
    width: $inputWidthQuery;
  }

  .visit-query-btns{
    margin-left: 40px;
  }
  .visit-list{
    margin-top: $blockWidth;
  }
}
</style>
