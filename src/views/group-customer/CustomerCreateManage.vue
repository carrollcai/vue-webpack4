<template>
  <div class="group-customer group-customer-create-management">
    <div class="m-container query-block">
      <el-form class="group-form">
        <div class="flex">
          <el-form-item class="user-form-item__input">
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
            <el-input v-model="managerName" clearable placeholder="客户经理"/>
          </el-form-item>

          <el-form-item class="group-form-item__input group-form-item__lable" prop="code">
            <el-input v-model="otherField" clearable placeholder="集团名称/编码"/>
          </el-form-item>
        </div>

        <div class="flex">
          <el-form-item class="role-form-item">
            <el-button type="primary" @click="query">查询</el-button>
          </el-form-item>
          <el-form-item class="role-form-item">
            <el-button class="el-button--have-icon" @click="handleCreate" icon="el-icon-plus">创建集团客户</el-button>
          </el-form-item>
        </div>
      </el-form>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部" name="first"></el-tab-pane>
        <el-tab-pane label="草稿" name="second"></el-tab-pane>
        <el-tab-pane label="审核中" name="third"></el-tab-pane>
        <el-tab-pane label="审核通过" name="fourth"></el-tab-pane>
        <el-tab-pane label="审核不通过" name="fifth"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="m-container group-customer-list">
      <wm-table
        :source="groupCustomerList.list"
        :total="groupCustomerList.totalCount"
        :pageNo="pageNo"
        :pageSize="pageSize"
        @onPagination="onPagination"
        @onSizePagination="onSizePagination">
        <el-table-column label="集团编码" property="organizeId" />
        <el-table-column label="集团名称" property="organizeName">
        </el-table-column>
        <el-table-column label="集团属性" property="organizeTypeName">
        </el-table-column>
        <el-table-column label="所属省份" property="provinceName">
        </el-table-column>
        <el-table-column label="客户经理" property="managerName" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleDetail(scope.row)">
              详情
            </el-button>
            <el-button type="text" v-if="isPassed(scope.row)" @click="handleEdit(scope.row)">
              修改
            </el-button>
            <template v-if="isDraft(scope.row)">
              <el-dropdown @command="handleCommand(scope.row, $event)">
                <span class="el-dropdown-link">
                  更多<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="edit">修改</el-dropdown-item>
                  <el-dropdown-item command="delete">删除</el-dropdown-item>
                  <el-dropdown-item command="approve">提审</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
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
import filters from './filters';

const { mapFields } = createHelpers({
  getterType: 'getCustomerField',
  mutationType: 'updateCustomerField'
});
export default {
  components: {
    WmTable
  },
  mixins: [filters],
  data() {
    return {
      activeIndex: '1'
    };
  },
  computed: {
    ...mapState({
      groupCustomerList: ({ groupCustomer }) => groupCustomer.groupCustomerList
    }),
    ...mapFields([
      'createQuery.organizeType',
      'createQuery.provinceId',
      'createQuery.managerName',
      'createQuery.otherField',
      'createQuery.pageNo',
      'createQuery.pageSize',
      'createQuery.activeName'
    ])
  },
  beforeMount() {
    this.query();
  },
  methods: {
    /**
     * 草稿状态
     */
    isDraft(row) {
      return row.orgTaskStatus === '1';
    },
    /**
     * 审核通过
     */
    isPassed(row) {
      return row.orgTaskStatus === '4' || row.orgTaskStatus === '3' || row.orgTaskStatus === '6';
    },
    onPagination(value) {
      this.pageNo = value;
      this.query();
    },
    onSizePagination(value) {
      this.pageSize = value;
      this.query();
    },
    handleCreate() {
      const path = `/group-customer/create`;
      this.$router.push(path);
    },
    handleEdit(row) {
      const path = `/group-customer/edit/${row.organizeId}`;
      this.$router.push(path);
    },
    handleDetail(row) {
      this.$router.push(`/group-customer/detail/${row.organizeId}`);
    },
    handleDelete(row) {
      this.$confirm('您确定要删除该条集团客户信息？', ' ', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteCustomer(row.organizeId).then(res => {
          this.query();
        });
      }).catch(() => {
        this.$message('已取消删除');
      });
    },
    handleApprove(row) {
      this.$confirm('您确定要提审该条集团客户信息？', ' ', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.approveCustomer(row.organizeId).then(res => {
          this.query();
        });
      }).catch((e) => {
        console.log(e);
        this.$message('已取消提审');
      });
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

      let STATUS = {
        'first': [],
        'second': ['1'],
        'third': ['2', '5'],
        'fourth': ['4'],
        'fifth': ['3', '6']
      };

      return {
        pageNo,
        pageSize,
        organizeType,
        provinceId,
        managerName,
        otherField,
        taskStatusList: STATUS[this.activeName]
      };
    },
    query() {
      this.getGroupCustomerList(this.getParams());
    },
    handleClick(tab, event) {
      this.pageNo = 1;
      this.query();
    },
    handleCommand(row, command) {
      let COMMANDS = {
        'edit': 'handleEdit',
        'delete': 'handleDelete',
        'approve': 'handleApprove'
      };
      this[COMMANDS[command]](row);
    },
    ...mapActions([
      'getGroupCustomerList',
      'deleteCustomer',
      'approveCustomer'
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

.role-form-item {
  margin-left: $formWidth;
}

.group-customer-create-management {
  .group-customer-list{
    margin-top: $blockWidth;
  }
}

.group-customer {
  .el-dropdown-link{
    color: $buttonColor;
    cursor: pointer;
  }
}
</style>
