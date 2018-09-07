<template>
  <el-select v-if="list"
    v-model="internalValue"
    :placeholder="placeholder"
    multiple
    @change="selectChange"
    collapse-tags>
    <el-option v-if="list.length > 1"
      :key="null"
      label="全部"
      :value="null" />
    <el-option v-for="item in list"
      :key="item.value"
      :label="item.value"
      :value="item.value" />
  </el-select>
</template>
<script>
/**
 * @author carroll
 * @since 20180903
 * @description select-all组件，添加全部选中的功能。全部为key为null，数据提交的时候需要去除。
*/
export default {
  props: {
    collapseTags: Boolean,
    value: {
      default: () => [],
      type: Array
    },
    list: {
      default: () => [],
      type: Array
    },
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
  },
  data() {
    return {
      internalValue: [],
      localList: [], // 本地的备份，用于对比
    };
  },
  created() {
    this.initializeAll();
  },
  beforeUpdate() {
    this.initializeAll();
  },
  watch: {
    internalValue(val) {
      let value = this.getValue();
      this.$emit('input', value);
      this.$emit('change', value);
    },
    value(val) {
      this.initializeValue();
    }
  },
  methods: {
    initializeAll() {
      if (this.value.length === this.list.length && this.value.length > 1) {
        this.internalValue.push(null);
        this.localList = Object.cloneDeep(this.internalValue);
      }
    },
    getValue() {
      return this.internalValue;
    },
    selectChange(value) {
      const { list } = this;
      let selected = Object.cloneDeep(this.getValue());
      let isExistAll = value.some(val => val === null);
      let names = list.map(val => val.value);
      // 是否点击全部
      let isClickAll = !(isExistAll === this.localList.some(val => val === null));
      // 点击全部
      if (isClickAll) {
        // 子选项未全选
        if (value.length !== names.length ||
          (value.length === names.length && isExistAll)) {
          selected = names;
          selected.push(null);
        } else {
          // 子选项已全选
          selected = [];
        }
      } else {
        if (!isExistAll && value.length === names.length) {
          selected.push(null);
        } else {
          selected = selected.filter(val => val !== null);
        }
      }
      this.localList = Object.cloneDeep(selected);
      this.internalValue = Object.cloneDeep(selected);
    },
    initializeValue(value) {
      this.internalValue = this.getInitializeValue(this.value);
    },
    getInitializeValue(value) {
      return this.value === undefined || this.value === null ? '' : this.value;
    }
  }
};
</script>