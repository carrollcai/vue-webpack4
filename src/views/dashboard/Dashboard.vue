<template>
  <div class="home">
    <div class="m-container">
      <span>工作台</span>
      <el-button style="float: right; padding: 3px 0" type="text" @click="homeSet()">首页设置</el-button>
    </div>
    <div class="mt16">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>我的集团客户</span>
        </div>
        <div class="group-customer">
          <!--{{'列表内容 ' + o }}-->
          <div v-for="o in 4" :key="o" class="group-customer-item">
            <div>
              <div class="group-customer-item-content">
                <div class="name">
                  中国石化上海石油股份…
                </div>
                <div class="code">
                  2012568489
                </div>
                <div class="detail">
                  <ul>
                    <li>客户经理</li>
                    <li>订购产品</li>
                  </ul>
                  <ul>
                    <li>订购产品</li>
                    <li>4</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="group-customer-item-more">
            查看更多
          </div>
        </div>
      </el-card>
    </div>
    <div class="mt16">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>我的处理任务</span>
        </div>
        <div class="todo-list">
          <ul class="todo-list-item">
            <li v-for="o in taskList" :key="o">
              <p>
                <span><i :class="o.icon"></i></span>
                <span>{{o.name}}</span>
              </p>
            </li>
          </ul>
          <ul class="todo-list-item">
            <li v-for="o in 5" :key="o">
              <p class="item-content">
                <span>待审核</span>
                <span>0</span>
              </p>
              <p class="item-content">
                <span>已审核</span>
                <span>0</span>
              </p>
            </li>
          </ul>
        </div>
      </el-card>
    </div>
    <div class="mt16">
      <div class="business">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>合作商机</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="goBusiness()">更多></el-button>
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
      <div class="order">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>订单总览</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="goOrder()">更多></el-button>
          </div>
          <div class="box-content" :key="o" v-for="o in homeOrderList">
            <div class="bar-title">
              {{o.ordName}}
            </div>
            <div class="bar-content">
              <span class="product">订购：{{o.productName}}</span>
              <el-button style="float: right; padding: 3px 0" type="text">{{o.ordStatus}}</el-button>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <el-dialog
      title="首页设置"
      :visible.sync="homeSetDialogVisible"
      width="30%"
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
      ]
    };
  },
  beforeMount() {
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
      }
    });
    this.getHomeBusinessList();
    this.getHomeOrderList();
  },
  computed: {
    ...mapState({
      homeModule: ({ dashboard }) => dashboard.homeModule,
      homeModuleFromMenu: ({ dashboard }) => dashboard.homeModuleFromMenu,
      updateHomeModuleStatus: ({ dashboard }) => dashboard.updateHomeModuleStatus,
      homeBusinessList: ({ dashboard }) => dashboard.homeBusinessList,
      homeOrderList: ({ dashboard }) => dashboard.homeOrderList
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
          if (res.errorInfo.code === '200') {
            this.homeSetDialogVisible = false;
            this.$message({ showClose: true, message: '设置成功！', type: 'success' });
          } else {
            this.$message({ showClose: true, message: '设置失败！', type: 'error' });
          }
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
    ...mapActions([
      'queryCurrentOperator', 'updateHomeModule', 'getHomeBusinessList', 'getHomeOrderList'
    ])
  }
};
</script>

<style lang="scss">
.home {
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
          width: 154px;
          height: 20px;
          line-height: 20px;
          color: rgba(0, 0, 0, 0.65);
          font-size: 14px;
        }
        .code {
          width: 154px;
          height: 14px;
          line-height: 14px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 12px;
          text-align: left;
        }
        .detail {
          margin-top: 17px;
          ul li {
            width: 50%;
            float: left;
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
    .group-customer-item:nth-child(1) {
      border-top: 3px solid rgba(154, 81, 233, 1);
    }
    .group-customer-item:nth-child(2) {
      border-top: 3px solid rgba(75, 155, 255, 1);
    }
    .group-customer-item:nth-child(3) {
      border-top: 3px solid rgba(65, 204, 204, 1);
    }
    .group-customer-item:nth-child(4) {
      border-top: 3px solid rgba(241, 99, 126, 1);
    }
    .group-customer-item-more {
      height: 150px;
      padding-top: 50px;
      color: rgba(55, 120, 255, 1);
      font-size: 12px;
    }
  }
  .todo-list {
    background-color: #fff;
    height: 110px;
    .todo-list-item li {
      float: left;
      width: 20%;
    }
    .item-content {
      padding-left: 20px;
      margin-top: 12px;
      span {
        display: inline-block;
      }
      span:nth-child(1) {
        width: 63px;
        left: 394px;
        height: 20px;
        line-height: 20px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
      }
      span:nth-child(2) {
        height: 16px;
        line-height: 16px;
        color: rgba(0, 0, 0, 0.85);
        font-size: 14px;
      }
    }
  }
  .business {
    float: left;
  }
  .order {
    float: right;
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
        margin-right: 21px;
        margin-left: 0px;
        margin-top: 8px;
      }
    }
  }
  .el-dialog__footer {
    text-align: center !important;
  }
}
</style>
