<template>
  <div class="contact_create">
    <div class="comment-title">
      <span class="comment-title_main">添加联系人</span>
      <span class="comment-title_sub">（可添加多个联系人，且多个联系人之间需要设置上下级关系）</span>
    </div>
    <div class="form-wrapper">
      <el-form :inline="true"
        :model="contact"
        :rules="rules"
        ref="baseForm"
        label-width="130px">
        <div class="contact-base-info">
          <el-form-item class="col-item" prop="name" key="contact-name1" label="姓名">
            <el-input class="col-input"
              v-model="contact.name"
              placeholder="姓名"
              :maxlength="6"
              key="contact-name-input"></el-input>
          </el-form-item>
          <el-form-item class="col-item" prop="birthDate" key="birthDate" label="出生年月">
            <el-date-picker class="col-input"
              v-model="contact.birthDate"
              type="month"
              format="yyyy.MM"
              value-format="yyyy.MM"
              placeholder="选择出生年月">
            </el-date-picker>
          </el-form-item>
          <el-form-item class="col-item" label="性别" prop="gender" key="contact-gender">
            <el-radio-group v-model="contact.gender"
              key="contact-gender-input">
              <el-radio :label="item.value" v-for="(item, index) in GENDER" :key="index">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item class="col-item" label="婚姻状况" prop="maritalStatus" key="contact-maritalStatus">
            <el-radio-group v-model="contact.maritalStatus"
              key="contact-maritalStatus-radio">
              <el-radio :label="item.value" v-for="(item, index) in MARITAL_STATUS" :key="index">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item class="col-item" prop="nativePlace" key="nativePlace" label="籍贯">
            <el-input class="col-input"
              v-model="contact.nativePlace"
              placeholder="如“江苏南京”"
              :maxlength="15"
              key="nativePlace"></el-input>
          </el-form-item>
          <el-form-item class="col-item" prop="graduateColleges" key="graduateColleges" label="毕业院校">
            <el-input class="col-input"
              v-model="contact.graduateColleges"
              placeholder="如“江苏大学-机电学院”"
              :maxlength="15"
              key="graduateColleges"></el-input>
          </el-form-item>
          <el-form-item class="col-item" prop="department" key="contact-dept" label="部门">
            <el-input class="col-input"
              v-model="contact.department"
              placeholder="请输入部门"
              :maxlength="15"
              key="contact-dept-input"></el-input>
          </el-form-item>
          <el-form-item class="col-item" prop="position" key="contact-position" label="职位">
            <el-input class="col-input"
              v-model="contact.position"
              placeholder="请输入职位"
              :maxlength="15"
              key="contact-duty-input"></el-input>
          </el-form-item>
          <el-form-item class="col-item" label="手机号码" prop="mobile" key="contact-mobile">
            <el-input class="col-input"
              v-model="contact.mobile"
              placeholder="请输入手机号码"
              :maxlength="11"
              key="contact-mobile-input"></el-input>
          </el-form-item>
          <!--<el-form-item prop="department" key="contact-dept" label="部门">
            <el-input class="col-input"
              v-model="contact.department"
              placeholder="请输入部门"
              :maxlength="15"
              key="contact-dept-input"></el-input>
          </el-form-item>-->
          <!--<el-form-item prop="age" key="contact-age" label="年龄">
              <el-select
              class="col-input"
              v-model="contact.age"
              placeholder="年龄"
              key="contact-age-select">
              <el-option v-for="item in AGE"
                :key="item.value"
                :value="item.value"
                :label="item.label" ></el-option>
              </el-select>
            </el-form-item>-->
          <el-form-item class="col-item" label="邮箱" prop="email" key="contact-email">
            <el-input class="col-input"
              v-model="contact.email"
              placeholder="请输入邮箱"
              :maxlength="35"
              key="contact-email-input"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="note" key="note">
            <el-input class="form-input-610" v-model="contact.note"
              type="textarea"
              placeholder="请输入备注"
              :maxlength="500"
              key="note"></el-input>
          </el-form-item>
          <el-form-item label="管理范畴" prop="manageScope" key="manageScope-scope">
            <el-input class="form-input-610" v-model="contact.manageScope"
              type="textarea"
              placeholder="请输入管理范畴"
              :maxlength="500"
              key="manageScope-input"></el-input>
          </el-form-item>
          <el-form-item label="工作职责" prop="responsibility" key="contact-responsibility">
            <el-input class="form-input-610" v-model="contact.responsibility"
              type="textarea"
              placeholder="请输入工作职责"
              :maxlength="500"
              key="contact-responsibility-input"></el-input>
          </el-form-item>
          <el-form-item label="兴趣爱好" key="contact-interests">
            <el-input class="form-input-610" v-model="contact.interests"
              type="textarea"
              placeholder="请输入兴趣爱好"
              :maxlength="100"
              key="contact-interests-input"></el-input>
          </el-form-item>
          <el-form-item label="家庭成员" key="family-member" style="width: 740px;">
            <template v-if="contact.contactFamilyDtoList.length === 0">
              <div @click="addFamilyContact" class="btn_add_family-contact">
                <i class="el-icon-plus"></i> 添加成员
              </div>
              <!--<div class="family-member_comment">
                如集团内有家属员工，请填写此项，无则不填
              </div>-->
            </template>
            <template v-else>
              <div class="family-contact" v-for="(familyContact, index) of contact.contactFamilyDtoList" :key="index">
                <family-contact :family-contact="familyContact" :index="index"></family-contact>
                <div>
                  <i class="el-icon-delete" @click="removeFamilyContact(index)"></i>
                </div>
              </div>
              <div @click="addFamilyContact" class="btn_add_family-contact">
                <i class="el-icon-plus"></i> 继续添加成员
              </div>
            </template>
          </el-form-item>
          <el-form-item label="可见范围" prop="visibleRange" key="visible-range">
            <el-select
            class="col-input"
            v-model="contact.visibleRange"
            placeholder="可见范围"
            key="contact-age-select">
            <el-option v-for="item in visibleStatus"
              :key="item.value"
              :value="item.value"
              :label="item.label" ></el-option>
            </el-select>
          </el-form-item>
          <!--<hr/>
          <el-form-item
            label="基本信息"
            required
            key="contact-name"
            class="col-item">
            <el-col :span="8">
              <el-form-item prop="name" key="contact-name1">
                <el-input class="col-input"
                  v-model="contact.name"
                  placeholder="姓名"
                  :maxlength="6"
                  key="contact-name-input"></el-input>
              </el-form-item>
            </el-col>
            <el-col class="line-container" :span="1">
               <div class="line">
              </div>
            </el-col>
            <el-col :span="7">
              <el-form-item prop="gender" key="contact-gender">
                <el-select
                  class="col-input"
                  v-model="contact.gender"
                  placeholder="性别"
                  key="contact-gender-input">
                  <el-option v-for="item in GENDER"
                    :key="item.value"
                    :value="item.value"
                    :label="item.label" ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col class="line-container" :span="1">
              <div class="line">
              </div>
            </el-col>
            <el-col :span="7">
              <el-form-item prop="age" key="contact-age">
                <el-select
                class="col-input"
                v-model="contact.age"
                placeholder="年龄"
                key="contact-age-select">
                <el-option v-for="item in AGE"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label" ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="部门职位" required key="contact-dept-1" class="col-item">
            <el-col :span="11">
              <el-form-item prop="department" key="contact-dept">
                <el-input class="col-input"
                  v-model="contact.department"
                  placeholder="请输入部门"
                  :maxlength="15"
                  key="contact-dept-input"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2" class="line-container">
              <div class="line">
              </div>
            </el-col>
            <el-col :span="11">
              <el-form-item prop="position" key="contact-position" >
                <el-input class="col-input"
                  v-model="contact.position"
                  placeholder="请输入职位"
                  :maxlength="15"
                  key="contact-duty-input"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="手机号码" prop="mobile" key="contact-mobile">
            <el-input class="full-col"
              v-model="contact.mobile"
              placeholder="请输入手机号码"
              :maxlength="11"
              key="contact-mobile-input"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email" key="contact-email">
            <el-input class="full-col"
              v-model="contact.email"
              placeholder="请输入邮箱"
              :maxlength="35"
              key="contact-email-input"></el-input>
          </el-form-item>
          <el-form-item label="婚姻状况" prop="maritalStatus" key="contact-maritalStatus">
            <el-radio-group v-model="contact.maritalStatus"
              key="contact-maritalStatus-radio">
              <el-radio :label="item.value" v-for="(item, index) in MARITAL_STATUS" :key="index">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="管理范畴" prop="manageScope" key="manageScope-scope">
            <el-input v-model="contact.manageScope"
              type="textarea"
              placeholder="请输入管理范畴"
              :maxlength="500"
              key="manageScope-input"></el-input>
          </el-form-item>
          <el-form-item label="工作职责" prop="responsibility" key="contact-responsibility">
            <el-input v-model="contact.responsibility"
              type="textarea"
              placeholder="请输入工作职责"
              :maxlength="500"
              key="contact-responsibility-input"></el-input>
          </el-form-item>
          <el-form-item label="兴趣爱好" key="contact-interests">
            <el-input v-model="contact.interests"
              type="textarea"
              placeholder="请输入兴趣爱好"
              :maxlength="100"
              key="contact-interests-input"></el-input>
          </el-form-item>
          <el-form-item label="家庭成员" key="family-member" style="width: 420px;">
            <template v-if="contact.contactFamilyDtoList.length === 0">
              <div @click="addFamilyContact" class="btn_add_family-contact">
                <i class="el-icon-plus"></i> 添加成员
              </div>
            </template>
            <template v-else>
              <div class="family-contact" v-for="(familyContact, index) of contact.contactFamilyDtoList" :key="index">
                <family-contact :family-contact="familyContact" :index="index"></family-contact>
                <div>
                  <i class="el-icon-delete" @click="removeFamilyContact(index)"></i>
                </div>
              </div>
              <div @click="addFamilyContact" class="btn_add_family-contact">
                <i class="el-icon-plus"></i> 继续添加成员
              </div>
            </template>
          </el-form-item>
          <el-form-item label="可见范围" prop="visible" key="visible-range">
            <el-select
            class="col-input"
            v-model="contact.visible"
            placeholder="可见范围"
            key="contact-age-select">
            <el-option v-for="item in visibleStatus"
              :key="item.value"
              :value="item.value"
              :label="item.label" ></el-option>
            </el-select>
          </el-form-item>-->
        </div>
        <el-form-item style="margin-left: 130px">
          <el-button size="mini" type="primary" @click="saveContact">确定</el-button>
          <el-button size="mini" type="primary" @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {mapActions} from 'vuex';
