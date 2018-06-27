<template>
<div class="p-manage">
  <el-form :inline="true" :model="formData" class="demo-form-inline box">
    <el-form-item>
      <el-col>
        <el-date-picker v-model="formData.time" type="date" placeholder="创建时间范围" style="width: 100%;"></el-date-picker>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-select v-model="formData.type" placeholder="产品类型">
        <el-option label="产品类型一" value="shanghai"></el-option>
        <el-option label="产品类型二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-input v-model="formData.create" placeholder="创建人"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input v-model="formData.code" placeholder="产品名称/编码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="toCreatProduct">+ 新建产品</el-button>
    </el-form-item>
  </el-form>
  <wm-table
    :source="productList"
    :pageNo="formData.pageNo"
    :pageSize="formData.pageSize"
  >
      <el-table-column label="产品编码" property="scope">
      </el-table-column>
      <el-table-column label="产品名称" property="productName">
      </el-table-column>
      <el-table-column label="产品类别" property="productType">
      </el-table-column>
      <el-table-column label="创建时间" property="creatTime">
      </el-table-column>
      <el-table-column label="最近更新时间" property="updateTime">
        <template slot-scope="updateTime">
          <span class="btnLists">
            最近更新时间
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" property="">
        <template slot-scope="operation">
          <span class="blue hand" @click="toPageDetail">详情</span>
          <span class="blue hand" @click="toPageModefiy">修改</span>
          <span class="blue hand" @click="deleteProduct">删除</span>
        </template>
      </el-table-column>
  </wm-table>
</div>
</template>

<script>
import { mapActions } from 'vuex';
import WmTable from 'components/Table.vue';

export default {
  components: {
    WmTable
  },
  data() {
    return {
      formData: {
        startDate: '',
        endDate: '',
        productType: '0',
        operatorCn: '',
        productName: '',
        pageNo: 1,
        pageSize: 20
      },
      productList: [
        {
          scope: 1,
          productName: 'name',
          productType: 'type',
          creatTime: 'createTime',
          updateTime: '更新Time',
          operation: '操作'
        }
      ]
    };
  },
  beforeMount() {
    this.getProductCreatList(this.formData);
  },
  computed: {
    /* ...mapState({
      productList: ({ product }) => product.productList
    }) */
  },
  methods: {
    query() {
      // 产品数据查询方法
      this.getProductCreatList(this.formData);
    },
    onSubmit() {
      console.log(this.formData);
    },
    toCreatProduct() {
      this.$router.push({path: '/product/create-base-info'});
    },
    toPageDetail() {
      this.$router.push({path: '/product/product-detail', params: {}});
    },
    toPageModefiy() {
      this.$router.push({path: '/product/create-base-info', params: {}});
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
    ...mapActions([
      'getProductCreatList'
    ])
  },
  onload() {
    console.log(this.productList);
  }
};
</script>

<style lang="scss">
.p-manage {
  padding: 24px; background: #fff;
}

</style>
