<template>
  <div class="m-container">
    <el-form class="task-form" ref="taskManageForm" :rules="taskManageRules">
      <div class="flex">
        <el-form-item prop="date">
          <el-date-picker v-model="businessForm.date" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item class="task-form-item__input group-form-item__lable">
          <el-autocomplete v-model="businessForm.cooperName" :fetch-suggestions="querySearchAsync" placeholder="合作集团/编码" @select="handleSelect"></el-autocomplete>
        </el-form-item>
        <el-form-item class="task-form-item__input group-form-item__lable">
          <el-input v-model="businessForm.businessName" placeholder="商机编码" />
        </el-form-item>
      </div>
      <div class="flex">
        <el-form-item class="task-form-item group-form-item__lable">
          <el-button type="primary" @click="query">查询</el-button>
        </el-form-item>
      </div>
      <div class="flex">
        <el-form-item class="task-form-item group-form-item__lable">
          <el-button type="default" @click="createBusiness">新建商机</el-button>
        </el-form-item>
      </div>
    </el-form>
    <el-tabs v-model="status">
      <el-tab-pane label="全部"></el-tab-pane>
      <el-tab-pane label="草稿"></el-tab-pane>
      <el-tab-pane label="待处理"></el-tab-pane>
      <el-tab-pane label="已转订单"></el-tab-pane>
      <el-tab-pane label="已作废"></el-tab-pane>
    </el-tabs>
    <wm-table :source="businessList" :pageNo="businessForm.pageNo" :pageSize="businessForm.pageSize" :total="businessForm.totalcount" @onPagination="onPagination" @onSizePagination="onSizePagination">
      <el-table-column label="商机编号" property="num" />
      <el-table-column label="商机描述" property="desc" />
      <el-table-column label="合作集团" property="group">
        <template slot-scope="scope">
          <span style="margin-right: 10px">{{ scope.row.group }}</span>
          <i class="icon-info"></i>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" property="time" />
      <el-table-column label="联系人" property="contacts" />
      <el-table-column label="处理人" property="process" />
      <el-table-column label="商机状态" property="result" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="handleDetail(scope.row)">
            详情
          </el-button>
          <el-popover placement="bottom-start" style="min-width: 65px !important;" trigger="hover">
            <p class="tipText" @click="handleSubmit(scope.row)">提交</p><p class="tipText">修改</p><p class="tipText">删除</p>
            <el-button style="margin-left: 10px" type="text" slot="reference">更多</el-button>
          </el-popover>
          <!--<el-button type="text" @click="handleDetail(scope.row)">
            更多
          </el-button>-->
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
    cooperNumList() {
      if (this.cooperationGroupList) {
        return this.cooperationGroupList;
      }
    },
    ...mapState({
      cooperationGroupList: ({ business }) => business.cooperationGroupList,
      businessForm: ({ business }) => business.businessForm,
      businessList: ({ business }) => business.businessList
    })
  },
  data() {
    return {
      status: 0,
      taskManageRules: {
      },
      cooperNum: ''
    };
  },
  watch: {
    status(newValue) {
      this.query();
    }
  },
  beforeMount() {
    this.getCooperationGroupList();
    this.query();
  },
  methods: {
    onPagination(value) {
      this.businessForm.pageNo = value;
      this.query();
    },
    onSizePagination(value) {
      this.businessForm.pageSize = value;
      this.query();
    },
    handleDetail(row) {
      const path = `/business-manage/business-detail/${row.id}`;
      this.$router.push(path);
    },
    createBusiness() {
      const path = `/business-manage/create-business`;
      this.$router.push(path);
    },
    query() {
      const params = this.businessForm;
      params.status = this.status;
      this.getBusinessList(params);
    },
    querySearchAsync(queryString, cb) {
      var cooperNumList = this.cooperNumList;
      var results = queryString ? cooperNumList.filter(this.createStateFilter(queryString)) : cooperNumList;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 100 * Math.random());
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    handleSelect(item) {
    },
    handleSubmit(row) {
      this.$confirm('您确定要提交该条商机信息?', ' ', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message('您已成功提交该条商机！');
      }).catch(() => {
        this.$message('已取消提交');
      });
    },
    ...mapActions([
      'getCooperationGroupList', 'getBusinessList'
    ])
  }
};
</script>

<style lang="scss">
@import "scss/variables.scss";
.group-form-item__lable {
  margin-left: $blockWidth;
}
.task-header {
  margin-bottom: 16px;
}
.task-form-item__lable {
  margin-left: $blockWidth;
}
.task-form {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.task-form-item__input {
  width: $inputWidthQuery;
}
.task-form-item {
  margin-left: $formWidth;
}
.el-popover {
  min-width: 35px !important;
}
.tipText {
  height: 25px;
  line-height: 25px;
  color: rgba(55, 120, 255, 1);
  font-size: 14px;
}
</style>
