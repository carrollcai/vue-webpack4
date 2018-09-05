<template>
  <div class="m-container">
    <el-form class="form-manage" ref="roleManageForm" :model="roleForm" :rules="roleManageRules">
      <div class="flex">
        <el-form-item class="form-query-input-width" prop="roleName">
          <el-input v-model="roleForm.roleName" placeholder="角色名称" clearable />
        </el-form-item>
      </div>
      <div class="flex">
        <el-form-item class="form-left-width">
          <el-button type="primary" @click="query">查询</el-button>
        </el-form-item>
        <el-form-item class="form-left-width">
          <el-button class="el-button--have-icon" @click.prevent="handleCreate" icon="el-icon-plus">创建角色</el-button>
        </el-form-item>
      </div>
    </el-form>

    <wm-table :source="roleObj.list" :pageNo="roleForm.pageNo" :pageSize="roleForm.pageSize" :total="roleObj.totalCount" @onPagination="onPagination" @onSizePagination="onSizePagination">
      <el-table-column label="用户角色" property="roleName" />
      <el-table-column label="用户描述" property="notes" />
      <el-table-column label="用户数" property="opreatorNum">
        <template slot-scope="scope">
          <el-button type="text" @click="redirectUserCreate(scope.row)">
            {{scope.row.opreatorNum}}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button class="table-button" type="text" @click="handleEdit(scope.row)">
            编辑
          </el-button>
          <el-button class="table-button" type="text" @click="handleDelete(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </wm-table>
  </div>
</template>

<script>
import WmTable from 'components/Table.vue';
import { mapActions, mapState, mapMutations } from 'vuex';
export default {
  data() {
    return {
      isNotPageChange: true,
      roleManageRules: {}
    };
  },
  components: {
    WmTable
  },
  computed: {
    ...mapState({
      roleObj: ({ system }) => system.roleObj,
      roleForm: ({ system }) => system.roleForm
    })
  },
  beforeMount() {
    this.query();
  },
  methods: {
    redirectUserCreate(row) {
      this.redirectUserCreateMutation(row.roleId);
      this.routeChange({
        path: '/system/user/management'
      });
    },
    async onPagination(value) {
      this.isNotPageChange = false;
      this.roleForm.pageNo = value;
      await this.query();
      this.isNotPageChange = true;
    },
    onSizePagination(value) {
      this.roleForm.pageSize = value;
      this.query();
    },
    handleCreate() {
      const path = `/system/role/create`;
      this.$router.push(path);
    },
    handleEdit(row) {
      const path = `/system/role/edit/${row.roleId}`;
      this.$router.push(path);
    },
    handleDelete(row) {
      this.$confirm('删除角色, 是否继续?', ' ', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRole({ roleId: row.roleId }).then(res => {
          this.$message({
            showClose: true,
            message: '删除成功',
            type: 'success',
            duration: 3000
          });
          this.query();
        });
      }).catch(() => {
        this.$message('已取消删除');
      });
    },
    query() {
      this.roleForm.pageNo = this.isNotPageChange ? 1 : this.roleForm.pageNo;
      const params = this.roleForm;
      this.getRoleList(params);
    },
    ...mapMutations({
      redirectUserCreateMutation: 'ROLE_REDIRECT_USER_CREATE',
      routeChange: 'ROUTE_CHANGE'
    }),
    ...mapActions([
      'getRoleList',
      'queryRole',
      'deleteRole'
    ])
  }
};
</script>

<style lang="less">
@import "~scss/variables.less";
</style>
