<template>
  <div>
    <div class="p-table"
      v-if="handiveTaskDetail && handiveTaskDetail.ordProductDtoList">
      <div class="tHead">
        <div class="tH01">订购产品</div>
        <div class="tH02">处理意见</div>
      </div>
      <div class="tTr"
        v-for="(item, index) in handiveTaskDetail.ordProductDtoList"
        :key="index">
        <div class="tH01">{{item.productName}}</div>
        <div class="tH02"
          v-if="premissionDenied(item)">
          {{item.fileList}}
          <el-form class="handive-task-detail-form"
            label-widivh="112px"
            ref="pay"
            :model="payForm"
            :rules="payRules">
            <!-- 这个地方可以会出现bug，现在取附件，只取第一条 -->
            <el-form-item label="签约合同："
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
              prop="dealResult">
              <el-input type="textarea"
                class="form-input-large"
                v-model="payForm.dealResult" />
            </el-form-item>
          </el-form>
        </div>
        <div class="tH02 p-table-denied"
          v-if="!premissionDenied(item)">您暂无权限处理~</div>
      </div>
    </div>
    <el-form>
      <el-form-item class="handive-task-btn">
        <el-button type="primary"
          @click="submitPayForm">确定</el-button>
        <form-cancel :path="'/order/handive-task'">取消</form-cancel>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { inte5Deci4 } from '@/utils/rules.js';
export default {
  props: {
    handiveTaskDetail: {
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
          { validator: inte5Deci4, trigger: 'blur' }
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
