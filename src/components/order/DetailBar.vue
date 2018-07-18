<template>
  <div class="detail-bar">
    <div class="detail-bar-item" v-for="(item, i) in arr" :key="item">
      <div class="title">{{title[i]}}</div>
      <div v-if="content[i]">
        <div v-if="!content[i].fileName">{{content[i]}}</div>
        <div v-else class="file" @click="downloadFile(content[i])">
          {{content[i].fileName}}
        </div>
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
  data() {
    return {
      arr: [1, 2, 3]
    };
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
}
.file {
  color: #3778ff;
  cursor: pointer;
}
</style>
