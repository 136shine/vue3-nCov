import axios from 'axios'

const APIKEY = '964dc226dd5b57e892e6199735b6c55f'

// 获取地图json文件
export function getChinaJson(): Promise<any> {
    return axios({
      method: 'get',
      url: `https://raw.githubusercontent.com/huanent/vue-echarts-map-demo/master/map/china.json`
    })
}
  // 获取省份地图json文件
export function getProvinceJson(pinyinName: string): Promise<any> {
    return axios({
      method: 'get',
      url: `https://raw.githubusercontent.com/huanent/vue-echarts-map-demo/master/map/province/${pinyinName}.json`
    })
}

// 获取疫情统计数据
export function getVirusData(): Promise<any>{
  return axios({
    method: 'get',
    url: `http://api.tianapi.com/txapi/ncovcity/index?key=${APIKEY}`
  })
}