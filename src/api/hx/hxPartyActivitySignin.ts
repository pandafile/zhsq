
import request from '/@/utils/request'
// 查询活动签到列表
export function listHxPartyActivitySignin(query:object) {
  return request({
    url: '/api/v1/hx/hxPartyActivitySignin/list',
    method: 'get',
    params: query
  })
}
// 查询活动签到详细
export function getHxPartyActivitySignin(id:number) {
  return request({
    url: '/api/v1/hx/hxPartyActivitySignin/get',
    method: 'get',
    params: {
      id: id.toString()
    }
  })
}
// 新增活动签到
export function addHxPartyActivitySignin(data:object) {
  return request({
    url: '/api/v1/hx/hxPartyActivitySignin/add',
    method: 'post',
    data: data
  })
}
// 修改活动签到
export function updateHxPartyActivitySignin(data:object) {
  return request({
    url: '/api/v1/hx/hxPartyActivitySignin/edit',
    method: 'put',
    data: data
  })
}
// 删除活动签到
export function delHxPartyActivitySignin(ids:number[]) {
  return request({
    url: '/api/v1/hx/hxPartyActivitySignin/delete',
    method: 'delete',
    data:{
      ids:ids
    }
  })
}
