<template>
  <div class="m-container">
    <el-form class="user-form" ref="userManageForm" :model="userForm" :rules="userManageRules">
      <div class="flex">
        <el-form-item class="user-form-item__input" prop="role">
          <el-select v-model="userForm.role" placeholder="用户角色">
            <el-option :key="null" label="全部类型" :value="null"></el-option>
            <el-option v-for="item in userRoleList" :key="item.role" :value="item.roleId" :label="item.roleName" />
          </el-select>
        </el-form-item>

        <el-form-item class="user-form-item__input" prop="otherField">
          <el-cascader expand-trigger="hover" :options="regionRelationList" v-model="userForm.opRegion" @change="handleChange" placeholder="用户归属">
          </el-cascader>
        </el-form-item>

        <el-form-item class="user-form-item__input" prop="code">
          <el-input v-model="userForm.otherField" placeholder="姓名/账号/手机" />
        </el-form-item>
      </div>

      <div class="flex">
        <el-form-item class="role-form-item">
          <el-button type="primary" @click="query">查询</el-button>
        </el-form-item>
        <el-form-item class="role-form-item">
          <el-button class="el-button--have-icon" @click="handleCreate" icon="el-icon-plus">创建用户</el-button>
        </el-form-item>
      </div>
    </el-form>
    <wm-table :source="userObj.list" :pageNo="userForm.pageNo" :pageSize="userForm.pageSize" :total="userObj.totalcount" @onPagination="onPagination" @onSizePagination="onSizePagination">
      <el-table-column label="用户姓名" property="staffName" />
      <el-table-column label="登录账号" property="code" />
      <el-table-column label="手机号" property="code" />
      <el-table-column label="用户角色" property="roleNames" show-overflow-tooltip />
      <el-table-column label="用户归属" property="roleNames" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="handleEdit(scope.row)">
            编辑
          </el-button>
          <el-button type="text" @click="handleDelete(scope.row)">
            删除
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
      userManageRules: {
      }
    };
  },
  computed: {
    ...mapState({
      userObj: ({ system }) => system.userObj,
      userForm: ({ system }) => system.userForm,
      regionRelationList: ({ system }) => system.regionRelationList,
      userRoleList: ({ root }) => root.userRoleList
    })
  },
  beforeMount() {
    !this.regionRelationList.length && this.queryRegionRelationList({});
    this.getUserList(this.userForm);
  },
  methods: {
    onPagination(value) {
      this.userForm.pageNo = value;
      this.query();
    },
    onSizePagination(value) {
      this.userForm.pageSize = value;
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
      const params = Object.cloneDeep(this.userForm);

      params.opRegion = params.opRegion && params.opRegion.pop();
      this.getUserList(params);
    },
    ...mapActions([
      'getUserList',
      'deleteUser',
      'queryRegionRelationList'
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
  justify-content: space-between;
}
.user-form-item__input {
  width: $inputWidthQuery;
}
.user-form-item__input:not(:first-child) {
  margin-left: $blockWidth;
}
.role-form-item {
  margin-left: $formWidth;
}
</style>
