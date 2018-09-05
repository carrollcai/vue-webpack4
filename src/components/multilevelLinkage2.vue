<template>
<div class="multilevel-linkage">
  <el-cascader v-if="listData"
    @change="getProcessor"
    :options="listData"
    v-model="processorData"
    :placeholder="storeData.processorList.length > 0 ? '' : '请选择'"
    :change-on-select="false">
  </el-cascader>
  <div class="tag-list">
    <el-tag
      :key="tag"
      v-for="tag in storeData.processorList"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)">
      {{tag}}
    </el-tag>
  </div>
</div>
</template>
<script>
export default {
  props: {
    listData: Object,
    storeData: Object
  },
  data() {
    return {
      processorData: []
    };
  },
  methods: {
    getProcessor(value) {
      this.processorData = [];
      let list = this.listData || null;
      let region = value[0] || null;
      let province = value[1] || null;
      let processor = value[2] || null;
      let regionName = '';
      this.handleClose(value, 'filter');
      list && list.filter(res => {
        if (res.value === region) {
          if (!province) {
            regionName = res.label;
            let obj = {
              regionValue: res.value,
              regionLabel: res.label,
              regionName: regionName
            };
            this.storeData.regionList.push(obj);
            return regionName;
          }
          province && res.children.filter(item => {
            if (item.value === province) {
              if (!processor) {
                regionName = res.label + '/' + item.label;
                let obj = {
                  regionValue: res.value,
                  regionLabel: res.label,
                  provinceValue: item.value,
                  provinceLabel: item.label,
                  regionName: regionName
                };
                this.storeData.regionList.push(obj);
                return regionName;
              }
              processor && item.children.filter(val => {
                if (val.value === processor) {
                  regionName = res.label + '/' + item.label + '/' + val.label;
                  let obj = {
                    regionValue: res.value,
                    regionLabel: res.label,
                    provinceValue: item.value,
                    provinceLabel: item.label,
                    processorValue: val.value,
                    processorLabel: val.label,
                    regionName: regionName
                  };
                  this.storeData.regionList.push(obj);
                  this.storeData.processor.push(val.value);
                  return regionName;
                }
              });
            }
          });
        }
      });
      this.storeData.processorList.push(regionName);
    },
    // 删除
    handleClose(value, flag) {
      value = typeof value === 'string' ? value.split('/') : value;
      let len = value.length - 1;
      value = value[len];
      let opArray = this.storeData.regionList;
      let opValue = this.storeData.processor;
      let opLabel = this.storeData.processorList;
      this.storeData.regionList.filter((item, index, array) => {
        if (len === 0 && (item.regionLabel === value || item.regionValue === value)) {
          opArray.splice(index, 1);
          opLabel.splice(index, 1);
        } else if (len === 1 && (item.provinceLabel === value || item.provinceValue === value)) {
          opArray.splice(index, 1);
          opLabel.splice(index, 1);
        } else if (len === 2 && (item.processorLabel === value || item.processorValue === value)) {
          opArray.splice(index, 1);
          opValue.splice(index, 1);
          opLabel.splice(index, 1);
        }
      });
    }
  }
};
</script>
<style lang="less">
.multilevel-linkage {
  position: relative;
  border: 1px #E7E7E7 solid;
  border-radius: 3px;
  min-height: 40px;
  .el-cascader {
    width: 315px;
    .el-input input {border: 0;}
  }
  .tag-list {
    margin-top: -40px;
    width: 270px;
    position: relative;
    z-index: 2;
    .el-tag {margin-left: 8px;}
  }
}
</style>
