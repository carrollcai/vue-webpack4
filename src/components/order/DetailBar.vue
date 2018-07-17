<template>
  <div class="detail-bar">
    <div class="detail-bar-item" v-for="(item, i) in title" :key="i">
      <div class="title">{{item}}</div>
      <div v-if="!content[i].fileName">{{content[i]}}</div>
      <div v-else class="file" @click="downloadFile(content[i])">
        {{content[i].fileName}}
      </div>
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
  .detail-bar-item:nth-child(odd) {
    flex: 1;
    display: flex;
  }
  .title {
    width: 100px;
    text-align: right;
    color: rgba(0, 0, 0, 0.45);
    padding-right: 12px;
  }
  .detail-bar-item:nth-child(even) {
    flex: 2;
    display: flex;
  }
}
.file {
  color: #3778ff;
  cursor: pointer;
}
</style>
