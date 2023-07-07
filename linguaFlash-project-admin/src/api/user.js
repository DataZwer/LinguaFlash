import request from '@/utils/request'

export function adminLogin(data) {
  return request({
    url: '/api/admin/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/my/admininfo',
    method: 'get',
    params: { token }
  })
}

export function getAdminList(pageNum, pageSize, keyword) {
  return request({
    url: `/my/adminlist/${pageNum}/${pageSize}`,
    method: 'post',
    data: { keyword }
  })
}

export function addAdminList(data) {
  return request({
    url: `/my/add/admin`,
    method: 'post',
    data
  })
}

export function updateAdminStatus(params) {
  return request({
    url: `/my/update/status`,
    method: 'get',
    params
  })
}

export function updateAdmin(id, data) {
  return request({
    url: `/my/update/admininfo/${id}`,
    method: 'post',
    data
  })
}


export function updateAdminRole(params) {
  return request({
    url: `/my/update/role`,
    method: 'get',
    params
  })
}

export function deleteAdmin(id) {
  return request({
    url: `/my/delete/admin/${id}`,
    method: 'get',
  })
}

export function updatePassword(data) {
  return request({
    url: `/my/updatepwd`,
    method: 'post',
    data
  })
}

// export function logout() {
//   return request({
//     url: '/vue-admin-template/user/logout',
//     method: 'post'
//   })
// }
