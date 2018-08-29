<template>
  <div>
    <div class="p-table">
      <dl class="tHead">
        <dt class="tH01">订购产品</dt>
        <dd class="tH02 tHead-title">处理意见</dd>
      </dl>
      <dl class="tTr"
        v-for="(item, index) in handleTaskDetail.ordProductDtoList"
        :key="index">
        <dt class="tH01">{{item.productName}}</dt>
        <dd class="tH02"
          v-if="premissionDenied(item)">
          <!-- {{item.fileList}} -->
          <el-form class="handle-task-detail-form"
            label-widivh="112px"
            ref="pay"
            :model="payForm"
            :rules="payRules">
            <!-- 这个地方可以会出现bug，现在取附件，只取第一条 -->
            <el-form-item label="签约合同："
              label-width="130px"
              v-if="item.fileId && payDetailFileList.length">
              <div>
                <span class="blue"
                  v-for="(file, k) in payDetailFileList[0].fileList"
                  :key="k"
                  @click="downloadFile(file)">
                  {{file.fileName}}
                </span>
              </div>
            </el-form-item>
            <el-form-item label="付款金额："
              label-width="130px"
              prop="money">
              <el-input class="form-input-medium"
                type="text"
                maxlength="10"
                v-model="payForm.money"
                placeholder="请输入合同金额">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
            <el-form-item label="备注："
              label-width="130px"
              prop="dealResult">
              <el-input type="textarea"
                class="form-input-large"
                v-model="payForm.dealResult" />
            </el-form-item>
          </el-form>
        </dd>
        <dd class="tH02 p-table-denied"
          v-if="!premissionDenied(item)">您暂无权限处理~</dd>
      </dl>
    </div>
    <el-form>
      <el-form-item class="handle-task-btn">
        <el-button type="primary"
          @click="submitPayForm">确定</el-button>
        <form-cancel :path="'/order/handle-task'">取消</form-cancel>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { inte8Deci2 } from '@/utils/rules.js';
export default {
  props: {
    handleTaskDetail: {
      default: () => { },
      type: Object,
    },
    premissionDenied: Function,
    operatorId: String | Number,
    taskInsId: String | Number,
    id: String | Number,
  },
  data() {
    return {
      payForm: {
        money: null
      },
      payRules: {
        money: [
          { required: true, message: '请输入合同金额', trigger: 'blur' },
          { validator: inte8Deci2, trigger: 'blur' }
        ]
      },
    };
  },
  computed: {
    ...mapState({
      payDetailFileList: ({ order }) => order.payDetailFileList,
    })
  },
  methods: {
    submitPayForm() {
      const params = {
        ordPayAmount: Number(this.payForm.money),
        taskRequest: {
          id: Number(this.id),
          taskInsId: Number(this.taskInsId),
          resultStatus: '5',
          dealResult: this.payForm.dealResult,
          dealPerson: this.operatorId
        }
      };
      this.$refs.pay[0].validate(valid => {
        if (!valid) return false;
        this.submitPay(params);
      });
    },
    downloadFile(obj) {
      let params = {
        fileTypeId: obj.fileTypeId,
        fileSaveName: obj.fileSaveName,
        fileName: obj.fileName
      };
      this.orderDownloadFile(params);
    },
    ...mapActions([
      'submitPay',
      'orderDownloadFile',
    ]),
  }
};
</script>
