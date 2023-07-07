import request from '@/utils/request'

export function getUserSubject(pageNum, pageSize, keyword) {
    return request({
        url: `/my/userSubject/getlist/${pageNum}/${pageSize}`,
        method: 'post',
        data: { keyword }
    })
}

export function getAllUser() {
    return request({
        url: `/my/userSubject/get/alluser`,
        method: 'post',
    })
}

export function getAllSubject() {
    return request({
        url: `/my/userSubject/get/allsubject`,
        method: 'post',
    })
}

export function addUserSubject(data) {
    return request({
        url: `/my/userSubject/add/usersubeject`,
        method: 'post',
        data
    })
}

export function deleteUserSubject(params) {
    return request({
        url: `/my/userSubject/delete/usersubject`,
        method: 'get',
        params
    })
}