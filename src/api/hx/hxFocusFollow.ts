
import request from '/@/utils/request'
// 查询重点问题跟进记录表列表
export function listHxFocusFollow(query:object) {
  return request({
    url: '/api/v1/hx/hxFocusFollow/list',
    method: 'get',
    params: query
  })
}
// 查询重点问题跟进记录表详细
export function getHxFocusFollow(id:number) {
  return request({
    url: '/api/v1/hx/hxFocusFollow/get',
    method: 'get',
    params: {
      id: id.toString()
    }
  })
}
// 新增重点问题跟进记录表
export function addHxFocusFollow(data:object) {
  return request({
    url: '/api/v1/hx/hxFocusFollow/add',
    method: 'post',
    data: data
  })
}
// 修改重点问题跟进记录表
export function updateHxFocusFollow(data:object) {
  return request({
    url: '/api/v1/hx/hxFocusFollow/edit',
    method: 'put',
    data: data
  })
}
// 删除重点问题跟进记录表
export function delHxFocusFollow(ids:number[]) {
  return request({
    url: '/api/v1/hx/hxFocusFollow/delete',
    method: 'delete',
    data:{
      ids:ids
    }
  })
}
//相关连表查询数据
export function linkedDataSearch(){
  return request({
    url: '/api/v1/hx/hxFocusFollow/linkedData',
    method: 'get'
  })
}
