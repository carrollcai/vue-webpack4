<template>
  <div class="customer-overview">
    <div class="m-container">
      <el-form class="group-form">
        <div class="flex">
          <el-form-item class="group-form-item__input">
            <el-select v-model="organizeType" clearable placeholder="集团属性">
              <el-option v-for="(item, i) in ORGANIZE_TYPE" :key="i" :value="item.value" :label="item.label" />
            </el-select>
          </el-form-item>
          <el-form-item class="group-form-item__input group-form-item__lable" prop="roleId">
            <el-select v-model="provinceId" clearable placeholder="所属省份">
              <el-option v-for="(item, i) in provinces" :key="i" :value="item.key" :label="item.value" />
            </el-select>
          </el-form-item>

          <el-form-item class="group-form-item__input group-form-item__lable" prop="staffName">
            <el-input v-model="managerName" clearable placeholder="客户经理" />
          </el-form-item>

          <el-form-item class="group-form-item__input group-form-item__lable" prop="code">
            <el-input v-model="otherField" clearable placeholder="集团名称/编码" />
          </el-form-item>
        </div>

        <div class="flex customer-query-btns">
          <el-form-item>
            <el-button type="primary" @click="handleQuery">查询</el-button>
          </el-form-item>
        </div>
      </el-form>
      <div class="customer-overview-management">
        <wm-table
          :source="groupCustomerList.list"
          :total="groupCustomerList.totalCount"
          :pageNo="pageNo"
          :pageSize="pageSize"
          @onPagination="onPagination"
          @onSizePagination="onSizePagination">
          <el-table-column label="集团编码" property="organizeCode" show-overflow-tooltip/>
          <el-table-column label="集团名称" property="organizeName" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="集团属性" property="organizeTypeName" >
          </el-table-column>
          <el-table-column label="所属省份" property="provinceName">
          </el-table-column>
          <el-table-column label="客户经理" property="managerName" />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button class="table-button" type="text" @click="handleDetail(scope.row)">
                查看主页
              </el-button>
            </template>
          </el-table-column>
        </wm-table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { createHelpers } from 'vuex-map-fields';

import WmTable from 'components/Table.vue';
import filters from './filters';

const { mapFields } = createHelpers({
  getterType: 'getCustomerField',
  mutationType: 'updateCustomerField'
});
export default {
  name: 'CustomerOverview',
  mixins: [filters],
  components: {
    WmTable
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapState({
      groupCustomerList: ({ groupCustomer }) => groupCustomer.groupCustomerList
    }),
    ...mapFields([
      'overviewQuery.organizeType',
      'overviewQuery.provinceId',
      'overviewQuery.managerName',
      'overviewQuery.otherField',
      'overviewQuery.pageNo',
      'overviewQuery.pageSize'
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
    handleDetail(row) {
      const path = `/group-customer/overview/detail/${row.organizeId}`;
      this.$router.push(path);
    },
    handleQuery() {
      this.pageNo = 1;
      this.query();
    },
    query() {
      this.queryCustomerOverviewList(this.getParams());
    },
    getParams() {
      const {
        pageNo,
        pageSize,
        organizeType,
        provinceId,
        managerName,
        otherField
      } = this;

      return {
        pageNo,
        pageSize,
        organizeType,
        provinceId,
        managerName,
        otherField
      };
    },
    ...mapActions([
      'queryCustomerOverviewList'
    ])
  }
};
</script>

<style lang="scss">
@import "scss/variables.scss";
.customer-overview{
  .group-form-item__lable {
    margin-left: $blockWidth;
  }
  .group-form {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .group-form-item__input {
    width: $inputWidthQuery;
  }

  .customer-query-btns{
    margin-left: 40px;
  }
  // .customer-overview-management{
  //   margin-top: $blockWidth;
  // }
}
</style>
