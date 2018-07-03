<template>
  <div>
    <div class="m-container">
      <div class="breadcrumb">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/order/create-manage' }">订单创建管理</el-breadcrumb-item>
          <el-breadcrumb-item>新建订单</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="m-container order-create">
      <el-form :label-position="'right'" label-width="140px" :model="orderCreate" ref="orderForm" :rules="orderCreateRules">
        <el-form-item label="订单名称：" prop="staffName">
          <el-input class="form-input-medium" v-model="orderCreate.staffName" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="预定合同金额：" prop="staffName">
          <el-input class="form-input-medium" v-model="orderCreate.staffName" placeholder="请输入合同金额">
            <template slot="append">万元/月</template>
          </el-input>
        </el-form-item>
        <el-form-item label="预定签约时间：" prop="staffName">
          <el-date-picker class="form-input-medium" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" v-model="orderCreate.date" placeholder="请选择时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="预计协议期：" prop="staffName">
          <el-input class="form-input-medium" v-model="orderCreate.staffName" placeholder="请输入合同金额" />
        </el-form-item>
        <el-form-item label="项目是否招标：" prop="staffName">
          <el-radio v-model="orderCreate.radio" :label="1">是</el-radio>
          <el-radio v-model="orderCreate.radio" :label="0">否</el-radio>
        </el-form-item>

        <el-form-item label="联系人员：" prop="name">
          <el-input maxlength="6" class="form-input-80" v-model="orderCreate.name" placeholder="姓名"></el-input>
          <div class="form-input-sep">-</div>
          <el-form-item prop="gender" style="display: inline-block;">
            <el-select class="form-input-80" v-model="orderCreate.gender" placeholder="性别">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <div class="form-input-sep">-</div>
          <el-form-item prop="tel" style="display: inline-block;">
            <el-input maxlength="11" class="form-input-120" v-model="orderCreate.tel" placeholder="手机号"></el-input>
          </el-form-item>
        </el-form-item>
        <el-form-item label="联系邮箱：" prop="staffName">
          <el-input class="form-input-320" v-model="orderCreate.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="合作集团：" prop="group">
          <el-autocomplete maxlength="25" class="form-input-half" v-model="orderCreate.group" :fetch-suggestions="querySearchAsync" placeholder="合作集团/编码" @select="handleSelect"></el-autocomplete>
          <div class="form-input-sep">-</div>
          <el-form-item prop="office" style="display:inline-block;">
            <el-input maxlength="50" class="form-input-half" v-model="orderCreate.office" placeholder="办公地址"></el-input>
          </el-form-item>
        </el-form-item>

        <el-form-item label="合作集团：" prop="staffName">
          <el-input class="form-input-320" v-model="orderCreate.staffName" placeholder="集团编号/名称" />
        </el-form-item>
        <el-form-item label="集团地址：" prop="staffName">
          <el-input class="form-input-320" v-model="orderCreate.staffName" placeholder="办公地址" />
        </el-form-item>
        <el-form-item label="订单描述：" prop="staffName">
          <el-input type="textarea" class="form-input-320" v-model="orderCreate.staffName" placeholder="请输入业务描述" />
        </el-form-item>
        <el-form-item label="订单需求：" prop="staffName">
          <el-input type="textarea" class="form-input-320" v-model="orderCreate.staffName" placeholder="请输入业务需求" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm()">提交</el-button>
          <el-button @click="submitForm()">保存为草稿</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      orderCreateRules: {
        staffName: [
          { required: true, message: '请输入订单名称', trigger: 'change' }
        ]
      },
      options: [
        { 'label': '男', 'value': '0' },
        { 'label': '女', 'value': '1' }
      ]
    };
  },
  computed: {
    ...mapState({
      orderCreate: ({ order }) => order.orderCreate
    })
  },
  beforeMount() {
  },
  methods: {
    submitForm() {
      console.log(12);
    }
  }
};
</script>

<style lang="scss">
@import "scss/variables.scss";

.order-create {
  margin-top: $blockWidth;
  display: flex;
  justify-content: center;
}
</style>
