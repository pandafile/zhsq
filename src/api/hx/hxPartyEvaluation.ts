
import request from '/@/utils/request'
// 查询民主评议列表
export function listHxPartyEvaluation(query:object) {
  return request({
    url: '/api/v1/hx/hxPartyEvaluation/list',
    method: 'get',
    params: query
  })
}
// 查询民主评议详细
export function getHxPartyEvaluation(id:number) {
  return request({
    url: '/api/v1/hx/hxPartyEvaluation/get',
    method: 'get',
    params: {
      id: id.toString()
    }
  })
}
// 新增民主评议
export function addHxPartyEvaluation(data:object) {
  return request({
    url: '/api/v1/hx/hxPartyEvaluation/add',
    method: 'post',
    data: data
  })
}
// 修改民主评议
export function updateHxPartyEvaluation(data:object) {
  return request({
    url: '/api/v1/hx/hxPartyEvaluation/edit',
    method: 'put',
    data: data
  })
}
// 删除民主评议
export function delHxPartyEvaluation(ids:number[]) {
  return request({
    url: '/api/v1/hx/hxPartyEvaluation/delete',
    method: 'delete',
    data:{
      ids:ids
    }
  })
}
