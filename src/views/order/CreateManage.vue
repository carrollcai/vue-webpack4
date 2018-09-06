<template>
  <div>
    <div class="m-container">
      <el-form class="form-manage"
        ref="orderCreateManage"
        :rules="orderCreateManageRules"
        :model="orderCreateManageForm">
        <div class="flex">
          <el-form-item prop="date">
            <el-date-picker v-model="orderCreateManageForm.date"
              type="daterange"
              start-placeholder="创建开始日期"
              end-placeholder="创建结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item class="form-query-input-width form-left-width">
            <el-input clearable
              v-model="orderCreateManageForm.ordNameOrCode"
              placeholder="订单编号/名称" />
          </el-form-item>
          <el-form-item class="form-query-input-width form-left-width">
            <el-input clearable
              v-model="orderCreateManageForm.organizeNameOrCode"
              placeholder="合作集团/编码" />
          </el-form-item>
        </div>
        <div class="flex">
          <el-form-item class="form-left-width">
            <el-button type="primary"
              @click="query">查询</el-button>
          </el-form-item>
          <el-form-item class="form-left-width">
            <el-button class="el-button--have-icon"
              @click.prevent="handleCreate"
              icon="el-icon-plus">新建订单</el-button>
          </el-form-item>
        </div>
      </el-form>
      <el-tabs v-model="orderCreateManageForm.ordStatus"
        @tab-click="tabChange">
        <el-tab-pane label="全部"
          name="0"></el-tab-pane>
        <el-tab-pane label="草稿"
          name="1"></el-tab-pane>
        <el-tab-pane label="待签约"
          name="2"></el-tab-pane>
        <el-tab-pane label="待付款"
          name="3"></el-tab-pane>
        <el-tab-pane label="已完成"
          name="4"></el-tab-pane>
        <el-tab-pane label="已取消"
          name="5"></el-tab-pane>
      </el-tabs>
    </div>

    <div class="m-container table-container">
      <wm-table :source="orderCreateManageObj.list"
        :pageNo="orderCreateManageForm.pageNo"
        :pageSize="orderCreateManageForm.pageSize"
        :total="orderCreateManageObj.totalCount"
        @onPagination="onPagination"
        @onSizePagination="onSizePagination">
        <el-table-column label="订单编号"
          property="ordCode" />
        <el-table-column label="订单名称"
          property="ordName" />
        <el-table-column label="创建时间"
          property="createDate" />
        <el-table-column label="合作集团"
          property="organizeName">
          <template slot-scope="scope">
            <div>
              {{scope.row.organizeName}}
              <el-popover v-model="scope.row.dialogVisible"
                v-if="!scope.row.organizeId"
                placement="bottom"
                width="256"
                trigger="click"
                @show="resetOrganizeInfo">
                <div class="o-popover-title">
                  系统暂未录入该集团，请尽快关联已录入集团！
                </div>
                <el-form style="margin-top: 16px;"
                  ref="organizeNameInfo"
                  :rules="organizeNameInfoRules"
                  :model="organizeNameInfo">
                  <el-form-item class="margin-bottom-16"
                    prop="organizeName">
                    <el-autocomplete :maxLength="25"
                      class="form-input-medium"
                      v-model="organizeNameInfo.organizeName"
                      :fetch-suggestions="querySearchAsync"
                      placeholder="合作集团/编码"
                      @select="handleSelect"></el-autocomplete>
                  </el-form-item>
                  <el-form-item class="margin-bottom-16"
                    prop="organizeName">
                    <el-button type="primary"
                      @click="connectOrganize(scope.row)">确 定</el-button>
                    <el-button @click="scope.row.dialogVisible = false">取 消</el-button>
                  </el-form-item>
                </el-form>
                <i slot="reference"
                  class="el-icon-info"></i>
              </el-popover>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="联系人"
          property="contactName" />
        <el-table-column label="订购产品及状态">
          <template slot-scope="scope">
            <p v-for="item in scope.row.ordProductDtoList"
              :key="item">
              <b>{{item.ordStatusName}}</b>{{item.productName ? '：' + item.productName : ''}}</p>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button class="table-button"
              type="text"
              @click="handleDetail(scope.row)">
              详情
            </el-button>
            <el-dropdown class="table-more-btn"
              v-if="scope.row.ordStatus === 1"
              @command="handleCommand(scope.row, $event)">
              <span class="el-dropdown-link">
                更多
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item class="el-dropdown-link"
                  command="submit">提交</el-dropdown-item>
                <el-dropdown-item class="el-dropdown-link"
                  command="edit">修改</el-dropdown-item>
                <el-dropdown-item class="el-dropdown-link"
                  command="delete">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </wm-table>
    </div>
  </div>
</template>

