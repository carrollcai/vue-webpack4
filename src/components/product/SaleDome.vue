<template>
<div class="base-info">
  <h3>产品销售案例</h3>
  <div class="b-i-table">
    <el-table
      :data="tableData5"
      row-key="id" :expand-row-keys="entexpands" @row-click="rowExpand"
      style="width: 100%">
      <el-table-column
        label="销售类型" width="150"
        prop="productType">
      </el-table-column>
      <el-table-column
        label="组合产品" width="180"
        prop="deptment">
      </el-table-column>
      <el-table-column
        label="销售方案"
        prop="desc">
      </el-table-column>
      <el-table-column
        label="销售数量" width="100"
        prop="id">
      </el-table-column>
      <el-table-column
        label="操作" width="120"
        prop="name">
        <template slot-scope="scope">
          <div class="el-table__expand-icon blue">详细<i class="el-icon el-icon-arrow-right blue el-table__expand-icon--expanded"></i></div>
        </template>
      </el-table-column>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <p class="sale-type">
              <el-form-item label="销售类型">
              <span>: {{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="销售数量">
                <span>: {{ props.row.shop }}</span>
              </el-form-item>
            </p>
            <p>
              <el-form-item label="创新点/借鉴点">
                <span>: {{ props.row.id }}</span>
              </el-form-item>
            </p>
            <p>
              <el-form-item label="销售方案">
                <span>: {{ props.row.shopId }}</span>
              </el-form-item>
            </p>
            <p>
              <el-form-item label="经验教训">
                <span>: {{ props.row.category }}</span>
              </el-form-item>
            </p>
          </el-form>
        </template>
      </el-table-column>
    </el-table>
  </div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  components: {
    ...mapState({
      productBaseInfo: ({ product }) => product.productBaseInfo,
      productSaleDemo: ({ product }) => product.productSaleDemo
    })
  },
  beforeMount() {
    this.getProductDetail();
  },
  data() {
    return {
      currIndex: -1,
      entexpands: []
    };
  },
  methods: {
    rowExpand(row, event, column) {
      this.entexpands.length = 0;
      if (row.id === this.entexpands[0]) {
        this.entexpands.length = 0;
      } else {
        this.entexpands.push(row.id);
      }
      this.currIndex = row.id;
    },
    ...mapActions([
      'getProductDetail'
    ])
  }
};
</script>

<style lang="scss">
.base-info {
  margin-top: 16px;
  padding-bottom: 16px;
  background: #fff;
  h3 {
    height: 48px;
    line-height: 48px;
    font-size: 16px;
    color: #262626;
    margin: 0;
    border-bottom: 1px #E6E6E6 solid;
    padding: 0px 32px;
  }
  .b-i-list {
    display: flex;
    flex-flow: wrap;
    padding: 10px 32px 0;
    li {
      height: 28px;
      line-height: 28px;
      font-size: 14px;
      width: 33%;
      color: #262626;
      span {
        color: #c0c0c0;
      }
    }
  }
  .b-i-table {
    padding: 32px;
  }
}
.demo-table-expand {
  .el-form-item__label {
    color: #c0c0c0;
  }
  p {
    height: 28px;
    line-height: 28px;
    color: #262626;
  }
  .sale-type {
    .el-form-item {
      width: 40%;
    }
  }
}
.el-table__expand-icon {
  width: 70px;
}
.el-table__body {
  .el-table_1_column_6 {
    display: none;
  }
}
.el-table {
  .el-table_1_column_6 {
    display: none;
  }
}
</style>
