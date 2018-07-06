<template>
  <div class="requirement-detail-handle">
    <div class="m-container">
      <detail-info :requirement="requirement"></detail-info>
    </div>

    <div class="m-container info-block">
      <el-form>
        <!-- 物料需求处理 -->
        <template>
          <el-form-item lable="物料上传">
          </el-form-item>
          <el-form-item lable="备注">
            <el-input class="col-input"
              type="textarea"
              v-model="requirement.desc"
              placeholder="备注"
              key="contact-name-input-desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">提交处理</el-button>
          </el-form-item>
        </template>

        <!-- 日常、投诉需求处理  -->
        <template>
          <el-form-item lable="处理方式">
            <el-radio-group v-model="handleType">
              <el-radio label="3">本人处理</el-radio>
              <el-radio label="6">投诉升级 <span>（转交给更高级级别的人处理）</span></el-radio>
            </el-radio-group>
          </el-form-item>

          <template v-if="handleType === '3'">
            <el-form-item lable="处理方案">
              <el-input class="col-input"
                type="textarea"
                v-model="requirement.name"
                placeholder="简要描述一下处理方案"
                :maxlength="6"
                key="contact-name-input"></el-input>
            </el-form-item>
            <el-form-item lable="备注">
              <el-input class="col-input"
                v-model="requirement.name"
                type="textarea"
                placeholder="备注"
                :maxlength="6"
                key="contact-name-input"></el-input>
            </el-form-item>
          </template>

          <template v-if="handleType === '6'">
            <el-form-item lable="指派处理人">
              <el-col :span="8">
                <el-form-item prop="name" key="contact-name1">
                  <el-select>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col class="line-container" :span="8">
                <el-checkbox v-model="checked">短信提醒他</el-checkbox>
              </el-col>
            </el-form-item>
          </template>
          <el-form-item>
            <el-button type="primary">提交处理</el-button>
          </el-form-item>
        </template>
      </el-form>
    </div>
  </div>
</template>
<script>
import mixins from './mixins';
export default {
  name: 'RequirementHandle',
  mixins: [mixins],
  data() {
    return {
      handleType: '',
      checked: false
    };
  },
  methods: {
  }
};
</script>
<style lang="scss">
  .requirement-detail-handle{
    .info-block{
      margin-top: 16px;
    }
  }
</style>
