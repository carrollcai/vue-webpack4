<template>
  <div class="home">
    <div class="top-container">
      <span>工作台</span>
      <span class="set" @click="homeSet()">首页设置</span>
    </div>
    <div class="mt16" v-if="showOrangize">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>我的集团客户</span>
        </div>
        <div class="group-customer">
          <div v-for="o in homeQueryOrganizeInfo" :key="o" class="group-customer-wrap">
            <div class="group-customer-item">
              <div class="group-customer-item-content">
                <div class="name">
                  {{o.organizeName}}
                </div>
                <div class="code">
                  {{o.organizeCode}}
                </div>
                <div class="detail">
                  <ul>
                    <li>客户经理</li>
                    <li>订购产品</li>
                  </ul>
                  <ul>
                    <li>{{o.managerName}}</li>
                    <li>{{o.orderCount}}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="group-customer-item-more">
            <span class="more" @click="goGroup()">查看更多</span>
          </div>
        </div>
      </el-card>
    </div>
    <div class="mt16" v-if="showTask">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>我的处理任务</span>
        </div>
        <div class="todo-list">
          <ul class="todo-list-item">
            <li v-for="o in taskList" :key="o">
              <p>
                <span class="icon"><i :class="o.icon"></i></span>
                <span>{{o.name}}</span>
              </p>
            </li>
          </ul>
          <ul class="todo-list-item">
            <li>
              <p class="item-content">
                <span>待审核</span>
                <span class="link" v-if="homeQueryTaskInfoOrangize && homeQueryTaskInfoOrangize[0] && homeQueryTaskInfoOrangize[0].count > 0" @click="goGroupUncomplete()">{{homeQueryTaskInfoOrangize[0].count}}</span>
                <span v-else>0</span>
              </p>
              <p class="item-content">
                <span>已审核</span>
                <span v-if="homeQueryTaskInfoOrangize && homeQueryTaskInfoOrangize[1]">{{homeQueryTaskInfoOrangize[1].count}}</span>
              </p>
            </li>
            <li v-if="homeQueryTaskInfoOrder">
              <p class="item-content">
                <span>待处理</span>
                <span class="link" v-if="homeQueryTaskInfoOrder && homeQueryTaskInfoOrder[0] && homeQueryTaskInfoOrder[0].count > 0" @click="goOrderUncomplete()">{{homeQueryTaskInfoOrder[0].count}}</span>
                <span v-else>0</span>
              </p>
              <p class="item-content">
                <span>已处理</span>
                <span v-if="homeQueryTaskInfoOrder && homeQueryTaskInfoOrder[1]">{{homeQueryTaskInfoOrder[1].count}}</span>
              </p>
            </li>
            <li>
              <p class="item-content">
                <span>待处理</span>
                <span class="link" v-if="homeQueryTaskInfoBusiness && homeQueryTaskInfoBusiness[0] && homeQueryTaskInfoBusiness[0].count > 0" @click="goBusinessUncomplete()">{{homeQueryTaskInfoBusiness[0].count}}</span>
                <span v-else>0</span>
              </p>
              <p class="item-content">
                <span>已处理</span>
                <span v-if="homeQueryTaskInfoBusiness && homeQueryTaskInfoBusiness[1]">{{homeQueryTaskInfoBusiness[1].count}}</span>
              </p>
            </li>
            <li>
              <p class="item-content">
                <span>待处理</span>
                <span class="link" v-if="homeQueryTaskInfoRequire && homeQueryTaskInfoRequire[0] && homeQueryTaskInfoRequire[0].count > 0" @click="goRequireUncomplete()">{{homeQueryTaskInfoRequire[0].count}}</span>
                <span v-else>0</span>
              </p>
              <p class="item-content">
                <span>已处理</span>
                <span v-if="homeQueryTaskInfoRequire && homeQueryTaskInfoRequire[1]">{{homeQueryTaskInfoRequire[1].count}}</span>
              </p>
            </li>
            <li>
              <p class="item-content">
                <span>待处理</span>
                <span class="link" v-if="homeQueryTaskInfoVisit && homeQueryTaskInfoVisit[0] && homeQueryTaskInfoVisit[0].count > 0" @click="goVisitUncomplete()">{{homeQueryTaskInfoVisit[0].count}}</span>
                <span v-else>0</span>
              </p>
              <p class="item-content">
                <span>已处理</span>
                <span v-if="homeQueryTaskInfoVisit && homeQueryTaskInfoVisit[1]">{{homeQueryTaskInfoVisit[1].count}}</span>
              </p>
            </li>
          </ul>
        </div>
      </el-card>
    </div>
    <div class="mt16">
      <div class="business" v-if="showBusiness">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>合作商机</span>
            <span class="set" @click="goBusiness()">更多></span>
          </div>
          <div class="box-content" :key="o" v-for="o in homeBusinessList">
            <div class="bar-title">
              {{o.organizeName}}
            </div>
            <div class="bar-content">
              <span>{{o.opporType}}</span>
              <span style="float: right; padding: 3px 0">{{o.createDate}}</span>
            </div>
          </div>
        </el-card>
      </div>
      <div class="order" v-if="showOrder">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>订单总览</span>
            <span class="set" @click="goOrder()">更多></span>
          </div>
          <div class="box-content" :key="o" v-for="o in homeOrderList">
            <div class="bar-title">
              {{o.ordName}}
            </div>
            <div class="bar-content">
              <span class="product">订购：{{o.productName}}</span>
              <span style="float: right; padding: 3px 0" type="text">{{o.ordStatus}}</span>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <el-dialog
      title="首页设置"
      :visible.sync="homeSetDialogVisible"
      width="437px"
      center>
      <div class="dialog-setitle">请选择首页需要展示的模块</div>
      <div class="dialog-content">
        <el-checkbox-group v-model="checkList">
          <el-checkbox v-for="item in moduleList" :label="item.label" :key="item.value">{{item.label}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submit()">确 定</el-button>
        <el-button @click="homeSetDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  data() {
    return {
      homeSetDialogVisible: false,
      checkList: [],
      moduleList: [],
      taskList: [
        {'name': '集团客户审核', 'icon': 'icon-jituan'},
        {'name': '订单处理', 'icon': 'icon-dindan'},
        {'name': '商机处理', 'icon': 'icon-shangji'},
        {'name': '需求处理', 'icon': 'icon-needs'},
        {'name': '走访处理', 'icon': 'icon-zoufang'}
      ],
      showOrangize: false,
      showTask: false,
      showBusiness: false,
      showOrder: false
    };
  },
  beforeMount() {
    this.query();
  },
  computed: {
    ...mapState({
      homeModule: ({ dashboard }) => dashboard.homeModule,
      homeModuleFromMenu: ({ dashboard }) => dashboard.homeModuleFromMenu,
      updateHomeModuleStatus: ({ dashboard }) => dashboard.updateHomeModuleStatus,
      homeBusinessList: ({ dashboard }) => dashboard.homeBusinessList,
      homeOrderList: ({ dashboard }) => dashboard.homeOrderList,
      homeQueryTaskInfoOrangize: ({ dashboard }) => dashboard.homeQueryTaskInfoOrangize,
      homeQueryTaskInfoOrder: ({ dashboard }) => dashboard.homeQueryTaskInfoOrder,
      homeQueryTaskInfoBusiness: ({ dashboard }) => dashboard.homeQueryTaskInfoBusiness,
      homeQueryTaskInfoRequire: ({ dashboard }) => dashboard.homeQueryTaskInfoRequire,
      homeQueryTaskInfoVisit: ({ dashboard }) => dashboard.homeQueryTaskInfoVisit,
      homeQueryOrganizeInfo: ({ dashboard }) => dashboard.homeQueryOrganizeInfo
    })
  },
  methods: {
    homeSet() {
      if (this.homeModuleFromMenu.length > 0) {
        this.homeSetDialogVisible = true;
      } else {
        this.$message({ showClose: true, message: '您没有足够的权限！' });
      }
    },
    submit() {
      if (this.checkList.length > 0) {
        let list = [];
        for (let i = 0; i < this.checkList.length; i++) {
          let str = '';
          switch (this.checkList[i]) {
            case '集团任务':
              str = '24';
              break;
            case '处理任务':
              str = '8';
              break;
            case '合作商机':
              str = '20';
              break;
            case '订单预览':
              str = '13';
              break;
          }
          list.push(str);
        };
        this.updateHomeModule({'homeModule': list}).then(res => {
          this.homeSetDialogVisible = false;
          this.$message({ showClose: true, message: '设置成功！', type: 'success' });
          this.query();
        });
      } else {
        this.$message({ showClose: true, message: '请至少选择一项！' });
      }
    },
    goBusiness() {
      const path = `/business-manage/business`;
      this.$router.push(path);
    },
    goOrder() {
      const path = `/order/overview`;
      this.$router.push(path);
    },
    goGroup() {
      const path = `group-customer/overview`;
      this.$router.push(path);
    },
    goGroupUncomplete() {
      this.$store.state.groupCustomer.auditQuery.activeName = 'first';
      const path = `group-customer/audit-manage`;
      this.$router.push(path);
    },
    goOrderUncomplete() {
      this.$store.state.order.orderHandleTaskForm.businessStatus = '0';
      const path = `order/handle-task`;
      this.$router.push(path);
    },
    goBusinessUncomplete() {
      this.$store.state.business.businessTaskForm.taskHasComplete = '0';
      const path = `business-manage/business-task`;
      this.$router.push(path);
    },
    goRequireUncomplete() {
      this.$store.state.requirement.handleQuery.activeName = 'first';
      const path = `requirement/list`;
      this.$router.push(path);
    },
    goVisitUncomplete() {
      this.$store.state.visit.myVisitManageFrom.state = '2';
      this.$store.state.visit.myVisitManageFrom.visitStatus = ['2'];
      const path = `visit/my-visit-manage`;
      this.$router.push(path);
    },
    query() {
      this.queryCurrentOperator().then(res => {
        if (res.homeModuleFromMenu && res.homeModuleFromMenu.length !== 0) {
          let list = [];
          for (let i = 0; i < res.homeModuleFromMenu.length; i++) {
            let json = {};
            switch (res.homeModuleFromMenu[i]) {
              case '24':
                json.label = '集团任务';
                json.value = 24;
                break;
              case '8':
                json.label = '处理任务';
                json.value = 8;
                break;
              case '20':
                json.label = '合作商机';
                json.value = 20;
                break;
              case '13':
                json.label = '订单预览';
                json.value = 13;
                break;
            }
            list.push(json);
          };
          this.moduleList = list;
        }
        if (res.homeModule && res.homeModule.length !== 0) {
          let list = [];
          for (let i = 0; i < res.homeModule.length; i++) {
            let str = '';
            switch (res.homeModule[i]) {
              case '24':
                str = '集团任务';
                break;
              case '8':
                str = '处理任务';
                break;
              case '20':
                str = '合作商机';
                break;
              case '13':
                str = '订单预览';
                break;
            }
            list.push(str);
          };
          this.checkList = list;
          this.showOrangize = false;
          this.showTask = false;
          this.showBusiness = false;
          this.showOrder = false;
          for (let j = 0; j < this.checkList.length; j++) {
            switch (this.checkList[j]) {
              case '集团任务':
                this.showOrangize = true;
                break;
              case '处理任务':
                this.showTask = true;
                break;
              case '合作商机':
                this.showBusiness = true;
                break;
              case '订单预览':
                this.showOrder = true;
                break;
            }
          }
        }
      });
      this.queryOrganizeInfo();
      let organizeParams = {};
      organizeParams.processId = 10001;
      organizeParams.taskId = [10001, 10002];
      let businessParams = {};
      businessParams.processId = 10002;
      let orderParams = {};
      orderParams.processId = 10003;
      let requireParams = {};
      requireParams.processId = 10004;
      let visitParams = {};
      visitParams.processId = 10005;
      visitParams.taskId = [10009];
      this.queryTaskInfoOrangize(organizeParams);
      this.queryTaskInfoBusiness(businessParams);
      this.queryTaskInfoOrder(orderParams);
      this.queryTaskInfoRequire(requireParams);
      this.queryTaskInfoVisit(visitParams);
      this.getHomeBusinessList();
      this.getHomeOrderList();
    },
    ...mapActions([
      'queryCurrentOperator', 'updateHomeModule', 'getHomeBusinessList', 'getHomeOrderList', 'queryTaskInfoOrangize', 'queryTaskInfoBusiness', 'queryTaskInfoOrder', 'queryTaskInfoRequire', 'queryTaskInfoVisit', 'queryOrganizeInfo'
    ])
  }
};
</script>

