<template>
  <div class="m-container">
    <el-form class="user-form" ref="userManageForm">
      <el-form-item>用户角色：</el-form-item>
      <el-form-item class="user-form-item__input">
        <el-select v-model="userForm.role">
          <el-option v-for="(item, i) in userRoleList" :key="i" :value="item.key" :label="item.name" />
        </el-select>
      </el-form-item>

      <el-form-item class="user-form-item__lable">用户姓名：</el-form-item>
      <el-form-item class="user-form-item__input">
        <el-input v-model="userForm.name" />
      </el-form-item>

      <el-form-item class="user-form-item__lable">登录账号：</el-form-item>
      <el-form-item class="user-form-item__input">
        <el-input v-model="userForm.account" />
      </el-form-item>

      <el-form-item class="role-form-item">
        <el-button type="primary" @click="query">查询</el-button>
      </el-form-item>
      <el-form-item class="role-form-item">
        <el-button class="el-button--have-icon" @click="handleCreate" icon="el-icon-plus">创建用户</el-button>
      </el-form-item>
    </el-form>

    <wm-table :source="userList.list" :pageNo="userForm.pageNo" :pageSize="userForm.pageSize" :total="userForm.totalCount" @onPagination="onPagination" @onSizePagination="onSizePagination">
      <el-table-column label="用户姓名" property="name" />
      <el-table-column label="登录账号" property="account" />
      <el-table-column label="用户角色" property="role" />
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
import { mapState, mapActions } from 'vuex';
export default {
  components: {
    WmTable
  },
  computed: {
    ...mapState({
      userList: ({ system }) => system.userList,
      userForm: ({ system }) => system.userForm,
      userRoleList: ({ root }) => root.userRoleList
    })
  },
  beforeMount() {
    this.getUserList();
  },
  methods: {
    onPagination(value) {
      this.userForm.pageNo = value;
    },
    onSizePagination(value) {
      this.userForm.pageSize = value;
    },
    handleCreate() {
      const path = `/system/user/create`;
      this.$router.push(path);
    },
    handleEdit(row) {
      const path = `/system/user/edit/${row.id}`;
      this.$router.push(path);
    },
    handleDelete(row) {
      this.$confirm('删除用户数据, 是否继续?', ' ', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteUser({ id: row.id }).then(res => {
          this.query();
        });
      }).catch(() => {
        this.$message('已取消删除');
      });
    },
    query() {
      const params = this.userForm;
      this.getUserList(params);
    },
    ...mapActions([
      'getUserList',
      'deleteUser'
    ])
  }
};
</script>

<style lang="scss">
@import "scss/variables.scss";
.user-form-item__lable {
  margin-left: $blockWidth;
}
.user-form {
  display: flex;
  align-items: center;
}
.user-form-item__input {
  width: 120px;
}
.role-form-item {
  margin-left: $formWidth;
}
</style>
