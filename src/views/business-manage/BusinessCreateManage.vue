<template>
  <div>
    <div class="m-container">
      <el-form class="task-form" ref="taskManageForm">
        <div class="flex">
          <el-form-item prop="date">
            <el-date-picker v-model="myBusinessForm.date" style="width: 225px" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']">
            </el-date-picker>
          </el-form-item>
          <el-form-item class="task-form-item__input group-form-item__lable">
            <el-autocomplete clearable v-model="myBusinessForm.organizeNameOrCode" :fetch-suggestions="querySearchAsync" placeholder="合作集团/编码" @select="handleSelect"></el-autocomplete>
          </el-form-item>
          <el-form-item class="task-form-item__input group-form-item__lable">
            <el-input clearable v-model="myBusinessForm.opporCode" placeholder="商机编码" />
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
      <el-tabs v-model="myBusinessForm.opporStatus" @tab-click="tabChange">
        <el-tab-pane label="全部" :name="0"></el-tab-pane>
        <el-tab-pane label="草稿" :name="1"></el-tab-pane>
        <el-tab-pane label="待处理" :name="2"></el-tab-pane>
        <el-tab-pane label="已转订单" :name="3"></el-tab-pane>
        <el-tab-pane label="已作废" :name="4"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="m-container table-container">
      <wm-table :source="myBusinessList.list" :pageNo="myBusinessForm.pageNo" :pageSize="myBusinessForm.pageSize" :total="myBusinessList.totalCount" @onPagination="onPagination" @onSizePagination="onSizePagination">
        <el-table-column label="商机编号" show-overflow-tooltip property="opporCode" />
        <el-table-column label="商机描述" show-overflow-tooltip property="busiDesc" />
        <el-table-column label="合作集团" property="organizeName">
          <template slot-scope="scope">
            <div>
              {{scope.row.organizeName}}
              <el-popover v-model="scope.row.dialogVisible" v-if="!scope.row.organizeId" placement="bottom" width="256" trigger="click" @show="resetOrganizeInfo">
                <div class="o-popover-title">
                  系统暂未录入该集团，请尽快关联已录入集团！
                </div>
                <el-form style="margin-top: 16px;" ref="organizeNameInfo" :rules="organizeNameInfoRules" :model="organizeNameInfo">
                  <el-form-item class="margin-bottom-16" prop="organizeName">
                    <el-autocomplete class="form-input-medium" v-model="relationcooperName" :fetch-suggestions="querySearchAsync" placeholder="合作集团/编码" @select="selectOrg"></el-autocomplete>
                  </el-form-item>
                  <el-form-item class="margin-bottom-16" prop="organizeName">
                    <el-button type="primary" @click="relationConfirm(scope.row)">确 定</el-button>
                    <el-button @click="relationCancel(scope.row)">取 消</el-button>
                  </el-form-item>
                </el-form>
                <i slot="reference" class="el-icon-info"></i>
              </el-popover>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" show-overflow-tooltip property="createDate" />
        <el-table-column label="联系人" show-overflow-tooltip property="contactName" />
        <el-table-column label="处理人" show-overflow-tooltip property="processor" />
        <el-table-column label="商机状态" show-overflow-tooltip property="opporStatusName" />
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
    </div>
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
      noData: false,
      editOrgParam: {}
    };
  },
  watch: {
    status(newValue) {
      this.query();
    }
  },
  beforeMount() {
    this.query();
  },
  methods: {
    tabChange(val) {
      this.myBusinessForm.pageNo = 1;
      this.myBusinessForm.pageSize = 20;
      this.query();
    },
    isDraft(row) {
      return row.opporStatusName === '草稿';
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
      if (time) {
        this.myBusinessForm.startDate = time[0];
        this.myBusinessForm.endDate = time[1];
      } else {
        this.myBusinessForm.startDate = '';
        this.myBusinessForm.endDate = '';
      }
    },
    handleDetail(row) {
      const path = `/business-manage/business-detail/${row.opporId}/0/0`;
      this.$router.push(path);
    },
    createBusiness() {
      const path = `/business-manage/create-business`;
      this.$router.push(path);
    },
    query() {
      const params = this.myBusinessForm;

      if (params.date !== null && params.date.length === 2) {
        params.startDate = params.date[0];
        params.endDate = params.date[1];
      } else {
        params.startDate = '';
        params.endDate = '';
      }
      let { date, ..._params } = this.myBusinessForm;
      if (_params.opporStatus > 0) {
        _params.opporStatus = _params.opporStatus - 1;
      } else {
        _params.opporStatus = '';
      }
      this.getMyBusinessList(_params);
      // const params = this.myBusinessForm;
      // if (parseInt(this.status) > 0) {
      //   this.myBusinessForm.opporStatus = parseInt(this.status) - 1;
      // } else {
      //   this.myBusinessForm.opporStatus = '';
      // }
      // // params.opporStatus = parseInt(this.status);
      // this.getMyBusinessList(params);
    },
    async querySearchAsync(queryString, cb) {
      if (!queryString) return false;
      let params = {
        pageSize: 20,
        organizeName: queryString
      };
      await this.getCooperationGroupList(params);
      await clearTimeout(this.timeout);
      this.timeout = await setTimeout(() => {
        var cooperationGroupList = this.cooperationGroupList;
        var results = queryString ? cooperationGroupList.filter(this.createStateFilter(queryString)) : cooperationGroupList;
        // if (results.length === 0) {
        //   this.noData = true;
        // } else {
        //   this.noData = false;
        // };
        cb(results);
      }, 1000);
    },
    createStateFilter(queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    selectOrg(item) {
      this.editOrgParam.organizeId = item.organizeId;
      this.editOrgParam.organizeName = item.organizeName;
    },
    handleSubmit(row) {
      this.$confirm('您确定要提交该条商机信息?', ' ', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const param = {};
        param.id = row.opporId.toString();
        var _this = this;
        this.submitBusinessDraft(param).then(res => {
          if (res.data && res.errorInfo.code === '200') {
            const h = this.$createElement;
            _this.$message({
              message: h('p', null, [
                h('p', null, '您已成功提交该条商机！ '),
                h('p', null, '处理人' + res.data.dealPersonName)
              ])
            });
            _this.query();
          } else {
            _this.$message({ showClose: true, message: '提交失败！', type: 'error' });
          }
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
        const param = {};
        param.opporId = row.opporId;
        var _this = this;
        this.delBusinessOppority(param).then(res => {
          if (res.data && res.errorInfo.code === '200') {
            _this.$message({ showClose: true, message: '您已成功删除该条商机！', type: 'success' });
            _this.query();
          } else {
            _this.$message({ showClose: true, message: '删除失败！', type: 'error' });
          }
        });
      }).catch(() => {
        this.$message('已取消删除');
      });
    },
    handleEdit(row) {
      const path = `/business-manage/update-business/${row.opporId}`;
      this.$router.push(path);
    },
    showAssociate(row) {
      this.editOrgParam.opporId = row.opporId;
      this.relationDialogVisible = true;
    },
    relationConfirm(row) {
      var _this = this;
      this.editOrgParam.opporId = row.opporId;
      this.editOrgParam.organizeName = this.relationcooperName;
      if (this.editOrgParam.organizeId) {
        this.groupAssociation(this.editOrgParam).then(res => {
          if (res.data && res.errorInfo.code === '200') {
            _this.$message({ showClose: true, message: '您已成功关联!', type: 'success' });
            this.relationcooperName = '';
            _this.editOrgParam = {};
            _this.hideAssociate();
            _this.query();
          } else {
            _this.$message({ showClose: true, message: '关联失败！', type: 'error' });
          }
        });
      } else {
        this.$message('集团不存在');
      }
    },
    relationCancel(row) {
      this.relationcooperName = '';
      row.dialogVisible = false;
    },
    hideAssociate() {
      this.relationDialogVisible = false;
    },
    ...mapActions([
      'getCooperationGroupList', 'getMyBusinessList', 'groupAssociation', 'delBusinessOppority', 'submitBusinessDraft'
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
