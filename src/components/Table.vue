<template>
  <div class="table-wrapper">
    <el-table :default-sort="defaultSort" :max-height="maxHeight" :data="source" :selection-mode="mode" :empty-text="emptyText" @selection-change="onSelected" :stripe="false">
      <slot></slot>
    </el-table>
    <el-pagination v-if="total" ref="pagination" class="paginationSty" :layout="paginationLayout" @current-change="onPagination" @size-change="onSizePagination" :current-page="pageNo" :page-size="pageSize" :total="total">
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: 'WmTable',
  props: {
    maxHeight: {
      type: Number
    },
    source: Array,
    pageNo: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 0
    },
    mode: {
      type: String,
      default: 'multiple'
    },
    defaultSort: {
      type: Object
    },
    emptyText: String,
    paginationLayout: {
      type: String,
      default: 'total,sizes,prev, pager, next, jumper'
    }
  },
  methods: {
    onSelected(params) {
      this.$emit('onSelected', params);
    },
    onPagination(pageNo) {
      this.$emit('onPagination', pageNo);
    },
    onSizePagination(pageSize) {
      this.$emit('onSizePagination', pageSize);
    }
  }
};
</script>

<style>
.table-wrapper {
  clear: both;
}

.paginationSty {
  margin-top: 20px;
  text-align: right;
  margin-right: 20px;
}
</style>
