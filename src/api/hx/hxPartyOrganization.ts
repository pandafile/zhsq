
import request from '/@/utils/request'
// 查询党组织架构列表
export function listHxPartyOrganization(query:object) {
  return request({
    url: '/api/v1/hx/hxPartyOrganization/list',
    method: 'get',
    params: query
  })
}
// 查询党组织架构详细
export function getHxPartyOrganization(id:number) {
  return request({
    url: '/api/v1/hx/hxPartyOrganization/get',
    method: 'get',
    params: {
      id: id.toString()
    }
  })
}
// 新增党组织架构
export function addHxPartyOrganization(data:object) {
  return request({
    url: '/api/v1/hx/hxPartyOrganization/add',
    method: 'post',
    data: data
  })
}
// 修改党组织架构
export function updateHxPartyOrganization(data:object) {
  return request({
    url: '/api/v1/hx/hxPartyOrganization/edit',
    method: 'put',
    data: data
  })
}
// 删除党组织架构
export function delHxPartyOrganization(ids:number[]) {
  return request({
    url: '/api/v1/hx/hxPartyOrganization/delete',
    method: 'delete',
    data:{
      ids:ids
    }
  })
}
