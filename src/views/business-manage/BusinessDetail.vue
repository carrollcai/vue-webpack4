<template>
  <div>
    <div class="m-container">
      <div class="breadcrumb">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/business-manage/business' }">商机总览</el-breadcrumb-item>
          <el-breadcrumb-item>商机详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="business-detail">
      <div class="business-detail-content">
        <div class="business-detail-content-item">
          <span class="left">处理人员：</span>
          <span class="right">张小明</span>
        </div>
        <div class="business-detail-content-item">
          <span class="left">处理结果：</span>
          <span class="right">客户签约</span>
        </div>
        <div class="business-detail-content-item">
          <span class="left">合同下载：</span>
          <a class="down" href="#">第三次签约合同.doc</a>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="business-detail-item">
        <span class="title">商机类别：</span>
        <span class="content">普通商机</span>
        <span class="title">预计协议期限：</span>
        <span class="content">2年</span>
        <span class="title">是否项目招标：</span>
        <span class="content">是</span>
      </div>
      <div class="business-detail-item">
        <span class="title">预计收入：</span>
        <span class="content">1000万/月</span>
        <span class="title">预计签约时间：</span>
        <span class="content">2018-06-20</span>
        <span class="title">商机提供人员：</span>
        <span class="content">王老五（19089019820）</span>
      </div>
      <div class="business-detail-item">
        <div class="left">合作集团：</div>
        <div class="right">3u93990403；广东移动Boss；广东省广州市万邦有限公司</div>
      </div>
      <div class="business-detail-item">
        <div class="left">联系人员：</div>
        <div class="right">张三疯 ；男 ；19809209810 ；11920283@qq.com</div>
      </div>
      <div class="business-detail-item">
        <div class="left">商机描述：</div>
        <div class="right">作为“去中心化”传播环境下成长的一代人，这一代年轻人在消费选择上更注重个性化、社交化，以及从价格转向价值导向。这点我们可以从近年来火爆崛起的一些现象中得知。比如《王者荣耀》、拼多多，满足了年轻人在消费中进行社交的需求；一些小众品牌、独立原创设计作品的走红，反映了新消费群体追求的个性化体验。</div>
      </div>
      <div class="business-detail-item">
        <div class="left">业务需求：</div>
        <div class="right">基于LBS定位技术和大数据深度挖掘技术，以吃喝玩乐为切入口的爱草媒，完全可以化身他们旅行中的忠实助手和万能攻略，让消费者每到一个城市，都能以当地人的消费体验融入其中。想吃最地道的当地特色小吃，为消费者做出精准的推荐，匹配所需的优质店铺，甚至哪些店铺评分最高、口碑最好、优惠力度最大，都能在平台找到对应信息。</div>
      </div>
      <div class="business-detail-item">
        <div class="left">需要协调处：</div>
        <div class="right">除了通过分享获得精神上的愉悦之外，消费者在爱草媒的每一次消费都还能直接“变现”，即获得可以在平台无门槛使用的草莓豆。与此同时，消费者的每一次支付也并不意味着消费行为的结束，通过分享商品、服务、体验、技巧、优惠券等给他人，消费者还能变身“消费商”，直接参与利润分配，获得消费奖励。</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  components: {
  },
  data() {
    return {
      form: {
        approveStatus: 0
      }
    };
  },
  beforeMount() {
    this.getBusinessDetail();
  },
  computed: {
    ...mapState({
      businessDetail: ({ business }) => business.businessDetail
    })
  },
  methods: {
    ...mapActions([
      'getBusinessDetail'
    ])
  }
};
</script>

<style lang="scss">
@import "scss/variables.scss";
.container {
  background: #fff;
  padding-bottom: 40px;
}
.business-detail {
  margin-top: $blockWidth;
}
.business-detail {
  margin-top: 16px;
  background: #ffffff;
  padding: 32px 36px 8px 32px;
  & .business-detail-content {
    height: 42px;
    background: #fafafa;
    padding-top: 26px;
    padding-left: 19px;
    & .business-detail-content-item {
      width: 349px;
      float: left;
      & .left {
        height: 22px;
        line-height: 22px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
        padding-right: 12px;
      }
      & .right {
        height: 20px;
        line-height: 20px;
        color: rgba(0, 0, 0, 0.85);
        font-size: 14px;
        text-align: left;
      }
    }
  }
}
.business-detail-item {
  display: flex;
  padding-top: 16px;
  & .left {
    width: 122px;
    text-align: right;
    color: rgba(0, 0, 0, 0.45);
    padding-right: 12px;
  }
  & .right {
    flex: 1;
    text-align: left;
    padding-right: 108px;
  }
  & .down {
    height: 20px;
    line-height: 20px;
    color: rgba(55, 120, 255, 1);
    font-size: 14px;
    text-align: left;
  }
  & .title {
    width: 122px;
    text-align: right;
    color: rgba(0, 0, 0, 0.45);
    padding-right: 12px;
    font-size: 14px;
    height: 20px;
    line-height: 20px;
  }
  & .content {
    width: 215px;
  }
}
.business-detail-title {
  height: 68px;
  display: flex;
  background: #FAFAFA 100%;
  margin: 32px 36px 8px 32px;
  & .item {
    flex: 1;
    text-align: left;
    color: rgba(0, 0, 0, 0.45);
  }
}
</style>
