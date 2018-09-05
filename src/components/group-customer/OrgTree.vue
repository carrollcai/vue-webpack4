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
        return [];
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
      MAX_VALUE: 150,
      STEP: 15
    };
  },
  watch: {
    contacts() {
      this.init();
    }
  },
  methods: {
    list2Tree(data) {
      const fu = (dad, num, deep) => {
        const cd = dad.filter((item, index, array) => item.parentContactId === num);
        deep += 1;
        cd.map((item, index, array) => {
          const cc = fu(dad, item.contactId, deep);
          array[index].children = cc;
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
        let children = contact.children;
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
<style lang="less">
#orgTree{
  width: 100%;
  height: 600px;
}
</style>
