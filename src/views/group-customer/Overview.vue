<template>
  <div class="customer-overview">
    <div class="m-container">
      <el-form class="group-form" :model="params">
        <div class="flex">
          <el-form-item class="user-form-item__input">
            <el-select v-model="params.organizeType" placeholder="集团属性">
              <el-option :key="null" label="全部属性" :value="null"></el-option>
              <el-option v-for="(item, i) in ORGANIZE_TYPE" :key="i" :value="item.value" :label="item.label" />
            </el-select>
          </el-form-item>
          <el-form-item class="group-form-item__input group-form-item__lable" prop="roleId">
            <el-select v-model="params.provinceId" placeholder="所属省份">
              <el-option :key="null" label="全部" :value="null"></el-option>
              <el-option v-for="(item, i) in provinces" :key="i" :value="item.key" :label="item.value" />
            </el-select>
          </el-form-item>

          <el-form-item class="group-form-item__input group-form-item__lable" prop="staffName">
            <el-input v-model="params.managerName" placeholder="客户经理" />
          </el-form-item>

          <el-form-item class="group-form-item__input group-form-item__lable" prop="code">
            <el-input v-model="params.otherField" placeholder="集团名称/编码" />
          </el-form-item>
        </div>

        <div class="flex">
          <el-form-item>
            <el-button type="primary" @click="query">查询</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="m-container customer-overview-management">
      <wm-table
        :source="groupCustomerList.list"
        :total="groupCustomerList.totalCount"
        :pageNo="params.pageNo"
        :pageSize="params.pageSize"
        @onPagination="onPagination"
        @onSizePagination="onSizePagination">
        <el-table-column label="集团编码" property="organizeId" />
        <el-table-column label="集团名称" property="organizeName">
        </el-table-column>
        <el-table-column label="集团属性" property="organizeTypeValue" >
        </el-table-column>
        <el-table-column label="所属省份" property="provinceName">
        </el-table-column>
        <el-table-column label="客户经理" property="managerName" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleDetail(scope.row)">
              查看主页
            </el-button>
          </template>
        </el-table-column>
      </wm-table>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import WmTable from 'components/Table.vue';
import {PAGE_NO, PAGE_SIZE} from '@/config';
import filters from './filters';
export default {
  name: 'CustomerOverview',
  mixins: [filters],
  components: {
    WmTable
  },
  data() {
    return {
      params: {
        pageNo: PAGE_NO,
        pageSize: PAGE_SIZE,
        organizeType: '',
        provinceId: '',
        managerName: '',
        otherField: ''
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
      const path = `/system/user/edit/${row.operatorId}`;
      this.$router.push(path);
    },
    query() {
      const params = this.params;
      this.queryCustomerOverviewList(params);
    },
    ...mapActions([
      'queryCustomerOverviewList'
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

.customer-overview-management{
  margin-top: $blockWidth;
}
</style>
