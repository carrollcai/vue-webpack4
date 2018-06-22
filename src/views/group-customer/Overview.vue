<template>
  <div class="m-container">
    <el-form class="group-form" :model="groupCustomerForm">
      <div class="flex">
        <el-form-item class="user-form-item__input">
          <el-select v-model="groupCustomerForm.roleId" placeholder="集团属性">
            <el-option :key="null" label="全部属性" :value="null"></el-option>
            <el-option v-for="(item, i) in userRoleList" :key="i" :value="item.roleId" :label="item.roleName" />
          </el-select>
        </el-form-item>
        <el-form-item class="group-form-item__input group-form-item__lable" prop="roleId">
          <el-select v-model="groupCustomerForm.roleId" placeholder="所属省份">
            <el-option :key="null" label="全部" :value="null"></el-option>
            <el-option v-for="(item, i) in province" :key="i" :value="item.key" :label="item.value" />
          </el-select>
        </el-form-item>

        <el-form-item class="group-form-item__input group-form-item__lable" prop="staffName">
          <el-input v-model="groupCustomerForm.staffName" placeholder="客户经理" />
        </el-form-item>

        <el-form-item class="group-form-item__input group-form-item__lable" prop="code">
          <el-input v-model="groupCustomerForm.code" placeholder="集团名称/编码" />
        </el-form-item>
      </div>

      <div class="flex">
        <el-form-item>
          <el-button type="primary" @click="query">查询</el-button>
        </el-form-item>
      </div>
    </el-form>

    <wm-table :source="groupCustomerList.list" :pageNo="groupCustomerForm.pageNo" :pageSize="groupCustomerForm.pageSize" :total="groupCustomerForm.totalcount" @onPagination="onPagination" @onSizePagination="onSizePagination">
      <el-table-column label="集团编码" property="code" />
      <el-table-column label="集团名称">
        <template slot-scope="scope">
          <span class="btnLists">
            广东移动BOSS
          </span>
        </template>
      </el-table-column>
      <el-table-column label="集团属性" property="" >
        <template slot-scope="scope">
          <span class="btnLists">
            省公司
          </span>
        </template>
      </el-table-column>
      <el-table-column label="所属省份" >
        <template slot-scope="scope">
          <span class="btnLists">
            广东省
          </span>
        </template>
      </el-table-column>
      <el-table-column label="客户经理" property="staffName" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="handleEdit(scope.row)">
            查看主页
          </el-button>
        </template>
      </el-table-column>
    </wm-table>
  </div>
</template>

<script>
import WmTable from 'components/Table.vue';
import { mapState, mapActions } from 'vuex';
export default {
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
      const path = `/system/user/create`;
      this.$router.push(path);
    },
    handleEdit(row) {
      const path = `/system/user/edit/${row.operatorId}`;
      this.$router.push(path);
    },
    handleDelete(row) {
      this.$confirm('删除用户数据, 是否继续?', ' ', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteUser({ operatorId: row.operatorId }).then(res => {
          this.query();
        });
      }).catch(() => {
        this.$message('已取消删除');
      });
    },
    query() {
      const params = this.groupCustomerForm;
      this.getGroupCustomerList(params);
    },
    ...mapActions([
      'getGroupCustomerList'
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
</style>
