<template>
  <div class="contact_create">
    <div class="comment-title">
      <span class="comment-title_main">添加联系人</span>
      <span class="comment-title_sub">（可添加多个联系人，且多个联系人之间需要设置上下级关系）</span>
    </div>
    <div class="form-wrapper">
      <el-form  :model="contact" :rules="rules" ref="baseForm" label-width="120px">
        <div>
          <el-form-item label="姓名" prop="name" required key="contact-name">
            <el-input v-model="contact.name" placeholder="请输入姓名" style="width:420px" key="contact-name-input"></el-input>
          </el-form-item>
          <el-form-item label="部门" prop="dept" required key="contact-dept">
            <el-input v-model="contact.dept" placeholder="请输入部门" style="width:420px" key="contact-dept-input"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age" required key="contact-age">
            <el-input v-model.number="contact.age" placeholder="请输入年龄" style="width:420px" key="contact-age-input"></el-input>
          </el-form-item>
          <el-form-item label="职位" prop="job" required key="contact-job">
            <el-input v-model="contact.job" placeholder="请输入职位" style="width:420px" key="contact-duty-input"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile" required key="contact-mobile">
            <el-input v-model="contact.mobile" placeholder="请输入手机" style="width:420px" key="contact-mobile-input"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email" required key="contact-email">
            <el-input v-model="contact.email" placeholder="请输入邮箱" style="width:420px" key="contact-email-input"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="gender" required key="contact-gender">
            <el-radio-group v-model="contact.gender" key="contact-gender-radio">
              <el-radio label="M">男</el-radio>
              <el-radio label="F">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="婚姻状况" prop="marriage" required key="contact-marriage">
            <el-radio-group v-model="contact.marriage" key="contact-marriage-radio">
              <el-radio label="Y">已婚</el-radio>
              <el-radio label="N">未婚</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="管理范畴" prop="management" required key="business-scope">
            <el-input v-model="contact.management" placeholder="请输入管理范畴" style="width:420px" key="contact-management-input"></el-input>
          </el-form-item>
          <el-form-item label="工作职责" prop="duty" required key="contact-duty">
            <el-input v-model="contact.duty" placeholder="请输入工作职责" style="width:420px" key="contact-duty-input"></el-input>
          </el-form-item>
          <el-form-item label="兴趣爱好" key="contact-hobby">
            <el-input v-model="contact.hobby" placeholder="请输入兴趣爱好" :maxlength="512" style="width:420px" key="contact-hobby-input"></el-input>
          </el-form-item>
        </div>
        <div class="split-line"></div>
        <div>
          <div class="family-contact_title">
            <span>家庭成员：</span>
            <span>（如集团内有家属员工，请填写此项，无则不填）</span>
          </div>
          <div class="family-contact" v-for="(familyContact, index) of contact.familyContacts" :key="index">
            <el-input v-model="familyContact.name" placeholder="姓名" key="name"></el-input>
            <el-input v-model="familyContact.relation" placeholder="与本人关系" key="relation"></el-input>
            <el-input v-model="familyContact.job" placeholder="工作职务" key="job"></el-input>
            <el-input v-model="familyContact.mobile" placeholder="联系电话" key="mobile"></el-input>
            <i v-if="contact.familyContacts.length > 1" class="el-icon-delete" @click="removeFamilyContact(index)"></i>
          </div>
          <div @click="addFamilyContact" class="btn_add_family-contact">
            新增家庭成员
          </div>
        </div>
        <el-form-item >
          <el-button size="mini" type="primary" @click="saveContact">确定</el-button>
          <el-button size="mini" type="primary" @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CustomerContacts',
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    const checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'));
      }
      if (!Number.isInteger(value)) {
        callback(new Error('请输入数字值'));
      } else {
        if (value > 99 || value < 0) {
          callback(new Error('请输入正确的年龄'));
        } else {
          callback();
        }
      }
    };

    return {
      index: -1,
      contact: {
        gender: 'M',
        marriage: 'N',
        familyContacts: [
          {}
        ]
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 1, max: 50, message: '姓名过长，长度 50 个字符内', trigger: 'blur' }
        ],
        dept: [
          { required: true, message: '请输入部门', trigger: 'blur' }
        ],
        age: [
          { validator: checkAge, trigger: 'blur' }
        ],
        job: [
          { required: true, message: '请输入职位', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机', trigger: 'blur' }
        ],
        email: [
          { type: 'email', required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ],
        marriage: [
          { required: true, message: '请选择婚姻状况', trigger: 'blur' }
        ],
        management: [
          { required: true, message: '请输入管理范畴', trigger: 'blur' }
        ],
        duty: [
          { required: true, message: '请输入工作职责', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    /**
     * 修改时，对数据进行初始化
     */
    init(contact, index) {
      this.$nextTick(() => {
        this.contact = Object.assign({}, contact);
        this.index = index;
      });
    },
    addFamilyContact() {
      this.contact.familyContacts.push({
      });
    },
    removeFamilyContact(index) {
      this.contact.familyContacts.splice(index, 1);
    },
    saveContact() {
      this.$refs.baseForm.validate((valid) => {
        if (valid) {
          if (this.index > -1) {
            this.list[this.index] = Object.assign({}, this.contact);
          } else {
            let id = new Date().getTime();
            this.contact.id = id;
            this.list.push(this.contact);
          }
          this.cancel();
        }
      });
    },
    cancel() {
      this.$emit('cancel');
    }
  }
};
</script>
<style lang="scss">
.contact_create{

  border: 1px solid #E9E9E9;
  width: 100%;
  margin: 0 auto 24px;

  *{
    box-sizing: border-box;
  }

  .comment-title{
      background: #FAFAFA ;
      border-bottom: 1px solid #E9E9E9;
      height: 40px;
      line-height: 40px;
      padding-left: 24px;
      margin-bottom: 32px;
  }

  .comment-title_main {
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
  }

  .comment-title_sub{
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
  }

  .form-wrapper{
    display: flex;
    justify-content: center;
  }

  .split-line{
    width: 100%;
    height: 1px;
    background-color: rgba(233, 233, 233, 1);
    margin: 24px auto;
  }
  .btn_add_family-contact{
      width: 526px;
      height: 32px;
      line-height: 32px;
      border-radius: 4px;
      background-color: rgba(255, 255, 255, 1);
      border: 1px dashed rgba(217, 217, 217, 1);
      text-align: center;
      margin: 24px auto;
      cursor: pointer;
  }
}
.family-contact{
  display: flex;
  align-items: center;
  margin-bottom: 24px;

  .el-input{
    width: 112px;
  }
}
</style>