<script>
import WmTable from 'components/Table.vue';
import { mapActions, mapState, mapMutations } from 'vuex';
import { ORDER_STATUS, PAGE_SIZE } from '@/config/index.js';
import dayjs from 'dayjs';

export default {
  data() {
    return {
      isNotPageChange: true,
      orderStatus: ORDER_STATUS,
      orderCreateManageRules: {},
      organizeNameInfoRules: {},
      organizeNameInfo: {
        pageSize: PAGE_SIZE,
        organizeName: ''
      },
      organizeNameList: []
    };
  },
  components: {
    WmTable
  },
  computed: {
    ...mapState({
      orderCreateManageObj: ({ order }) => order.orderCreateManageObj,
      orderCreateManageForm: ({ order }) => order.orderCreateManageForm,
      orderOrganizeAddressList: ({ order }) => order.orderOrganizeAddressList
    })
  },
  beforeMount() {
    this.$nextTick(() => {
      this.query();
    });
  },
  methods: {
    resetOrganizeInfo() {
      this.organizeNameInfo.organizeName = '';
    },
    async querySearchAsync(queryString, cb) {
      if (!queryString) return false;
      let params = {
        pageSize: this.organizeNameInfo.pageSize,
        organizeName: queryString
      };
      await this.getOrganizeAddress(params);

      await clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.organizeNameList = this.orderOrganizeAddressList;

        cb(this.orderOrganizeAddressList);
      }, 1000);
    },
    async connectOrganize(row) {
      const { organizeName } = this.organizeNameInfo;
      const isSelected = val => val.organizeName === organizeName || val.organizeCode === organizeName;
      const selectedObj = this.organizeNameList.filter(isSelected)[0];
      if (selectedObj) {
        await this.setConnectOriganize({
          ordCode: row.ordCode,
          organizeId: selectedObj.organizeId,
          organizeName: selectedObj.organizeName
        });

        await this.$message.success('关联集团成功');
        row.dialogVisible = false;
        await this.query();
      } else {
        this.$message.error('集团不存在');
      }
    },
    tabChange(val) {
      this.pageChange();
      this.query();
    },
    handleCommand(row, command) {
      let COMMANDS = {
        'edit': 'handleEdit',
        'delete': 'handleDelete',
        'submit': 'handleSubmit'
      };
      this[COMMANDS[command]](row);
    },
    async onPagination(value) {
      this.isNotPageChange = false;
      this.pageChange({ pageNo: value });
      await this.query();
      this.isNotPageChange = true;
    },
    onSizePagination(value) {
      this.pageChange({ pageSize: value });
      this.query();
    },
    handleEdit(row) {
      const path = `/order/manage/edit/${row.ordCode}`;
      this.$router.push(path);
    },
    handleDelete(row) {
      this.$confirm('您确定要删除该条订单消息？', ' ', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteOrderRow({ ordCode: row.ordCode }).then(() => {
          this.$message({
            type: 'success',
            message: '您已成功删除该条订单！'
          });
          this.query();
        });
      }).catch(() => {
        this.$message('已取消删除');
      });
    },
    handleSubmit(row) {
      this.$confirm('您确定要提交该条订单消息？', ' ', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 提交订单
        this.submitOrderRow({ code: row.ordCode }).then(() => {
          this.$message({
            type: 'success',
            dangerouslyUseHTMLString: true,
            message: `<p>您已成功提交该订单！</p>`
          });
          this.query();
        });
      }).catch(() => {
        this.$message('已取消提交');
      });
    },
    handleDetail(row) {
      const path = `/order/create-manage/detail/${row.ordCode}${row.processInsId ? `/${row.processInsId}` : ''}`;
      this.$router.push(path);
    },
    handleCreate() {
      const path = `/order/manage/create`;
      this.$router.push(path);
    },
    query() {
      // 查询的时候，需要将pageNo置为1
      this.isNotPageChange && this.pageChange({ pageNo: 1 });
      const params = Object.cloneDeep(this.orderCreateManageForm);

      if (params.date && params.date.length) {
        params.startDate = dayjs(params.date[0]).format('YYYY-MM-DD');
        params.endDate = dayjs(params.date[1]).format('YYYY-MM-DD');
      } else {
        params.startDate = '';
        params.endDate = '';
      }

      let { date, ..._params } = params;
      this.$refs['orderCreateManage'].validate(valid => {
        if (!valid) return false;

        this.getCreateManageList(_params);
      });
    },
    ...mapMutations({
      pageChange: 'ORDER_CM_PAGE_CHANGE'
    }),
    ...mapActions([
      'getCreateManageList',
      'submitOrderRow',
      'deleteOrderRow',
      'setConnectOriganize',
      'getOrganizeAddress'
    ])
  }
};
</script>
