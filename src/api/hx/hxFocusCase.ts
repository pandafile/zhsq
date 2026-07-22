
import request from '/@/utils/request'
// 查询重点问题表列表
export function listHxFocusCase(query:object) {
  return request({
    url: '/api/v1/hx/hxFocusCase/list',
    method: 'get',
    params: query
  })
}
// 查询重点问题表详细
export function getHxFocusCase(id:number) {
  return request({
    url: '/api/v1/hx/hxFocusCase/get',
    method: 'get',
    params: {
      id: id.toString()
    }
  })
}
// 新增重点问题表
export function addHxFocusCase(data:object) {
  return request({
    url: '/api/v1/hx/hxFocusCase/add',
    method: 'post',
    data: data
  })
}
// 修改重点问题表
export function updateHxFocusCase(data:object) {
  return request({
    url: '/api/v1/hx/hxFocusCase/edit',
    method: 'put',
    data: data
  })
}
// 删除重点问题表
export function delHxFocusCase(ids:number[]) {
  return request({
    url: '/api/v1/hx/hxFocusCase/delete',
    method: 'delete',
    data:{
      ids:ids
    }
  })
}
