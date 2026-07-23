
import request from '/@/utils/request'
// 查询党组织活动列表
export function listHxPartyActivity(query:object) {
  return request({
    url: '/api/v1/hx/hxPartyActivity/list',
    method: 'get',
    params: query
  })
}
// 查询党组织活动详细
export function getHxPartyActivity(id:number) {
  return request({
    url: '/api/v1/hx/hxPartyActivity/get',
    method: 'get',
    params: {
      id: id.toString()
    }
  })
}
// 新增党组织活动
export function addHxPartyActivity(data:object) {
  return request({
    url: '/api/v1/hx/hxPartyActivity/add',
    method: 'post',
    data: data
  })
}
// 修改党组织活动
export function updateHxPartyActivity(data:object) {
  return request({
    url: '/api/v1/hx/hxPartyActivity/edit',
    method: 'put',
    data: data
  })
}
// 删除党组织活动
export function delHxPartyActivity(ids:number[]) {
  return request({
    url: '/api/v1/hx/hxPartyActivity/delete',
    method: 'delete',
    data:{
      ids:ids
    }
  })
}