import filters from '../filters';
import {
  isEmpty as emptyValidator
} from '@/utils/rules';
import FamilyContact from './FamilyContact.vue';
export default {
  name: 'CustomerContacts',
  mixins: [filters],
  components: {
    FamilyContact
  },
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      index: -1,
      contact: {
        gender: '',
        maritalStatus: '',
        contactFamilyDtoList: [
        ]
      },
      visibleStatus: [
        {label: '全部可见', value: '全部可见'},
        {label: '仅管理员可见', value: '仅管理员可见'},
        {label: '外协支撑不可见', value: '外协支撑不可见'}
      ],
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 1, max: 6, message: '姓名过长，长度 6 个字符内', trigger: 'blur' },
          { validator: emptyValidator, trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        age: [
          { required: true, message: '请选择年龄', trigger: 'change' }
        ],
        department: [
          { required: true, message: '请输入部门', trigger: 'blur' },
          { validator: emptyValidator, trigger: 'blur' }
        ],
        position: [
          { required: true, message: '请输入职位', trigger: 'blur' },
          { validator: emptyValidator, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { type: 'string', pattern: /^1\d{10}$/, message: '请输入正确的手机号码', trigger: 'blur' }
        ],
        email: [
          { type: 'email', required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        manageScope: [
          { required: true, message: '请输入管理范畴', trigger: 'blur' },
          { validator: emptyValidator, trigger: 'blur' }
        ],
        responsibility: [
          { required: true, message: '请输入工作职责', trigger: 'blur' },
          { validator: emptyValidator, trigger: 'blur' }
        ],
        visibleRange: [
          { required: true, message: '请选择可见范围', trigger: 'change' }
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
      this.contact.contactFamilyDtoList.push({
      });
    },
    removeFamilyContact(index) {
      this.contact.contactFamilyDtoList.splice(index, 1);
    },
    saveContact() {
      this.$refs.baseForm.validate((valid) => {
        if (valid) {
          let list = this.contact.contactFamilyDtoList;
          if (list.length > 0) {
            for (let i = 0; i < list.length; i++) {
              if (list[i].name.trim() && list[i].relationship.trim() && list[i].remark.trim()) {
              } else {
                this.$message({ showClose: true, message: '若填写家庭成员，请填写完整的信息！', type: 'error' });
                return;
              }
            }
          }
          if (this.index > -1) {
            this.list[this.index] = Object.assign({}, this.contact);
          } else {
            this.generateContactId().then((res) => {
              this.contact.contactId = res.data;
              this.list.push(this.contact);
            });
          }
          this.cancel();
        }
      });
    },
    cancel() {
      this.$emit('cancel');
    },
    ...mapActions(['generateContactId'])
  }
};
</script>
<style lang="scss">
@import '@/assets/scss/variables.scss';
$form-item-width: $formLargeWidth;

.contact_create{

  border: 1px solid #E9E9E9;
  width: 100%;
  margin: 0 auto 24px;

  *{
    box-sizing: border-box;
  }

  .contact-base-info{
    .full-col, .el-textarea{
      width: $form-item-width;
    }
    .el-select, .el-radio-group {
      width: 202px;
    }
    .el-date-editor {
      width: 230px;
    }
    .col-item {
      & > .el-form-item__content{
        width: 230px;
      }
    }
  }

  .line-container{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    line-height: 40px;
  }

  .line{
    width: 9px;
    margin-right: 9px;
    height: 1px;
    border-top: 1px solid  $line-color;
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
    padding-bottom: 24px;
  }

  .split-line{
    width: 100%;
    height: 1px;
    background-color: rgba(233, 233, 233, 1);
    margin: 24px auto;
  }
  .btn_add_family-contact{
      width: 610px;
      height: 32px;
      line-height: 32px;
      padding-left: 16px;
      border-radius: 4px;
      background-color: rgba(255, 255, 255, 1);
      border: 1px dashed rgba(217, 217, 217, 1);
      cursor: pointer;
      color: rgba(0, 0, 0, 0.25);
  }

  .family-member_comment{
    height: 17px;
    line-height: 17px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 12px;
    margin-top: 8px;
  }

  .family-contact_title {
    margin: 24px 0;

    .family-contact_title-sub{
      height: 20px;
      line-height: 20px;
      color: rgba(0, 0, 0, 0.45);
    }
  }

  .family-contact{
    display: flex;
    align-items: center;
    .el-icon-delete{
      margin: 0 0 20px 16px;
      cursor: pointer;
      color: rgba(0, 0, 0, 0.25);
      font-size: 16px;
    }
  }

  .el-button{
    width: 58px;
    height: 24px;
    line-height: 24px;
  }
}
</style>
