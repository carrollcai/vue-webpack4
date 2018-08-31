<template>
  <el-select v-if="list"
    v-model="internalValue"
    placeholder="选择省份"
    multiple
    @change="selectChange"
    collapse-tags>
    <el-option v-if="list > 1"
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
export default {
  props: {
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
      localList: [],
    };
  },
  watch: {
    internalValue(val) {
      let value = this.getValue();
      this.$emit('input', value);
      this.$emit('change', value);
    },
  },
  methods: {
    getValue() {
      return this.internalValue;
    },
    selectChange(val) {
      const { list } = this;
      let isExistAll = val.some(val => val === null);
      let names = list.map(val => val.value);

      // 是否点击全部
      let isClickAll = !(isExistAll === this.localList.some(val => val === null));

      // 点击全部
      if (isClickAll) {
        // 子选项未全选
        if (val.length !== names.length) {
          this.selected = names;
          this.selected.push(null);
        } else {
          // 子选项已全选
          this.selected = [];
        }
      } else {
        if (!isExistAll && val.length === names.length) {
          this.selected.push(null);
        } else {
          this.selected = this.selected.filter(val => val !== null);
        }
      }
      this.localList = Object.cloneDeep(this.selected);
      this.$emit('selectChange', this.selected);
    }
  }
};
</script>

<style>
</style>
