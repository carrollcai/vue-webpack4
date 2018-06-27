<template>
  <div class="family-contact_container">
    <el-form-item
      :prop="'contactFamilyDtoList.' + index + '.name'"
      :rules="{
        validator: familyNameValidator, trigger: 'blur'
      }">
      <el-input v-model="familyContact.name"
        placeholder="姓名"
        key="name"
        :maxlength="6"></el-input>
    </el-form-item>
    <span class="line"></span>
    <el-form-item
      :prop="'contactFamilyDtoList.' + index + '.relationship'"
      :rules="{
        validator: familyRelationshipValidator, trigger: 'blur'
      }">
      <el-input v-model="familyContact.relationship"
        placeholder="与本人关系"
        key="relation"
        :maxlength="10"></el-input>
    </el-form-item>
    <span class="line"></span>
    <el-form-item
      :prop="'contactFamilyDtoList.' + index + '.jobDuty'"
      :rules="{
        validator: familyJobValidator, trigger: 'blur'
      }">
      <el-input v-model="familyContact.jobDuty"
        placeholder="工作职务"
        key="job"
        :maxlength="15"></el-input>
    </el-form-item>
    <span class="line"></span>
    <el-form-item
      :prop="'contactFamilyDtoList.' + index + '.mobile'"
      :rules="{
        validator: familyMobileValidator, trigger: 'blur'
      }">
      <el-input v-model="familyContact.mobile"
        placeholder="联系电话"
        key="mobile"
        :maxlength="11"></el-input>
    </el-form-item>
  </div>
</template>

<script>
export default {
  props: {
    familyContact: {
      type: Object,
      default() {
        return {};
      }
    },
    index: {
      type: Number
    }
  },
  methods: {
    isNotEmpty() {
      const {familyContact} = this;
      return !!familyContact.name || !!familyContact.relationship || !!familyContact.jobDuty || !!familyContact.mobile;
    },
    /**
     * 家庭成员-姓名 校验规则
     *
     * @param {Object} rule 规则
     * @param {Object} value 值
     * @param {Function} callback 回调函数
     */
    familyNameValidator(rule, value, callback) {
      if (this.isNotEmpty() && value) {
        callback();
      } else {
        callback(new Error('请输入姓名'));
      }
    },

    /**
     * 家庭成员-与本人关系 校验规则
     *
     * @param {Object} rule 规则
     * @param {Object} value 值
     * @param {Function} callback 回调函数
     */
    familyRelationshipValidator(rule, value, callback) {
      if (this.isNotEmpty() && value) {
        callback();
      } else {
        callback(new Error('请输入与本人关系'));
      }
    },
    /**
     * 家庭成员-工作职务 校验规则
     *
     * @param {Object} rule 规则
     * @param {Object} value 值
     * @param {Function} callback 回调函数
     */
    familyJobValidator(rule, value, callback) {
      if (this.isNotEmpty() && value) {
        callback();
      } else {
        callback(new Error('请输入工作职务'));
      }
    },
    /**
     * 家庭成员-联系电话 校验规则
     *
     * @param {Object} rule 规则
     * @param {Object} value 值
     * @param {Function} callback 回调函数
     */
    familyMobileValidator(rule, value, callback) {
      if (this.isNotEmpty() && !value) {
        callback(new Error('请输入联系电话'));
      } else if (!/^1\d{10}$/.test(value)) {
        callback(new Error('请输入正确的联系电话'));
      } else {
        callback();
      }
    }
  }
};
</script>
<style lang="scss">
.family-contact_container{
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  .el-form-item{
    width: 112px;
  }

  .family-contact_split{
    width: 13px;
    height: 2px;
    border-top: 2px solid rgba(0, 0, 0, 0.25);
  }
}
</style>
