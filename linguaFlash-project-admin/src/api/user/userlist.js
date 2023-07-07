import request from '@/utils/request'

export function getUserList(pageNum, pageSize, keyword) {
    return request({
        url: `/my/user/userlist/${pageNum}/${pageSize}`,
        method: 'post',
        data: { keyword }
    })
}

export function getAllForeign() {
    return request({
        url: `/my/user/getforeign`,
        method: 'get',
    })
}

export function addUserList(data) {
    return request({
        url: `/my/user/add/user`,
        method: 'post',
        data
    })
}

export function updateStatus(params) {
    return request({
        url: `/my/user/update/status`,
        method: 'get',
        params
    })
}

export function updateUserList(id, data) {
    return request({
        url: `/my/user/update/user/${id}`,
        method: 'post',
        data
    })
}

export function deleteUserList(id) {
    return request({
        url: `/my/user/delete/user/${id}`,
        method: 'get',
    })
}