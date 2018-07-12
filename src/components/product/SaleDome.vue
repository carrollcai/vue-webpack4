<template>
<div class="base-info">
  <h3>产品销售案例</h3>
  <div class="b-i-table">
    <el-table
      v-if="dataList"
      :data="dataList"
      row-key="salesId"
      :expand-row-keys="expands"
      @row-click="openDetail"
      style="width: 100%">
      <el-table-column
        v-if="false"
        label="产品ID" width="150"
        prop="salesId">
      </el-table-column>
      <el-table-column
        label="销售类型" width="150"
        prop="salesType">
      </el-table-column>
      <el-table-column
        label="组合产品" width="180"
        prop="composedProduct" :formatter="composedProductFn">
      </el-table-column>
      <el-table-column
        label="方案介绍"
        prop="scheme">
      </el-table-column>
      <el-table-column
        label="销售数量" width="100"
        prop="salesNumber">
      </el-table-column>
      <el-table-column
        label="操作" width="120"
        prop="name">
        <template slot-scope="operation">
          <div @click="openDetail(operation.$index, operation.row)" class="el-table__expand-icon blue">详细<i class="el-icon el-icon-arrow-right blue el-table__expand-icon--expanded"></i></div>
        </template>
      </el-table-column>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <p class="sale-type">
              <el-form-item label="销售类型">
              <span>: {{ props.row.salesType }}</span>
              </el-form-item>
              <el-form-item label="销售数量">
                <span>: {{ props.row.salesNumber }}</span>
              </el-form-item>
            </p>
            <p class="sale-type">
              <el-form-item label="创新点/借鉴点">
                <span>: {{ props.row.keypoint }}</span>
              </el-form-item>
              <el-form-item v-if="props.row.fileName" label="方案附件">
                <span class="blue" @click="dowloadFile()">: <i class="el-icon-download"></i>{{props.row.fileName}}</span>
              </el-form-item>
            </p>
            <p>
              <el-form-item label="方案介绍">
                <span>: {{ props.row.scheme }}</span>
              </el-form-item>
            </p>
            <p>
              <el-form-item label="经验教训">
                <span>: {{ props.row.experience }}</span>
              </el-form-item>
            </p>
          </el-form>
        </template>
      </el-table-column>
    </el-table>
  </div>
</div>
</template>

<script>
import _ from 'lodash';
import { mapActions } from 'vuex';
export default {
  props: {
    data: {
      type: Array
    }
  },
  data() {
    return {
      currIndex: -1,
      expands: [],
      uploadData: {
        fileTypeId: 502,
        fileSaveName: '',
        fileName: ''
      }
    };
  },
  computed: {
    dataList() {
      if (this.data) {
        return this.getFileName();
      }
    }
  },
  methods: {
    getFileName() {
      var _this = this;
      if (this.data) {
        for (let i = 0; i < (this.data).length; i++) {
          if (_this.data[i].salesType === '0') {
            _this.data[i].salesType = '单品销售';
          } else if (_this.data[i].salesType === '1') {
            _this.data[i].salesType = '组合销售';
          }
          if (_this.data[i].fileInputId) {
            _this.queryElec({
              fileInputId: (_this.data[i].fileInputId)
            }).then((res) => {
              if (res.data.length > 0) {
                if (_this.data[i].fileInputId === res.data[0].fileInputId) {
                  _this.data[i].fileName = res.data[0].fileName;
                }
              }
            });
          }
        }
        return this.data;
      }
    },
    openDetail(index, row) {
      if (row.fileInputId) {
        this.queryElec({fileInputId: row.fileInputId}).then((res) => {
          if (res.data.length > 0) {
            this.uploadData.fileName = res.data[0].fileName;
            this.uploadData.fileTypeId = res.data[0].fileTypeId;
            this.uploadData.fileSaveName = res.data[0].fileSaveName;
          }
        });
      }
      var id = row.salesId;
      if (this.expands.indexOf(id) < 0) {
        this.expands.push(id);
        _.compact(this.expands);
      } else {
        this.expands = _.pullAll(this.expands, [id]);
      }
      this.currIndex = index;
    },
    composedProductFn(row, column, columnValue) {
      if (columnValue) {
        return columnValue;
      } else {
        return '无';
      }
    },
    dowloadFile() {
      this.downloadUplodFile(this.uploadData);
    },
    ...mapActions([
      'queryElec',
      'downloadUplodFile'
    ])
  }
};
</script>

<style lang="scss">
.base-info {
  margin-top: 16px;
  padding-bottom: 16px;
  background: #fff;
  h3 {
    height: 48px;
    line-height: 48px;
    font-size: 16px;
    color: #262626;
    margin: 0;
    border-bottom: 1px #E6E6E6 solid;
    padding: 0px 32px;
  }
  .b-i-list {
    display: flex;
    flex-flow: wrap;
    padding: 10px 32px 0;
    li {
      height: 28px;
      line-height: 28px;
      font-size: 14px;
      width: 33%;
      color: #262626;
      span {
        color: #c0c0c0;
      }
    }
  }
  .b-i-table {
    padding: 32px;
  }
  .demo-table-expand {
    .el-form-item__label {
      color: #c0c0c0;
    }
    p {
      height: 28px;
      line-height: 28px;
      color: #262626;
    }
    .sale-type {
      .el-form-item {
        width: 40%;
      }
    }
  }
  .el-table__expand-icon {
    width: 70px;
  }
  .el-table__body {
    .el-table_1_column_6 {
      display: none;
    }
  }
  .el-table {
    .el-table_1_column_6 {
      display: none;
    }
  }
}
</style>
