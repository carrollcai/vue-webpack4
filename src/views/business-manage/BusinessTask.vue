<template>
  <div class="m-container">
    <el-form class="task-form" ref="taskManageForm" :rules="taskManageRules">
      <div class="flex">
        <el-form-item>
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
    </el-form>
    <el-tabs v-model="status">
      <el-tab-pane label="待处理"></el-tab-pane>
      <el-tab-pane label="已处理"></el-tab-pane>
    </el-tabs>
    <wm-table :source="businessList" :pageNo="businessForm.pageNo" :pageSize="businessForm.pageSize" :total="businessForm.totalcount" @onPagination="onPagination" @onSizePagination="onSizePagination">
      <el-table-column label="商机编号" property="num" />
      <el-table-column label="商机描述" property="desc" />
      <el-table-column label="合作集团" property="group" />
      <el-table-column label="创建时间" property="time" />
      <el-table-column label="联系人" property="contacts" />
      <el-table-column v-if="status === '1'" label="处理人" property="process" />
      <el-table-column v-if="status === '1'" label="处理结果" property="result" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button v-if="status === '0'" type="text" @click="handleTrans(scope.row)">
            转订单
          </el-button>
          <template v-if="status === '0'">
            <el-dropdown @command="handleCommand(scope.row, $event)">
              <el-button type="text">
                更多<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item class="el-dropdown-link" command="detail">详情</el-dropdown-item>
                <el-dropdown-item class="el-dropdown-link" command="send">分派</el-dropdown-item>
                <el-dropdown-item class="el-dropdown-link" command="cancel">作废</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
          <el-button v-if="status === '1'" type="text" @click="handleDetail(scope.row)">
            详情
          </el-button>
        </template>
      </el-table-column>
    </wm-table>
    <el-dialog width="433px" height="312px" title="分派" :visible.sync="cancelDialogVisible">
      <el-form ref="form" :model="sendForm">
        <el-form-item label="指派处理人：" prop="">
          <el-cascader style="width: 392px;" v-if="designPerson"
            :options="designPerson"
            v-model="selectedDesignPerson"
            @change="handleChange">
          </el-cascader>
        </el-form-item>
        <el-form-item label="分派的原因：">
          <el-input type="textarea" v-model="businessForm.businessName" placeholder="请输入优势能力"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="cancelDialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog width="433px" height="312px" title="分派" :visible.sync="cancelDialogVisible">
      <el-form ref="form" :model="sendForm">
        <el-form-item label="指派处理人：" prop="">
          <el-cascader style="width: 392px;" v-if="designPerson"
            :options="designPerson"
            v-model="selectedDesignPerson"
            @change="handleChange">
          </el-cascader>
        </el-form-item>
        <el-form-item label="分派的原因：">
          <el-input type="textarea" v-model="businessForm.businessName" placeholder="请输入优势能力"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="cancelDialogVisible = false">确 定</el-button>
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
      businessForm: ({ business }) => business.businessForm,
      businessList: ({ business }) => business.businessList,
      designatePerson: ({business}) => business.designatePerson,
      remindPerson: ({business}) => business.remindPerson
    })
  },
  data() {
    return {
      status: 0,
      taskManageRules: {
      },
      cooperNum: '',
      cancelReason: '',
      cancelDialogVisible: false,
      sendForm: {
        area: ''
      },
      largeArea: [
        { 'label': '总部', 'value': '0' },
        { 'label': '咪咕子公司', 'value': '1' },
        { 'label': '销售大区', 'value': '2' }
      ],
      designPerson: [],
      selectedDesignPerson: ''
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
    handleTrans(row) {
      const path = `/business-manage/transfor-order/${row.id}`;
      this.$router.push(path);
    },
    handleSend(row) {
      this.cancelDialogVisible = true;
      // 获取指派处理人
      this.getDesignatePerson().then((res) => {
        this.designPerson = res;
      })
    },
    handleCancel(row) {
      let option = '<p class="seTitle">作废的原因：</p>' +
      '<textarea ref="cancelReason" class="zfinput" placeholder="请输入作废原因"></textarea>' +
      '<p class="zftext">*如确定要作废该商机，请填写原因供创建者查看!</p>';
      this.$prompt(option, '作废', {
        dangerouslyUseHTMLString: true,
        showInput: false
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '作废成功！'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消作废'
        });
      });
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
    handleCommand(row, command) {
      let COMMANDS = {
        'detail': 'handleDetail',
        'send': 'handleSend',
        'cancel': 'handleCancel'
      };
      this[COMMANDS[command]](row);
    },
    handleChange(value) {
    },
    ...mapActions([
      'getCooperationGroupList', 'getBusinessList', 'getDesignatePerson', 'getRemindPerson'
    ])
  }
};
</script>

<style lang="scss">
@import "scss/variables.scss";
.group-form-item__lable {
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
// 弹出框样式设置
.seTitle {
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
}
.select {
  width: 390px;
  height: 32px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  color: #606266;
}
.zfinput {
  width:358px;
  height: 68px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  padding: 10px 15px;
  font-size:14px;
  color: rgba(0, 0, 0, 0.25);
  resize: none;
}
.zftext {
  height: 20px;
  line-height: 20px;
  color: rgba(0, 0, 0, 0.25);
  font-size: 14px;
}
</style>