<style lang="scss">
.home {
  .set {
    font-size:12px;
    color: #3778FF;
    float: right;
    cursor: pointer;
  }
  .more {
    width: 35px;
    font-size: 12px;
    color: #3778FF;
    cursor: pointer;
    display: inline-block;
  }
  .top-container {
    background-color: #fff;
    padding: 12px 20px;
    font-size: 14px;
  }
  .home-container {
    background-color: #fff;
    padding: 16px 32px;
  }
  .mt16 {
    margin-top: 16px;
  }
  .mr16 {
    margin-right: 16px;
  }
  .home-title {
    height: 16px;
    line-height: 16px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 16px;
    .more {
      float: right;
      left: 769px;
      height: 17px;
      line-height: 17px;
      color: rgba(55, 120, 255, 1);
      font-size: 12px;
      cursor: pointer;
    }
  }
  .group-customer {
    height: 152px;
    .group-customer-item {
      width: 220px;
      height: 145px;
      background-color: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.2);
      float: left;
      .group-customer-item-content {
        padding: 20px 16px;
        .name {
          width: 188px;
          height: 25px;
          line-height: 25px;
          color: rgba(0, 0, 0, 0.65);
          font-size: 14px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .code {
          width: 188px;
          height: 18px;
          line-height: 18px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 12px;
          text-align: left;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .detail {
          margin-top: 17px;
          ul li {
            width: 50%;
            height: 20px;
            line-height: 20px;
            float: left;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          ul:nth-child(1) {
            height: 17px;
            line-height: 17px;
            color: rgba(0, 0, 0, 0.25);
            font-size: 12px;
          }
          ul:nth-child(2) {
            height: 20px;
            line-height: 20px;
            color: rgba(0, 0, 0, 0.85);
            font-size: 14px;
          }
        }
      }
    }
    .group-customer-wrap {
       display: inline-block;
    }
    .group-customer-wrap:nth-child(1) {
      width: 23.7%;
      .group-customer-item {
        border-top: 3px solid rgba(154, 81, 233, 1);
      }
    }
    .group-customer-wrap:nth-child(2) {
      width: 23.7%;
      .group-customer-item {
        border-top: 3px solid rgba(75, 155, 255, 1);
      }
    }
    .group-customer-wrap:nth-child(3) {
      width: 23.7%;
      .group-customer-item {
        border-top: 3px solid rgba(65, 204, 204, 1);
      }
    }
    .group-customer-wrap:nth-child(4) {
      width: 23.7%;
      .group-customer-item {
        border-top: 3px solid rgba(241, 99, 126, 1);
      }
    }
    .group-customer-item-more {
      width: 5.2%;
      text-align: center;
      padding-top: 50px;
      color: rgba(55, 120, 255, 1);
      font-size: 12px;
      float: right;
      button {
        display:inline-block;
        white-space: pre-wrap;
        width: 30px;
      }
    }
  }
  .todo-list {
    background-color: #fff;
    height: 110px;
    .todo-list-item {
      li {
        float: left;
        width: 21%;
        font-size: 14px;
      }
      li:nth-last-child(1) {
        width: 16%;
      }
      .icon {
        display:inline-block;
        width: 15px;
      }
    }
    .item-content {
      padding-left: 20px;
      margin-top: 12px;
      span {
        display: inline-block;
      }
      & span:nth-child(1) {
        width: 63px;
        left: 394px;
        height: 20px;
        line-height: 20px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
      }
      & span:nth-child(2) {
        height: 20px;
        line-height: 20px;
        color: rgba(0, 0, 0, 0.85);
        font-size: 14px;
      }
      .link {
        color: #3778FF !important; cursor: pointer;
      }
    }
  }
  .business {
    float: left;
    margin-right: 1.4%;
  }
  .order {
    float: left;
  }
  .business, .order {
    width: 49.3%;
    background: #fff;
    margin-bottom: 16px;
    .box-content {
      border-bottom: 1px solid #ebeef5;
      padding: 20px 0px;
      .product {
        display: inline-block;
        width: 85%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .bar-title {
        width: 85%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        height: 20px;
        line-height: 20px;
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
      }
      .bar-content {
        height: 20px;
        line-height: 20px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
      }
    }
    .el-card__body {
      padding: 0px 20px;
    }
  }
  .dialog-setitle {
    height: 17px;
    line-height: 17px;
    opacity: 0.7;
    color: rgba(0, 0, 0, 0.45);
    font-size: 12px;
    text-align: center;
  }
  .el-dialog--center .el-dialog__body {
    padding: 0px;
    .dialog-setitle {
      text-align: center;
      margin: 0 auto;
      padding: 0px;
    }
    .dialog-content {
      padding: 0px 53px;
      margin-top: 8px;
      .el-checkbox {
        width: 35%;
        margin-left: 0px;
        margin-top: 8px;
      }
      .el-checkbox:nth-child(3) {
        width: 29%;
      }
    }
  }
  .el-dialog__footer {
    margin-top: 7px;
    text-align: center !important;
  }
  [class^="icon-"], [class*=" icon-"] {
    color: #8EAAE4;
    font-size: 12px;
  }
  .el-button--text {
    text-align: left;
    padding: 0px;
    span {
      color: #3778FF !important;
    }
  }
  .el-card__header {
    font-size: 16px;
  }
  .el-button--primary, .el-button--default {
    line-height: 23px;
    padding: 0;
    width: 72px;
    height: 24px;
  }
}
</style>
