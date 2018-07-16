<template>
  <div class="home">
    <div class="home-container">
      <div class="home-title">我的集团客户</div>
      <div class="group-customer">
        <div class="group-customer-item">
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
        <div class="group-customer-item">
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
        <div class="group-customer-item">
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
        <div class="group-customer-item">
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
    </div>
    <div class="home-container mt16">
      <div class="home-title">我的待办事项</div>
    </div>
    <div class="hr"></div>
    <div class="todo-list">
      <ul class="todo-list-item">
        <li>
          <p>
            <span><i class="el-icon-edit"></i></span>
            <span>集团客户录入</span>
          </p>
        </li>
        <li>
          <p>
            <i class="el-icon-edit"></i>
            <span>订单处理</span>
          </p>
        </li>
        <li>
          <p>
            <i class="el-icon-edit"></i>
            <span>商机处理</span>
          </p>
        </li>
        <li>
          <p>
            <i class="el-icon-edit"></i>
            <span>需求处理</span>
          </p>
        </li>
        <li>
          <p>
            <i class="el-icon-edit"></i>
            <span>走访处理</span>
          </p>
        </li>
      </ul>
      <ul class="todo-list-item">
        <li>
          <p class="item-content">
            <span>待审核</span>
            <span>0</span>
          </p>
          <p class="item-content">
            <span>已审核</span>
            <span>0</span>
          </p>
        </li>
        <li>
          <p class="item-content">
            <span>待审核</span>
            <span>0</span>
          </p>
          <p class="item-content">
            <span>已审核</span>
            <span>0</span>
          </p>
        </li>
        <li>
          <p class="item-content">
            <span>待审核</span>
            <span>0</span>
          </p>
          <p class="item-content">
            <span>已审核</span>
            <span>0</span>
          </p>
        </li>
        <li>
          <p class="item-content">
            <span>待审核</span>
            <span>0</span>
          </p>
          <p class="item-content">
            <span>已审核</span>
            <span>0</span>
          </p>
        </li>
        <li>
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
    <div class="mt16">
      <div class="business mr16">
        <div class="home-container">
          <div class="home-title">
            <span>合作商机</span>
            <span class="more">更多></span>
          </div>
          <div class=""></div>
        </div>
        <div class="hr"></div>
      </div>
      <div class="order">
        <div class="home-container">
          <div class="home-title">
            <span>订单总览</span>
            <span class="more">更多></span>
          </div>
        </div>
        <div class="hr"></div>
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
    margin-top: 22px;
    height: 152px;
    .group-customer-item {
      width: 225px;
      height: 152px;
      background-color: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.2);
      float: left;
      margin-right: 35px;
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
  .hr {
    width: 100%;
    border: 1px solid rgba(230, 230, 230, 1);
  }
  .todo-list {
    background-color: #fff;
    padding: 28px 0px 0px 16px;
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
  }
}
</style>
