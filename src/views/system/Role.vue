<template>
  <div class="m-container">
    <el-form class="role-form" ref="roleManageForm" :model="roleForm" :rules="roleManageRules">
      <div class="flex">
        <el-form-item>角色名称：</el-form-item>
        <el-form-item class="role-form-item__input" prop="roleName">
          <el-input v-model="roleForm.roleName" />
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

    <wm-table :source="roleObj.list" :pageNo="roleForm.pageNo" :pageSize="roleForm.pageSize" :total="roleForm.totalcount" @onPagination="onPagination" @onSizePagination="onSizePagination">
      <el-table-column label="用户角色" property="roleName" />
      <el-table-column label="用户描述" property="notes" />
      <el-table-column label="用户数" property="opreatorNum" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <span class="btnLists">
            <el-tooltip effect="dark" content="编辑" placement="bottom">
              <el-button type="text" @click="handleEdit(scope.row)">
                <i class="el-icon-edit-outline"></i>
              </el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除" placement="bottom">
              <el-button type="text" @click="handleDelete(scope.row)">
                <i class="el-icon-delete"></i>
              </el-button>
            </el-tooltip>
          </span>
        </template>
      </el-table-column>
    </wm-table>
  </div>
</template>

<script>
import WmTable from 'components/Table.vue';
import { mapActions, mapState } from 'vuex';
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
