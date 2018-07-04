<template>
  <div>
    <div class="m-container">
      <el-form class="group-form" :model="params">
        <div class="flex">
          <el-form-item class="user-form-item__input">
            <el-select v-model="params.organizeType" clearable placeholder="集团属性">
              <el-option v-for="(item, i) in ORGANIZE_TYPE" :key="i" :value="item.value" :label="item.label" />
            </el-select>
          </el-form-item>
          <el-form-item class="group-form-item__input group-form-item__lable" prop="roleId">
            <el-select v-model="params.provinceId" clearable placeholder="所属省份">
              <el-option v-for="(item, i) in provinces" :key="i" :value="item.key" :label="item.value" />
            </el-select>
          </el-form-item>

          <el-form-item class="group-form-item__input group-form-item__lable" prop="staffName">
            <el-input v-model="params.managerName" placeholder="客户经理" clearable/>
          </el-form-item>

          <el-form-item class="group-form-item__input group-form-item__lable" prop="code">
            <el-input v-model="params.otherField" placeholder="集团名称/编码" clearable />
          </el-form-item>
        </div>
        <div class="flex">
          <el-form-item>
            <el-button type="primary" @click="query">查询</el-button>
          </el-form-item>
        </div>
      </el-form>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="待审核" name="first"></el-tab-pane>
        <el-tab-pane label="审核通过" name="second"></el-tab-pane>
        <el-tab-pane label="审核不通过" name="third"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="m-container customer-audit-management">
      <wm-table
        :source="groupCustomerList.list"
        :total="groupCustomerList.totalCount"
        :pageNo="params.pageNo"
        :pageSize="params.pageSize"
        @onPagination="onPagination"
        @onSizePagination="onSizePagination">
        <el-table-column label="集团编码" property="businessId" />
        <el-table-column label="集团名称" property="organizeName">
        </el-table-column>
        <el-table-column label="集团属性" property="organizeType" >
        </el-table-column>
        <el-table-column label="所属省份" property="organizeProvinceId">
        </el-table-column>
        <el-table-column label="客户经理" property="organizeManagerName" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" v-if="activeName === 'first'" @click="handleAudit(scope.row)">
              去审核
            </el-button>
            <el-button type="text" v-else @click="handleDetail(scope.row)">
              查看主页
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
import filters from './filters';
import {PAGE_NO, PAGE_SIZE} from '@/config';
export default {
  components: {
    WmTable
  },
  mixins: [filters],
  data() {
    return {
      activeName: 'first',
      params: {
        pageNo: PAGE_NO,
        pageSize: PAGE_SIZE,
        organizeType: '',
        provinceId: '',
        managerName: '',
        businessStatus: ''
      }
    };
  },
  computed: {
    ...mapState({
      groupCustomerList: ({ groupCustomer }) => groupCustomer.groupCustomerList
    })
  },
  beforeMount() {
    this.query();
  },
  methods: {
    onPagination(value) {
      this.params.pageNo = value;
      this.query();
    },
    onSizePagination(value) {
      this.params.pageSize = value;
      this.query();
    },
    handleDetail(row) {
      this.$router.push(`/group-customer/overview/detail/${row.businessId}`);
    },
    handleAudit(row) {
      this.$router.push(`/group-customer/audit/${row.businessId}/${row.taskInsId}`);
    },
    getParams() {
      const {params} = this;

      let STATUS = {
        'first': '-1',
        'second': '1',
        'third': '0'
      };

      params.businessStatus = STATUS[this.activeName];

      return params;
    },
    query() {
      const params = this.getParams();
      this.queryCustomerAuditList(params);
    },
    handleClick() {
      this.params.pageNo = 1;
      this.query();
    },
    ...mapActions([
      'queryCustomerAuditList'
    ])
  }
};
</script>

<style lang="scss">
@import "scss/variables.scss";
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

.customer-audit-management{
  margin-top: $blockWidth;
}
</style>
