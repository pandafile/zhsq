
import request from '/@/utils/request'
// 查询房屋信息表列表
export function listHxRoom(query:object) {
  return request({
    url: '/api/v1/hx/hxPerson/hxRoom/list',
    method: 'get',
    params: query
  })
}
// 查询房屋信息表详细
export function getHxRoom(id:number) {
  return request({
    url: '/api/v1/hx/hxPerson/hxRoom/get',
    method: 'get',
    params: {
      id: id.toString()
    }
  })
}
// 新增房屋信息表
export function addHxRoom(data:object) {
  return request({
    url: '/api/v1/hx/hxPerson/hxRoom/add',
    method: 'post',
    data: data
  })
}
// 修改房屋信息表
export function updateHxRoom(data:object) {
  return request({
    url: '/api/v1/hx/hxPerson/hxRoom/edit',
    method: 'put',
    data: data
  })
}
// 删除房屋信息表
export function delHxRoom(ids:number[]) {
  return request({
    url: '/api/v1/hx/hxPerson/hxRoom/delete',
    method: 'delete',
    data:{
      ids:ids
    }
  })
}
//相关连表查询数据
export function linkedDataSearch(){
  return request({
    url: '/api/v1/hx/hxPerson/hxRoom/linkedData',
    method: 'get'
  })
}
