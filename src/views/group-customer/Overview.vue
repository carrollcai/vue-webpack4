<template>
  <div class="customer-overview">
    <div class="m-container">
      <el-form class="form-manage">
        <div class="flex">
          <el-form-item class="form-query-input-width">
            <el-select v-model="organizeType"
              clearable
              placeholder="集团属性">
              <el-option v-for="(item, i) in ORGANIZE_TYPE"
                :key="i"
                :value="item.value"
                :label="item.label" />
            </el-select>
          </el-form-item>
          <!--<el-form-item class="form-query-input-width form-left-width" prop="roleId">
            <el-select v-model="provinceId" clearable placeholder="所属省份">
              <el-option v-for="(item, i) in provinces" :key="i" :value="item.key" :label="item.value" />
            </el-select>
          </el-form-item>-->

          <el-form-item class="form-query-input-width form-left-width"
            prop="staffName">
            <el-input v-model="managerName"
              clearable
              placeholder="客户经理" />
          </el-form-item>

          <el-form-item class="form-query-input-width form-left-width"
            prop="code">
            <el-autocomplete :maxlength="25"
              v-model="otherField"
              :fetch-suggestions="querySearchAsync"
              placeholder="集团名称/编码"
              clearable></el-autocomplete>
            <!--<el-input v-model="otherField" clearable placeholder="集团名称/编码" />-->
          </el-form-item>
          <el-form-item class="form-query-input-width form-left-width"
            prop="tagName">
            <el-input v-model="label"
              clearable
              placeholder="集团标签" />
          </el-form-item>
        </div>

        <div class="flex">
          <el-form-item class="form-left-width">
            <el-button type="primary"
              @click="handleQuery">查询</el-button>
          </el-form-item>
        </div>
      </el-form>
      <div class="customer-overview-management">
        <wm-table :source="groupCustomerList.list"
          :total="groupCustomerList.totalCount"
          :pageNo="pageNo"
          :pageSize="pageSize"
          @onPagination="onPagination"
          @onSizePagination="onSizePagination">
          <el-table-column label="集团编码"
            property="organizeCode"
            show-overflow-tooltip/>
          <el-table-column label="集团名称"
            :width="370">
            <template slot-scope="scope">
              <p class="label">{{scope.row.organizeName}}</p>
              <el-tag v-for="item in scope.row.label"
                :key="item">{{item}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="集团属性"
            property="organizeTypeName"
            show-overflow-tooltip>
          </el-table-column>
          <!--<el-table-column label="集团标签" property="label" show-overflow-tooltip>
          </el-table-column>-->
          <!--<el-table-column label="所属省份" property="provinceName">
          </el-table-column>-->
          <el-table-column label="客户经理"
            property="managerName"
            show-overflow-tooltip/>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button class="table-button"
                type="text"
                @click="handleDetail(scope.row)">
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
      groupCustomerList: ({ groupCustomer }) => groupCustomer.groupCustomerList,
      groupNameList: ({ groupCustomer }) => groupCustomer.groupNameList
    }),
    ...mapFields([
      'overviewQuery.organizeType',
      'overviewQuery.provinceId',
      'overviewQuery.managerName',
      'overviewQuery.otherField',
      'overviewQuery.label',
      'overviewQuery.pageNo',
      'overviewQuery.pageSize'
    ])
  },
  beforeMount() {
    this.query();
  },
  methods: {
    async querySearchAsync(queryString, cb) {
      if (!queryString) return false;
      let params = {
        pageSize: 20,
        organizeName: queryString
      };
      await this.getGroupName(params);
      await clearTimeout(this.timeout);
      this.timeout = await setTimeout(() => {
        var results = this.groupNameList;
        cb(results);
      }, 1000);
    },
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
        otherField,
        label
      } = this;

      return {
        pageNo,
        pageSize,
        organizeType,
        provinceId,
        managerName,
        otherField,
        label
      };
    },
    ...mapActions([
      'queryCustomerOverviewList', 'getGroupName'
    ])
  }
};
</script>

<style lang="less">
@import "~scss/variables.less";
.customer-overview {
  .label {
    line-height: 2;
  }
  .el-tag {
    height: 20px;
    line-height: 18px;
    margin-right: 5px;
  }
}
</style>
