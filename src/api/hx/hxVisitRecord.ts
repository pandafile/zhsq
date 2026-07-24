import request from '/@/utils/request'

// 查询走访记录列表
export function listHxVisitRecord(query: object) {
  return request({
    url: '/api/v1/hx/hxVisitRecord/list',
    method: 'get',
    params: query,
  })
}

// 查询走访记录详细
export function getHxVisitRecord(id: number) {
  return request({
    url: '/api/v1/hx/hxVisitRecord/get',
    method: 'get',
    params: {
      id: id.toString(),
    },
  })
}

// 新增走访记录
export function addHxVisitRecord(data: object) {
  return request({
    url: '/api/v1/hx/hxVisitRecord/add',
    method: 'post',
    data: data,
  })
}

// 修改走访记录
export function updateHxVisitRecord(data: object) {
  return request({
    url: '/api/v1/hx/hxVisitRecord/edit',
    method: 'put',
    data: data,
  })
}

// 删除走访记录
export function delHxVisitRecord(ids: number[]) {
  return request({
    url: '/api/v1/hx/hxVisitRecord/delete',
    method: 'delete',
    data: {
      ids: ids,
    },
  })
}

// 关联附表查询数据
export function linkedDataSearch() {
  return request({
    url: '/api/v1/hx/hxVisitRecord/linkedData',
    method: 'get',
  })
}
