<template>
  <div class="home">
    <div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>我的集团客户</span>
        </div>
        <div class="group-customer">
          <!--{{'列表内容 ' + o }}-->
          <div v-for="o in 4" :key="o" class="group-customer-item">
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
          <div class="group-customer-item-more">
            查看更多
          </div>
        </div>
      </el-card>
    </div>
    <div class="mt16">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>我的待办事项</span>
        </div>
        <div class="todo-list">
          <ul class="todo-list-item">
            <li v-for="o in 5" :key="o">
              <p>
                <span><i class="icon-jituan"></i></span>
                <span>集团客户录入</span>
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
      <div class="business mr16">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>合作商机</span>
            <el-button style="float: right; padding: 3px 0" type="text">更多></el-button>
          </div>
          <div class="box-content" :key="o" v-for="o in 5">
            <div class="bar-title">
              北京华夏联信科技有限公司上海分公司
            </div>
            <div class="bar-content">
              <span>我的待办事项</span>
              <span style="float: right; padding: 3px 0">2018-05-06 12:08</span>
            </div>
          </div>
        </el-card>
      </div>
      <div class="order">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>订单总览</span>
            <el-button style="float: right; padding: 3px 0" type="text">更多></el-button>
          </div>
          <div class="box-content" :key="o" v-for="o in 5">
            <div class="bar-title">
              北京华夏联信科技有限公司上海分公司
            </div>
            <div class="bar-content">
              <span>订购：咪咕电子阅读器kindle</span>
              <el-button style="float: right; padding: 3px 0" type="text">待签约</el-button>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  beforeMount() {
    // this.getDemo();
  },
  methods: {
    ...mapActions([
      // 'getDemo'
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
      width: 225px;
      height: 152px;
      background-color: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.2);
      float: left;
      margin-right: 40px;
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
  .business, .order {
    width: 559px;
    float: left;
    background: #fff;
    .box-content {
      border-bottom: 1px solid #ebeef5;
      padding: 20px 0px;
      .bar-title {
        width: 238px;
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
  }
}
</style>
