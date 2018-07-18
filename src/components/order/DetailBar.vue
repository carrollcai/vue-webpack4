<template>
  <div class="detail-bar">
    <div class="detail-bar-item2" v-if="title.length === 2" v-for="(item, i) in title" :key="item">
      <div class="title">{{title[i]}}</div>
      <div v-if="content[i]" class="flex">
        <div v-if="!content[i].files">{{content[i]}}</div>
        <div class="file margin-left-8" v-else v-for="(file, ci) in content[i].files" :key="ci" @click="downloadFile(file)">
          {{file.fileName}}
        </div>
      </div>
    </div>
    <div class="detail-bar-item" v-if="title.length === 3" v-for="(item, i) in title" :key="item">
      <div class="title">{{item}}</div>
      <div>{{content[i]}}</div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  props: {
    title: {
      default: () => {
        return [];
      },
      type: Array
    },
    content: {
      default: () => {
        return [];
      },
      type: Array
    }
  },
  methods: {
    downloadFile(obj) {
      let params = {
        fileTypeId: obj.fileTypeId,
        fileSaveName: obj.fileSaveName,
        fileName: obj.fileName
      };
      this.orderDownloadFile(params);
    },
    ...mapActions([
      'orderDownloadFile'
    ])
  }
};
</script>
<style lang="scss" scoped>
.detail-bar {
  border-radius: 2px;
  background-color: #fafafa;
  padding: 24px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  & .detail-bar-item {
    flex: 1;
    display: flex;
  }
  & .title {
    width: 100px;
    text-align: right;
    color: rgba(0, 0, 0, 0.45);
    padding-right: 12px;
  }
  & .detail-bar-item2:nth-child(odd) {
    flex: 1;
    display: flex;
  }
  & .detail-bar-item2:nth-child(even) {
    flex: 2;
    display: flex;
  }
}
.file {
  color: #3778ff;
  cursor: pointer;
}
.margin-left-8 {
  margin-left: 8px;
}
</style>
