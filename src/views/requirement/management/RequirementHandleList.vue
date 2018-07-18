<template>
  <div class="requirement-handle-management">
    <div class="m-container">
      <el-form class="group-form" :model="params">
        <div class="flex">
          <el-form-item class="user-form-item__input">
            <el-date-picker
              v-model="rangeDate"
              type="daterange"
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

          <el-form-item class="group-form-item__input group-form-item__lable">
            <el-input v-model="organizeName" clearable placeholder="客户名称"/>
          </el-form-item>
        </div>

        <div class="flex">
          <el-form-item class="role-form-item">
            <el-button type="primary" @click="query">查询</el-button>
          </el-form-item>
        </div>
      </el-form>

      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="未处理" name="first"></el-tab-pane>
        <el-tab-pane label="已处理" name="second"></el-tab-pane>
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
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" v-if="scope.row.hasComplete === '0'" @click="toHandle(scope.row)">
              去处理
            </el-button>
            <el-button type="text" v-else @click="handleDetail(scope.row)">
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
import { mapState, mapActions } from 'vuex';

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
      STATUS: {
        'first': 0,
        'second': 1
      }
    };
  },
  computed: {
    ...mapState({
      requirements: ({ requirement }) => requirement.requirementTasks
    }),
    ...mapFields([
      'handleQuery.rangeDate',
      'handleQuery.taskHasComplete',
      'handleQuery.organizeName',
      'handleQuery.reqType',
      'handleQuery.activeName',
      'handleQuery.pageNo',
      'handleQuery.pageSize'
    ])
  },
  methods: {
    getParams() {
      this.rangeDate = this.rangeDate || ['', ''];

      const {
        rangeDate,
        activeName,
        organizeName,
        reqType,
        pageSize,
        pageNo,
        STATUS
      } = this;

      return {
        startDate: rangeDate[0],
        endDate: rangeDate[1],
        organizeName,
        reqType,
        pageSize,
        pageNo,
        taskHasComplete: STATUS[activeName]
      };
    },
    query() {
      this.queryRequirementTasks(this.getParams());
    },
    handleDetail(row) {
      this.$router.push(`/requirement/handle-detail/${row.reqId}`);
    },
    toHandle(row) {
      this.$router.push(`/requirement/handle/${row.reqId}/${row.taskInsId}`);
    },
    ...mapActions([
      'queryRequirementTasks'
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

.requirement-handle-management {
  .requirement-list{
    margin-top: $blockWidth;
  }
}
</style>
