<template>
  <div class="requirement-management">
    <div class="m-container query-block">
      <el-form class="requirement-query-form">
        <div class="flex">
          <el-form-item>
            <el-date-picker
              v-model="rangeDate"
              type="daterange"
              :editable="false"
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>

          <el-form-item class="requirement-form-item__lable requirement-form-item__input">
            <el-select v-model="reqType" clearable placeholder="需求类型">
              <el-option v-for="(item, index) in REQUIREMENT_TYPE" :key="index" :value="item.value" :label="item.label"/>
            </el-select>
          </el-form-item>

          <el-form-item class="requirement-form-item__lable requirement-form-item__input" prop="staffName">
            <el-input v-model="organizeName" clearable placeholder="客户名称"/>
          </el-form-item>
        </div>

        <div class="flex requirement-query-btns">
          <el-form-item>
            <el-button type="primary" @click="query">查询</el-button>
          </el-form-item>
          <el-form-item class="requirement-form-item">
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
        <el-table-column label="创建时间" property="createDate" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="需求客户" property="organizeName" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="需求类型" property="reqTypeName">
        </el-table-column>
        <el-table-column label="联系人" property="contactName" />
        <el-table-column label="处理人" property="processor" />
        <el-table-column label="处理状态" property="reqStatusName" />
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
import { mapState, mapActions } from 'vuex';
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
      STATUS: {
        'first': '',
        'second': '1',
        'third': '2'
      }
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
    ]),
    ...mapState({
      requirements: ({ requirement }) => requirement.requirementList
    })
  },
  methods: {
    handleCreate() {
      const path = `/requirement/create`;
      this.$router.push(path);
    },
    handleDetail(row) {
      this.$router.push(`/requirement/detail/${row.reqId}`);
    },
    getParams() {
      this.rangeDate = this.rangeDate || [];

      const {
        rangeDate,
        activeName,
        organizeName,
        reqType,
        STATUS,
        pageSize,
        pageNo
      } = this;

      return {
        startDate: rangeDate[0],
        endDate: rangeDate[1],
        organizeName,
        reqType,
        pageSize,
        pageNo,
        taskStatus: STATUS[activeName]
      };
    },
    query() {
      this.queryRequirementList(this.getParams());
    },
    ...mapActions([
      'queryRequirementList'
    ])
  }
};
</script>

<style lang="scss">
@import "scss/variables.scss";
.requirement-management {
  .requirement-form-item__lable {
    margin-left: $blockWidth;
  }
  .requirement-query-form {
    display: flex;
    align-items: center;
  }

  .requirement-form-item {
    margin-left: $formWidth;
  }

  .requirement-form-item__input {
    width: $inputWidthQuery;
  }

  .requirement-query-btns{
    margin-left: 40px;
  }

  .requirement-list{
    margin-top: $blockWidth;
  }
}
</style>
