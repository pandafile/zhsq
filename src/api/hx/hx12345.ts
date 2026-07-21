
import request from '/@/utils/request'
import axios from 'axios';
// 查询12345工单处理记录表列表
export function listHx12345(query:object) {
  return request({
    url: '/api/v1/hx/hx12345/list',
    method: 'get',
    params: query
  })
}
// 查询12345工单处理记录表详细
export function getHx12345(id:number) {
  return request({
    url: '/api/v1/hx/hx12345/get',
    method: 'get',
    params: {
      id: id.toString()
    }
  })
}
// 新增12345工单处理记录表
export function addHx12345(data:object) {
  return request({
    url: '/api/v1/hx/hx12345/add',
    method: 'post',
    data: data
  })
}
// 修改12345工单处理记录表
export function updateHx12345(data:object) {
  return request({
    url: '/api/v1/hx/hx12345/edit',
    method: 'put',
    data: data
  })
}
// 删除12345工单处理记录表
export function delHx12345(ids:number[]) {
  return request({
    url: '/api/v1/hx/hx12345/delete',
    method: 'delete',
    data:{
      ids:ids
    }
  })
}
//相关连表查询数据
export function linkedDataSearch(){
  return request({
    url: '/api/v1/hx/hx12345/linkedData',
    method: 'get'
  })
}

export async function getImages(){
  const response = await axios.get('http://59.232.0.17:28080/api/hnyth-auth/auth/login/validCode', {
  params: {
    'size': '100x40'
  },
  // headers: {
  //   'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36',
  // }
});
  return response.data

}

export async function loginmyi(){

  
}
