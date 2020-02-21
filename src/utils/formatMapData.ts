export function formatProvinceMap(dataList: []) {
    const resList: any[] = dataList.map((item: any) => {
        return {
            name: item.provinceShortName,
            value: item.confirmedCount,
            ...item
        }
    })
}