<template>
<div>
  <el-steps :active="2" align-center>
    <el-step v-for="item in stepData" :key="item" :title="item.title" :description="desc(item)">
      <div style="display: flex;">
        <div class="child">
          <el-popover popper-class="audit-deal-result" placement="top" width="200" trigger="click" :content="4234324">
            <el-button slot="reference" type="text">查看原因</el-button>
          </el-popover>
        </div>
      </div>
    </el-step>
  </el-steps>
</div>
</template>

<script>
export default {
  props: {
    stepData: Array
  },
  computed() {
    console.log(this.stepData);
  },
  methods: {
    desc(item) {
      return `${item.opName}${item.time}${item.detail}`;
    }
  }
};
</script>

<style>
</style>
