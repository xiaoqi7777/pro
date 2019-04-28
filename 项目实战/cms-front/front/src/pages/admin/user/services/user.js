import request from '@/utils/request';
import {PAGE_SIZE} from '../constants'
export function fetch(pageNum) {
  return request(`/user?pageNum=${pageNum}&pageSize=${PAGE_SIZE}`);
}

export function create(values) {
  console.log('JSON.stringify(values)',JSON.stringify(values))
  return request('/user',{
    method:'POST',
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(values)
  });
}

export function update(values) {
  return request(`/user/${values.id}`,{
    method:'PUT',
    headers:{
      "Content-Type":"application/json"
    },
  });
}



export function del(id) {
  return request(`/user/${id}`,{
    method:'DELETE',
    headers:{
      "Content-Type":"application/json"
    },
  });
}


export function delAll(ids) {
  return request(`/user/${ids[0]}`,{
    method:'DELETE',
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(ids)
  });
}
