
import request from '/@/utils/request'
// 查询党员信息列表
export function listHxPartyMember(query:object) {
  return request({
    url: '/api/v1/hx/hxPartyMember/list',
    method: 'get',
    params: query
  })
}
// 查询党员信息详细
export function getHxPartyMember(id:number) {
  return request({
    url: '/api/v1/hx/hxPartyMember/get',
    method: 'get',
    params: {
      id: id.toString()
    }
  })
}
// 新增党员信息
export function addHxPartyMember(data:object) {
  return request({
    url: '/api/v1/hx/hxPartyMember/add',
    method: 'post',
    data: data
  })
}
// 修改党员信息
export function updateHxPartyMember(data:object) {
  return request({
    url: '/api/v1/hx/hxPartyMember/edit',
    method: 'put',
    data: data
  })
}
// 删除党员信息
export function delHxPartyMember(ids:number[]) {
  return request({
    url: '/api/v1/hx/hxPartyMember/delete',
    method: 'delete',
    data:{
      ids:ids
    }
  })
}
