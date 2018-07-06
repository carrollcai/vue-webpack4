<template>
  <div class="m-container">
    <el-form class="visit-form" ref="myVisitManageForm" v-model="myVisitForm">
      <div class="flex">
        <el-form-item prop="date">
          <el-date-picker type="daterange" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item class="visit-form-item__input">
          <el-input placeholder="走访公司名称" />
        </el-form-item>
        <el-form-item class="visit-form-item__input">
          <el-select class="form-input-120" v-model="myVisitForm.isFirstGuest" placeholder="是否首客">
            <el-option
              v-for="item in firstGuestOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="visit-form-item__input">
          <el-input placeholder="指派走访人" />
        </el-form-item>
      </div>
      <div class="flex">
        <el-form-item class="visit-form-item">
          <el-button type="primary">查询</el-button>
        </el-form-item>
        <el-form-item class="visit-form-item">
          <el-button class="el-button--have-icon" @click.prevent="createVisitApplication" icon="el-icon-plus">新建走访申请</el-button>
        </el-form-item>
      </div>
    </el-form>
    <el-tabs v-model="status">
      <el-tab-pane label="全部"></el-tab-pane>
      <el-tab-pane label="待执行"></el-tab-pane>
      <el-tab-pane label="已完成"></el-tab-pane>
      <el-tab-pane label="待审核"></el-tab-pane>
      <el-tab-pane label="已驳回"></el-tab-pane>
    </el-tabs>
    <wm-table>
      <el-table-column label="走访编号" property="number" />
      <el-table-column label="走访时间" property="date" />
      <el-table-column label="走访公司" property="company" />
      <el-table-column label="是否首客" property="isFirst" />
      <el-table-column label="走访状态" property="status" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="handleDetail(scope.row)">
            查看
          </el-button>
          <el-button type="text" @click="handleDetail(scope.row)">
            执行处理
          </el-button>
        </template>
      </el-table-column>
    </wm-table>
  </div>
</template>

<script>
import WmTable from 'components/Table.vue';
import { mapState, mapActions } from 'vuex';
export default {
  components: {
    WmTable
  },
  computed: {
    ...mapState({
    })
  },
  data() {
    return {
      status: 0,
      myVisitForm: {
        isFirstGuest: ''
      },
      firstGuestOption: [{
        value: '1',
        label: '否'
      }, {
        value: '2',
        label: '是'
      }]
    };
  },
  watch: {
    status(newValue) {
    }
  },
  beforeMount() {
    this.query();
  },
  methods: {
    onPagination(value) {
    },
    onSizePagination(value) {
    },
    handleDetail(row) {
    },
    query() {
    },
    createVisitApplication() {
      const path = '/visit/create-visit-application';
      this.$router.push(path);
    },
    ...mapActions([
    ])
  }
};
</script>

<style lang="scss">
@import "scss/variables.scss";
.visit-form-item__lable {
  margin-left: $blockWidth;
}
.visit-form {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.visit-form-item__input {
  width: $inputWidthQuery;
}
.visit-form-item {
  margin-left: $formWidth;
}
</style>
