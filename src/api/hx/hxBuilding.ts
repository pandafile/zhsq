
import request from '/@/utils/request'
// 查询楼栋信息表列表
export function listHxBuilding(query:object) {
  return request({
    url: '/api/v1/hx/hxBuilding/list',
    method: 'get',
    params: query
  })
}
// 查询楼栋信息表详细
export function getHxBuilding(id:number) {
  return request({
    url: '/api/v1/hx/hxBuilding/get',
    method: 'get',
    params: {
      id: id.toString()
    }
  })
}
// 新增楼栋信息表
export function addHxBuilding(data:object) {
  return request({
    url: '/api/v1/hx/hxBuilding/add',
    method: 'post',
    data: data
  })
}
// 修改楼栋信息表
export function updateHxBuilding(data:object) {
  return request({
    url: '/api/v1/hx/hxBuilding/edit',
    method: 'put',
    data: data
  })
}
// 删除楼栋信息表
export function delHxBuilding(ids:number[]) {
  return request({
    url: '/api/v1/hx/hxBuilding/delete',
    method: 'delete',
    data:{
      ids:ids
    }
  })
}
