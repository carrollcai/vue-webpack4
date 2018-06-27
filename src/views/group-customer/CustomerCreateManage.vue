<template>
  <div>
    <div class="m-container">
      <el-form class="group-form" :model="groupCustomerForm">
        <div class="flex">
          <el-form-item class="user-form-item__input">
            <el-select v-model="groupCustomerForm.organizeType" placeholder="集团属性">
              <el-option :key="null" label="全部属性" :value="null"></el-option>
              <el-option v-for="(item, i) in ORGANIZE_TYPE" :key="i" :value="item.value" :label="item.label" />
            </el-select>
          </el-form-item>
          <el-form-item class="group-form-item__input group-form-item__lable" prop="roleId">
            <el-select v-model="groupCustomerForm.roleId" placeholder="所属省份">
              <el-option :key="null" label="全部" :value="null"></el-option>
              <el-option v-for="(item, i) in province" :key="i" :value="item.key" :label="item.value" />
            </el-select>
          </el-form-item>

          <el-form-item class="group-form-item__input group-form-item__lable" prop="staffName">
            <el-input v-model="groupCustomerForm.managerName" placeholder="客户经理" clearable/>
          </el-form-item>

          <el-form-item class="group-form-item__input group-form-item__lable" prop="code">
            <el-input v-model="groupCustomerForm.otherField" placeholder="集团名称/编码" clearable/>
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
    <div class="m-container user-create">
      <wm-table :source="groupCustomerList.list"
        :pageNo="groupCustomerForm.pageNo"
        :pageSize="groupCustomerForm.pageSize"
        :total="groupCustomerList.totalCount"
        @onPagination="onPagination"
        @onSizePagination="onSizePagination">
        <el-table-column label="集团编码" property="organizeId" />
        <el-table-column label="集团名称" property="organizeName">
        </el-table-column>
        <el-table-column label="集团属性" property="organizeType" >
        </el-table-column>
        <el-table-column label="所属省份" property="provinceName">
        </el-table-column>
        <el-table-column label="客户经理" property="managerName" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleDetail(scope.row)">
              详情
            </el-button>
            <el-button type="text" @click="handleDelete(scope.row)">
              删除
            </el-button>
            <el-button type="text" @click="handleApprove(scope.row)">
              提审
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
import {
  ORGANIZE_TYPE
} from '@/config';
export default {
  components: {
    WmTable
  },
  data() {
    return {
      activeIndex: '1',
      activeName: 'second',
      ORGANIZE_TYPE
    };
  },
  computed: {
    ...mapState({
      groupCustomerList: ({ groupCustomer }) => groupCustomer.groupCustomerList,
      groupCustomerForm: ({ groupCustomer }) => groupCustomer.groupCustomerForm,
      userRoleList: ({ root }) => root.userRoleList,
      province: ({ root }) => root.province
    })
  },
  beforeMount() {
    this.getGroupCustomerList(this.groupCustomerForm);
  },
  methods: {
    onPagination(value) {
      this.groupCustomerForm.pageNo = value;
      this.query();
    },
    onSizePagination(value) {
      this.groupCustomerForm.pageSize = value;
      this.query();
    },
    handleCreate() {
      const path = `/group-customer/create`;
      this.$router.push(path);
    },
    handleEdit(row) {
      const path = `/group-customer/edit/${row.operatorId}`;
      this.$router.push(path);
    },
    handleDetail(row) {
      this.$router.push(`/group-customer/detail/${row.organizeId}`);
    },
    handleDelete(row) {
      this.$confirm('删除集团客户数据, 是否继续?', ' ', {
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
      this.$confirm('提审集团客户数据, 是否继续?', ' ', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.approveCustomer(row.organizeId).then(res => {
          this.query();
        });
      }).catch(() => {
        this.$message('已取消提审');
      });
    },
    query() {
      const params = this.groupCustomerForm;
      this.getGroupCustomerList(params);
    },
    handleClick(tab, event) {
      let STATUS = {
        'first': [],
        'second': ['1'],
        'third': ['2', '5'],
        'fourth': ['4'],
        'fifth': ['3', '6']
      };

      this.groupCustomerForm.pageNo = 1;
      this.groupCustomerForm.taskStatusList = STATUS[this.activeName];
      this.query();
    },
    ...mapActions([
      'getGroupCustomerList',
      'deleteCustomer'
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
.user-create {
  margin-top: $blockWidth;
}
</style>
