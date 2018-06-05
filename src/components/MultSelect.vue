<template>
  <div class="esop-tag">
    <div>
      <el-tag class="select-tag" v-for="(item, i) in selected" :key="item.key" v-if="i<=2">{{item.value}}</el-tag>
      <el-tag class="select-tag" v-if="selected.length > 3">+ {{`${selected.length - 3}`}}</el-tag>
    </div>

    <i v-if="!display" class="el-icon-arrow-down select-tag-icon" @click="dropmenu" v-popover:popover></i>
    <i v-if="display" class="el-icon-arrow-up select-tag-icon" @click="dropmenu" v-popover:popover></i>

    <el-popover ref="popover" placement="bottom-end" :visible-arrow="false" width="240">
      <div class="tag-list" v-for="item in data" :key="item.key" :class="isSelected(item) ? 'tag-selected' : ''" @click="itemClick(item)">
        {{item.value}}
      </div>
    </el-popover>
  </div>
</template>

<script>

export default {
  props: {
    data: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      display: false,
      selected: []
    };
  },
  beforeMount() {
    this.selected = Object.cloneDeep(this.data.slice(0, 1));
    console.log(this.selected);
  },
  methods: {
    itemClick(item) {
      let isSelected = this.isSelected(item);
      if (isSelected) {
        this.selected = this.selected.filter(val => val.key !== item.key);
      } else {
        this.selected.push(item);
      }
    },
    isSelected(item) {
      return this.selected.some(val => val.key === item.key);
    },
    dropmenu() {
      this.display = !this.display;
      this.selectedList(this.selected);
    },
    selectedList(list) {
      this.$emit('selected', list);
    }
  }
};
</script>

<style lang="scss">
@import "scss/variables.scss";
.esop-tag {
  display: flex;
  align-items: center;
}
.select-tag {
  margin-left: $fontWidth;
}
.select-tag-icon {
  margin-left: $fontWidth;
}
.tag-list {
  float: left;
  width: 48px;
  margin: 4px;
  cursor: pointer;
}
.tag-selected {
  color: $buttonColor;
}
</style>
