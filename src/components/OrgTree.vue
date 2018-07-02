<template>
  <div id="orgTree">
  </div>
</template>
<script>
import Echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/graph';
import map from 'lodash/map';
import concat from 'lodash/concat';
import findIndex from 'lodash/findIndex';

export default {
  name: 'OrgTree',
  props: {
    contacts: {
      type: Array,
      default() {
        return [
          {
            'contactId': 1021,
            'name': '王成功',
            'department': '技术部',
            'age': '2',
            'ageValue': '25-30',
            'gender': '2',
            'genderValue': '女',
            'position': '总监',
            'mobile': '18756944987',
            'email': '18756944987@173.com',
            'manageScope': '18756944987',
            'responsibility': '18756944987',
            'maritalStatus': '',
            'contactFamilyDtoList': []
          },
          {
            'contactId': 10013,
            'name': 'BOSS',
            'department': 'BOSS',
            'age': '2',
            'ageValue': '25-30',
            'gender': '2',
            'genderValue': '女',
            'position': '总监',
            'mobile': '18756944987',
            'email': '18756944987@173.com',
            'manageScope': '18756944987',
            'responsibility': '18756944987',
            'maritalStatus': '',
            'contactFamilyDtoList': []
          },
          {
            'contactId': 1019,
            'name': '新联系人',
            'department': '技术部',
            'age': '3',
            'ageValue': '30-40',
            'gender': '0',
            'genderValue': '未知',
            'position': '很长的技术部你知道吗',
            'mobile': '18756694498',
            'email': '18756694498@173.com',
            'manageScope': '18756694498',
            'responsibility': '18756694498',
            'maritalStatus': '',
            'contactFamilyDtoList': [],
            parentContactId: 1021
          },
          {
            'contactId': 1020,
            'name': '一一',
            'department': '技术部',
            'age': '3',
            'ageValue': '30-40',
            'gender': '1',
            'genderValue': '男',
            'position': '研发总监',
            'mobile': '13589666999',
            'email': '13589666999@173.com',
            'manageScope': '打杂',
            'responsibility': '打杂',
            'interests': '打杂',
            'maritalStatus': '1',
            'maritalStatusValue': '已婚',
            'contactFamilyDtoList': [],
            parentContactId: 1021
          },
          {
            'contactId': 10251,
            'name': '王成功1',
            'department': '技术部1',
            'age': '2',
            'ageValue': '25-30',
            'gender': '2',
            'genderValue': '女',
            'position': '总监2',
            'mobile': '18756944987',
            'email': '18756944987@173.com',
            'manageScope': '18756944987',
            'responsibility': '18756944987',
            'maritalStatus': '',
            'contactFamilyDtoList': [],
            parentContactId: 1019
          },
          {
            'contactId': 10241,
            'name': '王成功2',
            'department': '技术部2',
            'age': '2',
            'ageValue': '25-30',
            'gender': '2',
            'genderValue': '女',
            'position': '总监2',
            'mobile': '18756944987',
            'email': '18756944987@173.com',
            'manageScope': '18756944987',
            'responsibility': '18756944987',
            'maritalStatus': '',
            'contactFamilyDtoList': [],
            parentContactId: 1020
          }
        ];
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },
  data() {
    return {
      MAX_VALUE: 100,
      STEP: 20
    };
  },
  methods: {
    demo() {

    },
    list2Tree(data) {
      const fu = (dad, num, deep) => {
        const cd = dad.filter((item, index, array) => item.parentContactId === num);
        deep += 1;
        cd.map((item, index, array) => {
          const cc = fu(dad, item.contactId, deep);
          array[index].children.push(cc);
          array[index].deep = deep;
        });
        return cd;
      };

      return fu(data, 0, 0);
    },
    richLabel(contact) {
      return {
        formatter: [
          `{a|${contact.name} | ${contact.position}}`,
          `{b|${contact.department}}`
        ].join('\n'),
        rich: {
          a: {
            color: 'white',
            lineHeight: 10,
            textAlign: 'center'
          },
          b: {
            color: 'white',
            height: 40
          }
        }
      };
    },
    deep(data) {
      const {MAX_VALUE, STEP} = this;
      const that = this;
      let items = [];

      function deepFn(contact) {
        items.push({
          'id': contact.contactId,
          'name': contact.contactId,
          category: `${contact.contactId}`,
          'symbolSize': MAX_VALUE - contact.deep * STEP,
          'draggable': 'true',
          'value': MAX_VALUE - contact.deep * STEP,
          parentContactId: contact.parentContactId,
          label: that.richLabel(contact)
        });
        let children = contact.children[0];
        if (children && children.length) {
          for (let item of children) {
            deepFn(item);
          }
        }
      }

      deepFn(data);
      return items;
    },
    assembleData() {
      const { contacts } = this;

      let data = [];
      let links = [];
      let categories = [];

      if (contacts && contacts.length) {
        for (let contact of contacts) {
          if (!contact.parentContactId) {
            contact.parentContactId = 0;
          }
          contact.children = [];
        }

        let tree = this.list2Tree(contacts);

        for (let contact of tree) {
          let arr = this.deep(contact);
          data = concat(data, arr);
        }

        console.log(JSON.stringify(data));

        for (let contact of data) {
          if (contact.parentContactId) {
            links.push({
              'source': findIndex(data, {id: contact.id}),
              'target': findIndex(data, {id: contact.parentContactId})
            });
          }

          categories.push({
            name: contact.id
          });
        }
      }

      return {
        data,
        links,
        categories
      };
    },
    init() {
      let myChart = Echarts.init(document.getElementById('orgTree'));

      // 指定图表的配置项和数据
      let option = {
        backgroundColor: new Echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [{
          offset: 0,
          color: '#f7f8fa'
        }, {
          offset: 1,
          color: '#cdd0d5'
        }]),
        legend: [{
          formatter: function(name) {
            return Echarts.format.truncateText(name, 40, '14px Microsoft Yahei', '…');
          },
          tooltip: {
            show: true
          },
          selectedMode: 'true',
          bottom: 20
        }],
        toolbox: {
          show: true,
          feature: {
            dataView: {
              show: true,
              readOnly: true
            },
            restore: {
              show: true
            },
            saveAsImage: {
              show: true
            }
          }
        },
        animationDuration: 1000,
        animationEasingUpdate: 'quinticInOut',
        series: [{
          name: '组织架构图',
          type: 'graph',
          layout: 'force',
          symbol: 'rect',
          roam: true,
          force: {
            repulsion: 500,
            edgeLength: 120
          },
          data: [
          ],
          links: [
          ],
          categories: [
          ],
          focusNodeAdjacency: true,
          label: {
            normal: {
              show: true,
              position: 'inside'
            }
          },
          lineStyle: {
            normal: {
              color: 'source',
              curveness: 0,
              type: 'solid'
            }
          }
        }]
      };

      let data = this.assembleData();
      let force = option.series[0];
      force.data = data.data;
      force.links = data.links;
      force.categories = data.categories;

      option.legend[0].data = map(data.categories, 'name');

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  }
};
</script>
<style lang="scss">
#orgTree{
  width: 100%;
  height: 600px;
}
</style>
