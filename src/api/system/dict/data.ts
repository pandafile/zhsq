import request from '/@/utils/request';
import {ref ,toRefs,ToRefs} from 'vue'
// 根据字典类型查询字典数据信息
export function getDicts(dictType :string,defaultValue?:string):Promise<any> {
    let dv = defaultValue??''
    let params ={
        dictType:dictType,
        defaultValue:dv
    }
    return request({
        url: '/api/v1/system/dict/data/getDictData',
        method: 'get',
        params:params
    })
}

/**
 * 获取字典数据
 */
export function useDict(...args:string[]):ToRefs<any>{
    const res:any = ref({});
    args.forEach((d:string) => {
        res.value[d] = [];

        // 优先读 localStorage 缓存（30分钟有效）
        const cacheKey = `dict_cache_${d}`;
        const cacheTimeKey = `${cacheKey}_time`;
        const cached = localStorage.getItem(cacheKey);
        const cacheTime = localStorage.getItem(cacheTimeKey);
        if (cached && cacheTime) {
            const age = Date.now() - parseInt(cacheTime);
            if (age < 30 * 60 * 1000) {
                try {
                    res.value[d] = JSON.parse(cached);
                    return;
                } catch { /* 缓存损坏，重新请求 */ }
            }
        }

        getDicts(d).then(resp => {
            const dictData = resp.data.values.map((p:any) =>  ({ label: p.value, value: p.key, isDefault: p.isDefault }))
            res.value[d] = dictData;
            // 写入缓存
            try {
                localStorage.setItem(cacheKey, JSON.stringify(dictData));
                localStorage.setItem(cacheTimeKey, Date.now().toString());
            } catch { /* localStorage 不可用 */ }
        })
    })
    return toRefs(res.value);
}


export function getDataList(query:Object) {
    return request({
        url: '/api/v1/system/dict/data/list',
        method: 'get',
        params:query
    })
}

export function getData(dictCode:number) {
    return request({
        url: '/api/v1/system/dict/data/get',
        method: 'get',
        params:{dictCode}
    })
}

export function addData(data:any) {
    return request({
        url: '/api/v1/system/dict/data/add',
        method: 'post',
        data:data
    })
}

export function editData(data:any) {
    return request({
        url: '/api/v1/system/dict/data/edit',
        method: 'put',
        data:data
    })
}

export function deleteData(ids:number[]) {
    return request({
        url: '/api/v1/system/dict/data/delete',
        method: 'delete',
        data:{ids}
    })
}
