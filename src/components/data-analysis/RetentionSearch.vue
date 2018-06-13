<template>
  <el-form ref="activeSearchForm" :model="retentionObj" :rules="retSearchRules" class="active-search block-containter">
    <div class="active-search__select">
      <div class="active-search__province">
        <el-form-item class="normalize-form-item">省份：</el-form-item>
        <el-form-item class="normalize-form-item" prop="provinceSelected">
          <el-select v-if="province.length" v-model="retentionObj.provinceSelected" placeholder="请选择" multiple @change="provinceChange" collapse-tags>
            <el-option :key="null" label="全部" :value="null"></el-option>
            <el-option v-for="item in province" :key="item.value" :label="item.value" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

      </div>
      <div class="active-search__client">
        <el-form-item class="normalize-form-item">客户端：</el-form-item>
        <el-form-item class="normalize-form-item" prop="clientSelected">
          <el-select v-if="client.length" v-model="retentionObj.clientSelected" placeholder="请选择" @change="clientChange">
            <el-option v-for="item in client" :key="item.value" :label="item.value" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </div>
    </div>
    <div class="province-operate">
      <div class="search-btn">
        <el-button type="primary" @click="query">查询</el-button>
      </div>
    </div>
  </el-form>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { CLIENT } from '@/config';

export default {
  data() {
    return {
      client: CLIENT,
      retSearchRules: {
        provinceSelected: [
          // { required: true, message: '请选择省份', trigger: 'change' }
        ],
        clientSelected: [
          { required: true, message: '请选择客户端', trigger: 'change' }
        ]
      }
    };
  },
  computed: {
    ...mapState({
      province: ({ root }) => root.province,
      retentionObj: ({ dataAnalysis }) => dataAnalysis.retentionObj
    })
  },
  beforeMount() {
  },
  methods: {
    provinceChange() {
      // 如果为全部，改变数据全选，否则不选
    },
    clientChange() {

    },
    query() {
      this.getRetentionLossUser();
      this.getRetTrendList();
    },
    ...mapActions([
      'getRetentionLossUser',
      'getRetTrendList'
    ])
  }
};
</script>
