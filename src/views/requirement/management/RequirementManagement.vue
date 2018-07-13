<template>
  <div class="requirement-management">
    <div class="m-container query-block">
      <el-form class="group-form">
        <div class="flex">
          <el-form-item class="user-form-item__input">
            <el-date-picker
              v-model="rangeDate"
              type="datetimerange"
              :editable="false"
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>

          <el-form-item class="group-form-item__input group-form-item__lable">
            <el-select v-model="reqType" clearable placeholder="需求类型">
              <el-option v-for="(item, index) in REQUIREMENT_TYPE" :key="index" :value="item.value" :label="item.label"/>
            </el-select>
          </el-form-item>

          <el-form-item class="group-form-item__input group-form-item__lable" prop="staffName">
            <el-input v-model="organizeName" clearable placeholder="客户名称"/>
          </el-form-item>
        </div>

        <div class="flex">
          <el-form-item class="role-form-item">
            <el-button type="primary" @click="query">查询</el-button>
          </el-form-item>
          <el-form-item class="role-form-item">
            <el-button class="el-button--have-icon" @click="handleCreate" icon="el-icon-plus">新增需求</el-button>
          </el-form-item>
        </div>
      </el-form>

      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部" name="first"></el-tab-pane>
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
        <el-table-column label="需求单号" property="reqCode" show-overflow-tooltip/>
        <el-table-column label="创建时间" show-overflow-tooltip>
          <template slot-scope="scope">
            {{formateDate(scope.row.createDate)}}
          </template>
        </el-table-column>
        <el-table-column label="需求客户" property="organizeName" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="需求类型">
          <template slot-scope="scope">
            {{reqTypeFilter(scope.row.reqType)}}
          </template>
        </el-table-column>
        <el-table-column label="联系人" property="contactName" />
        <el-table-column label="处理人" property="processor" />
        <el-table-column label="处理状态" property="reqStatus" />
        <el-table-column label="操作">
          <template slot-scope="scope">
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
  name: 'RequirementManagement',
  mixins: [mixins],
  data() {
    return {
    };
  },
  computed: {
    ...mapFields([
      'managementQuery.rangeDate',
      'managementQuery.taskStatus',
      'managementQuery.organizeName',
      'managementQuery.reqType',
      'managementQuery.pageNo',
      'managementQuery.pageSize',
      'managementQuery.activeName'
    ])
  },
  methods: {
    handleCreate() {
      const path = `/requirement/create`;
      this.$router.push(path);
    },
    toHandle() {
      this.$router.push(`/requirement/detail/${row.reqId}`);
    },
    handleDetail(row) {
      this.$router.push(`/requirement/detail/${row.reqId}`);
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

.requirement-management {
  .requirement-list{
    margin-top: $blockWidth;
  }
}
</style>
