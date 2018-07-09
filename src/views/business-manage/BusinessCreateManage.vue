<template>
  <div class="m-container">
    <el-form class="task-form" ref="taskManageForm">
      <div class="flex">
        <el-form-item prop="date">
          <el-date-picker v-model="timeRange" @change="getTimeRange" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item class="task-form-item__input group-form-item__lable">
          <el-autocomplete v-model="myBusinessForm.orgFilter" :fetch-suggestions="querySearchAsync" placeholder="合作集团/编码" @select="handleSelect"></el-autocomplete>
        </el-form-item>
        <el-form-item class="task-form-item__input group-form-item__lable">
          <el-input v-model="myBusinessForm.opporCode" placeholder="商机编码" />
        </el-form-item>
      </div>
      <div class="flex">
        <el-form-item class="task-form-item">
          <el-button type="primary" @click="query">查询</el-button>
        </el-form-item>
        <el-form-item class="business-form-item">
          <el-button class="el-button--have-icon" @click.prevent="createBusiness" icon="el-icon-plus">新建商机</el-button>
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
    <wm-table :source="businessList" :pageNo="myBusinessForm.pageNo" :pageSize="myBusinessForm.pageSize" :total="myBusinessForm.totalcount" @onPagination="onPagination" @onSizePagination="onSizePagination">
      <el-table-column label="商机编号" property="num" />
      <el-table-column label="商机描述" property="desc" />
      <el-table-column label="合作集团" property="group">
        <template slot-scope="scope">
          <span style="margin-right: 10px">{{ scope.row.group }}</span>
          <el-popover placement="top" width="200" trigger="hover">
            <div class="tipText1">系统暂未录入该集团，请尽快关联！</div>
            <div class="tipText tipText1 el-dropdown-link" @click="showAssociate(scope.row)">立即关联</div>
            <i class="icon-info" slot="reference"></i>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" property="time" />
      <el-table-column label="联系人" property="contacts" />
      <el-table-column label="处理人" property="process" />
      <el-table-column label="商机状态" property="result" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button class="el-dropdown-link" type="text" @click="handleDetail(scope.row)">
            详情
          </el-button>
          <template v-if="isDraft(scope.row)">
            <el-dropdown @command="handleCommand(scope.row, $event)">
              <span class="el-dropdown-link">
                更多<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item class="el-dropdown-link" command="submit">提交</el-dropdown-item>
                <el-dropdown-item class="el-dropdown-link" command="edit">修改</el-dropdown-item>
                <el-dropdown-item class="el-dropdown-link" command="delete">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </template>
      </el-table-column>
    </wm-table>
    <el-dialog class="business-create-manage-dialog" width="433px" height="312px" title="立即关联" :visible.sync="relationDialogVisible">
      <el-form ref="form">
        <el-form-item label="关联集团名称/编码：" prop="">
          <el-autocomplete style="width: 390px;" v-model="relationcooperName" :fetch-suggestions="querySearchAsync" placeholder="合作集团/编码" @select="handleSelect" @blur="noData = false;"></el-autocomplete>
          <el-card class="box-card" v-if="noData">
            <div>
              系统暂未录入该集团，你可以暂时手动输入，建议后续尽快录入并同步关联修改！
            </div>
          </el-card>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="relationCancel">取 消</el-button>
        <el-button type="primary" @click="relationConfirm">确 定</el-button>
      </div>
    </el-dialog>
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
      myBusinessForm: ({ business }) => business.myBusinessForm,
      myBusinessList: ({ business }) => business.myBusinessList
    })
  },
  data() {
    return {
      status: 0,
      timeRange: '',
      cooperNum: '',
      relationDialogVisible: false,
      relationcooperName: '',
      noData: false
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
    isDraft(row) {
      // return row.orgTaskStatus === '1';
      return true;
    },
    handleCommand(row, command) {
      let COMMANDS = {
        'edit': 'handleEdit',
        'delete': 'handleDelete',
        'submit': 'handleSubmit'
      };
      this[COMMANDS[command]](row);
    },
    onPagination(value) {
      this.myBusinessForm.pageNo = value;
      this.query();
    },
    onSizePagination(value) {
      this.myBusinessForm.pageSize = value;
      this.query();
    },
    getTimeRange(time) {
      this.myBusinessForm.createStartDate = time[0];
      this.myBusinessForm.createEndDate = time[1];
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
      const params = this.myBusinessForm;
      params.opporStatus = parseInt(this.status);
      this.getMyBusinessList(params);
    },
    querySearchAsync(queryString, cb) {
      var cooperNumList = this.cooperNumList;
      var results = queryString ? cooperNumList.filter(this.createStateFilter(queryString)) : cooperNumList;
      if (results.length === 0) {
        this.noData = true;
      } else {
        this.noData = false;
      };
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
        this.$message({
          dangerouslyUseHTMLString: true,
          message: '<p>您已成功提交该条商机！</p><p>处理人：张三疯</p>'
        });
      }).catch(() => {
        this.$message('已取消提交');
      });
    },
    handleDelete(row) {
      this.$confirm('您确定要删除该条商机信息?', ' ', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message('您已成功删除该条商机！');
      }).catch(() => {
        this.$message('已取消删除');
      });
    },
    handleEdit(row) {
      const path = `/business-manage/update-business/${row.id}`;
      this.$router.push(path);
    },
    showAssociate(row) {
      this.relationcooperName = '';
      this.relationDialogVisible = true;
    },
    relationConfirm() {
      this.groupAssociation().then(res => {
        this.$message({
          type: 'success',
          message: '您已成功关联: '
        });
        this.relationcooperName = '';
        this.hideAssociate();
      });
    },
    relationCancel() {
      this.relationcooperName = '';
      this.hideAssociate();
    },
    hideAssociate() {
      this.relationDialogVisible = false;
    },
    ...mapActions([
      'getCooperationGroupList', 'getMyBusinessList', 'groupAssociation', 'delBusinessOppority'
    ])
  }
};
</script>

<style lang="scss">
@import "scss/variables.scss";
.group-form-item__lable {
  margin-left: $blockWidth;
}
.business-form-item {
  margin-left: $formWidth;
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
.el-dropdown-link{
  color: $buttonColor;
  cursor: pointer;
}
.tipText {
  height: 25px;
  line-height: 25px;
  font-size: 14px;
}
.tipText1{
  font-size:11px;height: 22px;line-height:22px;
}
// 弹出框样式设置
.business-create-manage-dialog{
  .el-dialog__body {
    padding: 0px 20px;
  }
  .box-card {
    line-height: 20px;
    position:absolute;
    .el-card__body {
      padding: 10px;
      color: rgba(0,0,0,0.45);
    }
  }
}
</style>
