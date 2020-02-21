<template>
  <div class="wrap">
   <Tabs class="tabWrap">
       <TabPane label="疫情分布图">
           <h3>疫情分布图</h3>
           <div class="selectWrap">
            <span>选择地区:</span><Select v-model="state.mapType" style="width:200px" @on-change="handleChangeProvince">
                <Option v-for="item in state.provinceList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
           </div>
           <hot-map :mapType="state.mapType" :data="state.mapList" :mapTitle="state.mapTitle" :mapData="state.mapData"></hot-map>
       </TabPane>
       <!-- <TabPane label="疫情趋势图">
           疫情趋势图
       </TabPane> -->
   </Tabs>
  </div>
</template>

<script lang="ts">
import { createComponent, reactive, onMounted } from '@vue/composition-api'
import { getChinaJson, getProvinceJson, getVirusData } from '@/service/API'
import provinceMap from '@/data/province-map'
import HotMap from '@/components/hotMap.vue'

interface HomeState {
    mapTitle: string;
    mapType: string; // 地图类型, 省份or全国
    mapList: any[];
    provinceList: any[];
    mapData: {};
}
interface ProvinceOptItem {
    label: string;
    value: string;
}

export default createComponent({
    components: {
        HotMap
    },
    setup() {
        const provinceList: ProvinceOptItem[] = [{label: '全国', value: '全国'}]
        for (const val of Object.keys(provinceMap)) {
            provinceList.push({
                label: val,
                value: val
            })
        }

        const origin: HomeState = {
            mapTitle: '',
            mapType: '全国',
            mapList: [],
            provinceList,
            mapData: {}
        }
        const state = reactive(origin)

        // methods
        const getMapData = async (mapType: string) => {
            const mapData = mapType === '全国' ? await getChinaJson() : await getProvinceJson(provinceMap[mapType])
            state.mapData = mapData.data
        }

        const getMapList = async (mapType: string) => {
            const res = await getVirusData()
            const { code, newslist } = res.data
            const reg = /省|自治区/g

            if (code === 200) {
                let cities: any[] = []
                newslist.forEach((item: any) => {
                    if (item.provinceShortName === mapType) {
                        cities = item.cities
                        // provinceName = item.provinceShortName
                        return
                    }
                })
                if (cities.length !== 0) {
                    state.mapList = cities.map((city: any) => {
                        return {
                            name: reg.test(mapType) ? city.cityName + '市' : city.cityName,
                            value: city.confirmedCount,
                            ...city
                        }
                    })
                } else {
                    state.mapList = newslist.map((province: any) => {
                        return {
                            name: province.provinceShortName,
                            value: province.confirmedCount,
                            ...province
                        }
                    })
                }
            }
        }

        const init = (val: string) => {
            getMapData(val)
            getMapList(val)
        }

        const handleChangeProvince = (value: string) => {
            init(value)
        }

        onMounted (() => {
            init(state.mapType)
        })

        return {
            state, 
            handleChangeProvince
        }
    }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.wrap {
    height: 800px;
}
.tabWrap {
    width: 100%;
    height: 100%;
}
</style>
