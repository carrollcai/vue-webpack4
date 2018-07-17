<template>
  <div>
    <div class="task-detail-item">
      <div class="left">走访主题：</div>
      <div class="right">这是走访主题</div>
    </div>
    <div class="task-detail-item">
      <div class="left">走访公司：</div>
      <div class="right">19399944；广东移动分公司；广东省广州市清远区徐庄软件园2号楼</div>
    </div>
    <div class="task-detail-item">
      <div class="left">走访对象：</div>
      <div class="right">张三疯；高管；18298192098</div>
    </div>
    <div class="task-detail-item">
      <div class="left">我方出席人员：</div>
      <div class="right">张三；李四；王五；周六</div>
    </div>
    <div class="task-detail-item">
      <div class="left">走访时间：</div>
      <div class="right">2018-5-12     12:00:00-15:00:00</div>
    </div>
    <div class="task-detail-item">
      <div class="left">走访内容：</div>
      <div class="right">这是一段走访内容描述字段这是一段走访内容描述内容字段</div>
    </div>
    <div class="task-detail-item">
      <div class="left">涉及商机编码：</div>
      <div class="right">923890380</div>
    </div>
    <div class="task-detail-item">
      <div class="left">问题协调：</div>
      <div class="right">这是问题协调描述字段这是问题协调描述字段</div>
    </div>
    <div class="task-detail-item">
      <div class="left">是否首客走访：</div>
      <div class="right">是</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    visitDetail: {
      type: Object
    }
  },
};
</script>
