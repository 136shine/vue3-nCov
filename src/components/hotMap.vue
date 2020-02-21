<template>
  <div class="map" ref="map"></div>
</template>

<script lang="ts">
import { createComponent, watch } from '@vue/composition-api'
import Echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/map'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/tooltip'


interface EchartOption {
  seriesData: any;
  seriesName: string | undefined;
  mapType: string;
  zoom: string;
}
export default createComponent({
  name: 'hotMap',
  props: {
    data: Array,
    mapType: {
      type: String,
      default: 'china'
    },
    mapTitle: String,
    mapData: Object
  },
  setup(props, context) {
    const setOptions = (options: EchartOption) => {
       return {
        tooltip: {
          show: true,
          formatter: function(params: any) {
            let tip = ''
            if (params.data) {
              tip =
                params.name +
                '：<br>确诊：' +
                params.data['value'] +
                '例<br>死亡：' +
                params.data['deadCount'] +
                '例<br>治愈：' +
                params.data['curedCount'] +
                '例'
            }
            return tip
          }
        },
        visualMap: {
          show: true,
          type: 'piecewise',
          min: 0,
          max: 2000,
          align: 'right',
          top: '2%',
          right: 0,
          left: 'center',
          inRange: {
            color: ['#ffc0b1', '#ff8c71', '#ef1717', '#9c0505']
          },
          pieces: [
            { min: 1000 },
            { min: 500, max: 999 },
            { min: 100, max: 499 },
            { min: 10, max: 99 },
            { min: 1, max: 9 }
          ],
          orient: 'horizontal',
          showLabel: true,
          padding: 5,
          text: ['高', '低'],
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            fontSize: 10
          }
        },
        series: [
          {
            left: 'center',
            type: 'map',
            name: options.seriesName,
            // silent: province ? true : false,
            label: {
              show: true,
              position: 'inside',
              // margin: 8,
              fontSize: 6
            },
            mapType: options.mapType,
            data: options.seriesData,
            zoom: options.zoom,
            roam: false,
            showLegendSymbol: false,
            rippleEffect: {
              show: true,
              brushType: 'stroke',
              scale: 2.5,
              period: 4
            }
          }
        ]
      }
    }

    watch(async () => {
      const {mapTitle, mapType, data, mapData} = props
      console.log('mapData, data=>', mapData, data)
      // init map
      const echartMap = Echarts.init(context.refs.map)
      Echarts.registerMap(mapType, mapData!)

      const options: EchartOption = {
        seriesData: data,
        seriesName: mapTitle,
        zoom: mapType === 'china' ? '1.1' : '1.2',
        mapType
      }
      
      echartMap.setOption(setOptions(options))
    })
  }
})


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.map {
  height: 500px;
  width: 100%;
  background-color: #fff;
}
</style>