<template>
  <div class="requirement-handle-management">
    <div class="m-container">
      <el-form class="group-form" :model="params">
        <div class="flex">
          <el-form-item class="user-form-item__input">
            <el-select v-model="organizeType" clearable placeholder="集团属性">
              <el-option v-for="(item, i) in ORGANIZE_TYPE" :key="i" :value="item.value" :label="item.label" />
            </el-select>
          </el-form-item>

          <el-form-item class="group-form-item__input group-form-item__lable" prop="roleId">
            <el-select v-model="provinceId" clearable placeholder="需求类型">
              <el-option v-for="(item, i) in provinces" :key="i" :value="item.key" :label="item.value" />
            </el-select>
          </el-form-item>

          <el-form-item class="group-form-item__input group-form-item__lable" prop="staffName">
            <el-input v-model="managerName" clearable placeholder="客户名称"/>
          </el-form-item>
        </div>

        <div class="flex">
          <el-form-item class="role-form-item">
            <el-button type="primary" @click="query">查询</el-button>
          </el-form-item>
        </div>
      </el-form>

      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="未处理" name="second"></el-tab-pane>
        <el-tab-pane label="已处理" name="third"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="m-container requirement-list">
      <wm-table
        :source="requirements.list"
        :total="requirements.totalCount"
        :pageNo="pageNo"
        :pageSize="pageSize"
        @onPagination="onPagination"
        @onSizePagination="onSizePagination">
        <el-table-column label="需求单号" property="organizeId" />
        <el-table-column label="创建时间" property="organizeName">
        </el-table-column>
        <el-table-column label="需求客户" property="organizeTypeName">
        </el-table-column>
        <el-table-column label="客户类型" property="provinceName">
        </el-table-column>
        <el-table-column label="联系人" property="managerName" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleDetail(scope.row)">
              去处理
            </el-button>
            <el-button type="text" @click="handleDetail(scope.row)">
              查看
            </el-button>
          </template>
        </el-table-column>
      </wm-table>
    </div>
  </div>
</template>

<script>
import { createHelpers } from 'vuex-map-fields';
import mixins from './mixins';

const { mapFields } = createHelpers({
  getterType: 'getRequirementField',
  mutationType: 'updateRequirementField'
});
export default {
  name: 'RequirementHandleList',
  mixins: [mixins],
  data() {
    return {
      activeName: 'second'
    };
  },
  computed: {
    ...mapFields([
      'handleQuery.organizeType',
      'handleQuery.provinceId',
      'handleQuery.managerName',
      'handleQuery.pageNo',
      'handleQuery.pageSize'
    ])
  },
  methods: {
    handleDetail(row) {
      this.$router.push(`/requirement/detail/${row.organizeId}`);
    }
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

.requirement-handle-management {
  .requirement-list{
    margin-top: $blockWidth;
  }
}
</style>
