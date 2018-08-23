<template>
  <div class="mu-wrap">
    <ul class="multievel-linkage">
      <li>
        <span>1</span>
        <ul class="">
          <li><span>1-1</span></li>
          <li>
            <span>1-2</span>
            <ul>
              <li><span>1-2-1</span></li>
              <li><span>1-2-2</span></li>
            </ul>
          </li>
        </ul>
      </li>
      <li><span>2</span></li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
  },
  methods: {
  }
};
</script>
<style lang="scss" scoped>
$inputWidthQuery: 140px;
.mu-wrap {
  width: $inputWidthQuery;
}
.multievel-linkage {
  display: flex;
  flex-direction: column;
  width: $inputWidthQuery;
  li {
    flex: 1;
    position: relative;
  }
  span {
    display: block;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-bottom: 1px #f1f2f3 solid;
  }
  ul {
    display: flex;
    flex-direction: column;
    flex: 1;
    position: absolute;
    width: $inputWidthQuery;
    left: $inputWidthQuery;
    top: 0;
  }
}
</style>
