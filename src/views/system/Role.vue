<template>
  <div class="m-container">
    <el-form class="role-form" ref="roleManageForm" :model="roleForm" :rules="roleManageRules">
      <div class="flex">
        <el-form-item class="role-form-item__input" prop="roleName">
          <el-input v-model="roleForm.roleName" placeholder="角色名称" />
        </el-form-item>
      </div>
      <div class="flex">
        <el-form-item class="role-form-item">
          <el-button type="primary" @click="query">查询</el-button>
        </el-form-item>
        <el-form-item class="role-form-item">
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
      roleManageRules: {
        roleName: [
          // { required: true, message: '请输入角色名称', trigger: 'blur' }
        ]
      }
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
    this.getRoleList(this.roleForm);
  },
  methods: {
    redirectUserCreate(row) {
      this.redirectUserCreateMutation(row.roleId);
      this.routeChange({
        path: '/system/user/management'
      });
    },
    onPagination(value) {
      this.roleForm.pageNo = value;
      this.query();
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
      const params = this.roleForm;
      this.$refs['roleManageForm'].validate(valid => {
        if (valid) {
          this.getRoleList(params);
        }
      });
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

<style lang="scss">
@import "scss/variables.scss";
.role-form {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.role-form-item__input {
  width: $inputWidthQuery;
}
.role-form-item {
  margin-left: $formWidth;
}
</style>
