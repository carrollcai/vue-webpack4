<template>
<div class="p-content">
  <div class="crumb-bar"><span>产品创建管理 / </span>新建产品</div>
  <div class="creat-content">
    <el-steps :active="2" finish-status="success" align-center>
      <el-step title="产品基本信息"></el-step>
      <el-step title="产品销售案例"></el-step>
    </el-steps>
    <!-- <ul class="self-step w360">
      <li><i></i><span>产品基本信息</span></li>
      <li><i></i><span>产品基本信息</span></li>
    </ul> -->
    <div class="creat-model">
      <wm-table
        :source="productList"
        :pageNo="formData.pageNo"
        :pageSize="formData.pageSize"
      >
          <el-table-column label="销售类型" property="saleType">
          </el-table-column>
          <el-table-column label="组合产品" property="productName">
          </el-table-column>
          <el-table-column label="销售方案" property="productType">
          </el-table-column>
          <el-table-column label="销售数量" property="saleNumber">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="operation">
              <span class="blue hand" @click="toPageModefiy">编辑</span>
              <span class="blue hand" @click="deleteProduct">删除</span>
            </template>
          </el-table-column>
      </wm-table>
      <div class="add-demo">+ 添加销售案例</div>
      <el-row class="mt28 mb10">
        <el-button plain>上一步</el-button>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </el-row>
    </div>
  </div>
</div>
</template>

<script>
// import { mapState, mapActions } from 'vuex';
import WmTable from 'components/Table.vue';

export default {
  components: {
    WmTable
  },
  data() {
    return {
      formData: {
        productName: '',
        productType: '',
        productPrice: '',
        operatorCn: '',
        productDesc: '',
        pageNo: 1,
        pageSize: 20
      },
      productList: [
        {
          saleType: 1,
          productName: 'name',
          productType: 'type',
          creatTime: 'createTime',
          updateTime: '更新Time',
          operation: '操作'
        }
      ]
    };
  },
  computed: {
  },
  beforeMount() {
  },
  methods: {
    query() {
      // 产品数据查询方法
    },
    toPageModefiy() {
      this.$router.push({path: 'home', params: {}});
    },
    deleteProduct() {
      // 校验商机和订单是否有用到
      this.$confirm('删除该产品数据, 是否继续?', ' ', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除操作
      }).catch(() => {
        this.$message('已取消删除');
      });
    },
    onSubmit() {
      this.$message({showClose: true, message: '恭喜您，产品创建成功！', type: 'success'});
    }
  },
  onload() {
  }
};
</script>

<style lang="scss">
.w360 {width: 360px;}
.self-step {
  margin: 0 auto;
  display: flex;
  width: 100%;
  li {
    flex: 1;
  }
}
.el-step.is-horizontal .el-step__line {height: 1px; background: #c0c0c0}
.el-step__head.is-process, .el-step__title.is-process {color: #8c8c8c; font-weight: 400;}
.el-step.is-simple .el-step__arrow::before, .el-step.is-simple  .el-step__arrow:before {display: none}
.el-step.is-simple .el-step__arrow::after, .el-step.is-simple  .el-step__arrow:after {-webkit-transform: none; transform: none; height: 1px; width: 320px;}
.el-step__icon.is-text {border-width: 1px;}
.creat-content {background: #fff; margin-top: 16px; height: 832px;}
.el-steps--simple {background: none;}
.el-steps--horizontal {width: 480px; padding: 30px; margin: 0 auto;}
.add-content {width: 430px; margin: 0 auto;}
.el-form-item {margin-bottom: 10px;}
.creat-model {
  width: 587px;
  margin: 0 auto;
  .bor {
    width: 100%;
    border: 1px #e7e7e7 solid;
  }
  .title {
    height: 44px;
    line-height: 44px;
    font-size: 14px;
    color: #262626;
    background: #f0f2f5;
    padding: 0 24px;
    margin: 0;
    span {
      color: #8c8c8c;
    }
  }
  .add-demo {
    height: 32px;
    line-height: 32px;
    border: #e7e7e7 1px dashed;
    margin-top: 16px;
    text-align: center;
    color: #595959
  }
}
</style>
