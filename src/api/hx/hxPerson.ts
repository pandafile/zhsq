
import request from '/@/utils/request'
// 查询人员信息表列表
export function listHxPerson(query:object) {
  return request({
    url: '/api/v1/hx/hxPerson/list',
    method: 'get',
    params: query
  })
}
// 查询人员信息表详细
export function getHxPerson(id:number) {
  return request({
    url: '/api/v1/hx/hxPerson/get',
    method: 'get',
    params: {
      id: id.toString()
    }
  })
}
// 新增人员信息表
export function addHxPerson(data:object) {
  return request({
    url: '/api/v1/hx/hxPerson/add',
    method: 'post',
    data: data
  })
}
// 修改人员信息表
export function updateHxPerson(data:object) {
  return request({
    url: '/api/v1/hx/hxPerson/edit',
    method: 'put',
    data: data
  })
}
// 删除人员信息表
export function delHxPerson(ids:number[]) {
  return request({
    url: '/api/v1/hx/hxPerson/delete',
    method: 'delete',
    data:{
      ids:ids
    }
  })
}
//相关连表查询数据
export function linkedDataSearch(){
  return request({
    url: '/api/v1/hx/hxPerson/linkedData',
    method: 'get'
  })
}
