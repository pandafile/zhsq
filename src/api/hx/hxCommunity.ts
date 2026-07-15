
import request from '/@/utils/request'
// 查询小区/园区信息表列表
export function listHxCommunity(query:object) {
  return request({
    url: '/api/v1/hx/hxCommunity/list',
    method: 'get',
    params: query
  })
}
// 查询小区/园区信息表详细
export function getHxCommunity(id:number) {
  return request({
    url: '/api/v1/hx/hxCommunity/get',
    method: 'get',
    params: {
      id: id.toString()
    }
  })
}
// 新增小区/园区信息表
export function addHxCommunity(data:object) {
  return request({
    url: '/api/v1/hx/hxCommunity/add',
    method: 'post',
    data: data
  })
}
// 修改小区/园区信息表
export function updateHxCommunity(data:object) {
  return request({
    url: '/api/v1/hx/hxCommunity/edit',
    method: 'put',
    data: data
  })
}
// 删除小区/园区信息表
export function delHxCommunity(ids:number[]) {
  return request({
    url: '/api/v1/hx/hxCommunity/delete',
    method: 'delete',
    data:{
      ids:ids
    }
  })
}
